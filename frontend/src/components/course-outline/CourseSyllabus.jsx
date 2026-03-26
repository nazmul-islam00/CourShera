import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, FileText, PlayCircle } from "lucide-react";

function CourseSyllabus({ modules }) {
  const firstId = modules[0]?.id ?? 1;
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
    return <PlayCircle size={16} />;
  };

  return (
    <section className="outline-block">
      <h2 className="outline-block-title">Syllabus</h2>

      <div className="outline-module-list">
        {modules.map((module) => {
          const isExpanded = expandedModules.has(module.id);

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
                    <span>•</span>
                    <span>{module.duration} to complete</span>
                  </div>
                  <h3>{module.title}</h3>
                  {!isExpanded && <p>{module.description}</p>}
                </div>
                <span className="outline-module-chevron" aria-hidden="true">
                  {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </span>
              </button>

              {isExpanded && (
                <div className="outline-module-body">
                  <p>{module.description}</p>
                  <div className="outline-item-list">
                    {module.items.map((item, idx) => (
                      <div className="outline-item-row" key={`${module.id}-${idx}-${item.title}`}>
                        <div className="outline-item-main">
                          {getIcon(item.type)}
                          <span>{item.title}</span>
                        </div>
                        <span className="outline-item-duration">{item.duration}</span>
                      </div>
                    ))}
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
