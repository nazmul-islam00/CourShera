import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizLayout from "../components/quiz/QuizLayout";
import {
  formatAttemptDate,
  getAttemptsByQuizId,
  getBestAttempt,
  getLatestAttempt,
  getQuizById,
} from "../data/quizData";
import "../styles/quiz-pages.css";

const QuizHomePage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = useMemo(() => getQuizById(quizId), [quizId]);

  if (!quiz) {
    return (
      <div className="quiz-simple-state">
        <h1>Quiz not found</h1>
      </div>
    );
  }

  const attempts = getAttemptsByQuizId(quiz.id);
  const latest = getLatestAttempt(quiz.id);
  const best = getBestAttempt(quiz.id);

  return (
    <QuizLayout quiz={quiz}>
      <div className="quiz-home-hero">
        <div>
          <small>{quiz.provider} • {quiz.specialization}</small>
          <h1 className="quiz-page-title">{quiz.title}</h1>
          <p className="quiz-home-subtitle">
            {quiz.subtitle} • {quiz.difficulty} • Estimated time: {quiz.estimatedTime}
          </p>
        </div>

        <div className="quiz-home-hero-actions">
          <button
            className="primary-submit-btn"
            type="button"
            onClick={() => navigate(`/quiz/${quiz.id}/take`)}
          >
            {attempts.length ? "Retake quiz" : "Start quiz"}
          </button>
          <button
            className="outline-btn"
            type="button"
            onClick={() => navigate(`/quiz/${quiz.id}/attempts`)}
          >
            Past attempts
          </button>
        </div>
      </div>

      <section className="quiz-home-summary-card">
        <div>
          <h3>Assignment details</h3>
          <div className="detail-row"><strong>Due</strong><span>{quiz.dueText}</span></div>
          <div className="detail-row"><strong>Attempts</strong><span>{quiz.attemptsAllowed}</span></div>
          <div className="detail-row"><strong>Passing grade</strong><span>{quiz.passPercent}%</span></div>
          <div className="detail-row"><strong>Highest score</strong><span>{best ? `${best.result.percent}%` : "No attempts yet"}</span></div>
        </div>

        <div className="quiz-summary-side">
          <div className="summary-badge">Graded Assignment</div>
          <div className="summary-badge">{quiz.estimatedTime}</div>
          <div className="summary-badge">{quiz.difficulty}</div>
        </div>
      </section>

      <section className="quiz-home-grade-card">
        <div>
          <h3>Your latest progress</h3>
          <p>
            {latest
              ? `Latest attempt submitted on ${formatAttemptDate(latest.submittedAt)}`
              : "You have not submitted this quiz yet."}
          </p>
          <div className="grade-value">{latest ? `${latest.result.percent}%` : "--"}</div>
        </div>

        <div className="grade-links">
          <button type="button" onClick={() => navigate(`/quiz/${quiz.id}/certificate`)}>
            View certificate
          </button>
          <button type="button" onClick={() => navigate(`/quiz/${quiz.id}/take`)}>
            Continue
          </button>
        </div>
      </section>
    </QuizLayout>
  );
};

export default QuizHomePage;