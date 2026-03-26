import { useState, useRef, useEffect } from "react";

const recommendedData = [
  {
    id: "rec_1",
    partner: "DeepLearning.AI",
    title: "AI for Everyone",
    type: "Course",
    rating: 4.8,
    reviews: "38K",
    difficulty: "Beginner",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=300&q=80",
    partnerLogo: "D",
  },
  {
    id: "rec_2",
    partner: "Meta",
    title: "Meta Front-End Developer",
    type: "Professional Certificate",
    rating: 4.7,
    reviews: "12K",
    difficulty: "Beginner",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=300&q=80",
    partnerLogo: "M",
  },
  {
    id: "rec_3",
    partner: "University of Pennsylvania",
    title: "Business Foundations",
    type: "Specialization",
    rating: 4.9,
    reviews: "22K",
    difficulty: "Beginner",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80",
    partnerLogo: "P",
  },
  {
    id: "rec_4",
    partner: "Johns Hopkins University",
    title: "Data Science",
    type: "Specialization",
    rating: 4.6,
    reviews: "45K",
    difficulty: "Intermediate",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&q=80",
    partnerLogo: "J",
  },
];

export const RecommendedCourses = () => {
  const trackRef = useRef(null);
  const [courses, setCourses] = useState(recommendedData);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
  }, [courses]);

  if (courses.length === 0) return null;

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
                <div className="course-type">{course.type}</div>

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
