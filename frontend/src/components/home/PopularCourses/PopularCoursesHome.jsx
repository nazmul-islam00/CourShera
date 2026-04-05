import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../context/checkout/CheckoutContext";
import { fetchPopularCourses } from "../../../api/api";
import PopularCourseCard from "./PopularCourseCard";
import "./PopularCourses.css";

const CSE_101 = {
  courseId: "cse_101",
  title: "Introduction to Computer Science",
  price: 1,
  currency: "BDT",
  category: "Computer Science",
};

const PopularCoursesHome = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCourseForCheckout } = useCheckout();

  const carouselRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCourses() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchPopularCourses(controller.signal);
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch course list");
        }
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
    return () => controller.abort();
  }, []);

  const handleBuyCse101 = () => {
    setCourseForCheckout(CSE_101);
    navigate("/checkout");
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      
      const slide = carouselRef.current.querySelector('.carousel-slide');
      
      if (slide) {
        
        const scrollAmount = slide.offsetWidth + 24; 
        
        carouselRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="home-root">
      <section className="featured-course-banner">
        <div className="container featured-inner">
          <div className="featured-text">
            <span className="featured-label">Featured {CSE_101.category} Course</span>
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
          <div className="carousel-wrapper">
            <button 
              className="carousel-btn left" 
              onClick={() => scroll("left")}
              aria-label="Scroll left"
            >
              &#8249;
            </button>
            
            <div className="carousel-track" ref={carouselRef}>
              {courses.map((course, index) => (
                <div className="carousel-slide" key={course.course_id || index}>
                  <PopularCourseCard
                    course={course}
                    index={index}
                  />
                </div>
              ))}
            </div>

            <button 
              className="carousel-btn right" 
              onClick={() => scroll("right")}
              aria-label="Scroll right"
            >
              &#8250;
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PopularCoursesHome;
