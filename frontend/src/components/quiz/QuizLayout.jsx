import QuizAppHeader from "./QuizAppHeader";
import QuizSidebar from "./QuizSidebar";
import QuizFooter from "./QuizFooter";

const QuizLayout = ({ quiz, children, showSidebar = true }) => {
  return (
    <div className="quiz-shell">
      <QuizAppHeader provider={quiz.provider} />
      <div className="quiz-layout">
        {showSidebar && <QuizSidebar quiz={quiz} />}
        <main className={`quiz-main-panel ${showSidebar ? "" : "full-width"}`}>
          {children}
        </main>
      </div>
      <QuizFooter />
    </div>
  );
};

export default QuizLayout;