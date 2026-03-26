import { fallbackCourseImages } from "../../../utils/fallbackCourseImages";

function PopularCourseCard({ course, index }) {
  const image = fallbackCourseImages[index % fallbackCourseImages.length];

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

        <h3>{course.title || "Untitled Course"}</h3>

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
      </div>
    </article>
  );
}

export default PopularCourseCard;
