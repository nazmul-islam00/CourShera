import { Routes, Route } from "react-router-dom";
import HomeHeader from "./components/home/HomeHeader";
import PopularCoursesHome from "./components/home/PopularCoursesHome";
import Checkout from "./components/checkout/Checkout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <HomeHeader />
            <PopularCoursesHome />
          </div>
        }
      />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
