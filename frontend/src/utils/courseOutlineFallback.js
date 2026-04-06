export const FALLBACK_OUTLINE = {
  tagline: "In this course, you will study foundational concepts and industry-standard practices.",
  reviewCount: 0,
  durationHours: 20,
  learningOutcomes: ["Master core concepts", "Apply theory to real-world projects", "Build a professional portfolio"],
  skills: ["Critical Thinking", "Problem Solving"],
  instructor: {
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    title: "Senior Instructor",
    organization: "Partner University",
    bio: "An industry expert with years of experience in the field.",
    rating: 4.8,
    reviewCount: 1200,
    studentCount: 15000,
    courseCount: 5,
  }
};

const toNumber = (value, fallback = 0) => {
  const next = Number(value);
  return Number.isFinite(next) ? next : fallback;
};

export function buildOutlineModel(course) {
  if (!course) return null;

  const rawCurriculum = Array.isArray(course.curriculum) ? course.curriculum : [];

  const normalizedModules = rawCurriculum.map((module) => ({
    id: module.id || module.module_id,
    title: module.title || "Untitled Module",
    items: Array.isArray(module.items) ? module.items : [],
    duration: module.duration || "",
    description: module.description || "",
  }));

  return {
    courseId: course.course_id || course.id,
    title: course.title || "Untitled Course",
    tagline: course.course_tagline || course.tagline || FALLBACK_OUTLINE.tagline,
    description: course.description || "No description available.",
    
    avgRating: toNumber(course.avg_rating || course.rating, 0),
    reviewCount: toNumber(course.reviews_count || course.reviews, 0),
    enrollmentCount: toNumber(course.enrollment_count, 0), // Removed 'u' to match backend
    
    instructorName: course.partner || course.instructor_name || "Course Instructor",
    durationHours: toNumber(course.course_duration_hours || course.duration_hours, FALLBACK_OUTLINE.durationHours),
    difficulty: course.difficulty || "Beginner",
    language: course.language || "English",
    price: course.price ?? 0,
    
    learningOutcomes: Array.isArray(course.learning_outcomes) ? course.learning_outcomes : FALLBACK_OUTLINE.learningOutcomes,
    skills: Array.isArray(course.skills) ? course.skills : FALLBACK_OUTLINE.skills,
    modules: normalizedModules.length > 0 ? normalizedModules : FALLBACK_OUTLINE.modules,
    
    instructor: {
      name: course.instructor_name || course.partner || "Instructor",
      imageUrl: course.instructor_image_url || FALLBACK_OUTLINE.instructor.imageUrl,
      title: course.instructor_title || FALLBACK_OUTLINE.instructor.title,
      organization: course.instructor_organization || course.partner || FALLBACK_OUTLINE.instructor.organization,
      bio: course.instructor_bio || FALLBACK_OUTLINE.instructor.bio,
      rating: toNumber(course.instructor_rating, FALLBACK_OUTLINE.instructor.rating),
      reviewCount: toNumber(course.instructor_review_count, FALLBACK_OUTLINE.instructor.reviewCount),
      studentCount: toNumber(course.instructor_student_count, FALLBACK_OUTLINE.instructor.studentCount),
      courseCount: toNumber(course.instructor_course_count, FALLBACK_OUTLINE.instructor.courseCount),
    },
  };
}