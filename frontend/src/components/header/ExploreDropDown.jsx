import React from "react";
import { Link } from "react-router-dom";

const ExploreDropdown = () => {
  return (
    <div className="mega-menu-overlay">
      <div className="container mega-menu-content">
        <div className="mega-menu-grid">
          
          {/* Column 1 */}
          <div className="mega-menu-section">
            <h3>Explore roles</h3>
            <ul className="mega-menu-list">
              <li><Link to="#">Data Analyst</Link></li>
              <li><Link to="#">Project Manager</Link></li>
              <li><Link to="#">Cyber Security Analyst</Link></li>
              <li><Link to="#">Data Scientist</Link></li>
              <li><Link to="#">Business Intelligence Analyst</Link></li>
              <li><Link to="#">Digital Marketing Specialist</Link></li>
              <li><Link to="#">UI / UX Designer</Link></li>
              <li><Link to="#">Machine Learning Engineer</Link></li>
              <li><Link to="#">Social Media Specialist</Link></li>
              <li><Link to="#">Computer Support Specialist</Link></li>
              <li><Link to="#" className="view-all-link">View all</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="mega-menu-section">
            <h3>Explore categories</h3>
            <ul className="mega-menu-list">
              <li><Link to="#">Artificial Intelligence</Link></li>
              <li><Link to="#">Business</Link></li>
              <li><Link to="#">Data Science</Link></li>
              <li><Link to="#">Information Technology</Link></li>
              <li><Link to="#">Computer Science</Link></li>
              <li><Link to="#">Healthcare</Link></li>
              <li><Link to="#">Physical Science and Engineering</Link></li>
              <li><Link to="#">Personal Development</Link></li>
              <li><Link to="#">Social Sciences</Link></li>
              <li><Link to="#">Language Learning</Link></li>
              <li><Link to="#">Arts and Humanities</Link></li>
              <li><Link to="#" className="view-all-link">View all</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="mega-menu-section split-section">
            <div className="mega-menu-sub-section">
              <h3>Earn a Professional Certificate</h3>
              <ul className="mega-menu-list">
                <li><Link to="#">Business</Link></li>
                <li><Link to="#">Computer Science</Link></li>
                <li><Link to="#">Data Science</Link></li>
                <li><Link to="#">Information Technology</Link></li>
                <li><Link to="#" className="view-all-link">View all</Link></li>
              </ul>
            </div>
            
            <div className="mega-menu-sub-section mt-4">
              <h3>Earn an online degree</h3>
              <ul className="mega-menu-list">
                <li><Link to="#">Bachelor's Degrees</Link></li>
                <li><Link to="#">Master's Degrees</Link></li>
                <li><Link to="#">Postgraduate Programs</Link></li>
                <li><Link to="#" className="view-all-link">View all</Link></li>
              </ul>
            </div>
          </div>

          {/* Column 4 */}
          <div className="mega-menu-section split-section">
            <div className="mega-menu-sub-section">
              <h3>Explore trending skills</h3>
              <ul className="mega-menu-list">
                <li><Link to="#">Python</Link></li>
                <li><Link to="#">Artificial Intelligence</Link></li>
                <li><Link to="#">Excel</Link></li>
                <li><Link to="#">Machine Learning</Link></li>
                <li><Link to="#">SQL</Link></li>
                <li><Link to="#">Project Management</Link></li>
                <li><Link to="#">Power BI</Link></li>
                <li><Link to="#">Marketing</Link></li>
              </ul>
            </div>

            <div className="mega-menu-sub-section mt-4">
              <h3>Prepare for a certification exam</h3>
              <ul className="mega-menu-list">
                <li><Link to="#" className="view-all-link">View all</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mega-menu-divider"></div>
        
        <div className="mega-menu-footer">
          Not sure where to begin? <Link to="#">Browse free courses</Link> or <Link to="#">Learn more about</Link> <span className="coursera-plus">Coursera <strong>Plus</strong></span>
        </div>
      </div>
    </div>
  );
};

export default ExploreDropdown;