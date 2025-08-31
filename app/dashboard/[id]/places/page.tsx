'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type CategoryType = 'entrance' | 'sports' | 'dining' | 'residence' | 'academic' | 'services';

interface Place {
  id: string;
  name: string;
  top: string;
  left: string;
  category: CategoryType;
}

const places: Place[] = [
  { id: 'main', name: 'MAIN GATE', top: '52%', left: '31%', category: 'entrance' },
  { id: 'indoor', name: 'Indoor Stadium Area', top: '60%', left: '38%', category: 'sports' },
  { id: 'mess', name: 'CDH2', top: '66%', left: '49%', category: 'dining' },
  { id: 'anamudi', name: 'Anamudi block', top: '73%', left: '49%', category: 'residence' },
  { id: 'phd-hostels', name: 'PHD hostels', top: '42%', left: '58%', category: 'residence' },
  { id: 'cdh1', name: 'CDH1', top: '36%', left: '62%', category: 'dining' },
  { id: 'cake-world', name: 'Cake World', top: '24%', left: '58%', category: 'dining' },
  { id: 'tasty', name: 'Tasty', top: '24%', left: '47%', category: 'dining' },
  { id: 'red-cafe', name: 'Red Cafe', top: '17%', left: '57%', category: 'dining' },
  { id: 'msb', name: 'MSB', top: '5%', left: '47%', category: 'academic' },
  { id: 'lhc', name: 'LHC', top: '4%', left: '55%', category: 'academic' },
  { id: 'psb', name: 'PSB', top: '11%', left: '55%', category: 'academic' },
  { id: 'library', name: 'Library', top: '16%', left: '43%', category: 'academic' },
  { id: 'csb', name: 'CSB', top: '15%', left: '63%', category: 'academic' },
  { id: 'bsb', name: 'BSB', top: '20%', left: '70%', category: 'academic' },
  { id: 'health', name: 'Guest house', top: '9%', left: '40%', category: 'services' },
  { id: 'kathinpara', name: 'Way to Kathinpara', top: '0%', left: '38%', category: 'entrance' }
];

// Optimized coordinates for landscape mode map pins
const landscapePinPositions: Record<string, { top: string; left: string }> = {
  'main': { top: '50%', left: '27%' },
  'indoor': { top: '58%', left: '37%' },
  'mess': { top: '71%', left: '48%' },
  'anamudi': { top: '85%', left: '48%' },
  'phd-hostels': { top: '40%', left: '57%' },
  'cdh1': { top: '30%', left: '60%' },
  'cake-world': { top: '13%', left: '52%' },
  'tasty': { top: '14%', left: '42%' },
  'red-cafe': { top: '5%', left: '48%' },
  'msb': { top: '-10%', left: '46%' },
  'lhc': { top: '-10%', left: '54%' },
  'psb': { top: '2%', left: '50%' },
  'library': { top: '7%', left: '39%' },
  'csb': { top: '5%', left: '58%' },
  'bsb': { top: '15%', left: '65%' },
  'health': { top: '-2%', left: '37%' },
  'kathinpara': { top: '-2%', left: '37%' }
};

const categoryIcons: Record<CategoryType, string> = {
  entrance: '🚪',
  sports: '🏃‍♂️',
  dining: '🍽️',
  residence: '🏠',
  academic: '📚',
  services: '🏥'
};

const categoryNames: Record<CategoryType, string> = {
  entrance: 'Entrances & Gates',
  sports: 'Sports & Recreation',
  dining: 'Dining & Cafes',
  residence: 'Hostels & Accommodation',
  academic: 'Academic Buildings',
  services: 'Services & Facilities'
};

export default function PlacesPage() {
  const { id: studentId } = useParams();
  const [loadedMarkers, setLoadedMarkers] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    // Check if mobile device is in landscape mode
    const checkMobileLandscape = () => {
      const isMobile = window.innerWidth <= 1024; // Increased range to include tablets
      const isLandscape = window.innerWidth > window.innerHeight;
      const mobileLandscape = isMobile && isLandscape;
      console.log('Mobile landscape check:', { isMobile, isLandscape, mobileLandscape, width: window.innerWidth, height: window.innerHeight });
      setIsMobileLandscape(mobileLandscape);
    };

    const handleOrientationChange = () => {
      // Add a small delay for orientation change to get correct dimensions
      setTimeout(checkMobileLandscape, 100);
    };

    checkMobileLandscape();
    window.addEventListener('resize', checkMobileLandscape);
    window.addEventListener('orientationchange', handleOrientationChange);

    // Desktop animation logic
    const animationShown = sessionStorage.getItem('campusMapAnimationShown');
    
    if (!animationShown) {
      places.forEach((_, index) => {
        setTimeout(() => {
          setLoadedMarkers(prev => new Set([...prev, index]));
        }, index * 150);
      });
      
      setTimeout(() => {
        setHasAnimated(true);
        sessionStorage.setItem('campusMapAnimationShown', 'true');
      }, places.length * 150 + 500);
    } else {
      setLoadedMarkers(new Set(places.map((_, index) => index)));
      setHasAnimated(true);
    }

    return () => {
      window.removeEventListener('resize', checkMobileLandscape);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  // Group places by category for mobile view
  const groupedPlaces = places.reduce((acc, place) => {
    if (!acc[place.category]) {
      acc[place.category] = [];
    }
    acc[place.category].push(place);
    return acc;
  }, {} as Record<CategoryType, Place[]>);

  return (
    <DashboardLayout>
      <div className="relative w-full h-full">
        {/* Desktop View - Hidden on mobile */}
        <div className="hidden md:block relative w-full h-full bg-cover bg-center rounded-2xl overflow-hidden"
             style={{ backgroundImage: "url('/images/iiser.jpg')" }}>
          
          {/* Title Header */}
          <div className="absolute top-3 lg:top-6 left-3 lg:left-6 z-20">
            <h1 className="text-2xl lg:text-3xl xl:text-5xl font-bold text-white text-left drop-shadow-lg">
              📍 Campus Map
            </h1>
            {/* Debug indicator */}
            {isMobileLandscape && (
              <div className="bg-red-500 text-white px-2 py-1 text-xs rounded mt-2">
                Mobile Landscape Mode Active
              </div>
            )}
          </div>

          {/* Place Markers */}
          {places.map((place, index) => {
            // Use landscape-specific coordinates when in mobile landscape mode
            const position = isMobileLandscape && landscapePinPositions[place.id] 
              ? landscapePinPositions[place.id] 
              : { top: place.top, left: place.left };
            
            return (
              <div
                key={place.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
                  loadedMarkers.has(index) 
                    ? 'opacity-100 scale-100 translate-y-0' 
                    : 'opacity-0 scale-0 translate-y-4'
                }`}
                style={{ 
                  top: position.top, 
                  left: position.left,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {isMobileLandscape ? (
                  // Simple map pin icon for mobile landscape
                  <Link 
                    href={`/dashboard/${studentId}/places/${place.id}`} 
                    className="block hover:scale-125 transition-all duration-300"
                    title={place.name}
                  >
                    <svg 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className="drop-shadow-lg"
                    >
                      <path 
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" 
                        fill="#EF4444" 
                        stroke="#DC2626" 
                        strokeWidth="1"
                      />
                      <circle cx="12" cy="9" r="2.5" fill="white" />
                    </svg>
                  </Link>
                ) : (
                // Original design for desktop and mobile portrait
                <>
                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                    <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
                  </div>
                  
                  <Link 
                    href={`/dashboard/${studentId}/places/${place.id}`} 
                    className="block px-2 lg:px-3 py-1 lg:py-2 bg-yellow-400 text-black font-medium rounded-lg shadow-lg border-2 border-yellow-500 hover:bg-yellow-300 hover:scale-110 transition-all duration-300 text-xs lg:text-sm whitespace-nowrap"
                  >
                    {place.name}
                  </Link>
                </>
                )}
              </div>
            );
          })}

          <div className="absolute bottom-3 lg:bottom-7 left-0 w-full text-center px-4">
            <p className="text-gray-300 text-xs lg:text-sm">
              {isMobileLandscape 
                ? "Tap the map pins to visit place info pages. Rotate to portrait for directory view."
                : "Click the place names to visit their info page. On the info page, click the pulsating description box for more images."
              }
            </p>
          </div>

          {!hasAnimated && (
            <div className="absolute bottom-12 lg:bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-4 lg:px-6 py-1 lg:py-2 text-white text-xs lg:text-sm">
                Places loaded: {loadedMarkers.size}/{places.length}
              </div>
            </div>
          )}
        </div>

        {/* Mobile View - Hidden on desktop */}
        <div className="block md:hidden relative w-full h-full bg-cover bg-center rounded-2xl overflow-hidden"
             style={{ backgroundImage: "url('/images/iiser.jpg')" }}>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
          
          {/* Title Header */}
          <div className="absolute top-4 left-4 right-4 z-20">
            <h1 className="text-2xl font-bold text-white text-center drop-shadow-lg mb-2">
              📍 Campus Directory
            </h1>
          </div>

          {/* Scrollable Content Area */}
          <div className="absolute top-16 left-4 right-4 bottom-16 z-10 overflow-y-auto">
            <div className="space-y-4">
              {(Object.entries(groupedPlaces) as [CategoryType, Place[]][]).map(([category, categoryPlaces]) => (
                <div key={category} className="bg-black/30 border border-white/5 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">{categoryIcons[category]}</span>
                    {categoryNames[category]}
                  </h3>
                  <div className="space-y-2">
                    {categoryPlaces.map((place) => (
                      <Link
                        key={place.id}
                        href={`/dashboard/${studentId}/places/${place.id}`}
                        className="block w-full text-left px-3 py-2 bg-white/7 text-yellow-500 font-medium rounded-lg shadow-lg  hover:bg-yellow-300 transition-all duration-300 text-sm"
                      >
                        {place.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footnote */}
          <div className="absolute bottom-3 left-4 right-4 text-center">
            <p className="text-gray-300 text-xs italic">
              * Marked map view is not available in mobile potrait view. Rotate to landscape mode.
            </p>
          </div>
        </div>


      </div>
    </DashboardLayout>
  );
}
