import { Router } from "express";
import prisma from "../db.js";

const router = Router();

router.post("/", async (req, res) => {

  // Auth check
  if (!req.user) {
    return res.status(401).json({ message: "You must be logged in to complete a purchase." });
  }

  // Get the client record from DB
  const googleEmail = req.user.emails?.[0]?.value;
  if (!googleEmail) {
    return res.status(401).json({ message: "Could not read email from your Google account." });
  }

  const client = await prisma.clients.findUnique({
    where: { email: googleEmail },
  });

  if (!client) {
    return res.status(401).json({ message: "No account found for your email. Please complete registration first." });
  }

  // Validate the request body
  const { courseId, provider, transaction_id } = req.body;

  if (!courseId || !provider || !transaction_id) {
    return res.status(400).json({ message: "courseId, provider, and transaction_id are all required." });
  }

  const SUPPORTED_PROVIDERS = ["BKASH", "NAGAD", "ROCKET"];
  if (!SUPPORTED_PROVIDERS.includes(provider)) {
    return res.status(400).json({ message: `Provider "${provider}" is not supported yet.` });
  }

  // Look up course price from the DB 
  const course = await prisma.courses.findUnique({
    where: { course_id: courseId },
  });

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  // Find the payment record by the transaction ID the user entered

  /*
    transactions which have null client id and null course ids can be used to map new users to courses
    because otherwise, same transaction_id can be used again and again without making payment
  */
  const payment = await prisma.payments.findFirst({
    where: {
      provider_transaction_id: transaction_id,
      client_id: null,
      course_id: null,
    },
  });

  if (!payment) {
    // No record found — either wrong TrxID or SMS hasn't arrived yet.
    return res.status(402).json({ message: "Transaction not found. Please double-check your Transaction ID, or try again later" });
  }

  // Verify provider matches
  if (payment.provider !== provider) {
    return res.status(402).json({ message: "The payment provider does not match the transaction record. Please verify and try again." });
  }

  // Verify amount matches the course price
  if (Number(payment.amount) < Number(course.price)) {
    return res.status(402).json({ message: "Amount mismatch. Please send the correct amount." });
  }

  // Check payment status
  if (payment.status === "PENDING") {
    return res.status(200).json({ status: "PENDING" });
  }

  if (payment.status === "FAILED") {
    return res.status(200).json({ status: "FAILED" });
  }

  // atp: payment.status === "COMPLETED"

  // Check if already enrolled (this check should not be here, but frontend should check first, whether enrolled or not, will fix later) <--------------------
  const existingEnrollment = await prisma.enrollments.findUnique({
    where: {
      client_id_course_id: {
        client_id: client.client_id,
        course_id: courseId,
      },
    },
  });

  if (existingEnrollment) {
    await prisma.payments.update({
      where: { provider_transaction_id: transaction_id },
      data: {
        client_id: client.client_id,
        course_id: courseId,
      },
    });

    return res.status(200).json({
      status: "COMPLETED",
      transactionId: payment.provider_transaction_id,
      processedAt: payment.processed_at,
      paid: payment.amount
    });
  }
  // <---------------------------------------------------------------------------------------------------------------------------------------------------------


  // Link the payment to this user + course, then enroll them
  await prisma.payments.update({
    where: { provider_transaction_id: transaction_id },
    data: {
      client_id: client.client_id,
      course_id: courseId,
    },
  });

  const enrollmentId = `enr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  await prisma.enrollments.create({
    data: {
      enrollment_id: enrollmentId,
      client_id:     client.client_id,
      course_id:     courseId,
      status:        "ACTIVE",
    },
  });

  return res.status(200).json({
    status: "COMPLETED",
    transactionId: payment.provider_transaction_id,
    processedAt: payment.processed_at,
    paid: payment.amount
  });
});

export default router;