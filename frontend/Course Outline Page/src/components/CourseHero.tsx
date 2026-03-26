import { Star, Users, Clock, Award, Globe } from 'lucide-react';

export function CourseHero() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-start gap-2 mb-4">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">COURSE</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl mb-4">Neural Networks and Deep Learning</h1>
        
        <p className="text-lg text-gray-700 mb-6 max-w-3xl">
          In the first course of the Deep Learning Specialization, you will study the foundational concept of neural networks and deep learning.
        </p>
        
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
              <span className="ml-1 font-semibold">4.9</span>
            </div>
            <span className="text-gray-600 text-sm">(120,654 reviews)</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Users className="w-5 h-5" />
            <span>2M+ students enrolled</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button className="bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 font-semibold">
            Enroll for Free
          </button>
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded hover:bg-blue-50 font-semibold">
            Try for Free
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-300">
          <div>
            <div className="text-sm text-gray-600 mb-1">Instructor</div>
            <div className="font-semibold">Andrew Ng</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Duration</div>
            <div className="font-semibold flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Approx. 29 hours
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Level</div>
            <div className="font-semibold">Beginner</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Language</div>
            <div className="font-semibold flex items-center gap-1">
              <Globe className="w-4 h-4" />
              English
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
