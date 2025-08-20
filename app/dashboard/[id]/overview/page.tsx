'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Sparkles, Rocket, Trophy, Users, Camera, Music, Code, Palette } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { supabase } from '@/lib/supabase-client';

export default function FresherWelcomePage() {
  const { id: studentId } = useParams();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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
          <div className="p-8 space-y-12 min-h-full">
            {/* Main Hero Section */}
            <div className="text-center py-8">
              <div className="inline-block bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl max-w-4xl mx-auto">
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
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 bg-clip-text text-transparent mb-4 animate-fade-in">
                      Welcome{name ? ` ${name}` : ''}! 
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-6">
                      You&apos;re about to embark on the most exciting chapter of your life! Get ready for incredible 
                    experiences, amazing friendships, and unforgettable memories.
                    </p>
      
                  </>
                )}
              </div>
            </div>

            {/* What Awaits You Section */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center">
                  <Rocket className="mr-3 text-orange-400" size={40} />
                  What Awaits You
                </h2>
                <p className="text-white/70 text-base max-w-2xl mx-auto">
                  Discover endless opportunities to showcase your talents, learn new skills, and create memories that will last a lifetime.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opportunity, index) => {
                  const IconComponent = opportunity.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl"
                      style={{
                        animationDelay: `${index * 200}ms`,
                        animation: 'slideInUp 0.8s ease-out forwards'
                      }}
                    >
                      <div className={`w-14 h-14 bg-gradient-to-br ${opportunity.gradient} rounded-xl flex items-center justify-center mb-4 shadow-xl group-hover:shadow-2xl transition-shadow duration-300 mx-auto`}>
                        <IconComponent className="text-white" size={28} />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3 text-center group-hover:text-purple-300 transition-colors">
                        {opportunity.title}
                      </h3>
                      <p className="text-white/70 text-sm text-center leading-relaxed">
                        {opportunity.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inspirational Quote Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-orange-700/20 to-red-500/20 backdrop-blur-md rounded-3xl p-8 border border-indigo-400/20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl"></div>
                <div className="relative z-10">
                  <Sparkles className="text-yellow-400 mx-auto mb-4" size={40} />
                  <blockquote className="text-xl md:text-2xl font-bold text-white mb-4 italic">
                    Every expert was once a beginner. Every pro was once an amateur. 
                    Every icon was once an unknown.
                  </blockquote>
                  <p className="text-indigo-200 text-base">
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
