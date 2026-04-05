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
  // This prevents the default action of jumping to the top of the page when clicking href="#"
  const handleLinkClick = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="global-footer">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-column">
            <h2>Coursera</h2>
            <ul>
              <li>
                <a href="#" onClick={handleLinkClick}>About</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>What We Offer</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Leadership</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Careers</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Catalog</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Coursera Plus</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Professional Certificates</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>MasterTrack® Certificates</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Degrees</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>For Enterprise</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>For Government</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>For Campus</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Become a Partner</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2>Community</h2>
            <ul>
              <li>
                <a href="#" onClick={handleLinkClick}>Learners</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Partners</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Beta Testers</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Blog</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Tech Blog</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2>More</h2>
            <ul>
              <li>
                <a href="#" onClick={handleLinkClick}>Press</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Investors</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Terms</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Privacy</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Help</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Accessibility</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Contact</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Articles</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Directory</a>
              </li>
              <li>
                <a href="#" onClick={handleLinkClick}>Affiliates</a>
              </li>
            </ul>
          </div>

          <div className="footer-column mobile-app-col">
            <h2>Learn Anywhere</h2>
            <div className="app-badges">
              <a
                href="#"
                onClick={handleLinkClick}
                className="store-badge"
              >
                <FaApple className="store-icon" />
                <div className="store-text">
                  <span className="store-sub">Download on the</span>
                  <span className="store-title">App Store</span>
                </div>
              </a>
              <a
                href="#"
                onClick={handleLinkClick}
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
              href="#"
              onClick={handleLinkClick}
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              onClick={handleLinkClick}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              onClick={handleLinkClick}
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              onClick={handleLinkClick}
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              onClick={handleLinkClick}
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              onClick={handleLinkClick}
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