export const FALLBACK_OUTLINE = {
  tagline:
    "In the first course of the Deep Learning Specialization, you will study the foundational concept of neural networks and deep learning.",
  reviewCount: 120654,
  durationHours: 29,
  learningOutcomes: [
    "Build and train deep neural networks, implement vectorized neural networks, identify architecture parameters, and apply DL to your applications",
    "Use best practices to train and develop test sets and analyze bias/variance for building DL applications, use standard NN techniques, apply optimization algorithms, and implement a neural network in TensorFlow",
    "Build a Convolutional Neural Network, apply it to visual detection and recognition tasks, use neural style transfer to generate art, and apply these algorithms to image, video, and other 2D/3D data",
    "Build and train Recurrent Neural Networks and its variants (GRU, LSTM), apply RNNs to character-level language modeling, work with NLP and Word Embeddings, and use HuggingFace tokenizers and transformers",
  ],
  skills: [
    "Deep Learning",
    "Artificial Neural Network",
    "Backpropagation",
    "Python Programming",
    "Neural Network Architecture",
    "Tensorflow",
    "Machine Learning",
  ],
  instructor: {
    imageUrl:
      "https://images.unsplash.com/photo-1758875569897-5e214ccc4e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnN0cnVjdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY4OTI2MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "CEO/Founder Landing AI; Co-founder, Coursera",
    organization: "DeepLearning.AI",
    bio: "Andrew Ng is a globally recognized leader in AI. He is Founder of DeepLearning.AI, Founder and CEO of Landing AI, General Partner at AI Fund, Chairman and Co-Founder of Coursera, and an Adjunct Professor at Stanford University.",
    rating: 4.9,
    reviewCount: 345678,
    studentCount: 4234567,
    courseCount: 25,
  },
  modules: [
    {
      id: 1,
      title: "Introduction to Deep Learning",
      duration: "4 hours",
      description:
        "Understand the major trends driving the rise of deep learning, and give examples of where and how it is applied today.",
      items: [
        { type: "video", title: "Welcome", duration: "1 min" },
        {
          type: "video",
          title: "What is a Neural Network?",
          duration: "5 min",
        },
        {
          type: "video",
          title: "Supervised Learning with Neural Networks",
          duration: "7 min",
        },
        {
          type: "video",
          title: "Why is Deep Learning Taking Off?",
          duration: "6 min",
        },
        { type: "reading", title: "About this Course", duration: "10 min" },
        {
          type: "quiz",
          title: "Introduction to Deep Learning",
          duration: "30 min",
        },
      ],
    },
    {
      id: 2,
      title: "Neural Networks Basics",
      duration: "8 hours",
      description:
        "Learn to set up a machine learning problem with a neural network mindset. Learn to use vectorization to speed up your models.",
      items: [
        { type: "video", title: "Binary Classification", duration: "8 min" },
        { type: "video", title: "Logistic Regression", duration: "7 min" },
        {
          type: "video",
          title: "Logistic Regression Cost Function",
          duration: "6 min",
        },
        { type: "video", title: "Gradient Descent", duration: "5 min" },
        { type: "video", title: "Derivatives", duration: "4 min" },
        { type: "video", title: "Computation Graph", duration: "5 min" },
        { type: "video", title: "Vectorization", duration: "8 min" },
        {
          type: "reading",
          title: "Python and Vectorization",
          duration: "10 min",
        },
        { type: "quiz", title: "Neural Networks Basics", duration: "30 min" },
      ],
    },
    {
      id: 3,
      title: "Shallow Neural Networks",
      duration: "7 hours",
      description:
        "Learn to build a neural network with one hidden layer, using forward propagation and backpropagation.",
      items: [
        {
          type: "video",
          title: "Neural Networks Overview",
          duration: "5 min",
        },
        {
          type: "video",
          title: "Neural Network Representation",
          duration: "6 min",
        },
        {
          type: "video",
          title: "Computing a Neural Network Output",
          duration: "7 min",
        },
        {
          type: "video",
          title: "Vectorizing Across Multiple Examples",
          duration: "8 min",
        },
        { type: "video", title: "Activation Functions", duration: "9 min" },
        {
          type: "video",
          title: "Gradient Descent for Neural Networks",
          duration: "7 min",
        },
        {
          type: "reading",
          title: "Shallow Neural Networks",
          duration: "10 min",
        },
        { type: "quiz", title: "Shallow Neural Networks", duration: "30 min" },
      ],
    },
    {
      id: 4,
      title: "Deep Neural Networks",
      duration: "10 hours",
      description:
        "Understand the key computations underlying deep learning, use them to build and train deep neural networks, and apply it to computer vision.",
      items: [
        {
          type: "video",
          title: "Deep L-layer Neural Network",
          duration: "5 min",
        },
        {
          type: "video",
          title: "Forward Propagation in a Deep Network",
          duration: "7 min",
        },
        {
          type: "video",
          title: "Getting Your Matrix Dimensions Right",
          duration: "6 min",
        },
        {
          type: "video",
          title: "Why Deep Representations?",
          duration: "5 min",
        },
        {
          type: "video",
          title: "Building Blocks of Deep Neural Networks",
          duration: "8 min",
        },
        {
          type: "video",
          title: "Forward and Backward Propagation",
          duration: "7 min",
        },
        {
          type: "video",
          title: "Parameters vs Hyperparameters",
          duration: "5 min",
        },
        {
          type: "reading",
          title: "Deep Neural Networks",
          duration: "10 min",
        },
        { type: "quiz", title: "Deep Neural Networks", duration: "30 min" },
      ],
    },
  ],
};

const toNumber = (value, fallback = 0) => {
  const next = Number(value);
  return Number.isFinite(next) ? next : fallback;
};

export function buildOutlineModel(course) {
  if (!course) {
    return null;
  }

  return {
    courseId: course.course_id,
    title: course.title || "Untitled Course",
    tagline: course.course_tagline || FALLBACK_OUTLINE.tagline,
    description:
      course.description ||
      "No course description available for this course yet.",
    avgRating: toNumber(course.avg_rating, 0),
    reviewCount: toNumber(course.review_count, FALLBACK_OUTLINE.reviewCount),
    enrolmentCount: toNumber(course.enrolment_count, 0),
    instructorName: course.instructor_name || "Course Instructor",
    durationHours: toNumber(
      course.course_duration_hours,
      FALLBACK_OUTLINE.durationHours,
    ),
    difficulty: course.difficulty || "Beginner",
    language: course.language || "English",
    price: course.price ?? "Free",
    learningOutcomes:
      Array.isArray(course.learning_outcomes) && course.learning_outcomes.length > 0
        ? course.learning_outcomes
        : FALLBACK_OUTLINE.learningOutcomes,
    skills:
      Array.isArray(course.skills) && course.skills.length > 0
        ? course.skills
        : FALLBACK_OUTLINE.skills,
    modules:
      Array.isArray(course.curriculum) && course.curriculum.length > 0
        ? course.curriculum
        : FALLBACK_OUTLINE.modules,
    instructor: {
      name: course.instructor_name || "Course Instructor",
      imageUrl:
        course.instructor_image_url || FALLBACK_OUTLINE.instructor.imageUrl,
      title: course.instructor_title || FALLBACK_OUTLINE.instructor.title,
      organization:
        course.instructor_organization || FALLBACK_OUTLINE.instructor.organization,
      bio: course.instructor_bio || FALLBACK_OUTLINE.instructor.bio,
      rating: toNumber(
        course.instructor_rating,
        FALLBACK_OUTLINE.instructor.rating,
      ),
      reviewCount: toNumber(
        course.instructor_review_count,
        FALLBACK_OUTLINE.instructor.reviewCount,
      ),
      studentCount: toNumber(
        course.instructor_student_count,
        FALLBACK_OUTLINE.instructor.studentCount,
      ),
      courseCount: toNumber(
        course.instructor_course_count,
        FALLBACK_OUTLINE.instructor.courseCount,
      ),
    },
  };
}
