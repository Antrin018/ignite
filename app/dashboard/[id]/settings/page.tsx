'use client';
import DashboardLayout from '@/components/DashboardLayout';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="h-full w-full flex items-center justify-center">
        <div className="max-w-md mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="text-lg font-light text-gray-600 mb-2">Credits</h1>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="space-y-5 text-gray-700">
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-base font-semibold leading-relaxed">Website created by Antrin Maji-B24</p>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-base font-semibold leading-relaxed">Nearby places images taken by Rushikesh</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}