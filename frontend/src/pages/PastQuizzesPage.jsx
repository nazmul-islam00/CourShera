import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizLayout from "../components/quiz/QuizLayout";
import {
  formatAttemptDate,
  getAttemptsByQuizId,
  getQuizById,
} from "../data/quizData";
import "../styles/quiz-pages.css";

const PastQuizzesPage = () => {
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

  return (
    <QuizLayout quiz={quiz}>
      <header className="past-quizzes-header inner">
        <div>
          <h1>Past quizzes</h1>
          <p>Review all your previous attempts for this graded assignment.</p>
        </div>

        <button
          className="primary-submit-btn"
          onClick={() => navigate(`/quiz/${quiz.id}/take`)}
          type="button"
        >
          Take quiz
        </button>
      </header>

      <section className="past-quiz-hero-card">
        <div>
          <small>{quiz.provider}</small>
          <h2>{quiz.title}</h2>
          <p>{quiz.subtitle}</p>
        </div>

        <div className="past-quiz-hero-actions">
          <button
            className="outline-btn"
            type="button"
            onClick={() => navigate(`/quiz/${quiz.id}`)}
          >
            Quiz home
          </button>
          <button
            className="primary-submit-btn"
            type="button"
            onClick={() => navigate(`/quiz/${quiz.id}/take`)}
          >
            Start / Retake
          </button>
        </div>
      </section>

      <section className="attempt-history-card">
        <h3>Attempt history</h3>

        {attempts.length === 0 ? (
          <div className="empty-history-state">
            <p>No attempts yet. Take the quiz once and your history will appear here.</p>
            <button
              className="primary-submit-btn"
              onClick={() => navigate(`/quiz/${quiz.id}/take`)}
              type="button"
            >
              Take first attempt
            </button>
          </div>
        ) : (
          <div className="attempt-history-list">
            {attempts.map((attempt, index) => (
              <div className="attempt-card" key={attempt.id}>
                <div>
                  <small>Attempt #{attempts.length - index}</small>
                  <h4>{formatAttemptDate(attempt.submittedAt)}</h4>
                  <p>
                    Score: <strong>{attempt.result.percent}%</strong> •{" "}
                    {attempt.result.passed ? "Passed" : "Needs improvement"}
                  </p>
                </div>

                <div className="attempt-card-actions">
                  <button
                    className="outline-btn"
                    onClick={() => navigate(`/quiz/${quiz.id}/certificate`)}
                    type="button"
                  >
                    View certificate
                  </button>
                  <button
                    className="primary-submit-btn"
                    onClick={() => navigate(`/quiz/${quiz.id}/take`)}
                    type="button"
                  >
                    Retake
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </QuizLayout>
  );
};

export default PastQuizzesPage;