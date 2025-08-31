'use client';
import MobilePlaceLayout from '@/components/MobilePlaceLayout';
import { useRouter } from 'next/navigation';

export default function LHC() {
  const router = useRouter();
  
  const handleTextClick = () => {
    router.push('lhc/more');
  };

  return (
    <MobilePlaceLayout
      backgroundImage="/images/lhc.jpeg"
      title="📍 LHC - Lecture Hall Complex"
      onContentClick={handleTextClick}
    >
      This is LHC or Lecture Hall Complex: All your lectures will be conducted here- it has many halls and a computer lab.
    </MobilePlaceLayout>
  );
}
