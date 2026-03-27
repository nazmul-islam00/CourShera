import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";


import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="global-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h2>Coursera</h2>
            <ul>
              <li>
                <a href="https://www.coursera.org/about">About</a>
              </li>
              <li>
                <a href="https://www.coursera.org/about/how-coursera-works/">
                  What We Offer
                </a>
              </li>
              <li>
                <a href="https://blog.coursera.org/leadership/">Leadership</a>
              </li>
              <li>
                <a href="https://careers.coursera.com/homepage">Careers</a>
              </li>
              <li>
                <a href="#">Catalog</a>
              </li>
              <li>
                <a href="https://www.coursera.org/courseraplus">
                  Coursera Plus
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/professional-certificates">
                  Professional Certificates
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/mastertrack">
                  MasterTrack® Certificates
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/degrees">Degrees</a>
              </li>
              <li>
                <a href="https://www.coursera.org/business?utm_campaign=website&utm_content=corp-to-home-footer-for-enterprise&utm_medium=coursera&utm_source=enterprise">
                  For Enterprise
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/government?utm_campaign=website&utm_content=corp-to-home-footer-for-government&utm_medium=coursera&utm_source=enterprise">
                  For Government
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/campus?utm_campaign=website&utm_content=corp-to-home-footer-for-campus&utm_medium=coursera&utm_source=enterprise">
                  For Campus
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/partnerships?utm_medium=coursera&utm_source=partnerships&utm_campaign=website&utm_content=corp-to-home-footer-become-a-partner">
                  Become a Partner
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2>Community</h2>
            <ul>
              <li>
                <a href="https://www.coursera.support/s/community?language=en_US">
                  Learners
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/partners">Partners</a>
              </li>
              <li>
                <a href="https://www.coursera.support/s/article/learner-000001137?language=en_US">
                  Beta Testers
                </a>
              </li>
              <li>
                <a href="https://blog.coursera.org">Blog</a>
              </li>
              <li>
                <a href="https://medium.com/coursera-engineering">Tech Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2>More</h2>
            <ul>
              <li>
                <a href="https://www.coursera.org/about/press">Press</a>
              </li>
              <li>
                <a href="https://investor.coursera.com/overview/default.aspx">
                  Investors
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/about/terms">Terms</a>
              </li>
              <li>
                <a href="https://www.coursera.org/about/privacy">Privacy</a>
              </li>
              <li>
                <a href="https://www.coursera.support/s/learner-help-center?language=en_US">
                  Help
                </a>
              </li>
              <li>
                <a href="https://www.coursera.support/s/article/learner-000001052?language=en_US">
                  Accessibility
                </a>
              </li>
              <li>
                <a href="https://www.coursera.org/about/contact">Contact</a>
              </li>
              <li>
                <a href="https://www.coursera.org/articles">Articles</a>
              </li>
              <li>
                <a href="https://www.coursera.org/directory">Directory</a>
              </li>
              <li>
                <a href="https://www.coursera.org/about/affiliates">
                  Affiliates
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column mobile-app-col">
            <h2>Learn Anywhere</h2>
            <div className="app-badges">
              <a
                href="https://apps.apple.com/us/app/coursera-grow-your-career/id736535961"
                className="store-badge"
              >
                <FaApple className="store-icon" />
                <div className="store-text">
                  <span className="store-sub">Download on the</span>
                  <span className="store-title">App Store</span>
                </div>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=org.coursera.android"
                className="store-badge"
              >
                <FaGooglePlay className="store-icon" />
                <div className="store-text">
                  <span className="store-sub">GET IT ON</span>
                  <span className="store-title">Google Play</span>
                </div>
              </a>
            </div>
            <div className="b-corp-badge">
              <div className="b-corp-circle">B</div>
              <span>Certified Corporation</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026 Coursera Inc. All rights reserved.</p>
          <div className="social-links">
            <a
              href="https://www.facebook.com/Coursera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.linkedin.com/company/coursera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://x.com/coursera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.youtube.com/user/coursera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.instagram.com/coursera/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@coursera"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tiktok"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
