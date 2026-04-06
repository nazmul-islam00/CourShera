import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import passport from "passport";

import "./passport.js";
import authRoute from "./routes/auth.js";
import coursesRoute from "./routes/courses.js";
import paymentRoute from "./routes/payment.js";
import meRoute from "./routes/me.js";
import prisma from "./db.js";
import cookieParser from "cookie-parser";

// import { parseSms } from "./smsParser.js";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();
app.enable("trust proxy");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);

const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());


app.use(
  cookieSession({
    name: "courshera_session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    httpOnly: true,
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
app.use("/me", meRoute);
app.listen(process.env.PORT, () => {
  console.log(`Server has started running on port ${process.env.PORT}`);
});

app.get("/debug-env", (req, res) => {
  res.json({
    db_url_exists: process.env.CLIENT_URL
  });
});

app.get("/test-courses", async (req, res) => {
  const courses = await prisma.courses.findMany();
  res.json(courses);
});

app.get("/courses/:courseId", async (req, res) => {
  try {
    const course = await prisma.courses.findUnique({
      where: { course_id: req.params.courseId },
      include: {
        partners: true,
        categories: true,
        reviews: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const totalReviews = course.reviews.length;
    const avgRating =
      totalReviews > 0
        ? course.reviews.reduce((acc, rev) => acc + Number(rev.rating), 0) / totalReviews
        : 0;

    const normalizedCourse = {
      ...course,
      id: course.course_id, 
      partner: course.partners ? course.partners.name : "Coursera Partner",
      category: course.categories ? course.categories.name : "General",
      avg_rating: avgRating.toFixed(1),
      rating: Number(avgRating.toFixed(1)),
      reviews_count: totalReviews,
      enrollment_count: course._count.enrollments,
    };

    res.json(normalizedCourse);
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ error: error.message });
  }
});
