import { useRef } from "react";
import "./PartnerLogos.css";
import { partnerImages } from "./PartnerLogosImages";

export const PartnerLogos = () => {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 300;
      trackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="partner-logos-section">
      <div className="partner-logos-container">
        <h2 className="partner-heading">
          Learn from 350+ leading universities and companies
        </h2>

        <div className="track-wrapper">
          <button
            className="nav-arrow left-arrow"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="logos-track" ref={trackRef}>
            {Object.entries(partnerImages).map(([name, logoElement]) => (
              <div key={name} className="logo-pill">
                <div className="logo-img-wrapper">{logoElement}</div>
                <span className="logo-text">{name}</span>
              </div>
            ))}
          </div>

          <button
            className="nav-arrow right-arrow"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
