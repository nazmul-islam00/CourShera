const QuizSidebar = ({ quiz }) => {
  return (
    <aside className="quiz-sidebar">
      <div className="quiz-sidebar-course-title-wrap">
        <h3>{quiz.courseTitle}</h3>
        <button type="button">×</button>
      </div>

      <div className="quiz-sidebar-week-block">
        <small>{quiz.weekLabel}</small>
        <h4>{quiz.sectionTitle}</h4>
      </div>

      {quiz.outline.map((section) => (
        <div key={section.title} className="quiz-sidebar-section">
          <h5>{section.title}</h5>

          {section.items.map((item) => (
            <div
              key={item.label}
              className={`quiz-sidebar-item ${item.active ? "active" : ""}`}
            >
              <span className={`quiz-sidebar-dot ${item.done ? "done" : ""}`}>
                {item.done ? "✓" : ""}
              </span>

              <div className="quiz-sidebar-item-text">
                <div>{item.label}</div>
                <small>{item.meta}</small>
              </div>
            </div>
          ))}
        </div>
      ))}
    </aside>
  );
};

export default QuizSidebar;