'use client';
import MobilePlaceWithNearbyFullscreen from '@/components/MobilePlaceWithNearbyFullscreen';
import { useRouter } from 'next/navigation';

export default function Health() {
  const router = useRouter();
  
  const places = [
    {
      name: "Statue",
      image: "/images/nearby/statue.jpeg",
      description: "An iconic statue on the campus"
    },
    {
      name: "Bridge",
      image: "/images/nearby/bridge.jpeg", 
      description: "A bridge leading to shopping complex and health centre"
    },
    {
      name: "Way to cake-world",
      image: "/images/nearby/to-cw.jpeg",
      description: "This roads lead to the library, tasty, cake world and places nearby"
    },
  ];

  const handleTextClick = () => {
    router.push('health/more');
  };

  return (
    <MobilePlaceWithNearbyFullscreen
      backgroundImage="/images/guest.jpeg"
      title="📍 Health Centre"
      onContentClick={handleTextClick}
      nearbyPlaces={places}
    >
      This is the guest house: you can also book it sometimes for your parents, if they come to visit you
    </MobilePlaceWithNearbyFullscreen>
  );
}
