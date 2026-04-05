const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <line x1="1.5" y1="6" x2="14.5" y2="6" stroke="currentColor" strokeWidth="1.4" />
    <line x1="5" y1="1" x2="5" y2="4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <line x1="11" y1="1" x2="11" y2="4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <polyline points="8,4.5 8,8 10.5,9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function LearnProgressPanel({ courseTitle }) {
  const deadlines = [
    { label: "First topic quiz", date: "Due in 3 days", type: "Graded Assignment" },
    { label: "Module 1 assessment", date: "Due in 7 days", type: "Graded Assignment" },
  ];

  return (
    <aside className="learn-right-panel">
      <div className="learn-panel-card">
        <h3 className="learn-panel-card-title">Learning plan</h3>
        <p className="learn-panel-card-body">
          Learners with a plan are 75% more likely to complete their courses. Set a
          learning plan now to take charge of your journey.
        </p>
        <button className="learn-panel-outline-btn">Set your learning plan</button>
      </div>

      <div className="learn-panel-card">
        <h3 className="learn-panel-card-title">Course timeline</h3>
        <p className="learn-panel-card-subtitle">Personalize your milestones</p>
        <p className="learn-panel-card-body">
          Set a weekly goal to customize your course timeline and tailor your due dates.
        </p>

        <div className="learn-panel-meta-row">
          <CalendarIcon />
          <span>Start date: <strong>Today</strong></span>
        </div>

        <p className="learn-panel-deadlines-label">Your next two deadlines</p>
        <ul className="learn-panel-deadlines">
          {deadlines.map((d, i) => (
            <li key={i} className="learn-panel-deadline-item">
              <ClockIcon />
              <div>
                <span className="deadline-label">{d.label}</span>
                <span className="deadline-date">{d.date}</span>
                <span className="deadline-type">{d.type}</span>
              </div>
            </li>
          ))}
        </ul>

        <button className="learn-panel-link-btn">View all deadlines</button>
      </div>
    </aside>
  );
}

export default LearnProgressPanel;
