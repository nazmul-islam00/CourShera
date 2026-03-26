import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import CourseOutlinePage from "./pages/CourseOutlinePage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/course/:courseId" element={<CourseOutlinePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
