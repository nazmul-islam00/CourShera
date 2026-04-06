import { Router } from "express";
import prisma from "../db.js";

const router = Router();

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ success: false, message: "Unauthorized" });
};

const getClientIdFromRequest = (req) => {
  const candidate = req.user?.client_id || req.user?.id;
  const parsed = Number.parseInt(candidate, 10);
  return Number.isInteger(parsed) ? parsed : null;
};

const normalizeCourseModules = (course) => {
  const moduleEntries = Array.isArray(course?.course_module) ? course.course_module : [];

  return moduleEntries
    .map((entry) => entry.modules)
    .filter(Boolean)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((module) => {
      const topicEntries = Array.isArray(module.module_topic) ? module.module_topic : [];

      const topics = topicEntries
        .map((entry) => entry.topics)
        .filter(Boolean)
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((topic) => {
          const contentEntries = Array.isArray(topic.topic_content) ? topic.topic_content : [];

          const contents = contentEntries
            .map((entry) => entry.content_table)
            .filter(Boolean)
            .sort((a, b) => (a.content_id || "").localeCompare(b.content_id || ""))
            .map((content) => ({
              content_id: content.content_id,
              content_url: content.content_url,
              transcript: content.transcript,
            }));

          return {
            topic_id: topic.topic_id,
            title: topic.title,
            contents,
          };
        });

      return {
        module_id: module.module_id,
        title: module.title,
        description: module.description,
        topics,
      };
    });
};

router.get("/:courseId/enrollment-status", async (req, res) => {
  try {
    const clientId = getClientIdFromRequest(req);
    if (!clientId) {
      return res.status(200).json({ enrolled: false });
    }

    const enrollment = await prisma.enrollments.findUnique({
      where: {
        client_id_course_id: {
          client_id: clientId,
          course_id: req.params.courseId,
        },
      },
      select: {
        status: true,
      },
    });

    return res.status(200).json({
      enrolled: enrollment?.status === "ACTIVE",
    });
  } catch (error) {
    console.error("Error checking enrollment status:", error);
    return res.status(500).json({ error: "Failed to check enrollment status" });
  }
});

router.get("/:courseId/content", isAuthenticated, async (req, res) => {
  try {
    const clientId = getClientIdFromRequest(req);
    if (!clientId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const enrollment = await prisma.enrollments.findUnique({
      where: {
        client_id_course_id: {
          client_id: clientId,
          course_id: req.params.courseId,
        },
      },
      select: {
        status: true,
      },
    });

    if (!enrollment || enrollment.status !== "ACTIVE") {
      return res.status(403).json({ error: "You are not enrolled in this course" });
    }

    const course = await prisma.courses.findUnique({
      where: {
        course_id: req.params.courseId,
      },
      select: {
        course_id: true,
        title: true,
        course_module: {
          include: {
            modules: {
              include: {
                module_topic: {
                  include: {
                    topics: {
                      include: {
                        topic_content: {
                          include: {
                            content_table: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const modules = normalizeCourseModules(course);

    return res.status(200).json({
      course_id: course.course_id,
      title: course.title,
      modules,
    });
  } catch (error) {
    console.error("Error fetching enrolled course content:", error);
    return res.status(500).json({ error: "Failed to fetch course content" });
  }
});

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

router.get("/category/:categoryId", async (req, res) => {
  const categoryId = Number(req.params.categoryId);

  if (!Number.isInteger(categoryId)) {
    return res.status(400).json({ error: "Invalid category id" });
  }

  try {
    const category = await prisma.categories.findUnique({
      where: {
        category_id: categoryId,
      },
      select: {
        category_id: true,
        name: true,
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const courses = await prisma.courses.findMany({
      where: {
        category_id: categoryId,
      },
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const normalizedCourses = courses.map((course) => {
      const totalReviews = course.reviews.length;
      const avgRating =
        totalReviews > 0
          ? course.reviews.reduce((acc, rev) => acc + Number(rev.rating), 0) /
            totalReviews
          : 0;

      return {
        ...course,
        avg_rating: avgRating.toFixed(2),
      };
    });

    res.status(200).json({
      category,
      courses: normalizedCourses,
    });
  } catch (error) {
    console.error("Error fetching category courses:", error);
    res.status(500).json({ error: "Failed to fetch category courses" });
  }
});

router.get("/category/:categoryId", async (req, res) => {
  const categoryId = Number(req.params.categoryId);

  if (!Number.isInteger(categoryId)) {
    return res.status(400).json({ error: "Invalid category id" });
  }

  try {
    const category = await prisma.categories.findUnique({
      where: {
        category_id: categoryId,
      },
      select: {
        category_id: true,
        name: true,
      },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    const courses = await prisma.courses.findMany({
      where: {
        category_id: categoryId,
      },
      include: {
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const normalizedCourses = courses.map((course) => {
      const totalReviews = course.reviews.length;
      const avgRating =
        totalReviews > 0
          ? course.reviews.reduce((acc, rev) => acc + Number(rev.rating), 0) /
            totalReviews
          : 0;

      return {
        ...course,
        avg_rating: avgRating.toFixed(2),
      };
    });

    res.status(200).json({
      category,
      courses: normalizedCourses,
    });
  } catch (error) {
    console.error("Error fetching category courses:", error);
    res.status(500).json({ error: "Failed to fetch category courses" });
  }
});

router.get("/in-progress", isAuthenticated, async (req, res) => {
  try {
    const rawClientId = req.user?.client_id || req.user?.id;
    const clientId = parseInt(rawClientId, 10);

    if (!Number.isInteger(clientId)) {
      return res.status(401).json({
        error: "Unauthorized: No user session found",
      });
    }

    const activeEnrollments = await prisma.enrollments.findMany({
      where: {
        client_id: clientId,
        status: "ACTIVE",
      },
      select: {
        course_id: true,
      },
    });

    const activeCourseIds = activeEnrollments.map((enrollment) => enrollment.course_id);

    if (activeCourseIds.length === 0) {
      return res.status(200).json([]);
    }

    const progressRecords = await prisma.course_progress.findMany({
      where: {
        client_id: clientId,
        course_id: { in: activeCourseIds },
        overall_status: { in: ["IN_PROGRESS", "NOT_STARTED"] },
      },
      include: { courses: { include: { partners: true, categories: true } } },
      orderBy: { started_at: "desc" },
    });

    const courses = progressRecords.map((record) => {
      const courseDetails = record.courses;
      const partner = courseDetails?.partners;

      return {
        id: record.course_id,
        partner: partner ? partner.name : "Coursera Partner",
        title: courseDetails?.title || "Unknown Course",
        category: courseDetails?.categories
          ? courseDetails.categories.name
          : "General",
        progress: Number(record.completion_percentage),
        imageUrl:
          courseDetails?.image_url ||
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

router.get("/recommendations", isAuthenticated, async (req, res) => {
  try {
    const clientId = req.user?.client_id || req.user?.id;
    let recommendedCourses = [];
    let enrolledCourseIds = [];

    if (clientId) {
      const enrollments = await prisma.enrollments.findMany({
        where: { client_id: parseInt(clientId, 10), status: "ACTIVE" },
        include: { courses: true },
      });

      enrolledCourseIds = enrollments.map((enrollment) => enrollment.course_id);
      const userSkills = new Set();
      const userCategories = new Set();
      enrollments.forEach((enrollment) => {
        const course = enrollment.courses;
        if (course) {
          if (Array.isArray(course.skills)) {
            course.skills.forEach((skill) => userSkills.add(skill));
          }
          if (course.category_id != null) {
            userCategories.add(course.category_id.toString());
          }
        }
      });

      if (userSkills.size > 0 || userCategories.size > 0) {
        const skillArray = Array.from(userSkills);
        const categoryArray = Array.from(userCategories);
        const potentialMatches = await prisma.courses.findMany({
          where: { course_id: { notIn: enrolledCourseIds } },
          include: {
            partners: true,
            categories: true,
            reviews: { select: { rating: true } },
          },
          take: 50,
        });

        recommendedCourses = potentialMatches
          .filter((course) => {
            const hasMatchingCategory =
              course.category_id != null &&
              categoryArray.includes(course.category_id.toString());
            const hasMatchingSkill =
              Array.isArray(course.skills) &&
              course.skills.some((skill) => skillArray.includes(skill));

            return hasMatchingCategory || hasMatchingSkill;
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
        include: {
          partners: true,
          categories: true,
          reviews: { select: { rating: true } },
        },
        take: 10,
      });
    }

    const formattedRecommendations = recommendedCourses.map((course) => ({
      id: course.course_id,
      partner: course.partners ? course.partners.name : "Coursera Partner",
      title: course.title,
      category: course.categories ? course.categories.name : "General",
      rating: Number(course.avg_rating || 0),
      reviews: course.review_count || 0,
      difficulty: course.difficulty,
      imageUrl:
        course.image_url ||
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
    // console.log("Redirecting to client URL:", `${process.env.CLIENT_URL}/payment/result?status=success&tran_id=`);
    const courses = await prisma.courses.findMany({
      include: {
        partners: true,
        categories: true,
        _count: {
          select: { enrollments: true },
        },
        reviews: {
          select: { rating: true },
        },
      },
      take: 50,
    });

    const popularCourses = courses
      .map((course) => {
        const totalReviews = course.reviews.length;
        const avgRating =
          totalReviews > 0
            ? course.reviews.reduce((acc, rev) => acc + Number(rev.rating), 0) /
              totalReviews
            : 0;

        return {
          ...course,
          enrollment_count: course._count.enrollments,
          avg_rating: avgRating.toFixed(2),
          category: course.categories ? course.categories.name : "General",
        };
      })
      .sort((a, b) => {
        if (b.enrollment_count !== a.enrollment_count) {
          return b.enrollment_count - a.enrollment_count;
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









// Search courses by title substring
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q || typeof q !== "string" || !q.trim()) {
    return res.status(400).json({ error: "Missing or invalid search query" });
  }
  try {
    const courses = await prisma.courses.findMany({
      where: {
        title: {
          contains: q,
          mode: "insensitive"
        }
      }
    });
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;



