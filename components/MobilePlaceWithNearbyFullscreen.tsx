'use client';

import { ReactNode, useState } from 'react';
import DashboardLayout from './DashboardLayout';

interface NearbyPlace {
  name: string;
  image: string;
  description: string;
}

interface MobilePlaceWithNearbyFullscreenProps {
  children: ReactNode;
  backgroundImage: string;
  title: string;
  onContentClick?: () => void;
  nearbyPlaces: NearbyPlace[];
  contentClassName?: string;
}

export default function MobilePlaceWithNearbyFullscreen({ 
  children, 
  backgroundImage, 
  title,
  onContentClick,
  nearbyPlaces,
  contentClassName = ""
}: MobilePlaceWithNearbyFullscreenProps) {
  const [expandedPlace, setExpandedPlace] = useState<number | null>(null);
  const [showNearbyPlaces, setShowNearbyPlaces] = useState(false);

  const togglePlace = (index: number) => {
    setExpandedPlace(expandedPlace === index ? null : index);
  };

  return (
    <DashboardLayout>
      {/* Desktop View - Original Layout with Nearby Places */}
      <div className="hidden lg:block h-full w-full">
        <div
          className="h-full w-full bg-cover bg-center rounded-2xl flex"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
          {/* Places nearby tree structure - Left side */}
          <div className="flex-1 flex items-center justify-start pl-8">
            <div className="w-80">
              <div className="text-white text-3xl font-bold mb-6 border-l-4 border-blue-400 pl-4">
                Places Nearby
              </div>
              
              <div className="space-y-1 pl-4 border-l-2 border-gray-600">
                {nearbyPlaces.map((place, index) => (
                  <div key={index}>
                    {/* Place name - clickable */}
                    <div 
                      className="text-white cursor-pointer hover:text-blue-300 transition-colors duration-200 flex items-center py-1"
                      onClick={() => togglePlace(index)}
                    >
                      <span className="mr-3 text-sm transform transition-transform duration-300 ease-in-out">
                        {expandedPlace === index ? '▼' : '▶'}
                      </span>
                      <span className="text-lg">{place.name}</span>
                    </div>
                    
                    {/* Expanded content with animation */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedPlace === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="ml-8 mt-3 mb-4 transform transition-all duration-500 ease-in-out">
                        <div 
                          className="relative w-64 h-40 bg-cover bg-center rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-110"
                          style={{ backgroundImage: `url('${place.image}')` }}
                        >
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4">
                            <p className="text-white text-sm text-center font-medium">
                              {place.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main text container - Right side */}
          <div className="flex-1 flex items-center justify-center">
            <div 
              className={`bg-black/60 rounded-2xl p-6 mx-6 text-white text-center text-3xl font-semibold max-w-3xl cursor-pointer hover:bg-black/70 transition-all duration-300 animate-pulse ${contentClassName}`}
              onClick={onContentClick}
            >
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - With Fullscreen Nearby Places */}
      <div className="lg:hidden absolute inset-0 overflow-hidden rounded-2xl">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${backgroundImage}')` }}
        ></div>
        
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50"></div>
        
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

        {/* Places Nearby Section - Bottom */}
        <div className="absolute bottom-16 left-4 right-4 z-20">
          {/* Collapsible Places Nearby Header */}
          <div 
            className="text-white cursor-pointer hover:text-blue-300 transition-colors duration-200 flex items-center mb-3"
            onClick={() => setShowNearbyPlaces(!showNearbyPlaces)}
          >
            <span className="mr-3 text-sm transform transition-transform duration-300 ease-in-out">
              {showNearbyPlaces ? '▼' : '▶'}
            </span>
            <h3 className="text-lg font-bold border-l-4 border-blue-400 pl-3">
              Places Nearby
            </h3>
          </div>
        </div>

        {/* Full Screen Places Nearby Overlay */}
        {showNearbyPlaces && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-30 flex flex-col">
            {/* Header with close button */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="text-white text-xl font-bold border-l-4 border-blue-400 pl-3">
                Places Nearby
              </h2>
              <button
                onClick={() => setShowNearbyPlaces(false)}
                className="text-white hover:text-red-400 transition-colors duration-200 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Scrollable Places List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {nearbyPlaces.map((place, index) => (
                <div key={index} className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  {/* Place name */}
                  <h4 className="text-white text-lg font-semibold mb-3">
                    {place.name}
                  </h4>
                  
                  {/* Place image and description */}
                  <div 
                    className="relative w-full h-48 bg-cover bg-center rounded-lg overflow-hidden shadow-lg mb-3"
                    style={{ backgroundImage: `url('${place.image}')` }}
                  >
                    <div className="absolute inset-0 bg-black/30"></div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-white text-sm leading-relaxed">
                    {place.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom instruction */}
            <div className="p-4 border-t border-white/20">
              <p className="text-white text-xs text-center opacity-70">
                Tap × to close • Scroll to explore all nearby places
              </p>
            </div>
          </div>
        )}

        {/* Mobile Instructions - Bottom */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <p className="text-white text-xs text-center bg-black/60 rounded-lg px-3 py-2 backdrop-blur-sm">
            Tap the description box for more images • Tap nearby places to explore
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
