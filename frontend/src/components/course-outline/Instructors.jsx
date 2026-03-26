function Instructors({ instructor }) {
  return (
    <aside className="outline-side-card">
      <h3>Instructor</h3>

      <div className="outline-instructor-head">
        <img
          src={instructor.imageUrl}
          alt={instructor.name}
          className="outline-instructor-avatar"
          loading="lazy"
        />

        <div>
          <h4>{instructor.name}</h4>
          <p className="outline-instructor-subtitle">{instructor.title}</p>
          <p className="outline-instructor-subtitle">{instructor.organization}</p>
        </div>
      </div>

      <p className="outline-instructor-bio">{instructor.bio}</p>

      <div className="outline-instructor-metrics">
        <div className="outline-metric-label">Instructor rating</div>
        <div className="outline-metric-rating">
          <strong>{instructor.rating.toFixed(1)}</strong>
          <span className="outline-stars" aria-label="5 out of 5 stars">
            {"★★★★★"}
          </span>
        </div>
        <div>{instructor.reviewCount.toLocaleString("en-US")} Reviews</div>
        <div>{instructor.studentCount.toLocaleString("en-US")} Students</div>
        <div>{instructor.courseCount.toLocaleString("en-US")} Courses</div>
      </div>
    </aside>
  );
}

export default Instructors;
