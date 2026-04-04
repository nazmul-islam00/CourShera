import { Navigate, Route, Routes } from "react-router-dom";

import CourseOutlinePage from "./pages/CourseOutlinePage";
import Checkout from "./components/checkout/Checkout";
import "./App.css";
import { HomePage } from "./pages/HomePage";
import Header from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import ProfilePage from "./pages/ProfilePage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/course/:courseId" element={<CourseOutlinePage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
