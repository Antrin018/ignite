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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // For mobile, just show all items immediately
      setLoadedMarkers(new Set(places.map((_, index) => index)));
      setHasAnimated(true);
      return;
    }

    // Desktop behavior - same as before
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
  }, [isMobile]);

  // Group places by category for mobile view
  const groupedPlaces = places.reduce((acc, place) => {
    if (!acc[place.category]) {
      acc[place.category] = [];
    }
    acc[place.category].push(place);
    return acc;
  }, {} as Record<CategoryType, Place[]>);

  if (isMobile) {
    return (
      <DashboardLayout>
        <div className="relative w-full h-full">
          {/* Mobile Background */}
          <div
            className="relative w-full h-full bg-cover bg-center rounded-2xl overflow-hidden"
            style={{ backgroundImage: "url('/images/indoor.jpg')" }}
          >
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
                * Marked map view is not available in mobile view
              </p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Desktop view - same as before
  return (
    <DashboardLayout>
      <div className="relative w-full h-full">
        {/* Main Background */}
        <div
          className="relative w-full h-full bg-cover bg-center rounded-2xl overflow-hidden"
          style={{ backgroundImage: "url('/images/iiser.jpg')" }}
        >
          {/* Title Header */}
          <div className="absolute top-3 lg:top-6 left-3 lg:left-6 z-20">
            <h1 className="text-2xl lg:text-3xl xl:text-5xl font-bold text-white text-left drop-shadow-lg">
              📍 Campus Map
            </h1>
          </div>

          {/* Place Markers with Pop-up Animation and Pulsating Circles */}
          {places.map((place, index) => (
            <div
              key={place.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                loadedMarkers.has(index) 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-0 translate-y-4'
              }`}
              style={{ 
                top: place.top, 
                left: place.left,
                transitionDelay: `${index * 50}ms`
              }}
            >
              {/* Pulsating Circle */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                <div className="w-3 h-3 bg-orange-600 rounded-full pulse-circle"></div>
              </div>
              
              {/* Place Link */}
              <Link 
                href={`/dashboard/${studentId}/places/${place.id}`} 
                className="block px-2 lg:px-3 py-1 lg:py-2 bg-yellow-400 text-black font-medium rounded-lg shadow-lg border-2 border-yellow-500 hover:bg-yellow-300 hover:scale-110 transition-all duration-300 text-xs lg:text-sm whitespace-nowrap"
              >
                {place.name}
              </Link>
            </div>
          ))}

          <div className="absolute bottom-3 lg:bottom-7 left-0 w-full text-center px-4">
            <p className="text-gray-300 text-xs lg:text-sm">
              Click the place names to visit their info page. On the info page, click the pulsating description box for more images.
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

        <style jsx>{`
          @keyframes popIn {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0) translateY(20px);
            }
            80% {
              transform: translate(-50%, -50%) scale(1.1) translateY(-5px);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1) translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(1.2);
            }
          }

          .pulse-circle {
            animation: pulse 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
}
