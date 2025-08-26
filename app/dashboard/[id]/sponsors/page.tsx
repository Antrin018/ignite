'use client';

import { useState } from 'react';
import { ExternalLink, Play, Pause, Volume2, VolumeX, Maximize2, Star, GiftIcon, CheckCircle} from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';


export default function SponsorsPage() {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [muted, setMuted] = useState<{ [key: string]: boolean }>({});

  const sponsors = [
    {
      id: 'techcorp',
      name: '',
      category: 'Comfort Partner',
      logo: '',
      description: 'Custom Hostel Single mattress',
      videoUrl: '/images/sponsor.mp4',
      website: 'https://form.jotform.com/Hosteller/hostel-essential-order-request-form',
      benefits: ['Motion absorption technology', 'Hassle-free Hostel delivery', 'One Year Warranty'],
      stats: { students: 250, events: 15, years: 5 },
      featured: true
    },
  ];

  const handleVideoToggle = (sponsorId: string) => {
    if (playingVideo === sponsorId) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(sponsorId);
    }
  };

  const handleMuteToggle = (sponsorId: string) => {
    setMuted(prev => ({
      ...prev,
      [sponsorId]: !prev[sponsorId]
    }));
  };


  return (
    <DashboardLayout>
      {/* Full overlay to cover white background */}
      <div className="absolute inset-0 rounded-3xl overflow-hidden bg-cover bg-center backdrop-blur-md" style={{ backgroundImage: "url('/images/ww1.jpeg')" }}>
        <div className="relative z-10 h-full overflow-y-auto scrollbar-hide">
          <div className="p-8 space-y-8">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-orange-600 bg-clip-text text-transparent mb-4 animate-text-shimmer">
              Our Sponsors
            </h1>
            <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Discover the incredible organizations that make our events possible and learn about the opportunities they offer to students like you.
            </p>
          </div>

          {/* Featured Sponsors */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center animate-slide-in-left">
              <Star className="mr-3 text-yellow-400 animate-twinkle" size={28} />
              Featured Partners
            </h2>
            <div className="flex gap-8 item-start">
              {sponsors.filter(s => s.featured).map((sponsor) => (
                <div key={sponsor.id} className="flex gap-8 items-start w-full">
                  {/* Video Section - Left Side */}
                  <div className="relative w-[900px] h-[600px] rounded-2xl overflow-hidden shadow-2xl animate-fade-in-scale">
                    <video
                      src={sponsor.videoUrl}
                      className="w-full h-full object-cover"
                      loop
                      autoPlay
                      muted
                      
                    />
                    
                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleVideoToggle(sponsor.id)}
                          className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                          {playingVideo === sponsor.id ? (
                            <Pause className="text-gray-800" size={20} />
                          ) : (
                            <Play className="text-gray-800 ml-1" size={20} />
                          )}
                        </button>
                        <button
                          onClick={() => handleMuteToggle(sponsor.id)}
                          className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95"
                        >
                          {muted[sponsor.id] ? (
                            <VolumeX className="text-gray-800" size={16} />
                          ) : (
                            <Volume2 className="text-gray-800" size={16} />
                          )}
                        </button>
                        <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110 active:scale-95">
                          <Maximize2 className="text-gray-800" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                  

                  {/* Information Section - Right Side */}
                  <div className="flex-1 space-y-8 animate-slide-in-right">
                    {/* Sponsor Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <h3 className="text-3xl font-bold text-white mb-1 tracking-tight animate-text-shimmer">
                            {sponsor.description}
                          </h3>
                          <div className="flex items-center gap-3 py-1.5">
                            <span className="px-4 py-1 bg-gradient-to-r  from-pink-500 to-red-500 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-orange-400/30">
                              {sponsor.category}
                            </span>
                            <span className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-orange-400 text-xs font-bold rounded-full shadow-lg animate-bounce-subtle">
                              FEATURED
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Description */}
                  
                    </div>

                    {/* Enhanced Benefits Section */}
                    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-xl">
                      <h4 className="font-bold text-white mb-4 flex items-center text-xl">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                          <GiftIcon size={16} className="text-white" />
                        </div>
                        Product Features
                      </h4>
                      <div className="space-y-4">
                        {sponsor.benefits.map((benefit, benefitIndex) => (
                          <div 
                            key={benefitIndex} 
                            className="flex items-center text-white group hover:translate-x-2 transition-transform duration-300"
                            style={{ animationDelay: `${benefitIndex * 0.1}s` }}
                          >
                            <div className="relative mr-4">
                              <CheckCircle className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors duration-200" />
                              <div className="absolute inset-0 bg-green-400/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300"></div>
                            </div>
                            <span className="text-lg font-medium group-hover:text-gray-100 transition-colors duration-200">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Enhanced Combined Action Section */}
                    <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-400/30 shadow-xl animate-pulse-glow">
                      {/* Special Offer Header */}
                      <div className="flex items-center mb-4">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-ping"></div>
                        <span className="text-yellow-200 font-bold text-lg">Special Offer</span>
                      </div>
                      
                      {/* Offer Details */}
                      <div className="mb-6">
                        <p className="text-white text-lg font-medium mb-2">
                          Grab Your Foam Mattress at <span className="text-yellow-400 font-bold text-xl">₹1999</span> with 1-Year Warranty!
                        </p>
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="text-gray-200">Use Coupon Code:</span>
                          <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg font-bold text-sm animate-bounce-subtle border-2 border-yellow-300">
                            FRESHERS1000
                          </span>
                        </div>
                      </div>
                      
                      {/* Combined Order Button */}
                      <a
                        href={sponsor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group w-full inline-flex items-center justify-center bg-gradient-to-r from-orange-600 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 active:scale-95"
                      >
                        <ExternalLink className="mr-3 group-hover:rotate-12 transition-transform duration-300" size={20} />
                        <span className="relative">
                          Order Now with FRESHERS1000
                          <div className="absolute inset-0 bg-white/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footnote */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-lg">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-orange-200 font-semibold text-sm">Further contact</span>
                  <div className="w-2 h-2 bg-orange-400 rounded-full ml-2 animate-pulse"></div>
                </div>
                <div className="space-y-3 text-sm text-gray-300">
                  <p className="leading-relaxed">
                    <span className="font-semibold text-white">Riswan:</span> +91-9946817392
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400">
                    *Terms and conditions apply. Offer valid for current academic year students only.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-hide::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes textShimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: 200px 0;
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes bounceSubtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes pulseSubtle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(255, 193, 7, 0.2);
          }
          50% {
            box-shadow: 0 0 15px rgba(255, 193, 7, 0.4);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out 0.2s both;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeIn 0.8s ease-out 0.4s both;
        }

        .animate-text-shimmer {
          background: linear-gradient(90deg, #FFA500, #FFA500, #ff4500,#FFA500,#FFA500);
          background-size: 200px 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: textShimmer 3s infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s infinite;
        }

        .animate-bounce-subtle {
          animation: bounceSubtle 2s infinite;
        }

        .animate-pulse-subtle {
          animation: pulseSubtle 2s infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 2s infinite;
        }
      `}</style>
    </DashboardLayout>
  );
}
