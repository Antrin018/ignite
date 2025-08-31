'use client';

import { useRouter } from 'next/navigation';
import MobilePlaceLayout from '@/components/MobilePlaceLayout';

export default function BSB() {
  const router = useRouter();

  const handleTextClick = () => {
    router.push('bsb/more');
  };

  return (
    <MobilePlaceLayout
      backgroundImage="/images/bsb.jpg"
      title="📍 BSB - Biological Science Block"
      onContentClick={handleTextClick}
    >
      This is BSB or Biological science block: This is the biology department of the college
    </MobilePlaceLayout>
  );
}
