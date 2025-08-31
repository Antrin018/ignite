'use client';
import MobilePlaceLayout from '@/components/MobilePlaceLayout';
import { useRouter } from 'next/navigation';

export default function PSB() {
  const router = useRouter();
  
  const handleTextClick = () => {
    router.push('psb/more');
  };
  
  return (
    <MobilePlaceLayout
      backgroundImage="/images/psb.jpeg"
      title="📍 PSB - Physical Science Block"
      onContentClick={handleTextClick}
    >
      This is PSB or physical science block: This is the physics department of the college
    </MobilePlaceLayout>
  );
}
