import { useAuth } from "../../../context/auth/AuthContext";
import "./WelcomeBanner.css";

export const WelcomeBanner = () => {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(" ")[0] : "Learner"

  return (
    <div className="welcome-dashboard">
      <div className="welcome-banner-bg">
        <div className="welcome-container">
          <h1 className="welcome-title">Welcome, {firstName}</h1>
        </div>
      </div>
    </div>
  );
};
