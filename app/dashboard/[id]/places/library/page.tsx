'use client';
import MobilePlaceLayout from '@/components/MobilePlaceLayout';
import { useRouter } from 'next/navigation';

export default function Library() {
  const router = useRouter();
  
  const handleTextClick = () => {
    router.push('library/more');
  };
  
  return (
    <MobilePlaceLayout
      backgroundImage="/images/library.jpeg"
      title="📍 Central Library"
      onContentClick={handleTextClick}
    >
      This is the Central Library of our college: We have access to lots of books and journals both online and offline
    </MobilePlaceLayout>
  );
}
