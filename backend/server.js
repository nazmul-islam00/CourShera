import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";

import "./passport.js";
import authRoute from "./routes/auth.js";
import prisma from "./db.js";

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
