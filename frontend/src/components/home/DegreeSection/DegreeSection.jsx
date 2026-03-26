import { useState, useRef, useEffect } from "react";

import { degreeSectionData } from "./DegreeSectionData";
import "./DegreeSection.css";

export const DegreeSection = () => {
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
    <div className="courses-section-container container">
      <div className="section-header">
        <h2 className="section-title">Earn a Degree</h2>
        <a href="" className="see-all-link">
          See all
        </a>
      </div>

      <div className="courses-track-wrapper">
        <div
          className={`course-fade fade-left ${canScrollLeft ? "visible" : ""}`}
        ></div>

        <div className="courses-track" ref={trackRef} onScroll={checkScroll}>
          {degreeSectionData.map((degree) => (
            <div
              key={degree.id}
              className="course-card"
              onClick={() => {
                if (degree.url) {
                  window.open(degree.url, "_blank");
                }
              }}
            >
              <div className="card-image-container">
                <img
                  src={degree.imageUrl}
                  alt={degree.title}
                  className="card-image"
                />
                <div className="partner-logo-mini">{degree.partnerLogo}</div>
              </div>

              <div className="card-content">
                <div className="partner-name">{degree.partner}</div>
                <h3 className="course-title">{degree.title}</h3>
                <div className="course-type degree-type">{degree.type}</div>

                <div className="degree-meta">
                  <span className="degree-cta">Earn your degree</span>
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
