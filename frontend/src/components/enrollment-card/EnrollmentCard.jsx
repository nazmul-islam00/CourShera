import { useState, useEffect } from "react";
import { fetchEnrollments } from "./../../api/api";

export default function EnrollmentCard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allEnrollments, setAllEnrollments] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(5);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        // Fetch from backend API
        const data = await fetchEnrollments(1000, 0);
        
        if (data.success && data.enrollments && Array.isArray(data.enrollments)) {
          setAllEnrollments(data.enrollments);
        } else {
          setAllEnrollments([]);
        }
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        setAllEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  // Update displayed enrollments based on displayLimit
  useEffect(() => {
    setEnrollments(allEnrollments.slice(0, displayLimit));
    setHasMore(displayLimit < allEnrollments.length);
  }, [displayLimit, allEnrollments]);

  const handleShowMore = () => {
    setDisplayLimit(displayLimit + 20);
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "#28a745"; // Green
      case "CANCELLED":
        return "#dc3545"; // Red
      case "COMPLETED":
        return "#007bff"; // Blue
      case "PAUSED":
        return "#ffc107"; // Yellow
      default:
        return "#6c757d"; // Gray
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <p>Loading enrollments...</p>;

  return (
    <div className="profile-form-card profile-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 className="section-header">Recent Enrollments</h2>
        <span
          style={{
            fontSize: "12px",
            color: "#666",
            fontWeight: "normal",
          }}
        >
          {enrollments.length} of {allEnrollments.length}
        </span>
      </div>

      <div
        className="enrollments-list"
        style={{
          marginTop: "15px",
        }}
      >
        {enrollments.length > 0 ? (
          <>
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.enrollment_id}
                className="enrollment-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 15px",
                  borderBottom: "1px solid #eee",
                  backgroundColor: "#fafafa",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f5f5";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#fafafa";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      color: "#222",
                      marginBottom: "4px",
                    }}
                  >
                    {enrollment.course_title || enrollment.course_id}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#666",
                    }}
                  >
                    Enrolled on {formatDate(enrollment.enrolled_at)} at{" "}
                    {formatTime(enrollment.enrolled_at)}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: getStatusBadgeColor(enrollment.status),
                      color: "white",
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {enrollment.status}
                  </span>
                </div>
              </div>
            ))}

            {hasMore && (
              <button
                onClick={handleShowMore}
                style={{
                  width: "100%",
                  padding: "10px 15px",
                  marginTop: "10px",
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #dee2e6",
                  borderRadius: "6px",
                  color: "#0056d2",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e9ecef";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#f8f9fa";
                }}
              >
                Show More ({allEnrollments.length - enrollments.length} remaining)
              </button>
            )}
          </>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#999",
              padding: "20px",
              fontStyle: "italic",
            }}
          >
            No enrollments found.
          </p>
        )}
      </div>
    </div>
  );
}
