import { useNavigate } from "react-router-dom";
import { courseCatalog, getBestAttempt, getQuizzesByCourseSlug } from "../data/quizData";
import "../styles/quiz-pages.css";

const QuizCatalogPage = () => {
  const navigate = useNavigate();

  return (
    <div className="quiz-shell catalog-shell">
      <div className="catalog-topbar">
        <div>
          <h1>Quiz Center</h1>
          <p>Coursera-style dummy quiz space with multiple courses and graded assignments.</p>
        </div>
      </div>

      <div className="catalog-grid">
        {courseCatalog.map((course) => {
          const quizzes = getQuizzesByCourseSlug(course.id);

          return (
            <section className="course-catalog-card" key={course.id}>
              <div className="course-catalog-head">
                <div>
                  <small>{course.provider}</small>
                  <h2>{course.title}</h2>
                  <p>{course.level} • {quizzes.length} quiz{quizzes.length > 1 ? "zes" : ""}</p>
                </div>
              </div>

              <div className="course-quiz-list">
                {quizzes.map((quiz) => {
                  const bestAttempt = getBestAttempt(quiz.id);

                  return (
                    <div className="course-quiz-item" key={quiz.id}>
                      <div>
                        <h3>{quiz.title}</h3>
                        <p>{quiz.subtitle}</p>
                        <small>
                          Best score: {bestAttempt ? `${bestAttempt.result.percent}%` : "No attempts yet"}
                        </small>
                      </div>

                      <div className="course-quiz-actions">
                        <button
                          className="outline-btn"
                          type="button"
                          onClick={() => navigate(`/quiz/${quiz.id}`)}
                        >
                          Open
                        </button>
                        <button
                          className="primary-submit-btn"
                          type="button"
                          onClick={() => navigate(`/quiz/${quiz.id}/take`)}
                        >
                          Start
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default QuizCatalogPage;