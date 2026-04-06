import { Router } from "express";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";
import prisma from "./../db.js";

const router = Router();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const upload = multer({ storage: multer.memoryStorage() });

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

router.post("/", isAuthenticated, upload.single("image"), async (req, res) => {
  const { name, institute, country, date_of_birth } = req.body;
  let newImageUrl = undefined;

  try {
    if (req.file) {
      const fileExtension = req.file.originalname.split(".").pop();
      const uniqueFileName = `${req.user.client_id}-${Date.now()}.${fileExtension}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(uniqueFileName, req.file.buffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Failed to upload image to storage.",
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(uniqueFileName);

      newImageUrl = publicUrlData.publicUrl;
    }

    const updatedUser = await prisma.clients.update({
      where: { client_id: req.user.client_id },
      data: {
        name: name !== undefined ? name : undefined,
        institute: institute !== undefined ? institute : undefined,
        country: country !== undefined ? country : undefined,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        ...(newImageUrl && { image_url: newImageUrl }),
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

router.get("/saved-cards", isAuthenticated, async (req, res) => {
  try {
    const cards = await prisma.card_infos.findMany({
      where: { client_id: req.user.client_id },
      select: {
        card_info_id: true,
        card_number: true,
        card_expiration_date: true,
      },
    });
    res.json({ success: true, cards });
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/saved-cards", isAuthenticated, async (req, res) => {
  const { cardNumber, expiryDate, cvc } = req.body;

  try {
    const last4 = cardNumber.slice(-4);
    const maskedNumber = `**** **** **** ${last4}`;

    const newCard = await prisma.card_infos.create({
      data: {
        card_info_id: crypto.randomUUID(),
        client_id: req.user.client_id,
        card_number: maskedNumber,
        card_expiration_date: new Date(expiryDate),
        cvc_number: "***",
      },
    });

    res.json({ success: true, card: newCard, message: "Card added safely!" });
  } catch (error) {
    console.error("Error adding card:", error);
    res.status(500).json({ success: false, message: "Failed to add card" });
  }
});

router.delete("/saved-cards/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.card_infos.deleteMany({
      where: {
        card_info_id: id,
        client_id: req.user.client_id,
      },
    });

    res.json({ success: true, message: "Card removed successfully." });
  } catch (error) {
    console.error("Error deleting card:", error);
    res.status(500).json({ success: false, message: "Failed to delete card" });
  }
});

router.get("/my-learning", isAuthenticated, async (req, res) => {
  try {
    const clientId = req.user?.client_id || req.user?.id;
    if (!clientId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userProgress = await prisma.course_progress.findMany({
      where: {
        client_id: parseInt(clientId, 10),
      },
      include: {
        courses: {
          include: {
            partners: true,
            categories: true,
          },
        },
      },
      orderBy: {
        started_at: "desc",
      },
    });

    const formattedLearning = userProgress.map((progress) => {
      const course = progress.courses;
      return {
        courseId: course.course_id,
        title: course.title,
        partner: course.partners ? course.partners.name : "Coursera Partner",
        partnerLogo: course.partners
          ? course.partners.name.charAt(0).toUpperCase()
          : "C",
        imageUrl:
          course.image_url ||
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80",
        progressPercentage: Number(progress.completion_percentage || 0),
        status: progress.overall_status,
        currentTopic: "Week 1",
      };
    });

    res.status(200).json(formattedLearning);
  } catch (error) {
    console.error("Error fetching my learning:", error);
    res.status(500).json({ error: "Failed to fetch learning data" });
  }
});

router.get("/enrollments", isAuthenticated, async (req, res) => {
  try {
    const clientId = req.user?.client_id || req.user?.id;
    if (!clientId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Get pagination parameters
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 100); // Max 100
    const offset = parseInt(req.query.offset, 10) || 0;

    // Fetch total count of enrollments
    const totalCount = await prisma.enrollments.count({
      where: {
        client_id: parseInt(clientId, 10),
      },
    });

    // Fetch paginated enrollments with course details, ordered by enrolled_at descending
    const enrollments = await prisma.enrollments.findMany({
      where: {
        client_id: parseInt(clientId, 10),
      },
      include: {
        courses: {
          select: {
            course_id: true,
            title: true,
          },
        },
      },
      orderBy: {
        enrolled_at: "desc",
      },
      take: limit,
      skip: offset,
    });

    // Format the response
    const formattedEnrollments = enrollments.map((enrollment) => ({
      enrollment_id: enrollment.enrollment_id,
      course_id: enrollment.course_id,
      course_title: enrollment.courses?.title || "Unknown Course",
      status: enrollment.status,
      enrolled_at: enrollment.enrolled_at,
    }));

    res.json({
      success: true,
      enrollments: formattedEnrollments,
      total: totalCount,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
