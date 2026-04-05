export const QUIZ_STORAGE_KEY = "courshera_quiz_attempts_v3";
export const QUIZ_DRAFT_KEY = "courshera_quiz_drafts_v3";

export const quizCatalog = {
  "practice-supervised-vs-unsupervised": {
    id: "practice-supervised-vs-unsupervised",
    courseSlug: "ml-specialization",
    courseTitle: "Supervised Machine Learning: Regression and Classification",
    provider: "DeepLearning.AI",
    specialization: "Machine Learning Specialization",
    title: "Practice quiz: Supervised vs unsupervised learning",
    subtitle: "Graded Assignment • 15 min",
    dueText: "Mar 27, 11:59 PM PDT",
    weekLabel: "Week 1",
    sectionTitle: "Supervised vs. Unsupervised Machine Learning",
    passPercent: 70,
    nextItemLabel: "Next item",
    learningItemsText: "0/3 learning items",
    difficulty: "Beginner",
    estimatedTime: "15 min",
    attemptsAllowed: "Unlimited",
    outline: [
      {
        title: "Overview of Machine Learning",
        items: [
          { label: "Welcome to machine learning!", meta: "Video • 2 min", done: true },
          { label: "Applications of machine learning", meta: "Video • 4 min", done: true },
          { label: "Intake Survey", meta: "Ungraded App Item • 1 min", done: true },
          { label: "Join the DeepLearning.AI Forum", meta: "Reading • 2 min", done: false },
        ],
      },
      {
        title: "Supervised vs. Unsupervised Machine Learning",
        items: [
          { label: "What is machine learning?", meta: "Video • 5 min", done: true },
          { label: "Supervised learning part 1", meta: "Video • 6 min", done: true },
          {
            label: "Practice quiz: Supervised vs unsupervised learning",
            meta: "Graded Assignment • 15 min",
            done: false,
            active: true,
          },
        ],
      },
    ],
    questions: [
      {
        id: "q1",
        type: "multi",
        points: 1,
        prompt: "Which are the two common types of supervised learning? (Choose two)",
        options: [
          { id: "q1o1", label: "Clustering", isCorrect: false },
          { id: "q1o2", label: "Classification", isCorrect: true },
          { id: "q1o3", label: "Regression", isCorrect: true },
        ],
        explanation:
          "Classification predicts from among a limited set of categories, while regression predicts a number from potentially infinitely possible numbers.",
      },
      {
        id: "q2",
        type: "single",
        points: 1,
        prompt: "Which of these is a type of unsupervised learning?",
        options: [
          { id: "q2o1", label: "Clustering", isCorrect: true },
          { id: "q2o2", label: "Classification", isCorrect: false },
          { id: "q2o3", label: "Regression", isCorrect: false },
        ],
        explanation:
          "Clustering groups data into groups or clusters based on how similar each item is to each other.",
      },
      {
        id: "q3",
        type: "single",
        points: 1,
        prompt: "A housing-price prediction model is an example of which type of learning problem?",
        options: [
          { id: "q3o1", label: "Regression", isCorrect: true },
          { id: "q3o2", label: "Classification", isCorrect: false },
          { id: "q3o3", label: "Clustering", isCorrect: false },
        ],
        explanation: "Predicting a numeric value such as price is a regression problem.",
      },
      {
        id: "q4",
        type: "single",
        points: 1,
        prompt: "A spam email detector that marks emails as spam or not spam is an example of:",
        options: [
          { id: "q4o1", label: "Regression", isCorrect: false },
          { id: "q4o2", label: "Classification", isCorrect: true },
          { id: "q4o3", label: "Clustering", isCorrect: false },
        ],
        explanation:
          "Spam detection predicts a category label, so it is a classification problem.",
      },
      {
        id: "q5",
        type: "multi",
        points: 1,
        prompt: "Which statements about clustering are true? (Choose two)",
        options: [
          { id: "q5o1", label: "It is an unsupervised learning technique", isCorrect: true },
          { id: "q5o2", label: "It requires labeled output values", isCorrect: false },
          { id: "q5o3", label: "It can group similar customers together", isCorrect: true },
        ],
        explanation:
          "Clustering is unsupervised and is often used to group similar data points such as customers or patients.",
      },
    ],
  },

  "practice-neural-network-basics": {
    id: "practice-neural-network-basics",
    courseSlug: "deep-learning-fundamentals",
    courseTitle: "Neural Networks and Deep Learning",
    provider: "DeepLearning.AI",
    specialization: "Deep Learning Specialization",
    title: "Practice quiz: Neural network basics",
    subtitle: "Graded Assignment • 20 min",
    dueText: "Apr 2, 11:59 PM PDT",
    weekLabel: "Week 2",
    sectionTitle: "Introduction to Neural Networks",
    passPercent: 70,
    nextItemLabel: "Next item",
    learningItemsText: "1/4 learning items",
    difficulty: "Beginner",
    estimatedTime: "20 min",
    attemptsAllowed: "Unlimited",
    outline: [
      {
        title: "Neural Network Foundations",
        items: [
          { label: "What is a neural network?", meta: "Video • 8 min", done: true },
          { label: "Logistic regression recap", meta: "Reading • 5 min", done: true },
          { label: "Practice quiz: Neural network basics", meta: "Graded Assignment • 20 min", active: true, done: false },
        ],
      },
    ],
    questions: [
      {
        id: "q1",
        type: "single",
        points: 1,
        prompt: "In a binary classification problem, logistic regression outputs:",
        options: [
          { id: "a", label: "A probability between 0 and 1", isCorrect: true },
          { id: "b", label: "A cluster ID", isCorrect: false },
          { id: "c", label: "A continuous unbounded score only", isCorrect: false },
        ],
        explanation: "The sigmoid function maps values to probabilities between 0 and 1.",
      },
      {
        id: "q2",
        type: "single",
        points: 1,
        prompt: "A neuron typically computes:",
        options: [
          { id: "a", label: "Weighted sum + activation", isCorrect: true },
          { id: "b", label: "Only a mean of inputs", isCorrect: false },
          { id: "c", label: "Only a threshold with no weights", isCorrect: false },
        ],
        explanation: "A neuron usually takes a weighted sum of inputs and then applies an activation function.",
      },
      {
        id: "q3",
        type: "multi",
        points: 1,
        prompt: "Which are common activation functions? (Choose two)",
        options: [
          { id: "a", label: "ReLU", isCorrect: true },
          { id: "b", label: "Sigmoid", isCorrect: true },
          { id: "c", label: "K-means", isCorrect: false },
        ],
        explanation: "ReLU and Sigmoid are activation functions; K-means is a clustering algorithm.",
      },
      {
        id: "q4",
        type: "single",
        points: 1,
        prompt: "What does the training process mainly optimize?",
        options: [
          { id: "a", label: "The cost/loss function", isCorrect: true },
          { id: "b", label: "The number of labels", isCorrect: false },
          { id: "c", label: "The input dimensions only", isCorrect: false },
        ],
        explanation: "Training adjusts parameters to minimize a loss or cost function.",
      },
    ],
  },

  "practice-sql-joins-and-aggregations": {
    id: "practice-sql-joins-and-aggregations",
    courseSlug: "database-systems",
    courseTitle: "SQL for Data Analysis",
    provider: "Meta",
    specialization: "Data Analyst Professional Certificate",
    title: "Practice quiz: SQL joins and aggregations",
    subtitle: "Graded Assignment • 18 min",
    dueText: "Apr 7, 11:59 PM PDT",
    weekLabel: "Week 3",
    sectionTitle: "Advanced SQL Queries",
    passPercent: 70,
    nextItemLabel: "Next item",
    learningItemsText: "2/5 learning items",
    difficulty: "Intermediate",
    estimatedTime: "18 min",
    attemptsAllowed: "Unlimited",
    outline: [
      {
        title: "Working with Multiple Tables",
        items: [
          { label: "INNER JOIN explained", meta: "Video • 6 min", done: true },
          { label: "GROUP BY and HAVING", meta: "Reading • 7 min", done: true },
          { label: "Practice quiz: SQL joins and aggregations", meta: "Graded Assignment • 18 min", active: true, done: false },
        ],
      },
    ],
    questions: [
      {
        id: "q1",
        type: "single",
        points: 1,
        prompt: "Which JOIN returns only matching rows from both tables?",
        options: [
          { id: "a", label: "INNER JOIN", isCorrect: true },
          { id: "b", label: "LEFT JOIN", isCorrect: false },
          { id: "c", label: "FULL OUTER JOIN", isCorrect: false },
        ],
        explanation: "INNER JOIN returns only rows with matches on both sides.",
      },
      {
        id: "q2",
        type: "single",
        points: 1,
        prompt: "Which clause is used to filter grouped results?",
        options: [
          { id: "a", label: "HAVING", isCorrect: true },
          { id: "b", label: "WHERE only", isCorrect: false },
          { id: "c", label: "ORDER BY", isCorrect: false },
        ],
        explanation: "HAVING filters groups after aggregation.",
      },
      {
        id: "q3",
        type: "multi",
        points: 1,
        prompt: "Which are aggregate functions? (Choose two)",
        options: [
          { id: "a", label: "COUNT()", isCorrect: true },
          { id: "b", label: "AVG()", isCorrect: true },
          { id: "c", label: "JOIN()", isCorrect: false },
        ],
        explanation: "COUNT and AVG are aggregate functions.",
      },
      {
        id: "q4",
        type: "single",
        points: 1,
        prompt: "LEFT JOIN keeps:",
        options: [
          { id: "a", label: "All rows from the left table", isCorrect: true },
          { id: "b", label: "Only matching rows", isCorrect: false },
          { id: "c", label: "All rows from the right table", isCorrect: false },
        ],
        explanation: "LEFT JOIN preserves all rows from the left table.",
      },
    ],
  },

  "practice-css-layouts-and-flexbox": {
    id: "practice-css-layouts-and-flexbox",
    courseSlug: "frontend-fundamentals",
    courseTitle: "Modern HTML and CSS",
    provider: "Google",
    specialization: "UX Design Professional Certificate",
    title: "Practice quiz: CSS layouts and Flexbox",
    subtitle: "Graded Assignment • 12 min",
    dueText: "Apr 10, 11:59 PM PDT",
    weekLabel: "Week 2",
    sectionTitle: "Responsive Layouts",
    passPercent: 70,
    nextItemLabel: "Next item",
    learningItemsText: "1/3 learning items",
    difficulty: "Beginner",
    estimatedTime: "12 min",
    attemptsAllowed: "Unlimited",
    outline: [
      {
        title: "CSS Layout Systems",
        items: [
          { label: "Block vs inline elements", meta: "Video • 5 min", done: true },
          { label: "Flexbox fundamentals", meta: "Video • 9 min", done: true },
          { label: "Practice quiz: CSS layouts and Flexbox", meta: "Graded Assignment • 12 min", active: true, done: false },
        ],
      },
    ],
    questions: [
      {
        id: "q1",
        type: "single",
        points: 1,
        prompt: "Which CSS property makes a container a flex container?",
        options: [
          { id: "a", label: "display: flex", isCorrect: true },
          { id: "b", label: "position: flex", isCorrect: false },
          { id: "c", label: "layout: flex", isCorrect: false },
        ],
        explanation: "display: flex turns an element into a flex container.",
      },
      {
        id: "q2",
        type: "single",
        points: 1,
        prompt: "Which property aligns items on the main axis?",
        options: [
          { id: "a", label: "justify-content", isCorrect: true },
          { id: "b", label: "align-items", isCorrect: false },
          { id: "c", label: "gap", isCorrect: false },
        ],
        explanation: "justify-content controls distribution along the main axis.",
      },
      {
        id: "q3",
        type: "multi",
        points: 1,
        prompt: "Which are valid Flexbox concepts? (Choose two)",
        options: [
          { id: "a", label: "main axis", isCorrect: true },
          { id: "b", label: "cross axis", isCorrect: true },
          { id: "c", label: "query axis", isCorrect: false },
        ],
        explanation: "Flexbox uses the main axis and cross axis to describe layout directions.",
      },
    ],
  },
};

export const courseCatalog = [
  {
    id: "ml-specialization",
    title: "Machine Learning Specialization",
    provider: "DeepLearning.AI",
    level: "Beginner",
    quizzes: ["practice-supervised-vs-unsupervised"],
  },
  {
    id: "deep-learning-fundamentals",
    title: "Deep Learning Specialization",
    provider: "DeepLearning.AI",
    level: "Beginner",
    quizzes: ["practice-neural-network-basics"],
  },
  {
    id: "database-systems",
    title: "Data Analyst Professional Certificate",
    provider: "Meta",
    level: "Intermediate",
    quizzes: ["practice-sql-joins-and-aggregations"],
  },
  {
    id: "frontend-fundamentals",
    title: "UX Design Professional Certificate",
    provider: "Google",
    level: "Beginner",
    quizzes: ["practice-css-layouts-and-flexbox"],
  },
];

export function getQuizById(quizId) {
  return quizCatalog[quizId] || null;
}

export function getAllQuizzes() {
  return Object.values(quizCatalog);
}

export function getQuizzesByCourseSlug(courseSlug) {
  return Object.values(quizCatalog).filter((quiz) => quiz.courseSlug === courseSlug);
}

export function formatAttemptDate(timestamp) {
  return new Date(timestamp).toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function loadAttempts() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveAttempt(quizId, attempt) {
  const allAttempts = loadAttempts();
  const quizAttempts = allAttempts[quizId] || [];
  quizAttempts.unshift(attempt);
  allAttempts[quizId] = quizAttempts;
  localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(allAttempts));
}

export function getAttemptsByQuizId(quizId) {
  const allAttempts = loadAttempts();
  return allAttempts[quizId] || [];
}

export function getLatestAttempt(quizId) {
  return getAttemptsByQuizId(quizId)[0] || null;
}

export function getBestAttempt(quizId) {
  const attempts = getAttemptsByQuizId(quizId);
  if (!attempts.length) return null;
  return attempts.reduce((best, current) =>
    current.result.percent > best.result.percent ? current : best
  );
}

export function loadDrafts() {
  try {
    return JSON.parse(localStorage.getItem(QUIZ_DRAFT_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveDraft(quizId, draft) {
  const drafts = loadDrafts();
  drafts[quizId] = draft;
  localStorage.setItem(QUIZ_DRAFT_KEY, JSON.stringify(drafts));
}

export function getDraft(quizId) {
  const drafts = loadDrafts();
  return drafts[quizId] || null;
}

export function clearDraft(quizId) {
  const drafts = loadDrafts();
  delete drafts[quizId];
  localStorage.setItem(QUIZ_DRAFT_KEY, JSON.stringify(drafts));
}

export function evaluateQuiz(quiz, answers) {
  let earned = 0;

  const evaluatedQuestions = quiz.questions.map((question) => {
    const submittedAnswer = answers[question.id];

    if (question.type === "single") {
      const correctOption = question.options.find((option) => option.isCorrect);
      const isCorrect = submittedAnswer === correctOption?.id;
      if (isCorrect) earned += question.points;

      return {
        ...question,
        submittedAnswer,
        isCorrect,
        correctAnswers: correctOption ? [correctOption.id] : [],
      };
    }

    const selected = Array.isArray(submittedAnswer) ? submittedAnswer : [];
    const correctAnswers = question.options
      .filter((option) => option.isCorrect)
      .map((option) => option.id)
      .sort();

    const submittedSorted = [...selected].sort();
    const isCorrect =
      JSON.stringify(correctAnswers) === JSON.stringify(submittedSorted);

    if (isCorrect) earned += question.points;

    return {
      ...question,
      submittedAnswer: selected,
      isCorrect,
      correctAnswers,
    };
  });

  const total = quiz.questions.reduce((sum, question) => sum + question.points, 0);
  const percent = Math.round((earned / total) * 100);

  return {
    earned,
    total,
    percent,
    evaluatedQuestions,
    passed: percent >= quiz.passPercent,
  };
}