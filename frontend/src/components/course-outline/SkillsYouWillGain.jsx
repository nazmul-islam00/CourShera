function SkillsYouWillGain({ skills }) {
  return (
    <aside className="outline-side-card outline-skills-card">
      <h3>Skills you'll gain</h3>
      <div className="outline-skill-list">
        {skills.map((skill, idx) => (
          <span key={`${idx}-${skill}`} className="outline-skill-chip">
            {skill}
          </span>
        ))}
      </div>
    </aside>
  );
}

export default SkillsYouWillGain;
