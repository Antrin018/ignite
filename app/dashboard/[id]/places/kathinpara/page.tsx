'use client';
import MobilePlaceWithNearbyFullscreen from '@/components/MobilePlaceWithNearbyFullscreen';
import { useRouter } from 'next/navigation';

export default function Kathinpara() {
  const router = useRouter();

  const places = [
    {
      name: "Health Centre",
      image: "/images/nearby/health-centre.jpeg",
      description: "A centre for emergency first aids"
    },
    {
      name: "Shopping complex",
      image: "/images/nearby/shopping.jpeg", 
      description: "A building with shops available for various purchases "
    },
    {
      name: "Crucible",
      image: "/images/nearby/crucible.jpeg",
      description: "A centre for science exhibitions"
    },
  ];

  const handleTextClick = () => {
    router.push('kathinpara/more');
  };

  return (
    <MobilePlaceWithNearbyFullscreen
      backgroundImage="/images/kathinpara.jpeg"
      title="📍 Kathinpara"
      onContentClick={handleTextClick}
      nearbyPlaces={places}
    >
      This is a road that leads to Kathinpara: an open field amidst jungle perfect for stargazing
    </MobilePlaceWithNearbyFullscreen>
  );
}
