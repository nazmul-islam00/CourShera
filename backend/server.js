import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";

import "./passport.js";
import authRoute from "./routes/auth.js";
import coursesRoute from "./routes/courses.js";
import paymentRoute from "./routes/payment.js";
import regularAuthRoute from "./routes/regular_auth.js";
import prisma from "./db.js";

import { parseSms } from "./smsParser.js";

const app = express();
app.enable("trust proxy");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  cookieSession({
    name: "courshera_session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    sameSite: "none",
    httpOnly: true,
    partitioned: true,
  }),
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoute);
app.use("/courses", coursesRoute);
app.use("/payment", paymentRoute);
app.use("/regauth", regularAuthRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server has started running on port ${process.env.PORT}`);
});

// Eikhane route add korbi
// module wise organize koirish

// app.post('/payment', (req, res) => {
//   console.log('Headers:', req.headers);
//   console.log('Body:', req.body);
//   res.send('ok');
// });

app.get("/test-courses", async (req, res) => {
  const courses = await prisma.courses.findMany();
  res.json(courses);
});

app.get("/courses/:courseId", async (req, res) => {
  try {
    const course = await prisma.courses.findUnique({
      where: { course_id: req.params.courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ekhon, sms webhook runs with ngrok tunneling. runs only on rubaiyat's machine. when deployed, we'll change the webhook with a publishable address.
// steps :
// 1. terminal : ngrok http 5000
// 2. terminal will show : "xyz" -> localhost:5000
// 3. on phone app, add the url : "xyz/sms-webhook"
// 4. alternatively, for testing, use postman.
//    Method: POST
//    URL: "xyz/sms-webhook"
//    Headers: Content-Type: application/json
//    Body: select raw -> JSON and paste:
//      {
//      "sender": "bKash",
//      "body": "You have received Tk 1.00 from 01700000000. Fee Tk 0.00. Balance Tk 100.00. TrxID ABCDEFGHIJ at 23/03/2026 21:25",
//      "timestamp": 1742723400000
//      }
// 5.

app.post("/sms-webhook", async (req, res) => {
  const { sender, body, timestamp } = req.body;

  const parsed = parseSms(sender, body);

  const time = timestamp
    ? new Date(timestamp).toLocaleString()
    : new Date().toLocaleString();

  console.log("-".repeat(50));
  console.log(`   Payment received via ${parsed.service} at ${time}`);
  console.log(`   Amount  : Tk ${parsed.amount}`);
  console.log(`   Fee     : Tk ${parsed.fee}`);
  console.log(`   Balance : Tk ${parsed.balance}`);
  console.log(`   From    : ${parsed.from}`);
  console.log(`   TrxID   : ${parsed.trxId}`);
  console.log(`   Date    : ${parsed.datetime}`);
  console.log("-".repeat(50));

  try {
    const payment = await savePayment(parsed);
    if (payment._isDuplicate) {
      console.log(`Duplicate TrxID — already in DB`);
    } else {
      console.log(`Saved to DB with transaction_id: ${payment.transaction_id}`);
    }
    res.status(200).json({ success: true, parsed, payment });
  } catch (err) {
    console.error(`Failed to save payment: ${err.message}`);
    if (!res.headersSent) {
      res.status(200).json({ success: false, error: err.message, parsed });
    }
  }
});

async function savePayment(parsed) {
  if (parsed.trxId) {
    const existing = await prisma.payments.findUnique({
      where: { provider_transaction_id: parsed.trxId },
    });
    if (existing) {
      console.log(`Duplicate TrxID ${parsed.trxId} — skipping insert`);
      return { _isDuplicate: true };
    }
  }

  const internalId = `trx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

  return await prisma.payments.create({
    data: {
      transaction_id: internalId,
      provider_transaction_id: parsed.trxId ?? null,
      // client_id:               2105094,
      // course_id:               "cse_101",
      amount: parsed.amount,
      fee: parsed.fee ?? 0.0,
      currency: "BDT",
      provider: parsed.service.toUpperCase(),
      account_identifier: parsed.from ?? "unknown",
      status: "COMPLETED",
      transaction_type: "PAYMENT",
      processed_at: parseSmsDatetime(parsed.datetime),
    },
  });
}

function parseSmsDatetime(datetimeStr) {
  if (!datetimeStr) return new Date();
  try {
    const [datePart, timePart] = datetimeStr.split(" ");
    const [dd, mm, yyyy] = datePart.split("/");
    return new Date(`${yyyy}-${mm}-${dd}T${timePart}:00`);
  } catch {
    return new Date();
  }
}
