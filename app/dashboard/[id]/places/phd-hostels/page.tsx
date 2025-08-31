'use client';
import MobilePlaceWithNearbyFullscreen from '@/components/MobilePlaceWithNearbyFullscreen';
import { useRouter } from 'next/navigation';

export default function PhdHostels() {
  const router = useRouter();
  
  const places = [
    {
      name: "Zeika",
      image: "/images/nearby/zeika.jpeg",
      description: "Another resturant"
    },
    {
      name: "Stairway to Tasty",
      image: "/images/nearby/to-tasty.jpeg", 
      description: "A big staircase that leads to tasty"
    },
    {
      name: "Stairway to CDH1",
      image: "/images/nearby/to-cdh1.jpeg",
      description: "A stairway that leads to cdh1"
    },
  ];

  const handleTextClick = () => {
    router.push('phd-hostels/more');
  };

  return (
    <MobilePlaceWithNearbyFullscreen
      backgroundImage="/images/phd.jpeg"
      title="📍 PHD Hostels"
      onContentClick={handleTextClick}
      nearbyPlaces={places}
    >
      These are the PHD Hostels.
    </MobilePlaceWithNearbyFullscreen>
  );
}
