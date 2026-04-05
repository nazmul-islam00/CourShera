import { Link } from "react-router-dom";

function LearnSidebar({ courseId, courseTitle, modules = [], activeModuleId, onSelectModule }) {
  return (
    <aside className="learn-sidebar">
      <div className="learn-sidebar-header">
        <Link to={`/course/${courseId}`} className="learn-sidebar-course-title">
          {courseTitle}
        </Link>
      </div>

      <nav className="learn-sidebar-nav">
        <p className="learn-sidebar-section-label">Course Material</p>
        <ul className="learn-sidebar-module-list">
          {modules.map((mod) => (
            <li key={mod.moduleId}>
              <button
                className={`learn-sidebar-module-btn ${
                  mod.moduleId === activeModuleId ? "active" : ""
                }`}
                onClick={() => onSelectModule(mod.moduleId)}
              >
                <span className="learn-sidebar-module-dot" />
                <span className="learn-sidebar-module-name">{mod.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="learn-sidebar-footer">
        <button className="learn-sidebar-footer-btn">Grades</button>
        <button className="learn-sidebar-footer-btn">Notes</button>
      </div>
    </aside>
  );
}

export default LearnSidebar;
