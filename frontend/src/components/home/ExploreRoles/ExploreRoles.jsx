import { useState, useRef, useEffect } from "react";

import { exploreRolesData } from "./ExploreRolesData";
import "./ExploreRoles.css";

export const ExploreRoles = () => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    const timeoutId = setTimeout(checkScroll, 150);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="courses-section-container container explore-roles-section">
      <div className="section-header">
        <h2 className="section-title">Explore Careers & Roles</h2>
      </div>

      <div className="courses-track-wrapper">
        <div
          className={`course-fade fade-left ${canScrollLeft ? "visible" : ""}`}
        ></div>

        <div className="courses-track" ref={trackRef} onScroll={checkScroll}>
          {exploreRolesData.map((role) => (
            <div
              key={role.id}
              className="role-card"
              onClick={() => {
                if (role.url) {
                  window.open(role.url, "_blank");
                }
              }}
            >
              <div className="role-image-container">
                <img
                  src={role.imageUrl}
                  alt={role.title}
                  className="role-image"
                />
              </div>

              <div className="role-content">
                <h3 className="role-title">{role.title}</h3>

                <div className="role-stats">
                  <div className="stat">
                    <span className="stat-label">Median Salary</span>
                    <span className="stat-value">{role.salary}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Job Openings</span>
                    <span className="stat-value">{role.openings}</span>
                  </div>
                </div>

                <div className="role-footer">
                  <span className="explore-link">Explore role</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`course-fade fade-right ${canScrollRight ? "visible" : ""}`}
        ></div>
      </div>
    </div>
  );
};
