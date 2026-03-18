import { useState, useMemo } from 'react';
import { Header } from '@/app/components/Header';
import { FilterBar } from '@/app/components/FilterBar';
import { InfoBanner } from '@/app/components/InfoBanner';
import { CourseCard } from '@/app/components/CourseCard';
import { RelatedSearches } from '@/app/components/RelatedSearches';
import { courses } from '@/app/data/courses';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('computer vision');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [selectedDuration, setSelectedDuration] = useState('All Durations');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search query filter
      const matchesSearch =
        searchQuery === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        selectedCategory === 'All Categories' ||
        course.category === selectedCategory;

      // Level filter
      const matchesLevel =
        selectedLevel === 'All Levels' || course.level === selectedLevel;

      // Duration filter
      const matchesDuration = (() => {
        if (selectedDuration === 'All Durations') return true;
        
        const durationMonths = parseInt(course.duration);
        if (selectedDuration === 'Less than 2 months') return durationMonths < 2;
        if (selectedDuration === '2-4 months') return durationMonths >= 2 && durationMonths <= 4;
        if (selectedDuration === '4-6 months') return durationMonths >= 4 && durationMonths <= 6;
        if (selectedDuration === 'More than 6 months') return durationMonths > 6;
        return true;
      })();

      // Free only filter
      const matchesFree = !showFreeOnly || course.price === 'Free';

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesDuration &&
        matchesFree
      );
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedDuration, showFreeOnly]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Results Title */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-normal text-gray-900">
            Results for "{searchQuery}"
          </h1>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        selectedDuration={selectedDuration}
        onDurationChange={setSelectedDuration}
        showFreeOnly={showFreeOnly}
        onFreeOnlyToggle={() => setShowFreeOnly(!showFreeOnly)}
      />

      {/* Info Banner */}
      {showBanner && <InfoBanner onDismiss={() => setShowBanner(false)} />}

      {/* Course Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </main>

      {/* Related Searches */}
      {filteredCourses.length > 0 && (
        <RelatedSearches searchQuery={searchQuery} />
      )}
    </div>
  );
}
