import React, { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { AuthButtons } from "./AuthButtons";
import { UserDropdown } from "./UserDropdown";
import { useNavigate } from "react-router-dom";
import ExploreDropdown from "./ExploreDropDown";

function HeaderSearch({ navigate }) {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  return (
    <form
      className="header-search"
      role="search"
      aria-label="Search courses"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search"
        aria-label="Search"
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

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

              <div className="explore-wrapper">
                <button type="button" className="explore-btn">
                  Explore
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M12.207 5.793a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 9.086l3.793-3.793a1 1 0 011.414 0z" />
                  </svg>
                </button>
                <ExploreDropdown />
              </div>
              <button type="button">My Learning</button>
              <button
                type="button"
                onClick={() => navigate("/quiz-center")}
              >
              Quiz
            </button>

              <button type="button">Degrees</button>
            </nav>
          </div>

          <HeaderSearch navigate={navigate} />

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
