import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../context/checkout/CheckoutContext";
import { Link } from "react-router-dom";

function PopularCourseCard({ course }) {
  const image =
    course.imageUrl || 
    course.image_url ||
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80";
  const navigate = useNavigate();
  const { setCourseForCheckout } = useCheckout();
  const partnerName = course.partners?.name || course.partner || "Coursera Partner";
  const courseId = course.course_id || course.id;

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
          {course.category || "General"}
        </div>

        <Link to={`/course/${courseId}`}>
          <h3>{course.title || "Untitled Course"}</h3>
        </Link>

        <p className="description-clamp">
          {course.description || "No course description available yet."}
        </p>

        <div className="rating-row">
          <span className="rating-star" style={{ color: "#eb8a00", marginRight: "4px" }}>★</span>
          <span className="rating-value" style={{ fontWeight: "700", color: "#333" }}>
            {course.rating || course.avg_rating || "0.0"}
          </span>
          <span className="rating-count" style={{ color: "#666", fontSize: "13px", marginLeft: "6px" }}>
            ({course.reviews || 0} reviews)
          </span>
          {course.enrollment_count > 0 && (
            <span className="enrollment-text" style={{ color: "#666", fontSize: "13px", marginLeft: "6px" }}>
              · {course.enrollment_count} enrolled
            </span>
          )}
        </div>

        <p className="meta-row">
          <span style={{ textTransform: "capitalize" }}>{course.difficulty || "Beginner"}</span> · {course.language || "English"} ·{" "}
          <strong style={{ color: "#333" }}>
             {course.price ? `৳${course.price}` : "Free"}
          </strong>
        </p>

        <button className="enroll-btn" onClick={handleEnroll} style={{ marginTop: "12px" }}>
           Enroll Now
        </button>
      </div>
    </article>
  );
}

export default PopularCourseCard;
