'use client';
import MobilePlaceWithNearbyFullscreen from '@/components/MobilePlaceWithNearbyFullscreen';
import { useRouter } from 'next/navigation';

export default function Mess() {
  const router = useRouter();
  
  const places = [
    {
      name: "J-Cafe",
      image: "/images/nearby/jcafe.jpeg",
      description: "The main cafe on the upper floor of mess"
    },
    {
      name: "Study Room",
      image: "/images/nearby/study-room.jpeg", 
      description: "Study room"
    },
    {
      name: "Football Court",
      image: "/images/nearby/football.jpeg",
      description: "A smaller size football ground"
    },
  ];

  const handleTextClick = () => {
    router.push('mess/more');
  };

  return (
    <MobilePlaceWithNearbyFullscreen
      backgroundImage="/images/cdh1.jpg"
      title="📍 CDH2 - Mess"
      onContentClick={handleTextClick}
      nearbyPlaces={places}
    >
      This is CDH2 or our mess. It has 2 floors and food is served in the lower floor
    </MobilePlaceWithNearbyFullscreen>
  );
}
