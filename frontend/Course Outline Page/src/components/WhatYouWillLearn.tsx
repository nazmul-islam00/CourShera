import { CheckCircle2 } from 'lucide-react';

const learningOutcomes = [
  'Build and train deep neural networks, implement vectorized neural networks, identify architecture parameters, and apply DL to your applications',
  'Use best practices to train and develop test sets and analyze bias/variance for building DL applications, use standard NN techniques, apply optimization algorithms, and implement a neural network in TensorFlow',
  'Build a Convolutional Neural Network, apply it to visual detection and recognition tasks, use neural style transfer to generate art, and apply these algorithms to image, video, and other 2D/3D data',
  'Build and train Recurrent Neural Networks and its variants (GRU, LSTM), apply RNNs to character-level language modeling, work with NLP and Word Embeddings, and use HuggingFace tokenizers and transformers',
];

export function WhatYouWillLearn() {
  return (
    <div className="mb-12">
      <h2 className="text-3xl mb-6">What you'll learn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {learningOutcomes.map((outcome, idx) => (
          <div key={idx} className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-gray-700">{outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
