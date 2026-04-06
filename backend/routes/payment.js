// import { Router } from "express";
// import prisma from "../db.js";

// const router = Router();

// router.post("/", async (req, res) => {

//   // Auth check
//   if (!req.user) {
//     return res.status(401).json({ message: "You must be logged in to complete a purchase." });
//   }

//   // Get the client record from DB
//   const googleEmail = req.user.emails?.[0]?.value;
//   if (!googleEmail) {
//     return res.status(401).json({ message: "Could not read email from your Google account." });
//   }

//   const client = await prisma.clients.findUnique({
//     where: { email: googleEmail },
//   });

//   if (!client) {
//     return res.status(401).json({ message: "No account found for your email. Please complete registration first." });
//   }

//   // Validate the request body
//   const { courseId, provider, transaction_id } = req.body;

//   if (!courseId || !provider || !transaction_id) {
//     return res.status(400).json({ message: "courseId, provider, and transaction_id are all required." });
//   }

//   const SUPPORTED_PROVIDERS = ["BKASH", "NAGAD", "ROCKET"];
//   if (!SUPPORTED_PROVIDERS.includes(provider)) {
//     return res.status(400).json({ message: `Provider "${provider}" is not supported yet.` });
//   }

//   // Look up course price from the DB 
//   const course = await prisma.courses.findUnique({
//     where: { course_id: courseId },
//   });

//   if (!course) {
//     return res.status(404).json({ message: "Course not found." });
//   }

//   // Find the payment record by the transaction ID the user entered

//   /*
//     transactions which have null client id and null course ids can be used to map new users to courses
//     because otherwise, same transaction_id can be used again and again without making payment
//   */
//   const payment = await prisma.payments.findFirst({
//     where: {
//       provider_transaction_id: transaction_id,
//       client_id: null,
//       course_id: null,
//     },
//   });

//   if (!payment) {
//     // No record found — either wrong TrxID or SMS hasn't arrived yet.
//     return res.status(402).json({ message: "Transaction not found. Please double-check your Transaction ID, or try again later" });
//   }

//   // Verify provider matches
//   if (payment.provider !== provider) {
//     return res.status(402).json({ message: "The payment provider does not match the transaction record. Please verify and try again." });
//   }

//   // Verify amount matches the course price
//   if (Number(payment.amount) < Number(course.price)) {
//     return res.status(402).json({ message: "Amount mismatch. Please send the correct amount." });
//   }

//   // Check payment status
//   if (payment.status === "PENDING") {
//     return res.status(200).json({ status: "PENDING" });
//   }

//   if (payment.status === "FAILED") {
//     return res.status(200).json({ status: "FAILED" });
//   }

//   // atp: payment.status === "COMPLETED"

//   // Check if already enrolled (this check should not be here, but frontend should check first, whether enrolled or not, will fix later) <--------------------
//   const existingEnrollment = await prisma.enrollments.findUnique({
//     where: {
//       client_id_course_id: {
//         client_id: client.client_id,
//         course_id: courseId,
//       },
//     },
//   });

//   if (existingEnrollment) {
//     await prisma.payments.update({
//       where: { provider_transaction_id: transaction_id },
//       data: {
//         client_id: client.client_id,
//         course_id: courseId,
//       },
//     });

//     return res.status(200).json({
//       status: "COMPLETED",
//       transactionId: payment.provider_transaction_id,
//       processedAt: payment.processed_at,
//       paid: payment.amount
//     });
//   }
//   // <---------------------------------------------------------------------------------------------------------------------------------------------------------


//   // Link the payment to this user + course, then enroll them
//   await prisma.payments.update({
//     where: { provider_transaction_id: transaction_id },
//     data: {
//       client_id: client.client_id,
//       course_id: courseId,
//     },
//   });

//   const enrollmentId = `enr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

//   await prisma.enrollments.create({
//     data: {
//       enrollment_id: enrollmentId,
//       client_id:     client.client_id,
//       course_id:     courseId,
//       status:        "ACTIVE",
//     },
//   });

//   return res.status(200).json({
//     status: "COMPLETED",
//     transactionId: payment.provider_transaction_id,
//     processedAt: payment.processed_at,
//     paid: payment.amount
//   });
// });

// export default router;




// =================================================================== sslcommerz sandbox integration ==============================================================================
import { Router } from "express";
import { createRequire } from "module";
import prisma from "../db.js";

const require = createRequire(import.meta.url);
const SSLCommerzPayment = require("sslcommerz-lts");

const router = Router();

const STORE_ID       = process.env.SSLCOMMERZ_STORE_ID;
const STORE_PASSWORD = process.env.SSLCOMMERZ_STORE_PASSWORD;
const IS_LIVE        = false; 

const BACKEND_URL = process.env.BACKEND_URL;
const CLIENT_URL  = process.env.CLIENT_URL;

async function resolveClient(req) {
  const googleEmail = req.user?.emails?.[0]?.value;
  const localEmail  = req.user?.email;               
  const email       = googleEmail || localEmail;
  if (!email) return null;
  return prisma.clients.findUnique({ where: { email } });
}

router.post("/init", async (req, res) => {

  console.log("Request payload:", req.body);

  if (!req.user) {
    return res.status(401).json({ message: "You must be logged in to purchase a course." });
  }

  const client = await resolveClient(req);
  if (!client) {
    return res.status(401).json({ message: "No account found. Please complete registration first." });
  }

  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ message: "courseId is required." });
  }

  const course = await prisma.courses.findUnique({ where: { course_id: courseId } });
  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  const existingEnrollment = await prisma.enrollments.findUnique({
    where: {
      client_id_course_id: {
        client_id: client.client_id,
        course_id: courseId,
      },
      status: "ACTIVE",
    },
  });
  console.log("Client ID:", client.client_id);
  console.log("Course ID:", courseId);
  console.log("Existing Enrollment:", existingEnrollment);
  if (existingEnrollment) {
    return res.status(409).json({ message: "You are already enrolled in this course." });
  }

  const tran_id = `ssl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  await prisma.payments.create({
    data: {
      transaction_id:     tran_id,
      client_id:          client.client_id,
      course_id:          courseId,
      amount:             course.price,
      currency:           "BDT",
      provider:           "SSLCOMMERZ",
      account_identifier: client.email, 
      status:             "PENDING",
      transaction_type:   "PAYMENT",
    },
  });

  const sslcz = new SSLCommerzPayment(STORE_ID, STORE_PASSWORD, IS_LIVE);

  const initData = {
    total_amount:     Number(course.price),
    store_id:         STORE_ID,
    currency:         "BDT",
    tran_id,
    success_url:      `${BACKEND_URL}/payment/success`,
    fail_url:         `${BACKEND_URL}/payment/fail`,
    cancel_url:       `${BACKEND_URL}/payment/cancel`,
    ipn_url:          `${BACKEND_URL}/payment/ipn`,

    product_name:     course.title,
    product_category: "Online Course",
    product_profile:  "general",

    cus_name:         client.name    || "Student",
    cus_email:        client.email,
    cus_add1:         "Dhaka",
    cus_add2:         "Dhaka",
    cus_city:         "Dhaka",
    cus_state:        "Dhaka",
    cus_postcode:     "1000",
    cus_country:      client.country || "Bangladesh",
    cus_phone:        "01700000000", 

    shipping_method:  "NO",
    num_of_item:      1,
  };

  try {
    const apiResponse = await sslcz.init(initData);
    if (!apiResponse?.GatewayPageURL) {
      console.error("SSLCommerz init failed:", apiResponse);
      await prisma.payments.update({
        where: { transaction_id: tran_id },
        data:  { status: "FAILED" },
      });
      return res.status(502).json({ message: "Could not reach payment gateway. Please try again." });
    }
    return res.status(200).json({ gatewayUrl: apiResponse.GatewayPageURL });
  } catch (err) {
    console.error("SSLCommerz init error:", err);
    await prisma.payments.update({
      where: { transaction_id: tran_id },
      data:  { status: "FAILED" },
    });
    return res.status(500).json({ message: "An internal error occurred. Please try again." });
  }
});

async function validateAndEnroll(body) {
  const { val_id, tran_id, amount, bank_tran_id, card_type, card_no, status } = body;

  if (status === "FAILED" || status === "CANCELLED") {
    return { ok: false, reason: "Payment was not completed at the gateway." };
  }

  const payment = await prisma.payments.findUnique({ where: { transaction_id: tran_id } });
  if (!payment) {
    return { ok: false, reason: `No payment record found for tran_id: ${tran_id}` };
  }

  if (payment.status === "COMPLETED") {
    return { ok: true, alreadyDone: true, payment };
  }

  const sslcz = new SSLCommerzPayment(STORE_ID, STORE_PASSWORD, IS_LIVE);
  const validation = await sslcz.validate({ val_id });

  if (validation?.status !== "VALID" && validation?.status !== "VALIDATED") {
    await prisma.payments.update({
      where: { transaction_id: tran_id },
      data:  { status: "FAILED" },
    });
    return { ok: false, reason: `Validation failed. SSLCommerz status: ${validation?.status}` };
  }

  if (Number(validation.amount) < Number(payment.amount)) {
    await prisma.payments.update({
      where: { transaction_id: tran_id },
      data:  { status: "FAILED" },
    });
    return { ok: false, reason: "Payment amount mismatch." };
  }

  await prisma.payments.update({
    where: { transaction_id: tran_id },
    data: {
      status:                 "COMPLETED",
      provider_transaction_id: bank_tran_id ?? val_id,
      account_identifier:     `${card_no},,${card_type},,${payment.account_identifier}`,
      processed_at:           new Date(),
    },
  });

  // const coursesModel = prisma.$dmmf.datamodel.models.find(m => m.name === "courses");
  // console.log("courses fields:", coursesModel.fields.map(f => f.name));


  const enrollmentId = `enr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  await prisma.enrollments.upsert({
    where: {
      client_id_course_id: {
        client_id: payment.client_id,
        course_id: payment.course_id,
      },
    },
    update: { status: "ACTIVE" },
    create: {
      enrollment_id: enrollmentId,
      client_id:     payment.client_id,
      course_id:     payment.course_id,
      status:        "ACTIVE",
    },
  });

  return { ok: true, payment };
}

router.post("/success", async (req, res) => {
  const { tran_id } = req.body;  
  req.session = null; 

  const result = await validateAndEnroll(req.body);

  const cookieOptions = {
    maxAge: 60000, 
    httpOnly: false, 
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/", 
  };

  if (!result.ok) {
    console.error("Payment success callback failed:", result.reason);
    res.cookie("payment_notification", JSON.stringify({ status: "failed" }), cookieOptions);
    return res.redirect(`${CLIENT_URL}`);
  }
  
  res.cookie("payment_notification", JSON.stringify({ status: "success", tran_id }), cookieOptions);
  // return res.redirect(`${CLIENT_URL}/payment/result?status=success&tran_id=${tran_id}`);
  return res.redirect(`${CLIENT_URL}`);
});

router.post("/fail", async (req, res) => {
  const cookieOptions = {
    maxAge: 60000,
    httpOnly: false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };

  const { tran_id } = req.body;
  if (tran_id) {
    await prisma.payments.updateMany({
      where: { transaction_id: tran_id, status: "PENDING" },
      data:  { status: "FAILED" },
    });
  }
  res.cookie("payment_notification", JSON.stringify({ status: "failed" }), cookieOptions);
  return res.redirect(`${CLIENT_URL}/payment/result?status=failed`);
});

router.post("/cancel", async (req, res) => {
  const cookieOptions = {
    maxAge: 60000,
    httpOnly: false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };

  res.cookie("payment_notification", JSON.stringify({ status: "cancelled" }), cookieOptions);
  return res.redirect(`${CLIENT_URL}/payment/result?status=cancelled`);
});

router.post("/ipn", async (req, res) => {
  const result = await validateAndEnroll(req.body);
  if (!result.ok) {
    console.error("IPN validation failed:", result.reason);
    return res.status(400).json({ message: result.reason });
  }
  return res.status(200).json({ message: "IPN processed successfully." });
});




 
router.delete("/enroll/:courseId", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "You must be logged in." });
  }
 
  const client = await resolveClient(req);
  if (!client) {
    return res.status(401).json({ message: "Account not found." });
  }
 
  const { courseId } = req.params;
 
  const enrollment = await prisma.enrollments.findUnique({
    where: {
      client_id_course_id: {
        client_id: client.client_id,
        course_id: courseId,
      },
    },
  });
 
  if (!enrollment || enrollment.status !== "ACTIVE") {
    return res.status(404).json({ message: "No active enrollment found for this course." });
  }
 
  const payment = await prisma.payments.findFirst({
    where: {
      client_id: client.client_id,
      course_id: courseId,
      status:    "COMPLETED",
    },
    orderBy: { processed_at: "desc" },
  });
 
  if (!payment || !payment.provider_transaction_id) {
    return res.status(400).json({
      message: "No completed payment found. Cannot process refund.",
    });
  }
 
  // Initiate a refund through sslcommerz, we are assuming it will be done succesfully
 
  await prisma.refunds.create({
    data: {
      refund_id:               `ref_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      original_transaction_id: payment.transaction_id,
      amount_refunded:         payment.amount,
      reason:                  "Student cancelled enrollment",
      status:                  "REFUNDED",
    },
  });
 
  await prisma.payments.update({
    where: { transaction_id: payment.transaction_id },
    data:  { status: "FAILED" },
  });
 
  await prisma.enrollments.update({
    where: {
      client_id_course_id: {
        client_id: client.client_id,
        course_id: courseId,
      },
    },
    data: { status: "DROPPED" },
  });
 
  return res.status(200).json({ message: "Enrollment cancelled and refund initiated successfully." });
});
 
export default router;










