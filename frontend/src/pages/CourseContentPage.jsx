import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { fetchCourseLearn } from "../api/api";
// import { buildLearnModel } from "../utils/courseLearnModel";
import LearnSidebar from "../components/course-learn/LearnSidebar";
import TopicSection from "../components/course-learn/TopicSection";
import LearnProgressPanel from "../components/course-learn/LearnProgressPanel";
import "../styles/CourseContentPage.css";

const ChevronDown = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
    <polyline points="3,5.5 8,10.5 13,5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const VideoCountIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <polygon points="6.5,5.5 11.5,8 6.5,10.5" fill="currentColor" />
  </svg>
);

const AssessmentIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
    <rect x="2.5" y="1.5" width="11" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
    <line x1="5" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="5" y1="10.5" x2="8.5" y2="10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

function ModuleMainContent({ mod, courseId, activeContentId, completedSet }) {
  const [objectivesOpen, setObjectivesOpen] = useState(false);

  const videoCount    = mod.topics.reduce((acc, t) => acc + t.content.filter((c) => c.type === "video").length, 0);
  const exerciseCount = mod.topics.reduce((acc, t) => acc + t.content.filter((c) => c.type === "exercise").length, 0);

  const activeTopicId = mod.topics.find((t) =>
    t.content.some((c) => c.contentId === activeContentId)
  )?.topicId;

  return (
    <section className="learn-module-content">
      <div className="learn-module-header">
        <h1 className="learn-module-title">{mod.title}</h1>
        <div className="learn-module-stats">
          {videoCount > 0 && (
            <span className="learn-module-stat">
              <VideoCountIcon />
              {videoCount} video{videoCount !== 1 ? "s" : ""}
            </span>
          )}
          {exerciseCount > 0 && (
            <span className="learn-module-stat">
              <AssessmentIcon />
              {exerciseCount} graded assessment{exerciseCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      <p className="learn-module-description">
        In this module, you'll explore <strong>{mod.title}</strong>. Work through the videos and
        readings at your own pace, then test your understanding with the exercises.
      </p>

      <button
        className={`learn-objectives-toggle ${objectivesOpen ? "open" : ""}`}
        onClick={() => setObjectivesOpen((o) => !o)}
      >
        <ChevronDown />
        <span>{objectivesOpen ? "Hide" : "Show"} Learning Objectives</span>
      </button>

      {objectivesOpen && (
        <ul className="learn-objectives-list">
          {mod.topics.map((t) => (
            <li key={t.topicId}>Understand and apply: <strong>{t.title}</strong></li>
          ))}
        </ul>
      )}

      <div className="learn-topics-list">
        {mod.topics.map((topic) => (
          <TopicSection
            key={topic.topicId}
            topic={topic}
            courseId={courseId}
            activeContentId={activeContentId}
            completedSet={completedSet}
            defaultOpen={topic.topicId === activeTopicId || activeTopicId == null}
          />
        ))}
      </div>
    </section>
  );
}

function CourseContentPage() {
  const { courseId } = useParams();
  const [searchParams]         = useSearchParams();
  const [learn, setLearn]      = useState(null);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState("");
  const [activeModuleId, setActiveModuleId] = useState(null);

  const activeContentId = searchParams.get("content") || null;

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");
        const raw    = await fetchCourseLearn(courseId, controller.signal);
        // const mapped = buildLearnModel(raw);
        const mapped = null;
        if (!mapped) { setError("Course not found"); return; }
        setLearn(mapped);

        if (mapped.modules.length > 0) {
          const modWithActive = mapped.modules.find((m) =>
            m.topics.some((t) => t.content.some((c) => c.contentId === activeContentId))
          );
          setActiveModuleId(modWithActive?.moduleId ?? mapped.modules[0].moduleId);
        }
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to load course");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [courseId]);

  const activeModule = learn?.modules.find((m) => m.moduleId === activeModuleId)
                    ?? learn?.modules[0];

  const completedSet = new Set();

  return (
    <div className="learn-page-root">
      {loading && (
        <main className="container outline-status-wrap">
          <p className="home-status">Loading course…</p>
        </main>
      )}

      {!loading && error && (
        <main className="container outline-status-wrap">
          <p className="home-status home-status-error">{error}</p>
          <Link to="/" className="outline-back-link">Back to Home</Link>
        </main>
      )}

      {!loading && !error && learn && (
        <div className="learn-layout">
          <LearnSidebar
            courseId={courseId}
            courseTitle={learn.title}
            modules={learn.modules}
            activeModuleId={activeModule?.moduleId}
            onSelectModule={setActiveModuleId}
          />

          {activeModule && (
            <ModuleMainContent
              mod={activeModule}
              courseId={courseId}
              activeContentId={activeContentId}
              completedSet={completedSet}
            />
          )}

          <LearnProgressPanel courseTitle={learn.title} />
        </div>
      )}
    </div>
  );
}

export default CourseContentPage;