import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import prisma from "./db.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails?.[0]?.value;
        const photoUrl = profile.photos?.[0]?.value || null;

        if (email) {
          const user = await prisma.clients.upsert({
            where: { email },
            create: {
              email,
              name: profile.displayName ?? null,
              password: "",
              image_url: photoUrl,
              auth_provider: "GOOGLE",
            },
            update: {
              image_url: photoUrl,
            },
          });
          return done(null, user);
        }

        return done(new Error("No email found from Google account"), null);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.clients.findUnique({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        if (!user.password || user.password === "") {
          return done(null, false, {
            message: "Account created with Google. Please log in with Google.",
          });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.client_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.clients.findUnique({ where: { client_id: id } });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
