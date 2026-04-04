import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../../context/checkout/CheckoutContext";
import { Link } from "react-router-dom";

function PopularCourseCard({ course
  
 }) {
  const image = course.image_url;
  const navigate = useNavigate();
  const { setCourseForCheckout } = useCheckout();

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
            {(course.partner_id || "C")[0]}
          </span>
          <span>{course.partner_id || "Coursera Partner"}</span>
        </div>

        <Link to={`/course/${course.course_id}`}>
          <h3>{course.title || "Untitled Course"}</h3>
        </Link>

        <p className="description-clamp">
          {course.description || "No course description available yet."}
        </p>

        <div className="rating-row">
          <span className="rating-star">★</span>
          <span className="rating-value">{course.avg_rating ?? "0.0"}</span>
          <span className="rating-count">Popular course</span>
        </div>

        <p className="meta-row">
          {course.difficulty || "Beginner"} · {course.language || "English"} ·{" "}
          {course.price ?? "Free"}
        </p>

        <button className="enroll-btn" onClick={handleEnroll}>
          Enroll Now
        </button>
      </div>
    </article>
  );
}

export default PopularCourseCard;
