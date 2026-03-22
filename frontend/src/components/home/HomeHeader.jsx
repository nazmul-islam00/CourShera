import { AuthButtons } from "./AuthButtons";

function HomeHeader({ user, isLoading }) {
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
            <span className="brand">coursera</span>
            <nav className="header-nav" aria-label="Main navigation">
              <button type="button">Explore</button>
              <button type="button">My Learning</button>
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
              <div
                className="avatar skeleton-loader"
                style={{ backgroundColor: "#e0e0e0", color: "transparent" }}
              ></div>
            ) : user ? (
              user.photos && user.photos.length > 0 ? (
                <img
                  src={user.photos[0].value}
                  alt="User Avatar"
                  className="avatar-image"
                />
              ) : (
                <div className="avatar">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default HomeHeader;
