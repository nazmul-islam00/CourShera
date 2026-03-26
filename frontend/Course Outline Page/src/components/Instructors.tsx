import { ImageWithFallback } from './figma/ImageWithFallback';

export function Instructors() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="font-semibold text-xl mb-4">Instructor</h3>
      
      <div className="flex items-start gap-4 mb-4">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758875569897-5e214ccc4e17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbnN0cnVjdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY4OTI2MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Andrew Ng"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-lg">Andrew Ng</h4>
          <p className="text-sm text-gray-600 mb-1">CEO/Founder Landing AI; Co-founder, Coursera</p>
          <p className="text-sm text-gray-600">DeepLearning.AI</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        Andrew Ng is a globally recognized leader in AI. He is Founder of DeepLearning.AI, Founder & CEO of Landing AI, General Partner at AI Fund, Chairman and Co-Founder of Coursera, and an Adjunct Professor at Stanford University.
      </p>

      <div className="border-t border-gray-200 pt-4">
        <div className="text-sm text-gray-600 mb-1">Instructor rating</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">4.9</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-2">345,678 Reviews</div>
        <div className="text-sm text-gray-600">4,234,567 Students</div>
        <div className="text-sm text-gray-600">25 Courses</div>
      </div>
    </div>
  );
}
