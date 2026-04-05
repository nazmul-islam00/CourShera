const QuizAppHeader = ({ title = "coursera", provider = "DeepLearning.AI" }) => {
  return (
    <header className="quiz-app-header">
      <div className="quiz-app-brand-wrap">
        <div className="quiz-app-brand">{title}</div>
        <div className="quiz-app-provider">{provider}</div>
      </div>

      <div className="quiz-app-progress-pill">
        <span>0/3 learning items</span>
        <div className="quiz-app-progress-track">
          <span></span>
        </div>
        <span>★ ★ ★</span>
      </div>

      <div className="quiz-app-right">
        <button className="quiz-header-trial-btn" type="button">
          Start free trial
        </button>
        <span className="quiz-header-icon">?</span>
        <span className="quiz-header-icon">🌐</span>
        <div className="quiz-header-avatar">F</div>
      </div>
    </header>
  );
};

export default QuizAppHeader;