import { Star } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import type { Course } from '@/app/data/courses';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { courseImages } from '@/app/utils/courseImages';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col h-full border border-gray-200">
      <div className="relative h-40 bg-gray-100 overflow-hidden">
        <ImageWithFallback
          src={courseImages[course.image] || courseImages['machine learning code']}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        {course.badge && (
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge variant="secondary" className="bg-white text-gray-800 text-xs px-2 py-0.5 font-medium">
              {course.badge}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-xs font-semibold text-blue-700">
            {course.provider.charAt(0)}
          </div>
          <p className="text-xs text-gray-700 font-normal">{course.provider}</p>
        </div>
        
        <h3 className="text-base font-normal mb-3 line-clamp-2 text-gray-900 min-h-[3rem]">
          {course.title}
        </h3>
        
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-900 mb-1">Skills you'll gain:</p>
          <p className="text-xs text-gray-700 line-clamp-2 font-normal">
            {course.skills.join(', ')}
          </p>
        </div>
        
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-blue-700 text-blue-700" />
          <span className="text-sm font-semibold text-gray-900">{course.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-600 font-normal">
            ({course.reviews.toLocaleString()} reviews)
          </span>
        </div>
        
        <div className="text-xs text-gray-700 mt-auto font-normal">
          {course.level} · {course.productType} · {course.duration}
        </div>
      </div>
    </Card>
  );
}