import { Search, Globe, Bell, ChevronDown } from 'lucide-react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <>
      {/* Top Dark Bar */}
      <div className="bg-black text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 py-2">
            <button className="hover:underline">For Individuals</button>
            <button className="hover:underline">For Businesses</button>
            <button className="hover:underline">For Universities</button>
            <button className="hover:underline">For Governments</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">coursera</span>
              </div>
              
              <nav className="hidden md:flex items-center gap-6">
                <button className="text-gray-700 hover:text-blue-600 flex items-center gap-1">
                  Explore
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="text-gray-700 hover:text-blue-600">
                  My Learning
                </button>
                <button className="text-gray-700 hover:text-blue-600">
                  Degrees
                </button>
              </nav>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pr-10"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-1.5 rounded hover:bg-blue-700">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Globe className="w-5 h-5" />
              </button>
              <button className="relative text-gray-600 hover:text-gray-900">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center p-0 rounded-full">
                  1
                </Badge>
              </button>
              <Avatar className="w-8 h-8 bg-gray-800">
                <AvatarFallback className="bg-gray-800 text-white text-sm">D</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}