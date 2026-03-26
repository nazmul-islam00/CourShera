export function SkillsYouWillGain() {
  const skills = [
    'Deep Learning',
    'Artificial Neural Network',
    'Backpropagation',
    'Python Programming',
    'Neural Network Architecture',
    'Tensorflow',
    'Machine Learning',
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="font-semibold text-xl mb-4">Skills you'll gain</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
