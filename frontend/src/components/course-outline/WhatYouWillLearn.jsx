import { CheckCircle2 } from "lucide-react";

function WhatYouWillLearn({ outcomes }) {
  return (
    <section className="outline-block">
      <h2 className="outline-block-title">What you'll learn</h2>
      <div className="outline-learn-grid">
        {outcomes.map((outcome, idx) => (
          <div key={`${idx}-${outcome.slice(0, 12)}`} className="outline-learn-item">
            <CheckCircle2 className="outline-check" size={18} />
            <p>{outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhatYouWillLearn;
