import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/auth/AuthContext";

export const UserDropdown = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/logout`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.name || "User";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="user-dropdown-container" ref={dropdownRef}>
      <div className="avatar-trigger" onClick={toggleDropdown}>
        {user?.image_url ? (
          <img
            src={user.image_url}
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
            {/* Use database columns */}
            <strong>{displayName}</strong>
            <span className="user-email">{user?.email}</span>
          </div>
          <hr className="dropdown-divider" />
          <button className="dropdown-item logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};
