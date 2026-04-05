import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, ChevronDown, ChevronRight, FileText, PlayCircle } from "lucide-react";
import { fetchEnrolledCourseContent } from "../api/api";
import "../styles/CourseContentPage.css";

const getContentLabel = (content) => {
  if (content.content_url) {
    return "Video";
  }
  return "Reading";
};

const getContentTitle = (content, index) => {
  return `Lecture ${index + 1}`;
};

function CourseContentPage() {
  const { courseId } = useParams();
  const [courseContent, setCourseContent] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState("");
  const [openTopics, setOpenTopics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadCourseContent() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchEnrolledCourseContent(courseId, controller.signal);
        setCourseContent(data);

        const firstModuleId = data?.modules?.[0]?.module_id || "";
        setActiveModuleId(firstModuleId);

        const firstTopicId = data?.modules?.[0]?.topics?.[0]?.topic_id;
        setOpenTopics(firstTopicId ? { [firstTopicId]: true } : {});
      } catch (err) {
        if (err.name !== "AbortError") {
          setCourseContent(null);
          setError(err.message || "Failed to load course content.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadCourseContent();

    return () => controller.abort();
  }, [courseId]);

  const activeModule = useMemo(() => {
    if (!courseContent?.modules?.length) {
      return null;
    }

    return (
      courseContent.modules.find((module) => module.module_id === activeModuleId) ||
      courseContent.modules[0]
    );
  }, [courseContent, activeModuleId]);

  const handleSelectModule = (moduleId) => {
    setActiveModuleId(moduleId);

    const nextModule = courseContent?.modules?.find((module) => module.module_id === moduleId);
    const firstTopicId = nextModule?.topics?.[0]?.topic_id;
    setOpenTopics(firstTopicId ? { [firstTopicId]: true } : {});
  };

  const toggleTopic = (topicId) => {
    setOpenTopics((previous) => ({
      ...previous,
      [topicId]: !previous[topicId],
    }));
  };

  return (
    <div className="course-content-page-root">
      {loading && (
        <main className="container content-status-wrap">
          <p className="home-status">Loading course content...</p>
        </main>
      )}

      {!loading && error && (
        <main className="container content-status-wrap">
          <p className="home-status home-status-error">{error}</p>
          <Link to={`/course/${courseId}`} className="outline-back-link">
            Back to Course Outline
          </Link>
        </main>
      )}

      {!loading && !error && courseContent && (
        <main className="course-content-layout">
          <aside className="course-content-sidebar">
            <h2 className="course-content-title">{courseContent.title}</h2>
            <p className="course-content-subtitle">Course Material</p>

            <div className="course-module-list">
              {courseContent.modules.map((module, index) => {
                const isActive = module.module_id === activeModule?.module_id;

                return (
                  <button
                    key={module.module_id}
                    type="button"
                    className={`course-module-item ${isActive ? "active" : ""}`}
                    onClick={() => handleSelectModule(module.module_id)}
                  >
                    <span className="course-module-index">Week {index + 1}</span>
                    <span className="course-module-name">{module.title}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="course-content-main">
            {activeModule && (
              <div className="module-panel">
                <div className="module-panel-header">
                  <BookOpen size={18} />
                  <h3>{activeModule.title}</h3>
                </div>

                {activeModule.description && (
                  <p className="module-panel-description">{activeModule.description}</p>
                )}

                <div className="topic-accordion">
                  {activeModule.topics.length === 0 && (
                    <p className="module-empty-text">No topics have been added to this module yet.</p>
                  )}

                  {activeModule.topics.map((topic) => {
                    const isOpen = Boolean(openTopics[topic.topic_id]);

                    return (
                      <article key={topic.topic_id} className="topic-card">
                        <button
                          type="button"
                          className="topic-card-header"
                          onClick={() => toggleTopic(topic.topic_id)}
                        >
                          <span className="topic-title">{topic.title}</span>
                          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        </button>

                        {isOpen && (
                          <div className="topic-content-list">
                            {topic.contents.length === 0 && (
                              <div className="content-row empty">No content in this topic yet.</div>
                            )}

                            {topic.contents.map((content, index) => (
                              <div className="content-row" key={content.content_id}>
                                <span className="content-icon-wrap">
                                  {content.content_url ? <PlayCircle size={17} /> : <FileText size={17} />}
                                </span>

                                <div className="content-meta">
                                  <div className="content-title">{getContentTitle(content, index)}</div>
                                  <div className="content-type">{getContentLabel(content)}</div>
                                  {content.transcript && (
                                    <p className="content-transcript">{content.transcript}</p>
                                  )}
                                </div>

                                {content.content_url && (
                                  <a
                                    href={content.content_url}
                                    className="content-link"
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Open
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {!activeModule && (
              <div className="module-panel">
                <div className="module-panel-header">
                  <BookOpen size={18} />
                  <h3>Course Content</h3>
                </div>
                <p className="module-panel-description">
                  No modules are available for this course yet.
                </p>
              </div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

export default CourseContentPage;
