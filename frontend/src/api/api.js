const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

// Google Auth: Fetch google auth
export async function fetchLoginSuccess() {
  const response = await fetch(`${API_BASE}/regauth/login/success`, {
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

// Checkout payment
export async function postPayment(payload) {
  const response = await fetch(`${API_BASE}/payment`, {
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
  return list.find((course) => String(course.course_id) === String(courseId)) || list[0];
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
