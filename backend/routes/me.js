import { Router } from "express";
import prisma from "./../db.js";

const router = Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const user = await prisma.clients.findUnique({
      where: { client_id: req.user.client_id },
      select: {
        client_id: true,
        email: true,
        name: true,
        institute: true,
        country: true,
        date_of_birth: true,
        image_url: true,
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  const { name, institute, country, date_of_birth, image_url } = req.body;

  try {
    const updatedUser = await prisma.clients.update({
      where: { client_id: req.user.client_id },
      data: {
        name: name !== undefined ? name : undefined,
        institute: institute !== undefined ? institute : undefined,
        country: country !== undefined ? country : undefined,
        image_url: image_url !== undefined ? image_url : undefined,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        updated_at: new Date(),
      },
      select: {
        client_id: true,
        email: true,
        name: true,
        institute: true,
        country: true,
        date_of_birth: true,
        image_url: true,
      },
    });

    res.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
