import React, { useState, useRef, useEffect } from "react";
import { fetchInProgressCourses } from "../../../api/api";
import "./InProgressCourses.css";

export const InProgressCourses = () => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const loadCourses = async () => {
      try {
        setIsLoading(true);
        const data = await fetchInProgressCourses(controller.signal);
        setCourses(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourses();
    
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
  }, [isLoading, courses]);

  if (isLoading) {
    return (
      <div className="courses-section-container container">
        <h2 className="section-title">In Progress</h2>
        <p>Loading your courses...</p>
      </div>
    );
  }

  if (error || courses.length === 0) {
    return null;
  }

  return (
    <div className="courses-section-container container">
      <h2 className="section-title">In Progress</h2>

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
                <div className="course-type">{course.type}</div>

                <div className="progress-container">
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">
                    {course.progress}% Complete
                  </span>
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
