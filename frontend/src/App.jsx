import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CourseOutlinePage from "./pages/CourseOutlinePage";
import Checkout from "./components/checkout/Checkout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/course/:courseId" element={<CourseOutlinePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
