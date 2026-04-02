import { useEffect, useState } from "react";
import { fetchTestCourses } from "../api/api";

function CoursesFromBackend() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();


    async function loadCourses() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchTestCourses(controller.signal);
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load courses");
        }
      } finally {
        setLoading(false);
      }
    }

    loadCourses();

    return () => controller.abort();
  }, []);

  return (
    <section className="courses-panel">
      <header className="courses-header">
        <h1>Backend Course Feed</h1>
        <p>Source: Backend API</p>
      </header>

      {loading && <p className="status-msg">Loading courses...</p>}

      {!loading && error && (
        <p className="status-msg error-msg">Error: {error}</p>
      )}

      {!loading && !error && courses.length === 0 && (
        <p className="status-msg">No courses returned yet.</p>
      )}

      {!loading && !error && courses.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Partner ID</th>
                <th>Instructor</th>
                <th>Language</th>
                <th>Price</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.course_id}>
                  <td>{course.course_id}</td>
                  <td>{course.title || "-"}</td>
                  <td>{course.partner_id || "-"}</td>
                  <td>{course.instructor_name || "-"}</td>
                  <td>{course.language || "-"}</td>
                  <td>{course.price ?? "-"}</td>
                  <td>{course.avg_rating ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default CoursesFromBackend;
