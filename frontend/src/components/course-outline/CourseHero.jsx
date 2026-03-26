import { Clock, Globe, Star, Users } from "lucide-react";

const formatStudents = (count) => {
  if (!count || count < 1) {
    return "New course";
  }
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1).replace(/\.0$/, "")}M+ students enrolled`;
  }
  if (count >= 1000) {
    return `${Math.round(count / 1000)}K+ students enrolled`;
  }
  return `${count} students enrolled`;
};

const formatNumber = (value) => value.toLocaleString("en-US");

function CourseHero({ outline }) {
  return (
    <section className="outline-hero">
      <div className="container outline-hero-inner">
        <div className="outline-pill">COURSE</div>

        <h1 className="outline-title">{outline.title}</h1>

        <p className="outline-tagline">{outline.tagline}</p>

        <div className="outline-stats-row">
          <div className="outline-stat-block">
            <div className="outline-rating-wrap">
              <Star className="outline-icon-star" />
              <span className="outline-rating-value">{outline.avgRating.toFixed(1)}</span>
            </div>
            <span className="outline-rating-meta">
              ({formatNumber(outline.reviewCount)} reviews)
            </span>
          </div>

          <div className="outline-stat-block outline-stat-muted">
            <Users size={18} />
            <span>{formatStudents(outline.enrolmentCount)}</span>
          </div>
        </div>

        <div className="outline-cta-row">
          <button type="button" className="outline-btn-primary">
            Enroll for Free
          </button>
          <button type="button" className="outline-btn-secondary">
            Try for Free
          </button>
        </div>

        <div className="outline-meta-grid">
          <div>
            <div className="outline-meta-label">Instructor</div>
            <div className="outline-meta-value">{outline.instructorName}</div>
          </div>
          <div>
            <div className="outline-meta-label">Duration</div>
            <div className="outline-meta-value outline-meta-inline">
              <Clock size={15} />
              <span>Approx. {outline.durationHours} hours</span>
            </div>
          </div>
          <div>
            <div className="outline-meta-label">Level</div>
            <div className="outline-meta-value">{outline.difficulty}</div>
          </div>
          <div>
            <div className="outline-meta-label">Language</div>
            <div className="outline-meta-value outline-meta-inline">
              <Globe size={15} />
              <span>{outline.language}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseHero;
