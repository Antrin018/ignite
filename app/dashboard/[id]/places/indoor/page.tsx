'use client';
import MobilePlaceWithNearbyFullscreen from '@/components/MobilePlaceWithNearbyFullscreen';
import { useRouter } from 'next/navigation';

export default function Indoor() {
  const router = useRouter();
  
  const places = [
    {
      name: "Basketball Court",
      image: "/images/nearby/basket.jpeg",
      description: "Full-size basketball court"
    },
    {
      name: "Volleyball Court",
      image: "/images/nearby/volley.jpeg", 
      description: "Volleyball court"
    },
    {
      name: "Table Tennis Court",
      image: "/images/nearby/TT.jpeg",
      description: "We also have Table Tennis"
    },
    {
      name: "Tennis Court",
      image: "/images/nearby/tennis_court.jpeg",
      description: "We also have a Tennis Court"
    },
    {
      name: "Gym",
      image: "/images/nearby/gym.jpg",
      description: "Our fitness center with a good number of equipments"
    },
    {
      name: "Cricket nets",
      image: "/images/nearby/cricket.jpg",
      description: "You can play cricket here"
    },
  ];

  const handleTextClick = () => {
    router.push('indoor/more');
  };

  return (
    <MobilePlaceWithNearbyFullscreen
      backgroundImage="/images/indoor.jpg"
      title="📍 Indoor Stadium"
      onContentClick={handleTextClick}
      nearbyPlaces={places}
    >
      This is the Indoor Stadium: This is the place where most of the sports activities and cultural festivals are conducted
    </MobilePlaceWithNearbyFullscreen>
  );
}
