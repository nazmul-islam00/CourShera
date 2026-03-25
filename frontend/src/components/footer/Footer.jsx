import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faXTwitter,
  faYoutube,
  faInstagram,
  faTiktok,
  faGooglePlay,
  faApple,
} from "@fortawesome/free-brands-svg-icons";

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
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">What We Offer</a>
              </li>
              <li>
                <a href="#">Leadership</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Catalog</a>
              </li>
              <li>
                <a href="#">Coursera Plus</a>
              </li>
              <li>
                <a href="#">Professional Certificates</a>
              </li>
              <li>
                <a href="#">MasterTrack® Certificates</a>
              </li>
              <li>
                <a href="#">Degrees</a>
              </li>
              <li>
                <a href="#">For Enterprise</a>
              </li>
              <li>
                <a href="#">For Government</a>
              </li>
              <li>
                <a href="#">For Campus</a>
              </li>
              <li>
                <a href="#">Become a Partner</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2>Community</h2>
            <ul>
              <li>
                <a href="#">Learners</a>
              </li>
              <li>
                <a href="#">Partners</a>
              </li>
              <li>
                <a href="#">Beta Testers</a>
              </li>
              <li>
                <a href="#">Translators</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Tech Blog</a>
              </li>
              <li>
                <a href="#">Teaching Center</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2>More</h2>
            <ul>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Investors</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <li>
                <a href="#">Accessibility</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Articles</a>
              </li>
              <li>
                <a href="#">Directory</a>
              </li>
              <li>
                <a href="#">Affiliates</a>
              </li>
            </ul>
          </div>

          <div className="footer-column mobile-app-col">
            <h2>Learn Anywhere</h2>
            <div className="app-badges">
              <a href="#" className="store-badge">
                <FontAwesomeIcon icon={faApple} className="store-icon" />
                <div className="store-text">
                  <span className="store-sub">Download on the</span>
                  <span className="store-title">App Store</span>
                </div>
              </a>
              <a href="#" className="store-badge">
                <FontAwesomeIcon icon={faGooglePlay} className="store-icon" />
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
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a href="#" aria-label="Twitter">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>
            <a href="#" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" aria-label="Tiktok">
              <FontAwesomeIcon icon={faTiktok} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
