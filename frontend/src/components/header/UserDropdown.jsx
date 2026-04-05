import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

export const UserDropdown = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [localUser, setLocalUser] = useState(user);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/logout`;
  };

  useEffect(() => {
    setLocalUser(user);
  }, [user]);

  useEffect(() => {
    const handleProfileUpdate = (event) => {
      const updatedUser = event.detail;
      setLocalUser((prev) => ({ ...prev, ...updatedUser }));
    };
    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = localUser?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <div className="avatar-trigger" onClick={toggleDropdown}>
        {localUser?.image_url ? (
          <img
            src={localUser.image_url}
            alt="User Avatar"
            className="avatar-image"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="avatar">{initial}</div>
        )}
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-header">
            <strong>{displayName}</strong>
            <span className="user-email">{user?.email}</span>
          </div>
          <hr className="dropdown-divider" />
          <Link
            to="/me"
            className="dropdown-item profile-btn"
            onClick={() => setIsOpen(false)}
            style={{ textDecoration: "none", display: "block" }}
          >
            Profile
          </Link>
          <button className="dropdown-item logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
