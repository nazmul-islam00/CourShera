import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";

import "./passport.js";
import authRoute from "./routes/auth.js";
import prisma from "./db.js";

import { parseSms } from "./smsParser.js";

const app = express();

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
    maxAge: 7 * 24 * 60 * 50 * 1000,
    secure: false,
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

app.listen(process.env.PORT, () => {
  console.log(`Server has started running on port ${process.env.PORT}`);
});

// Eikhane route add korbi
// module wise organize koirish

app.get("/test-courses", async (req, res) => {
  const courses = await prisma.courses.findMany();
  res.json(courses);
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

app.post("/sms-webhook", (req, res) => {
  const { sender, body, timestamp } = req.body;
 
  const parsed = parseSms(sender, body);
 
  const time = timestamp
    ? new Date(timestamp).toLocaleString()
    : new Date().toLocaleString();
 
  console.log("─".repeat(50));
  console.log(`   Payment received via ${parsed.service} at ${time}`);
  console.log(`   Amount  : Tk ${parsed.amount}`);
  console.log(`   Fee     : Tk ${parsed.fee}`);
  console.log(`   Balance : Tk ${parsed.balance}`);
  console.log(`   From    : ${parsed.from}`);
  console.log(`   TrxID   : ${parsed.trxId}`);
  console.log(`   Date    : ${parsed.datetime}`);
  console.log("─".repeat(50));
 
  res.status(200).json({ success: true, parsed });
});
