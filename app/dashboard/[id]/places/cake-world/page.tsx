'use client';
import MobilePlaceWithNearbyFullscreen from '@/components/MobilePlaceWithNearbyFullscreen';
import { useRouter } from 'next/navigation';

export default function CakeWorld() {
  const router = useRouter();

  const places = [
    {
      name: "Billboard",
      image: "/images/nearby/billboard.jpeg",
      description: "A big billboard where sometimes movie screening is also done"
    },
    {
      name: "Second Volleyball court",
      image: "/images/nearby/volley2.jpeg", 
      description: "Another smaller volleyball court"
    },
    {
      name: "Stairway to LHC",
      image: "/images/nearby/to-lhc.jpeg",
      description: "This leads to the science blocks and lhc"
    },
  ];

  const handleTextClick = () => {
    router.push('cake-world/more');
  };

  return (
    <MobilePlaceWithNearbyFullscreen
      backgroundImage="/images/ww.jpg"
      title="📍 Cake World"
      onContentClick={handleTextClick}
      nearbyPlaces={places}
    >
      This is cake world: One of the most beautiful spots on campus. You can also buy lots of snacks from here.
    </MobilePlaceWithNearbyFullscreen>
  );
}
