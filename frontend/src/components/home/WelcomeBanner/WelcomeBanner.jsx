import { useAuth } from "../../../context/auth/AuthContext";
import "./WelcomeBanner.css";

export const WelcomeBanner = () => {
  const { user } = useAuth();

  return (
    <div className="welcome-dashboard">
      <div className="welcome-banner-bg">
        <div className="welcome-container">
          <h1 className="welcome-title">Welcome, {user.name.givenName}</h1>
        </div>
      </div>
    </div>
  );
};
