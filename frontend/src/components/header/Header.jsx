import { useAuth } from "../../context/auth/AuthContext";
import { AuthButtons } from "./AuthButtons";
import { UserDropdown } from "./UserDropdown";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="top-strip">
        <div className="container strip-links">
          <button type="button">For Individuals</button>
          <button type="button">For Businesses</button>
          <button type="button">For Universities</button>
          <button type="button">For Governments</button>
        </div>
      </div>

      <header className="main-header">
        <div className="container header-inner">
          <div className="brand-block">
                <span
                  className="brand"
                  aria-label="Home"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  coursera
                </span>
            <nav className="header-nav" aria-label="Main navigation">
            <button
              type="button"
              onClick={() => navigate("/quiz-center")}
            >
              Explore
            </button>

            <button
              type="button"
              onClick={() => navigate("/quiz-center")}
            >
              My Learning
            </button>
              <button type="button">Degrees</button>
            </nav>
          </div>

          <div
            className="header-search"
            role="search"
            aria-label="Search courses"
          >
            <input type="text" placeholder="Search" aria-label="Search" />
            <button type="button">Search</button>
          </div>

          <div className="header-actions">
            <button type="button" aria-label="Language">
              EN
            </button>
            <button type="button" aria-label="Notifications">
              1
            </button>

            {isLoading ? (
              <div className="avatar skeleton-loader"></div>
            ) : user ? (
              <UserDropdown />
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
