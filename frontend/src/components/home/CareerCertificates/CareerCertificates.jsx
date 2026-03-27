import { useState, useRef, useEffect } from "react";

import { careerCertificatesData } from "./CareerCertificatesData";
import "./CareerCertificates.css";

export const CareerCertificates = () => {
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
    <div className="courses-section-container">
      <div className="section-header">
        <h2 className="section-title">
          Launch your new career with a Professional Certificate
        </h2>
        <a href="" className="see-all-link">
          See all
        </a>
      </div>

      <div className="courses-track-wrapper">
        <div
          className={`course-fade fade-left ${canScrollLeft ? "visible" : ""}`}
        ></div>

        <div className="courses-track" ref={trackRef} onScroll={checkScroll}>
          {careerCertificatesData.map((cert) => (
            <div
              key={cert.id}
              className="course-card"
              onClick={() => {
                if (cert.url) {
                  window.open(cert.url, "_blank");
                }
              }}
            >
              <div className="card-image-container">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="card-image"
                />
                <div className="partner-logo-mini">{cert.partnerLogo}</div>
              </div>

              <div className="card-content">
                <div className="partner-name">{cert.partner}</div>
                <h3 className="course-title">{cert.title}</h3>
                <div className="course-type">{cert.type}</div>

                <div className="course-meta">
                  <div className="rating-container">
                    <span className="star-icon">★</span>
                    <span className="rating-score">{cert.rating}</span>
                    <span className="review-count">
                      ({cert.reviews} reviews)
                    </span>
                  </div>
                  <div className="time-to-complete">{cert.timeToComplete}</div>
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
