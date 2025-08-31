'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sparkles, Rocket, Trophy, Users, Camera, Music, Code, Palette, X, ExternalLink, GiftIcon } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { supabase } from '@/lib/supabase-client';

export default function FresherWelcomePage() {
  const { id: studentId } = useParams();
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!studentId || typeof studentId !== 'string') return;

      const { data: studentData } = await supabase
        .from('students')
        .select('name')
        .eq('id', studentId)
        .single();

      if (studentData) {
        setName(studentData.name);
      }
      setLoading(false);
    };

    fetchStudentData();
  }, [studentId]);

  // Show popup immediately when component mounts
  useEffect(() => {
    setShowPopup(true);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleGoToSponsors = () => {
    router.push(`/dashboard/${studentId}/sponsors`);
    setShowPopup(false);
  };



  const opportunities = [
    {
      icon: Trophy,
      title: "Competitions & Challenges",
      description: "Test your skills in exciting contests across various domains",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Team Collaborations",
      description: "Join forces with brilliant minds to achieve greatness together",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Technical Events",
      description: "Dive into coding competitions and tech challenges",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Palette,
      title: "Creative Arts",
      description: "Express yourself through art, design, and creative competitions",
      gradient: "from-green-500 to-teal-500"
    },
    {
      icon: Music,
      title: "Cultural Programs",
      description: "Showcase your artistic talents in music, dance, and drama",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Camera,
      title: "Media & Photography",
      description: "Capture moments and tell stories through visual media",
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <DashboardLayout>
      {/* Full overlay to cover white background */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/images/ww1.jpeg')" }}>
        <div className="relative z-10 h-full overflow-y-auto scrollbar-hide">
          <div className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-10 lg:space-y-12 min-h-full">
            {/* Main Hero Section */}
            <div className="text-center py-4 sm:py-6 lg:py-8">
              <div className="inline-block bg-black/30 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 shadow-2xl max-w-4xl mx-auto">
                {loading ? (
                  <div className="animate-pulse flex flex-col items-center space-y-6">
                    <div className="w-24 h-24 bg-white/10 rounded-full"></div>
                    <div className="h-12 bg-white/10 rounded-lg w-96"></div>
                    <div className="h-8 bg-white/10 rounded-lg w-[500px]"></div>
                    <div className="h-6 bg-white/10 rounded-lg w-80"></div>
                  </div>
                ) : (
                  <>
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce-twice">
                      <span className="text-white text-3xl font-bold">
                        {name ? name.charAt(0).toUpperCase() : 'F'}
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 bg-clip-text text-transparent mb-3 sm:mb-4 animate-fade-in">
                      Welcome{name ? ` ${name}` : ''}! 
                    </h1>
                    <p className="text-white/80 text-sm sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4 sm:mb-6 px-2">
                      You&apos;re about to embark on the most exciting chapter of your life! Get ready for incredible 
                    experiences, amazing friendships, and unforgettable memories.
                    </p>
      
                  </>
                )}
              </div>
            </div>

            {/* What Awaits You Section */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 sm:mb-10 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 flex items-center justify-center">
                  <Rocket className="mr-2 sm:mr-3 text-orange-400" size={32} />
                  What Awaits You
                </h2>
                <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto px-4">
                  Discover endless opportunities to showcase your talents, learn new skills, and create memories that will last a lifetime.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {opportunities.map((opportunity, index) => {
                  const IconComponent = opportunity.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-black/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl"
                      style={{
                        animationDelay: `${index * 200}ms`,
                        animation: 'slideInUp 0.8s ease-out forwards'
                      }}
                    >
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${opportunity.gradient} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-xl group-hover:shadow-2xl transition-shadow duration-300 mx-auto`}>
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 text-center group-hover:text-purple-300 transition-colors">
                        {opportunity.title}
                      </h3>
                      <p className="text-white/70 text-xs sm:text-sm text-center leading-relaxed">
                        {opportunity.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inspirational Quote Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-orange-700/20 to-red-500/20 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-indigo-400/20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl"></div>
                <div className="relative z-10">
                  <Sparkles className="text-yellow-400 mx-auto mb-3 sm:mb-4" size={32} />
                  <blockquote className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 italic leading-tight">
                    Every expert was once a beginner. Every pro was once an amateur. 
                    Every icon was once an unknown.
                  </blockquote>
                  <p className="text-indigo-200 text-sm sm:text-base leading-relaxed px-2">
                    Your journey to greatness starts here. Embrace every opportunity, 
                    challenge yourself, and watch yourself grow into the amazing person you&apos;re meant to be! 🌟
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Section */}
          </div>
        </div>
      </div>

      {/* Sponsor Popup Ad */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in-backdrop">
          <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-orange-500/30 animate-slide-up-scale">
            {/* Close Button */}
            <button
              onClick={handleClosePopup}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <X className="text-white" size={16} />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Video Section */}
              <div className="relative w-full lg:w-1/2 h-48 sm:h-64 lg:h-96">
                <video
                  src="/video/Sponsor.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

                                           {/* Content Section */}
              <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="space-y-2 sm:space-y-3 animate-slide-in-right" style={{animationDelay: '0.3s'}}>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className="text-orange-400 font-bold text-xs sm:text-sm uppercase tracking-wide">Special Offer</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                    Premium Hostel Mattress
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Get the perfect sleep solution for your hostel life with our custom single mattress.
                  </p>
                </div>

                                 {/* Features */}
                <div className="space-y-2 sm:space-y-3 animate-slide-in-right" style={{animationDelay: '0.5s'}}>
                  <h3 className="text-white font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <GiftIcon className="text-green-400 animate-bounce" size={16} />
                    Key Features
                  </h3>
                  <div className="space-y-1.5 sm:space-y-2">
                    {['Motion absorption technology', 'Hassle-free Hostel delivery', 'One Year Warranty'].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3 text-gray-300 animate-fade-in-left" style={{animationDelay: `${0.6 + index * 0.1}s`}}>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-ping flex-shrink-0"></div>
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                                 {/* Pricing */}
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-orange-400/30 animate-scale-in" style={{animationDelay: '0.7s'}}>
                  <div className="text-center space-y-1.5 sm:space-y-2">
                    <p className="text-white font-bold text-lg sm:text-xl">
                      Only <span className="text-yellow-400 text-xl sm:text-2xl animate-pulse">₹1699</span>
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                      <span className="text-gray-300 text-xs sm:text-sm">Use Code:</span>
                      <span className="px-2 py-1 sm:px-3 bg-yellow-400 text-black rounded-md sm:rounded-lg font-bold text-xs sm:text-sm animate-bounce">
                        FRESHERS1300
                      </span>
                    </div>
                  </div>
                </div>

                                                 {/* Action Button */}
                <div className="animate-bounce-in" style={{animationDelay: '0.8s'}}>
                  <button
                    onClick={handleGoToSponsors}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 animate-pulse-glow"
                  >
                    <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                    <span className="text-center">View Full Details & Order</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInBackdrop {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }
        
        @keyframes slideUpScale {
          0% {
            opacity: 0;
            transform: translateY(100px) scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-20px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(255, 165, 0, 0.3), 0 0 10px rgba(255, 165, 0, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 165, 0, 0.6), 0 0 30px rgba(255, 165, 0, 0.4);
          }
        }
        
        .animate-fade-in-backdrop {
          animation: fadeInBackdrop 0.5s ease-out;
        }
        
        .animate-slide-up-scale {
          animation: slideUpScale 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s ease-out both;
        }
        
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out both;
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 0.5s ease-out both;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out both;
        }
        
        @keyframes bounce-twice {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-25%);
        }
        60% {
          transform: translateY(-12%);
        }
      }

      /* Run for 2 iterations only */
      .animate-bounce-twice {
        animation: bounce-twice 1s ease-in-out 2;
      }


        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        /* Custom scrollbar */
        .scrollbar-hide::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-hide::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Glowing effects on hover */
        .group:hover .w-14 {
          box-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
        }

        /* Enhanced hover effects */
        .group:hover {
          transform: translateY(-8px) scale(1.02);
        }
      `}</style>
    </DashboardLayout>
  );
}
