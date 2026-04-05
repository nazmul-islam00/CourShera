import { Router } from "express";
import prisma from "../db.js";

const router = Router();

router.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.categories.findMany({
      where: {
        name: {
          not: null,
        },
      },
      select: {
        category_id: true,
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

router.get("/in-progress", async (req, res) => {
  try {
    const clientId = req.user?.id;
    if (!clientId) {
      return res.status(401).json({
        error: "Unauthorized: No user session found",
      });
    }

    const progressRecords = await prisma.course_progress.findMany({
      where: {
        client_id: parseInt(clientId, 10),
        overall_status: "IN_PROGRESS",
      },
      include: { courses: { include: { partners: true } } },
      orderBy: { started_at: "desc" },
    });

    const courses = progressRecords.map((record) => {
      const course = record.course;
      const partner = course.partners;

      return {
        id: record.course_id,
        partner: partner ? partner.name : "Coursera Partner",
        title: course.title,
        type: "Course",
        progress: Number(record.completion_percentage),
        imageUrl:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80",
        partnerLogo: partner ? partner.name.charAt(0).toUpperCase() : "C",
      };
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching in-progress courses", error);
    res.status(500).json({
      error: "Failed to fetch course progress",
    });
  }
});

router.get("/recommendations", async (req, res) => {
  try {
    const clientId = req.user?.id;
    let recommendedCourses = [];
    let enrolledCourseIds = [];

    if (clientId) {
      const enrollments = await prisma.enrollments.findMany({
        where: { client_id: parseInt(clientId, 10), status: "ACTIVE" },
        include: { courses: true },
      });

      enrolledCourseIds = enrollments.map((enrollment) => enrollment.course_id);

      const userSkills = new Set();
      enrollments.forEach((enrollment) => {
        const skills = enrollment.courses?.skills;
        if (Array.isArray(skills)) {
          skills.forEach((skill) => userSkills.add(skill));
        }
      });

      if (userSkills.size > 0) {
        const skillArray = Array.from(userSkills);

        const potentialMatches = await prisma.courses.findMany({
          where: { course_id: { notIn: enrolledCourseIds } },
          include: { partners: true },
          orderBy: { avg_rating: "desc" },
          take: 50,
        });

        recommendedCourses = potentialMatches
          .filter((course) => {
            if (!Array.isArray(course.skills)) return false;
            return course.skills.some((skill) => skillArray.includes(skill));
          })
          .slice(0, 10);
      }
    }

    if (recommendedCourses.length === 0) {
      recommendedCourses = await prisma.courses.findMany({
        where:
          enrolledCourseIds.length > 0
            ? { course_id: { notIn: enrolledCourseIds } }
            : {},
        include: { partners: true },
        orderBy: { avg_rating: "desc" },
        take: 10,
      });
    }

    const formattedRecommendations = recommendedCourses.map((course) => ({
      id: course.course_id,
      partner: course.partners ? course.partners.name : "Coursera Partner",
      title: course.title,
      type: "Course",
      rating: Number(course.avg_rating),
      reviews: course.review_count,
      difficulty: course.difficulty,
      imageUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80",
      partnerLogo: course.partners
        ? course.partners.name.charAt(0).toUpperCase()
        : "C",
    }));

    res.status(200).json(formattedRecommendations);
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({
      error: "Failed to fetch recommended courses",
    });
  }
});

router.get("/popular", async (req, res) => {
  try {
    const courses = await prisma.courses.findMany({
      include: {
        partners: true,
        _count: {
          select: { enrollments: true } 
        },
        reviews: {
          select: { rating: true } 
        }
      },
      take: 50, 
    });

    const popularCourses = courses
      .map(course => {
        const totalReviews = course.reviews.length;
        const avgRating = totalReviews > 0 
          ? course.reviews.reduce((acc, rev) => acc + Number(rev.rating), 0) / totalReviews 
          : 0;

        return {
          ...course,
          enrolment_count: course._count.enrollments,
          avg_rating: avgRating.toFixed(2)
        };
      })
      .sort((a, b) => {
        if (b.enrolment_count !== a.enrolment_count) {
          return b.enrolment_count - a.enrolment_count;
        }
        return b.avg_rating - a.avg_rating;
      })
      .slice(0, 12);

    res.status(200).json(popularCourses);
  } catch (error) {
    console.error("Error fetching popular courses:", error);
    res.status(500).json({ error: "Failed to fetch popular courses" });
  }
});

export default router;
