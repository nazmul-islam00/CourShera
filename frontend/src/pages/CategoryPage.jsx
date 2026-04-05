import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryCourses } from "../api/api";
import PopularCourseCard from "../components/home/PopularCourses/PopularCourseCard";
import "../styles/CategoryPage.css";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("Category");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const loadCategoryCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchCategoryCourses(categoryId, controller.signal);
        setCategoryName(data?.category?.name || "Category");
        setCourses(Array.isArray(data?.courses) ? data.courses : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch category courses");
          setCourses([]);
        }
      } finally {
        setLoading(false);
      }
    };

    loadCategoryCourses();

    return () => controller.abort();
  }, [categoryId]);

  return (
    <div className="category-page-root">
      <section className="results-title-wrap">
        <div className="container category-header-inner">
          <h1>{categoryName}</h1>
          {!loading && !error && (
            <p>{courses.length} course{courses.length === 1 ? "" : "s"} found</p>
          )}
        </div>
      </section>

      <main className="container cards-section category-cards-section">
        {loading && <p className="home-status">Loading courses...</p>}

        {!loading && error && (
          <p className="home-status home-status-error">{error}</p>
        )}

        {!loading && !error && courses.length === 0 && (
          <p className="home-status">No courses found for this category.</p>
        )}

        {!loading && !error && courses.length > 0 && (
          <div className="popular-grid">
            {courses.map((course, index) => (
              <PopularCourseCard
                key={course.course_id || index}
                course={course}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryPage;
