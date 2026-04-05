import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuizLayout from "../components/quiz/QuizLayout";
import {
  clearDraft,
  evaluateQuiz,
  getDraft,
  getQuizById,
  saveAttempt,
  saveDraft,
} from "../data/quizData";
import "../styles/quiz-pages.css";

const QuizTakePage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = useMemo(() => getQuizById(quizId), [quizId]);

  const existingDraft = quiz ? getDraft(quiz.id) : null;

  const [answers, setAnswers] = useState(existingDraft?.answers || {});
  const [honorChecked, setHonorChecked] = useState(existingDraft?.honorChecked || false);
  const [legalName, setLegalName] = useState(existingDraft?.legalName || "");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!quiz) return;

    setSaveStatus("Saving...");
    const timer = setTimeout(() => {
      saveDraft(quiz.id, {
        answers,
        honorChecked,
        legalName,
      });
      setSaveStatus("Saved");
    }, 300);

    return () => clearTimeout(timer);
  }, [answers, honorChecked, legalName, quiz]);

  if (!quiz) {
    return (
      <div className="quiz-simple-state">
        <h1>Quiz not found</h1>
      </div>
    );
  }

  const handleSingleChange = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleMultiChange = (questionId, optionId) => {
    setAnswers((prev) => {
      const previousValues = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      const exists = previousValues.includes(optionId);

      return {
        ...prev,
        [questionId]: exists
          ? previousValues.filter((id) => id !== optionId)
          : [...previousValues, optionId],
      };
    });
  };

  const isQuizComplete = quiz.questions.every((question) => {
    if (question.type === "single") return Boolean(answers[question.id]);
    return Array.isArray(answers[question.id]) && answers[question.id].length > 0;
  });

  const validateBeforeSubmit = () => {
    if (!isQuizComplete) return "Please answer all quiz questions before submitting.";
    if (!honorChecked) return "Please accept the Coursera Honor Code checkbox.";
    if (!legalName.trim()) return "Please enter your legal name before submitting.";
    return "";
  };

  const openSubmitModal = () => {
    const error = validateBeforeSubmit();
    setValidationError(error);

    if (!error) setShowSubmitModal(true);
  };

  const handleConfirmSubmit = () => {
    const result = evaluateQuiz(quiz, answers);

    const attempt = {
      id: `attempt-${Date.now()}`,
      quizId: quiz.id,
      submittedAt: Date.now(),
      legalName: legalName.trim(),
      answers,
      honorChecked,
      result,
    };

    saveAttempt(quiz.id, attempt);
    clearDraft(quiz.id);
    setShowSubmitModal(false);
    setIsSubmitting(true);

    setTimeout(() => {
      navigate(`/quiz/${quiz.id}/certificate`);
    }, 1200);
  };

  if (isSubmitting) {
    return (
      <div className="quiz-loading-screen">
        <div className="quiz-loading-spinner"></div>
        <h2>Reviewing your submission...</h2>
        <p>Hang tight! This shouldn’t take too long.</p>
      </div>
    );
  }

  return (
    <QuizLayout quiz={quiz}>
      <div className="quiz-top-strip">
        <button className="quiz-back-link" onClick={() => navigate(`/quiz/${quiz.id}`)}>
          ← Back
        </button>
        <div className="quiz-due-chip">🌐 Due {quiz.dueText}</div>
      </div>

      {quiz.questions.map((question, index) => (
        <section className="quiz-question-card" key={question.id}>
          <div className="quiz-question-head">
            <div className="quiz-question-number">
              {index + 1}. {question.prompt}
            </div>
            <div className="quiz-points-pill">{question.points} point</div>
          </div>

          <div className="quiz-options">
            {question.options.map((option) => {
              const checked =
                question.type === "single"
                  ? answers[question.id] === option.id
                  : Array.isArray(answers[question.id]) &&
                    answers[question.id].includes(option.id);

              return (
                <label className="quiz-option" key={option.id}>
                  <input
                    type={question.type === "single" ? "radio" : "checkbox"}
                    name={question.id}
                    checked={checked}
                    onChange={() =>
                      question.type === "single"
                        ? handleSingleChange(question.id, option.id)
                        : handleMultiChange(question.id, option.id)
                    }
                  />
                  <span>{option.label}</span>
                </label>
              );
            })}
          </div>
        </section>
      ))}

      <section className="honor-card">
        <h3>Coursera Honor Code</h3>
        <p className="honor-subtext">Learn more ↗</p>

        <label className="quiz-option honor-check">
          <input
            type="checkbox"
            checked={honorChecked}
            onChange={(e) => setHonorChecked(e.target.checked)}
          />
          <span>
            I understand that submitting work that isn&apos;t my own may result in
            permanent failure of this course or deactivation of my CourShera account.
          </span>
        </label>

        <div className="legal-name-wrap">
          <input
            className="legal-name-input"
            placeholder="Enter your legal name"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
          />
          <small>Use the name on your government issued ID</small>
        </div>

        {validationError ? <p className="quiz-error-text">{validationError}</p> : null}

        <div className="quiz-bottom-actions">
          <button className="primary-submit-btn" onClick={openSubmitModal} type="button">
            Submit
          </button>
          <button className="secondary-save-btn" type="button" disabled>
            {saveStatus === "Saving..." ? "Saving..." : "Saved"}
          </button>
        </div>
      </section>

      {showSubmitModal && (
        <div className="quiz-modal-overlay">
          <div className="quiz-modal-card">
            <h2>Ready to submit?</h2>
            <p>You can retake this quiz later if your marks are not satisfactory.</p>

            <div className="quiz-modal-actions">
              <button className="primary-submit-btn" onClick={handleConfirmSubmit} type="button">
                Submit
              </button>
              <button className="outline-btn" onClick={() => setShowSubmitModal(false)} type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </QuizLayout>
  );
};

export default QuizTakePage;