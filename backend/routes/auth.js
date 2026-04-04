import { Router } from "express";
import passport from "passport";
import bcrypt from "bcrypt";
import prisma from "./../db.js";

const router = Router();

router.get("/login/success", (req, res) => {
  res.set("Cache-Control", "no-store");

  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session = null;
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: process.env.CLIENT_URL,
  }),
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ success: false, message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ success: true, user });
    });
  })(req, res, next);
});

router.post("/register", async (req, res, next) => {
  const { email, password, name } = req.body;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      success: false, 
      message: "Password must be at least 8 characters long and contain at least one letter and one number." 
    });
  }
  try {
    const existingUser = await prisma.clients.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.clients.create({
      data: {
        email,
        name,
        password: hashedPassword,
        auth_provider: "LOCAL",
      },
    });

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.status(201).json({ success: true, user: newUser });
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
