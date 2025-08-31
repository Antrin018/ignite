'use client';
import MobilePlaceWithNearbyFullscreen from '@/components/MobilePlaceWithNearbyFullscreen';
import { useRouter } from 'next/navigation';

export default function CDH1() {
  const router = useRouter();

  const places = [
    {
      name: "I-Cafe",
      image: "/images/basketball-court.jpg",
      description: "Full-size basketball court with professional lighting and seating"
    },
    {
      name: "Stairway to Science Blocks",
      image: "/images/nearby/to-sb.jpeg", 
      description: "Another beautiful stairway that leads to Science blocks"
    },
  ];

  const handleTextClick = () => {
    router.push('cdh1/more');
  };

  return (
    <MobilePlaceWithNearbyFullscreen
      backgroundImage="/images/cdh.jpeg"
      title="📍 CDH1"
      onContentClick={handleTextClick}
      nearbyPlaces={places}
    >
      This is the phd mess. Only phds can get food here. It also hosts some of the festivals&apos; poojas and has a bustop at the entrance:
    </MobilePlaceWithNearbyFullscreen>
  );
}
