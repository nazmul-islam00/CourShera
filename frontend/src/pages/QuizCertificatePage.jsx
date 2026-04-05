import { useMemo, useState } from "react";
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

const QuizCertificatePage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = useMemo(() => getQuizById(quizId), [quizId]);
  const attempts = quiz ? getAttemptsByQuizId(quiz.id) : [];
  const latestAttempt = quiz ? getLatestAttempt(quiz.id) : null;
  const bestAttempt = quiz ? getBestAttempt(quiz.id) : null;
  const [showSubmission, setShowSubmission] = useState(false);

  if (!quiz) {
    return (
      <div className="quiz-simple-state">
        <h1>Quiz not found</h1>
      </div>
    );
  }

  if (!latestAttempt) {
    return (
      <div className="quiz-simple-state">
        <h1>No attempts found yet</h1>
        <button
          className="primary-submit-btn"
          onClick={() => navigate(`/quiz/${quiz.id}/take`)}
        >
          Take quiz now
        </button>
      </div>
    );
  }

  const { result } = latestAttempt;
  const passed = result.passed;

  return (
    <QuizLayout quiz={quiz}>
      <div className={`coursera-grade-banner ${passed ? "passed" : "failed"}`}>
        <div>
          <h2>Your grade: {result.percent}%</h2>
          <p>
            Your latest: <strong>{result.percent}%</strong> • Your highest:{" "}
            <strong>{bestAttempt ? bestAttempt.result.percent : result.percent}%</strong> •
            To pass you need at least {quiz.passPercent}%. We keep your highest score.
          </p>
        </div>

        <div className="coursera-grade-actions">
          <button
            className="primary-submit-btn"
            type="button"
            onClick={() => navigate(`/quiz/${quiz.id}/take`)}
          >
            Retry
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

      <h1 className="quiz-page-title">{quiz.title}</h1>

      <section className="assignment-details-card">
        <div className="assignment-details-grid">
          <div>
            <h4>Assignment details</h4>
            <div className="detail-row">
              <strong>Due</strong>
              <span>{quiz.dueText}</span>
            </div>
            <div className="detail-row">
              <strong>Submitted</strong>
              <span>{formatAttemptDate(latestAttempt.submittedAt)}</span>
            </div>
            <div className="detail-row">
              <strong>Attempts</strong>
              <span>{attempts.length}</span>
            </div>
            <div className="detail-row">
              <strong>Status</strong>
              <span>{passed ? "Passed" : "Needs improvement"}</span>
            </div>
          </div>

          <div className="certificate-score-box">
            <div className="certificate-score-circle">{result.percent}%</div>
            <small>Latest score</small>
          </div>
        </div>
      </section>

      <section className={`grade-summary-card ${passed ? "passed" : "failed"}`}>
        <div>
          <h3>{passed ? "Congratulations" : "Keep going"}</h3>
          <p>
            {passed
              ? "You passed this graded assignment. You can review your submission or continue learning."
              : "Your score is below the passing mark. Review the feedback and retake the quiz to improve."}
          </p>
        </div>

        <div className="grade-links">
          <button type="button" onClick={() => setShowSubmission((prev) => !prev)}>
            View submission
          </button>
          <button type="button" onClick={() => navigate(`/quiz/${quiz.id}`)}>
            Back to quiz home
          </button>
        </div>
      </section>

      {!passed && (
        <section className="retake-banner">
          <h3>Retake available</h3>
          <p>
            Your current score is not high enough for the pass threshold. You can retry the quiz as many times as needed.
          </p>
          <button
            className="primary-submit-btn"
            onClick={() => navigate(`/quiz/${quiz.id}/take`)}
            type="button"
          >
            Retake quiz
          </button>
        </section>
      )}

      {showSubmission && (
        <section className="submission-review-wrap">
          <div className="submission-grade-header">
            <div>
              <h2>Submission review</h2>
              <p>Question-by-question feedback for your latest attempt.</p>
            </div>

            <button
              className="primary-submit-btn"
              type="button"
              onClick={() => navigate(`/quiz/${quiz.id}/attempts`)}
            >
              Next item →
            </button>
          </div>

          {result.evaluatedQuestions.map((question, index) => (
            <div className="review-question-block" key={question.id}>
              <div className="quiz-question-head">
                <div className="quiz-question-number">
                  {index + 1}. {question.prompt}
                </div>
                <div className="quiz-points-pill">
                  {question.isCorrect ? `${question.points} / ${question.points}` : `0 / ${question.points}`} point
                </div>
              </div>

              <div className="review-options">
                {question.options.map((option) => {
                  const submitted = Array.isArray(question.submittedAnswer)
                    ? question.submittedAnswer.includes(option.id)
                    : question.submittedAnswer === option.id;

                  const correct = question.correctAnswers.includes(option.id);

                  return (
                    <div
                      key={option.id}
                      className={`review-option-row ${correct ? "correct" : submitted ? "submitted" : ""}`}
                    >
                      <span className="review-circle">{submitted ? "●" : "○"}</span>
                      <span>{option.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className={`feedback-box ${question.isCorrect ? "correct" : "incorrect"}`}>
                <strong>{question.isCorrect ? "Correct" : "Review this concept"}</strong>
                <p>{question.explanation}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </QuizLayout>
  );
};

export default QuizCertificatePage;