import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/checkout/CheckoutContext";
import HomeHeader from "./HomeHeader";
import PopularCourseCard from "./PopularCourseCard";

const API_URL = `${import.meta.env.VITE_API_URL}/test-courses`;

const CSE_101 = {
  courseId: "cse_101",
  title: "Introduction to Computer Science",
  price: 1,
  currency: "BDT",
};

const PopularCoursesHome = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCourseForCheckout } = useCheckout();

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

  const handleBuyCse101 = () => {
    setCourseForCheckout(CSE_101);
    navigate("/checkout");
  };

  return (
    /*debug purposes*/
    <div className="home-root">
      <section className="featured-course-banner">
        <div className="container featured-inner">
          <div className="featured-text">
            <span className="featured-label">Featured Course</span>
            <h2>{CSE_101.title}</h2>
            <p>Start your journey into Computer Science. Beginner-friendly · English · {CSE_101.price}</p>
          </div>
          <button className="featured-buy-btn" onClick={handleBuyCse101}>
            Buy Now — {CSE_101.price}
          </button>
        </div>
      </section>

      <section className="results-title-wrap">
        <div className="container">
          <h1>Popular Courses</h1>
          <p>Showing all courses from backend endpoint: {API_URL}</p>
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
}

export default PopularCoursesHome;
