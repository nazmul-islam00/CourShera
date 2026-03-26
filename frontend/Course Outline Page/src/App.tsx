import { CourseHeader } from './components/CourseHeader';
import { CourseHero } from './components/CourseHero';
import { CourseSyllabus } from './components/CourseSyllabus';
import { WhatYouWillLearn } from './components/WhatYouWillLearn';
import { Instructors } from './components/Instructors';
import { SkillsYouWillGain } from './components/SkillsYouWillGain';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <CourseHeader />
      <CourseHero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WhatYouWillLearn />
            <CourseSyllabus />
          </div>
          <div className="lg:col-span-1">
            <SkillsYouWillGain />
            <Instructors />
          </div>
        </div>
      </div>
    </div>
  );
}
