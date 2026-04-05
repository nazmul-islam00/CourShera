import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../context/checkout/CheckoutContext";
import { Link } from "react-router-dom";

function PopularCourseCard({ course }) {
  const image =
    course.image_url ||
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80";
  const navigate = useNavigate();
  const { setCourseForCheckout } = useCheckout();
  const partnerName = course.partners?.name || "Coursera Partner";

  const handleEnroll = () => {
    setCourseForCheckout({
      courseId: course.course_id,
      title: course.title || "Untitled Course",
      price: course.price ?? 0,
      currency: "BDT",
    });
    navigate("/checkout");
  };

  return (
    <article className="popular-card">
      <div className="popular-card-image-wrap">
        <img
          src={image}
          alt={course.title || "Course thumbnail"}
          loading="lazy"
        />
        <span className="pill-badge">Popular</span>
      </div>

      <div className="popular-card-content">
        <div className="provider-row">
          <span className="provider-avatar">
            {partnerName.charAt(0).toUpperCase()}
          </span>
          <span>{partnerName}</span>
        </div>

        <div className="course-type" style={{ fontSize: "12px", color: "#0056d2", fontWeight: "600", marginBottom: "4px" }}>
          {course.category}
        </div>

        <Link to={`/course/${course.course_id}`}>
          <h3 style={{ marginTop: "4px" }}>{course.title || "Untitled Course"}</h3>
        </Link>

        <p className="description-clamp">
          {course.description || "No course description available yet."}
        </p>

        <div className="rating-row">
          <span className="rating-star">★</span>
          <span className="rating-value">{course.avg_rating ?? "0.0"}</span>
          <span className="rating-count">({course.enrolment_count || 0} enrolled)</span>
        </div>

        <p className="meta-row">
          {course.difficulty || "Beginner"} · {course.language || "English"} ·{" "}
          {course.price ? `৳${course.price}` : "Free"}
        </p>

        <button className="enroll-btn" onClick={handleEnroll}>
          Enroll Now
        </button>
      </div>
    </article>
  );
}

export default PopularCourseCard;
