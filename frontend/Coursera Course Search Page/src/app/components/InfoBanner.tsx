import { X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface InfoBannerProps {
  onDismiss: () => void;
}

export function InfoBanner({ onDismiss }: InfoBannerProps) {
  return (
    <div className="bg-blue-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700">
              <span className="font-semibold">Exploring the Hardware Engineer role?</span>{' '}
              Set it as your role and get personalized recommendations
            </span>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
              Confirm role
            </Button>
          </div>
          <button
            onClick={onDismiss}
            className="text-gray-500 hover:text-gray-700 ml-4"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
