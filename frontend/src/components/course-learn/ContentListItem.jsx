import { Link } from "react-router-dom";

const VideoIcon = () => (
  <svg className="content-item-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="8,6.5 14.5,10 8,13.5" fill="currentColor" />
  </svg>
);

const ReadingIcon = () => (
  <svg className="content-item-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="2" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="6" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="10.5" x2="14" y2="10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="6" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ExerciseIcon = () => (
  <svg className="content-item-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <polyline points="6,10 9,13 14,7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg className="content-item-check" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" fill="var(--success, #16a34a)" />
    <polyline points="5.5,10.5 8.5,13.5 14.5,7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmptyCircle = () => (
  <svg className="content-item-check" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" stroke="var(--border, #d1d5db)" strokeWidth="1.5" />
  </svg>
);

const typeIcon = (type) => {
  if (type === "reading")  return <ReadingIcon />;
  if (type === "exercise") return <ExerciseIcon />;
  return <VideoIcon />;
};

const MOCK_DURATIONS = {
  video:    ["8 min", "11 min", "14 min", "18 min", "9 min", "12 min", "20 min"],
  reading:  ["20 min", "30 min", "15 min"],
  exercise: ["Graded Assignment"],
};

function mockDuration(type, contentId) {
  const pool = MOCK_DURATIONS[type] || MOCK_DURATIONS.video;
  const seed = contentId.charCodeAt(contentId.length - 1);
  return pool[seed % pool.length];
};

function ContentListItem({ content, courseId, isActive, isCompleted }) {
  const duration = mockDuration(content.type, content.contentId);

  return (
    <li className={`content-list-item ${isActive ? "is-active" : ""} ${isCompleted ? "is-completed" : ""}`}>
      <div className="content-item-progress-col">
        {isCompleted ? <CheckIcon /> : <EmptyCircle />}
      </div>

      <div className="content-item-type-col">
        {typeIcon(content.type)}
      </div>

      <div className="content-item-body">
        <Link
          to={`/course/${courseId}/content/${content.contentId}`}
          className="content-item-title"
        >
          {content.title}
        </Link>
        <span className="content-item-meta">
          {content.typeLabel} · {duration}
        </span>
      </div>

      {isActive && (
        <Link
          to={`/course/${courseId}/content/${content.contentId}`}
          className="content-item-resume-btn"
        >
          Resume
        </Link>
      )}
    </li>
  );
}

export default ContentListItem;
