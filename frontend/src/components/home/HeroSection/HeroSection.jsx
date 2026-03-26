import {
  FaArrowRight,
  FaCertificate,
  FaBriefcase,
  FaGraduationCap,
  FaGoogle,
  FaMicrosoft,
  FaApple,
  FaFacebookF,
} from "react-icons/fa";
import { useState } from "react";

import { PlusBg, BusinessBg, StartBg } from "./HeroSectionImages";
import { AuthModal } from "../../header/AuthModal";
import "./HeroSection.css";
import { useAuth } from "../../../context/auth/AuthContext";

export const HeroSection = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="hero-section container">
      <div className="hero-banner-track">
        <div id="banner-plus" className="hero-banner banner-mint">
          <div className="banner-content">
            <h2 className="brand-logo plus-logo">
              coursera <span>PLUS</span>
            </h2>
            <h1>Grow your skills. Shape your career.</h1>
            <p>
              Build in-demand skills with expert-led programs from Google,
              Microsoft, IBM, and more.
            </p>
            <button
              className="btn-primary"
              onClick={() =>
                window.open(
                  "https://www.coursera.org/courseraplus/special/global-40-spring-2026",
                )
              }
            >
              Save on Coursera Plus <FaArrowRight />
            </button>
          </div>

          <div className="banner-visual">
            <PlusBg />
          </div>
        </div>
        <div id="banner-business" className="hero-banner banner-blue">
          <div className="banner-content">
            <h2 className="brand-logo business-logo">
              coursera <span>FOR BUSINESS</span>
            </h2>
            <h1>Train your team in skills that scale</h1>
            <p>
              Join 3,700+ teams building skills with Coursera for Teams
              worldwide.
            </p>
            <button
              className="btn-primary btn-white"
              onClick={() =>
                window.open(
                  "https://www.coursera.org/business/teams?promoCode=spring-promo-2026&utm_medium=coursera&utm_source=bluebanner&utm_campaign=2026-spring-promo&utm_content=promo-bar-cta",
                )
              }
            >
              Save 40% on Teams <FaArrowRight />
            </button>
          </div>
          <div className="banner-visual">
            <BusinessBg />
          </div>
        </div>
        {!user && (
          <div id="banner-start" className="hero-banner banner-light">
            <div className="banner-content">
              <h1>Start, switch, or advance your career</h1>
              <p>Grow with courses from top organizations</p>
              <button
                className="btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Join for Free <FaArrowRight />
              </button>
              {isModalOpen && (
                <AuthModal onClose={() => setIsModalOpen(false)} />
              )}
            </div>
            <div className="banner-visual">
              <StartBg />
            </div>
          </div>
        )}
      </div>

      <div className="hero-quick-links">
        <a
          href="https://www.coursera.org/career-academy"
          className="quick-link-card"
        >
          <span>Launch a new career</span>
          <FaCertificate className="quick-icon text-blue" />
        </a>
        <a
          href="https://www.coursera.org/business?utm_campaign=website&utm_content=bucket-from-B2C-home-try-business&utm_medium=coursera&utm_source=enterprise"
          className="quick-link-card"
        >
          <span>Try Coursera for Business</span>
          <FaBriefcase className="quick-icon text-purple" />
        </a>
        <a href="https://www.coursera.org/degrees" className="quick-link-card">
          <span>Earn a degree</span>
          <FaGraduationCap className="quick-icon text-dark-blue" />
        </a>
      </div>
    </div>
  );
};
