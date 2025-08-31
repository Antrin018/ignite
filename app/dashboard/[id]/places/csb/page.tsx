'use client';
import MobilePlaceLayout from '@/components/MobilePlaceLayout';
import { useRouter } from 'next/navigation';

export default function CSB() {
  const router = useRouter();

  const handleTextClick = () => {
    router.push('csb/more');
  };

  return (
    <MobilePlaceLayout
      backgroundImage="/images/csb.jpg"
      title="📍 CSB - Chemical Science Block"
      onContentClick={handleTextClick}
    >
      This is CSB or chemical science block: This is the chemistry department of the college
    </MobilePlaceLayout>
  );
}
