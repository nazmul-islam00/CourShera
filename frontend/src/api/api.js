const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

// Google Auth: Fetch google auth
export async function fetchLoginSuccess() {
  const response = await fetch(`${API_BASE}/auth/login/success`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return response;
}

// CoursesFromBackend fetch
export async function fetchTestCourses(signal) {
  const response = await fetch(`${API_BASE}/test-courses`, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
}

// Initiate a new SSLCommerz payment session.
// Returns { gatewayUrl } on success — caller should redirect there.
export async function initPayment(payload) {
  const response = await fetch(`${API_BASE}/payment/init`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return { response, data };
}

// InProgressCourses fetch
export async function fetchInProgressCourses(signal) {
  const response = await fetch(`${API_BASE}/courses/in-progress`, {
    credentials: "include",
    signal,
  });
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Please log in to view your courses.");
    }
    throw new Error("Failed to fetch courses.");
  }
  return await response.json();
}

// PopularCoursesHome fetch
export async function fetchPopularCourses(signal) {
  const response = await fetch(`${API_BASE}/courses/popular`, { signal });
  if (!response.ok) {
    throw new Error(`Could not load courses (${response.status})`);
  }
  return await response.json();
}

export async function fetchCategories(signal) {
  const response = await fetch(`${API_BASE}/courses/categories`, { signal });
  if (!response.ok) {
    throw new Error(`Could not load categories (${response.status})`);
  }
  return await response.json();
}

export async function fetchCategoryCourses(categoryId, signal) {
  const response = await fetch(`${API_BASE}/courses/category/${categoryId}`, {
    signal,
  });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Category not found.");
    }
    throw new Error(`Could not load category courses (${response.status})`);
  }
  return await response.json();
}

// CourseOutlinePage fetches
export async function fetchCourseFromFallbackList(courseId, signal) {
  const response = await fetch(`${API_BASE}/test-courses`, { signal });
  if (!response.ok) {
    throw new Error(`Could not load courses (${response.status})`);
  }
  const list = await response.json();
  if (!Array.isArray(list) || list.length === 0) {
    return null;
  }
  return (
    list.find((course) => String(course.course_id) === String(courseId)) ||
    list[0]
  );
}

export async function fetchCourseDetail(courseId, signal) {
  try {
    const response = await fetch(`${API_BASE}/courses/${courseId}`, { signal });
    if (response.ok) {
      return await response.json();
    }
    if (response.status !== 404) {
      throw new Error(`Could not load course details (${response.status})`);
    }
  } catch (error) {
    if (error.name === "AbortError") throw error;
  }
  return fetchCourseFromFallbackList(courseId, signal);
}

export async function loginLocal(payload) {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return { response, data };
}

export async function registerLocal(payload) {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return { response, data };
}

export const fetchUserProfile = async () => {
  const response = await fetch(`${API_BASE}/me`, {
    credentials: "include",
  });
  if (response.status === 401) throw new Error("Unauthorized");
  if (!response.ok) throw new Error("Failed to fetch profile data.");
  return response.json();
};

export const updateUserProfile = async (submitData) => {
  const response = await fetch(`${API_BASE}/me`, {
    method: "POST",
    credentials: "include",
    body: submitData,
  });
  if (!response.ok) throw new Error("Failed to update profile.");
  return response.json();
};

export const fetchSavedCards = async () => {
  const response = await fetch(`${API_BASE}/me/saved-cards`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to fetch cards.");
  return response.json();
};

export const addSavedCard = async (payload) => {
  const response = await fetch(`${API_BASE}/me/saved-cards`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to add card.");
  return response.json();
};

export const deleteSavedCard = async (cardId) => {
  const response = await fetch(`${API_BASE}/me/saved-cards/${cardId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to delete card.");
  return response.json();
};

export const fetchRecommendedCourses = async (signal) => {
  const response = await fetch(`${API_BASE}/courses/recommendations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    signal: signal,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recommended courses");
  }

  return response.json();
};

export const fetchMyLearning = async signal => {
  const response = await fetch(`${API_BASE}/me/my-learning`, {
    signal,
    credentials: "include"
  })
  if (!response.ok) throw new Error("Failed to fettch my learning data");
  return response.json();
}

// Search courses by title substring
export async function fetchSearchCourses(query, signal) {
  const url = `${API_BASE}/courses/search?q=${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Could not search courses (${response.status})`);
  }
  return await response.json();
}