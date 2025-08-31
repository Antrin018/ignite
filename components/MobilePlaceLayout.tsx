'use client';

import { ReactNode } from 'react';
import DashboardLayout from './DashboardLayout';

interface MobilePlaceLayoutProps {
  children: ReactNode;
  backgroundImage: string;
  title: string;
  onContentClick?: () => void;
  contentClassName?: string;
}

export default function MobilePlaceLayout({ 
  children, 
  backgroundImage, 
  title,
  onContentClick,
  contentClassName = ""
}: MobilePlaceLayoutProps) {
  return (
    <DashboardLayout>
      {/* Desktop View */}
      <div className="hidden lg:block h-full w-full">
        <div
          className="h-full w-full bg-cover bg-center flex items-center justify-center rounded-2xl overflow-hidden"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
          <div 
            className={`bg-black/60 rounded-2xl p-6 mx-6 text-white text-center text-3xl font-semibold max-w-3xl cursor-pointer hover:bg-black/70 transition-all duration-300 animate-pulse ${contentClassName}`}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden absolute inset-0 overflow-hidden rounded-2xl">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        ></div>
        
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Mobile Title */}
        <div className="absolute top-4 left-4 z-20">
          <h1 className="text-lg font-bold text-white drop-shadow-lg">
            {title}
          </h1>
        </div>

        {/* Mobile Content Container */}
        <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
          <div 
            className={`bg-black/70 backdrop-blur-sm rounded-xl p-4 text-white text-center text-base font-medium max-w-sm cursor-pointer hover:bg-black/80 transition-all duration-300 ${contentClassName}`}
            onClick={onContentClick}
          >
            {children}
          </div>
        </div>

        {/* Mobile Instructions */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <p className="text-white text-xs text-center bg-black/60 rounded-lg px-3 py-2 backdrop-blur-sm">
            Tap the description box for more images
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
