import { useState } from "react";
import ContentListItem from "./ContentListItem";

const ChevronDown = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <polyline points="3,5.5 8,10.5 13,5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CompleteBadge = () => (
  <span className="topic-complete-badge">
    <svg viewBox="0 0 14 14" fill="none" width="12" height="12" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="7" r="6" fill="var(--success, #16a34a)" />
      <polyline points="3.5,7.5 5.5,9.5 10.5,4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    Complete
  </span>
);

function TopicSection({ topic, courseId, activeContentId, completedSet = new Set(), defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  const hasActive    = topic.content.some((c) => c.contentId === activeContentId);
  const allCompleted = topic.content.length > 0 && topic.content.every((c) => completedSet.has(c.contentId));

  return (
    <div className={`topic-section ${open ? "is-open" : ""} ${hasActive ? "has-active" : ""}`}>
      <button
        className="topic-section-header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={`topic-chevron ${open ? "rotated" : ""}`}>
          <ChevronDown />
        </span>
        <span className="topic-section-title">{topic.title}</span>
        {allCompleted && <CompleteBadge />}
      </button>

      {open && (
        <ul className="topic-content-list">
          {topic.content.map((c) => (
            <ContentListItem
              key={c.contentId}
              content={c}
              courseId={courseId}
              isActive={c.contentId === activeContentId}
              isCompleted={completedSet.has(c.contentId)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TopicSection;
