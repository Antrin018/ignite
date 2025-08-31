'use client';
import MobilePlaceLayout from '@/components/MobilePlaceLayout';
import { useRouter } from 'next/navigation';

export default function Anamudi() {
  const router = useRouter();
  const handleTextClick = () => {
    // Navigate to anamudi/more page
    router.push('anamudi/more');
  };

  return (
    <MobilePlaceLayout
      backgroundImage="/images/anamudi.jpg"
      title="📍 Anamudi Hostel Block"
      onContentClick={handleTextClick}
    >
      This is the Anamudi Hostel block. It consists of many blocks and this is the place where BS_MS students stay. You will be assigned a room in one of these blocks.
    </MobilePlaceLayout>
  );
}
