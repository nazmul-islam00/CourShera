import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { categories, levels, durations } from '@/app/data/courses';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  selectedDuration: string;
  onDurationChange: (value: string) => void;
  showFreeOnly: boolean;
  onFreeOnlyToggle: () => void;
  onClearFilters: () => void;
  resultsCount: number;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  selectedDuration,
  onDurationChange,
  showFreeOnly,
  onFreeOnlyToggle,
  onClearFilters,
  resultsCount,
}: SearchFiltersProps) {
  const hasActiveFilters =
    selectedCategory !== 'All Categories' ||
    selectedLevel !== 'All Levels' ||
    selectedDuration !== 'All Durations' ||
    showFreeOnly ||
    searchQuery !== '';

  return (
    <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search for courses, skills, or providers..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-6 text-base"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-gray-700">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium">Filters:</span>
          </div>

          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLevel} onValueChange={onLevelChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDuration} onValueChange={onDurationChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Duration" />
            </SelectTrigger>
            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration} value={duration}>
                  {duration}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={showFreeOnly ? 'default' : 'outline'}
            onClick={onFreeOnlyToggle}
            className={showFreeOnly ? 'bg-blue-600 hover:bg-blue-700' : ''}
          >
            Free Courses Only
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={onClearFilters}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {resultsCount} {resultsCount === 1 ? 'course' : 'courses'} found
          </Badge>
        </div>
      </div>
    </div>
  );
}
