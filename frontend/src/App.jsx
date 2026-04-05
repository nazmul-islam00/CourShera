import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import CourseOutlinePage from "./pages/CourseOutlinePage";
import Checkout from "./components/checkout/Checkout";
import PaymentResult from "./components/payment-result/PaymentResult";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import Header from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import ProfilePage from "./pages/ProfilePage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import CategoryPage from "./pages/CategoryPage";
import QuizCatalogPage from "./pages/QuizCatalogPage";
import QuizHomePage from "./pages/QuizHomePage";
import QuizTakePage from "./pages/QuizTakePage";
import QuizCertificatePage from "./pages/QuizCertificatePage";
import PastQuizzesPage from "./pages/PastQuizzesPage";

function App() {
  const location = useLocation();

  const useQuizLayout =
    location.pathname.startsWith("/quiz") ||
    location.pathname.startsWith("/quiz-center");

  return (
    <div className="app-container">
      {!useQuizLayout && <Header />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/browse/category/:categoryId" element={<CategoryPage />} />
        <Route path="/course/:courseId" element={<CourseOutlinePage />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route path="/payment/result" element={<PaymentResult />} />

        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

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