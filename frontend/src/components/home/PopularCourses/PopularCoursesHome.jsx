import { useEffect, useState } from "react";

import PopularCourseCard from "./PopularCourseCard";
import "./PopularCourses.css";

const API_URL = `${import.meta.env.VITE_API_URL}/courses/popular`;

const PopularCoursesHome = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCourses() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Could not load courses (${response.status})`);
        }

        const data = await response.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch course list");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
    return () => controller.abort();
  }, []);

  return (
    <div className="home-root">
      <section className="results-title-wrap">
        <div className="container">
          <h2 className="section-title">Popular Courses</h2>
        </div>
      </section>

      <main className="container cards-section">
        {loading && <p className="home-status">Loading popular courses...</p>}

        {!loading && error && (
          <p className="home-status home-status-error">{error}</p>
        )}

        {!loading && !error && courses.length === 0 && (
          <p className="home-status">No courses available yet.</p>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="popular-grid">
            {courses.map((course, index) => (
              <PopularCourseCard
                key={course.course_id || index}
                course={course}
                index={index}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default PopularCoursesHome;
