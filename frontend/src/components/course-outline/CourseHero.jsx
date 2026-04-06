import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Globe, Star, Users } from "lucide-react";
import { useCheckout } from "../../context/checkout/CheckoutContext";
import { cancelEnrollment } from "../../api/api";
import { toast } from "react-toastify";
import "./CourseHero.css";

const formatStudents = (count) => {
  if (!count || count < 1) return "New course";
  if (count >= 1000000) return `${(count / 1000000).toFixed(1).replace(/\.0$/, "")}M+ students enrolled`;
  if (count >= 1000) return `${Math.round(count / 1000)}K+ students enrolled`;
  return `${count} students enrolled`;
};

const formatNumber = (value) => value.toLocaleString("en-US");

function CourseHero({ outline, enrolled, onCancelSuccess }) {
  const navigate = useNavigate();
  const { setCourseForCheckout } = useCheckout();

  const [cancelling, setCancelling]   = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEnroll = () => {
    setCourseForCheckout({
      courseId: outline.courseId,
      title:    outline.title || "Untitled Course",
      price:    outline.price ?? 0,
      currency: "BDT",
    });
    navigate("/checkout");
  };

  const handleCancelClick = () => {
    // Show an inline confirmation instead of browser confirm()
    setCancelError("");
    setShowConfirm(true);
  };

  const handleConfirmCancel = async () => {
    setCancelling(true);
    setCancelError("");
    setShowConfirm(false);

    try {
      const { response, data } = await cancelEnrollment(outline.courseId);

      if (!response.ok) {
        const message = data?.message || "Could not cancel enrollment. Please try again.";
        setCancelError(message);
        toast.error(message);
        setCancelling(false);
        return;
      }

      setCancelling(false);
      toast.success("Enrollment cancelled and refund initiated.");
      onCancelSuccess(); // tells CourseOutlinePage to flip enrolled -> false
    } catch {
      const message = "Could not cancel enrollment. Please try again.";
      setCancelError(message);
      toast.error(message);
      setCancelling(false);
      return;
    }
  };

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
          {enrolled ? (
            <div className="cancel-enrollment-wrap">
              {/* Enrolled state — show badge + cancel button */}
              <span className="enrolled-badge">✓ Enrolled</span>

              <button
                type="button"
                className="outline-btn-primary"
                onClick={() => navigate(`/course/${outline.courseId}/content`)}
              >
                View Course
              </button>

              {!showConfirm && (
                <button
                  type="button"
                  className="outline-btn-danger"
                  onClick={handleCancelClick}
                  disabled={cancelling}
                >
                  {cancelling ? "Cancelling…" : "Cancel Enrollment"}
                </button>
              )}

              {/* Inline confirmation — avoids browser confirm() which is hard to style */}
              {showConfirm && (
                <div className="cancel-confirm-box">
                  <p>Cancel enrollment and get a full refund?</p>
                  <div className="cancel-confirm-actions">
                    <button
                      type="button"
                      className="outline-btn-danger"
                      onClick={handleConfirmCancel}
                    >
                      Yes, cancel &amp; refund
                    </button>
                    <button
                      type="button"
                      className="outline-btn-secondary"
                      onClick={() => setShowConfirm(false)}
                    >
                      Keep enrollment
                    </button>
                  </div>
                </div>
              )}

              {cancelError && <p className="cancel-error">{cancelError}</p>}
            </div>
          ) : (
            <>
              <button type="button" className="outline-btn-primary" onClick={handleEnroll}>
                Enroll Now
              </button>
              <button type="button" className="outline-btn-secondary" onClick={handleEnroll}>
                Try for Free
              </button>
            </>
          )}
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