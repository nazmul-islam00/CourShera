import { Search, ShoppingCart, ChevronDown } from 'lucide-react';

export function CourseHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <svg className="w-28 h-6" viewBox="0 0 112 24" fill="none">
                <text x="0" y="18" className="text-xl font-bold fill-blue-600">coursera</text>
              </svg>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600">
                Explore <ChevronDown className="w-4 h-4" />
              </button>
              <button className="text-sm text-gray-700 hover:text-blue-600">
                Find your New Career
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="What do you want to learn?" 
                className="bg-transparent border-none outline-none text-sm w-full"
              />
            </div>
            <button className="text-sm text-blue-600 hover:underline hidden md:block">
              Log In
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
              Join for Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
