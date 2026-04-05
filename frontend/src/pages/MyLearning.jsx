import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchMyLearning } from "./../api/api";
import { useAuth } from "../context/auth/AuthContext";
import "./../styles/MyLearning.css";

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("myLearningTab");

  const { user } = useAuth();
    const firstName = user?.name ? user.name.split(" ")[0] : "Learner"

  let activeTab = "In Progress";
  if (tabParam === "COMPLETED") activeTab = "Completed";

  useEffect(() => {
    if (tabParam !== "IN_PROGRESS" && tabParam !== "COMPLETED") {
      setSearchParams({ myLearningTab: "IN_PROGRESS" }, { replace: true });
    }
  }, [tabParam, setSearchParams]);

  const handleTabChange = (tabName) => {
    if (tabName === "Completed") {
      setSearchParams({ myLearningTab: "COMPLETED" });
    } else {
      setSearchParams({ myLearningTab: "IN_PROGRESS" });
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchMyLearning(controller.signal);
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load learning data.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
    return () => controller.abort();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (activeTab === "In Progress") return course.progressPercentage < 100;
    if (activeTab === "Completed")
      return course.progressPercentage === 100 || course.status === "COMPLETED";
    return true;
  });

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const calendarDates = [
    null, null, 1, 2, 3, 4, 5, 
    6, 7, 8, 9, 10, 11, 12, 
    13, 14, 15, 16, 17, 18, 19, 
    20, 21, 22, 23, 24, 25, 26, 
    27, 28, 29, 30
  ];

  if (loading)
    return (
      <div className="learning-container">
        <p>Loading your courses...</p>
      </div>
    );
  if (error)
    return (
      <div className="learning-container">
        <p className="error-text">{error}</p>
      </div>
    );

  return (
    <div className="learning-container">
      
      <div className="learning-header-banner">
        <div className="avatar-circle">D</div>
        <div className="header-text-content">
          <h1>Good evening, {firstName}</h1>
          <div className="recommendation-prompt">
            <span>🤓 Need help? Tell me a little about yourself so I can make the best recommendations.</span>
            <a href="" className="set-goal-link">Set your goal</a>
          </div>
        </div>
      </div>

      <div className="learning-layout">
        <aside className="learning-sidebar">
          
          <div className="sidebar-card">
            <h3>Today's goals</h3>
            <ul className="goals-list">
              <li>
                <span className="goal-icon">⭐</span>
                <span className="goal-text">Complete any 3 learning items · 0/3</span>
              </li>
              <li>
                <span className="goal-icon">⭐</span>
                <span className="goal-text">Complete 3 readings · 0/3</span>
              </li>
              <li>
                <span className="goal-icon">⭐</span>
                <Link to="" className="goal-link">Set up a learning plan</Link>
              </li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h3>Learning plan</h3>
            <div className="week-pills">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <span key={i} className="week-pill">{day}</span>
              ))}
            </div>
            <Link to="" className="goal-link">Set your learning plan</Link>
            
            <div className="calendar-header">
              <h4>April 2026</h4>
              <div className="calendar-nav">
                <button>&lt;</button>
                <button>&gt;</button>
              </div>
            </div>

            <div className="calendar-grid">
              {daysOfWeek.map((day) => (
                <div key={day} className="calendar-day-name">{day}</div>
              ))}
              {calendarDates.map((date, index) => (
                <div 
                  key={index} 
                  className={`calendar-date ${date === 6 ? 'active-date' : ''} ${!date ? 'empty-date' : ''}`}
                >
                  {date}
                </div>
              ))}
            </div>

            <div className="calendar-legend">
              <span><span className="legend-dot purple"></span> 1+ daily goals completed</span>
              <span><span className="legend-line purple"></span> All daily goals completed</span>
            </div>
          </div>
        </aside>

        <main className="learning-main">
          <div className="learning-tabs">
            {["In Progress", "Completed"].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="learning-list">
            {filteredCourses.length === 0 ? (
              <p className="no-courses">No courses found in this category.</p>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.courseId} className="learning-card row-layout">
                  <div className="learning-card-content">
                    <Link to={`/course/${course.courseId}`} className="learning-course-title">
                      <h2>{course.title}</h2>
                    </Link>
                    <p className="course-meta">
                      Course · {course.progressPercentage}% complete
                    </p>
                    <div className="learning-progress-section">
                      <div className="progress-bar-container">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${course.progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="learning-card-actions">
                    <button
                      className="go-to-course-btn"
                      onClick={() => navigate(`/course/${course.courseId}`)}
                    >
                      {course.progressPercentage > 0 ? "Resume" : "Get started"}
                    </button>
                    <button className="more-options-btn">•••</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyLearning;
