import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, FileText, PlayCircle, HelpCircle } from "lucide-react";

function CourseSyllabus({ modules }) {
  const safeModules = Array.isArray(modules) ? modules : [];
  const firstId = safeModules[0]?.id ?? 1;
  const [expandedModules, setExpandedModules] = useState(new Set([firstId]));

  const toggleModule = (id) => {
    const next = new Set(expandedModules);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedModules(next);
  };

  const getIcon = (type) => {
    if (type === "video") return <PlayCircle size={16} />;
    if (type === "reading") return <FileText size={16} />;
    if (type === "quiz") return <CheckCircle size={16} />;
    return <HelpCircle size={16} />;
  };

  return (
    <section className="outline-block">
      <h2 className="outline-block-title">Syllabus</h2>

      <div className="outline-module-list">
        {safeModules.map((module) => {
          const isExpanded = expandedModules.has(module.id);
          const hasItems = Array.isArray(module.items) && module.items.length > 0;

          return (
            <article key={module.id} className="outline-module-card">
              <button
                type="button"
                className="outline-module-head"
                onClick={() => toggleModule(module.id)}
              >
                <div className="outline-module-head-main">
                  <div className="outline-module-week">
                    <span>Week {module.id}</span>
                    {module.duration && (
                      <>
                        <span>•</span>
                        <span>{module.duration} to complete</span>
                      </>
                    )}
                  </div>
                  <h3>{module.title}</h3>
                  {!isExpanded && module.description && <p>{module.description}</p>}
                </div>
                <span className="outline-module-chevron" aria-hidden="true">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              {isExpanded && (
                <div className="outline-module-body">
                  {module.description && <p>{module.description}</p>}
                  
                  <div className="outline-item-list">
                    {hasItems ? (
                      module.items.map((item, idx) => (
                        <div className="outline-item-row" key={`${module.id}-${idx}-${item.title}`}>
                          <div className="outline-item-main">
                            {getIcon(item.type)}
                            <span>{item.title}</span>
                          </div>
                          {item.duration && (
                            <span className="outline-item-duration">{item.duration}</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="outline-item-row no-items">
                        <span className="outline-no-content-text">
                          Module content and resources are currently being updated.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default CourseSyllabus;