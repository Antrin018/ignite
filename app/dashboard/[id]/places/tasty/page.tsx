'use client';
import MobilePlaceWithNearbyFullscreen from '@/components/MobilePlaceWithNearbyFullscreen';
import { useRouter } from 'next/navigation';

export default function Tasty() {
  const router = useRouter();
  
  const places = [
    {
      name: "Way to Music and Dance Room",
      image: "/images/nearby/to-rooms.jpeg",
      description: "This is the way to the music and dance rooms"
    },
    {
      name: "Music Room",
      image: "/images/cafeteria.jpg", 
      description: "Modern dining facility serving fresh meals and snacks"
    },
    {
      name: "Dance Room",
      image: "/images/auditorium.jpg",
      description: "State-of-the-art auditorium with 500+ seating capacity"
    },
  ];

  const handleTextClick = () => {
    router.push('tasty/more');
  };

  return (
    <MobilePlaceWithNearbyFullscreen
      backgroundImage="/images/tasty.jpg"
      title="📍 Tasty Restaurant"
      onContentClick={handleTextClick}
      nearbyPlaces={places}
    >
      This is Tasty: another restaurant that serves food: you can&apos;t order food from here online
    </MobilePlaceWithNearbyFullscreen>
  );
}
