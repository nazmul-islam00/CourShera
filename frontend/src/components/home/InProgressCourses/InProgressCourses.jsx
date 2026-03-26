import React, { useState, useRef, useEffect } from "react";
import "./InProgressCourses.css";

const fallbackCourses = [
  {
    id: "course_fallback_1",
    partner: "Google",
    title: "Google UX Design",
    type: "Professional Certificate",
    progress: 45,
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=300&q=80",
    partnerLogo: "G"
  },
  {
    id: "course_fallback_2",
    partner: "Stanford University",
    title: "Machine Learning Specialization",
    type: "Specialization",
    progress: 12,
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=300&q=80",
    partnerLogo: "S"
  },
  {
    id: "course_fallback_3",
    partner: "IBM",
    title: "IBM Data Science",
    type: "Professional Certificate",
    progress: 80,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
    partnerLogo: "I"
  },
  {
    id: "course_fallback_4",
    partner: "University of Michigan",
    title: "Programming for Everybody (Getting Started with Python)",
    type: "Course",
    progress: 5,
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=300&q=80",
    partnerLogo: "M"
  }
];

export const InProgressCourses = () => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInProgressCourses = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/courses/in-progress`,
          {
            credentials: "include",
          },
        );

        if (!response.ok) {
          if (response.status == 401) {
            throw new Error("Please log in to view your courses.");
          }
          throw new Error("Failed to fetch courses.");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchInProgressCourses();
    setCourses(fallbackCourses);
    setIsLoading(false);
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
      <div className="courses-section-container">
        <h2 className="section-title">In Progress</h2>
        <p>Loading your courses...</p>
      </div>
    );
  }

  if (error || courses.length === 0) {
    return null;
  }

  return (
    <div className="courses-section-container">
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
