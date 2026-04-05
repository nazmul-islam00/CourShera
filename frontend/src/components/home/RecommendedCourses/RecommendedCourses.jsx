import { useState, useRef, useEffect } from "react";
import { fetchRecommendedCourses } from "../../../api/api";


export const RecommendedCourses = () => {
  const trackRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const loadRecommendations = async () => {
      try {
        setIsLoading(true);
        const data = await fetchRecommendedCourses(controller.signal);
        setCourses(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load recommendations");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadRecommendations();
    return () => controller.abort();
  }, []);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    const timeoutId = setTimeout(checkScroll, 150);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timeoutId);
    };
  }, [courses, isLoading]);

  if (isLoading) {
    return (
      <div className="courses-section-container">
        <h2 className="section-title">Recommended for you</h2>
        <p>Loading recommendations...</p>
      </div>
    );
  }
  
  if (error || courses.length === 0) return null;

  return (
    <div className="courses-section-container">
      <h2 className="section-title">Recommended for you</h2>

      <div className="courses-track-wrapper">
        <div
          className={`course-fade fade-left ${canScrollLeft ? "visible" : ""}`}
        ></div>

        <div className="courses-track" ref={trackRef} onScroll={checkScroll}>
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <div className="card-image-container">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="card-image"
                />
                <div className="partner-logo-mini">{course.partnerLogo}</div>
              </div>

              <div className="card-content">
                <div className="partner-name">{course.partner}</div>
                <h3 className="course-title">{course.title}</h3>
                <div className="course-type">{course.category}</div>

                <div className="course-meta">
                  <div className="rating-container">
                    <span className="star-icon">★</span>
                    <span className="rating-score">{course.rating}</span>
                    <span className="review-count">
                      ({course.reviews} reviews)
                    </span>
                  </div>
                  <div className="difficulty-level">{course.difficulty}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`course-fade fade-right ${canScrollRight ? "visible" : ""}`}
        ></div>
      </div>
    </div>
  );
};
