import { useState } from 'react';
import { ChevronDown, ChevronUp, PlayCircle, FileText, CheckCircle } from 'lucide-react';

interface Module {
  id: number;
  title: string;
  duration: string;
  description: string;
  items: {
    type: 'video' | 'reading' | 'quiz';
    title: string;
    duration: string;
  }[];
}

const modules: Module[] = [
  {
    id: 1,
    title: 'Introduction to Deep Learning',
    duration: '4 hours',
    description: 'Understand the major trends driving the rise of deep learning, and give examples of where and how it is applied today.',
    items: [
      { type: 'video', title: 'Welcome', duration: '1 min' },
      { type: 'video', title: 'What is a Neural Network?', duration: '5 min' },
      { type: 'video', title: 'Supervised Learning with Neural Networks', duration: '7 min' },
      { type: 'video', title: 'Why is Deep Learning Taking Off?', duration: '6 min' },
      { type: 'reading', title: 'About this Course', duration: '10 min' },
      { type: 'quiz', title: 'Introduction to Deep Learning', duration: '30 min' },
    ],
  },
  {
    id: 2,
    title: 'Neural Networks Basics',
    duration: '8 hours',
    description: 'Learn to set up a machine learning problem with a neural network mindset. Learn to use vectorization to speed up your models.',
    items: [
      { type: 'video', title: 'Binary Classification', duration: '8 min' },
      { type: 'video', title: 'Logistic Regression', duration: '7 min' },
      { type: 'video', title: 'Logistic Regression Cost Function', duration: '6 min' },
      { type: 'video', title: 'Gradient Descent', duration: '5 min' },
      { type: 'video', title: 'Derivatives', duration: '4 min' },
      { type: 'video', title: 'Computation Graph', duration: '5 min' },
      { type: 'video', title: 'Vectorization', duration: '8 min' },
      { type: 'reading', title: 'Python and Vectorization', duration: '10 min' },
      { type: 'quiz', title: 'Neural Networks Basics', duration: '30 min' },
    ],
  },
  {
    id: 3,
    title: 'Shallow Neural Networks',
    duration: '7 hours',
    description: 'Learn to build a neural network with one hidden layer, using forward propagation and backpropagation.',
    items: [
      { type: 'video', title: 'Neural Networks Overview', duration: '5 min' },
      { type: 'video', title: 'Neural Network Representation', duration: '6 min' },
      { type: 'video', title: 'Computing a Neural Network Output', duration: '7 min' },
      { type: 'video', title: 'Vectorizing Across Multiple Examples', duration: '8 min' },
      { type: 'video', title: 'Activation Functions', duration: '9 min' },
      { type: 'video', title: 'Gradient Descent for Neural Networks', duration: '7 min' },
      { type: 'reading', title: 'Shallow Neural Networks', duration: '10 min' },
      { type: 'quiz', title: 'Shallow Neural Networks', duration: '30 min' },
    ],
  },
  {
    id: 4,
    title: 'Deep Neural Networks',
    duration: '10 hours',
    description: 'Understand the key computations underlying deep learning, use them to build and train deep neural networks, and apply it to computer vision.',
    items: [
      { type: 'video', title: 'Deep L-layer Neural Network', duration: '5 min' },
      { type: 'video', title: 'Forward Propagation in a Deep Network', duration: '7 min' },
      { type: 'video', title: 'Getting Your Matrix Dimensions Right', duration: '6 min' },
      { type: 'video', title: 'Why Deep Representations?', duration: '5 min' },
      { type: 'video', title: 'Building Blocks of Deep Neural Networks', duration: '8 min' },
      { type: 'video', title: 'Forward and Backward Propagation', duration: '7 min' },
      { type: 'video', title: 'Parameters vs Hyperparameters', duration: '5 min' },
      { type: 'reading', title: 'Deep Neural Networks', duration: '10 min' },
      { type: 'quiz', title: 'Deep Neural Networks', duration: '30 min' },
    ],
  },
];

export function CourseSyllabus() {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1]));

  const toggleModule = (id: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedModules(newExpanded);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="w-4 h-4 text-gray-500" />;
      case 'reading':
        return <FileText className="w-4 h-4 text-gray-500" />;
      case 'quiz':
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl mb-6">Syllabus</h2>
      <div className="space-y-4">
        {modules.map((module) => {
          const isExpanded = expandedModules.has(module.id);
          return (
            <div key={module.id} className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full px-6 py-4 bg-white hover:bg-gray-50 flex items-center justify-between text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-semibold text-lg">Week {module.id}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-gray-600">{module.duration} to complete</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{module.title}</h3>
                  {!isExpanded && (
                    <p className="text-gray-600 text-sm">{module.description}</p>
                  )}
                </div>
                <div className="ml-4">
                  {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-500" />
                  )}
                </div>
              </button>
              
              {isExpanded && (
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
                  <p className="text-gray-700 mb-4">{module.description}</p>
                  <div className="space-y-2">
                    {module.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 hover:bg-white rounded px-3 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {getIcon(item.type)}
                          <span className="text-sm">{item.title}</span>
                        </div>
                        <span className="text-sm text-gray-500">{item.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
