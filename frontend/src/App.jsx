import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import CourseOutlinePage from "./pages/CourseOutlinePage";
import Checkout from "./components/checkout/Checkout";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import Header from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import QuizCatalogPage from "./pages/QuizCatalogPage";
import QuizHomePage from "./pages/QuizHomePage";
import QuizTakePage from "./pages/QuizTakePage";
import QuizCertificatePage from "./pages/QuizCertificatePage";
import PastQuizzesPage from "./pages/PastQuizzesPage";

function App() {
  const location = useLocation();

  const useQuizLayout = location.pathname.startsWith("/quiz") || location.pathname.startsWith("/quiz-center");

  return (
    <div className="app-container">
      {!useQuizLayout && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CourseOutlinePage />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/quiz-center" element={<QuizCatalogPage />} />
        <Route path="/quiz/:quizId" element={<QuizHomePage />} />
        <Route path="/quiz/:quizId/take" element={<QuizTakePage />} />
        <Route path="/quiz/:quizId/certificate" element={<QuizCertificatePage />} />
        <Route path="/quiz/:quizId/attempts" element={<PastQuizzesPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!useQuizLayout && <Footer />}
    </div>
  );
}

export default App;