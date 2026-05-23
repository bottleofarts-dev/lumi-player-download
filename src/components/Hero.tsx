import { motion } from "motion/react";
import { Download, Github, ChevronRight, Search, PlaySquare, Settings, Home, AlignRight } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export function Hero() {
  const [downloadLink, setDownloadLink] = useState('https://file.kiwi/e7cbd553#5HlaLSm01bclTmGVI4Ls_Q,03c0fb00');

  useEffect(() => {
    const fetchLatestApk = async () => {
      try {
        const metadataDoc = await getDoc(doc(db, "app", "metadata"));
        if (metadataDoc.exists()) {
          const data = metadataDoc.data();
          if (data.latestApkUrl) {
            setDownloadLink(data.latestApkUrl);
          }
        }
      } catch (err) {
        console.error("Failed to fetch APK URL", err);
      }
    };
    fetchLatestApk();
  }, []);

  return (
    <div className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pb-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 blur-[100px] rounded-full" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="flex justify-center lg:justify-start mb-6">
              <img 
                src="https://i.ibb.co/3YfSPzx8/Canvas-26.png" 
                alt="Lumi Player Logo" 
                className="w-24 h-24 rounded-[2rem] shadow-2xl shadow-yellow-500/10 border border-neutral-800/50"
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Meet <span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">Lumi Player</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-400 max-w-xl mx-auto lg:mx-0">
              A modern, sleek, and high-performance video player for Android. Experience your media like never before with intuitive controls, stunning visuals, and powerful playback features.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-x-6">
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-full bg-yellow-400 px-8 py-3.5 text-sm font-semibold text-neutral-950 shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download Debug APK
              </a>
              <a
                href="https://github.com/bottleofarts-dev/Lumi-Player-again"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto group flex items-center justify-center gap-2 text-sm font-semibold leading-6 text-white hover:text-neutral-300 transition-colors"
              >
                <Github className="w-5 h-5" />
                View Repository <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 flex justify-center lg:justify-end w-full"
          >
            {/* Phone Mockup Frame */}
            <div className="relative w-full max-w-[320px] aspect-[9/19] rounded-[2.5rem] bg-[#000000] ring-[6px] ring-neutral-800/80 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
              
              {/* Status Bar pseudo */}
              <div className="absolute top-0 inset-x-0 h-6 flex items-center px-6 justify-between z-20 text-[10px] text-white font-medium">
                 <span>12:16</span>
                 <div className="flex max-w-[50px] gap-1 opacity-80">
                    <div className="w-3 h-3 bg-white rounded-sm" />
                    <div className="w-3 h-3 bg-white rounded-sm" />
                 </div>
              </div>

              {/* App Content */}
              <div className="pt-10 h-full flex flex-col relative z-10 w-full overflow-hidden">
                {/* Search Bar */}
                <div className="px-4 mb-5">
                  <div className="w-full h-11 bg-[#1a1a1a] rounded-full flex items-center px-4 gap-3 text-neutral-400">
                    <Search className="w-4 h-4" />
                    <span className="text-[13px]">Search...</span>
                  </div>
                </div>

                {/* Filter Chips */}
                <div className="px-4 flex gap-2 mb-6 overflow-hidden flex-shrink-0">
                  <div className="px-5 py-1.5 bg-[#fde047] text-neutral-950 font-medium rounded-full text-[13px]">All</div>
                  <div className="px-5 py-1.5 bg-[#262626] text-neutral-200 font-medium rounded-full text-[13px]">Camera</div>
                  <div className="px-5 py-1.5 bg-[#262626] text-neutral-200 font-medium rounded-full text-[13px]">Default</div>
                </div>

                {/* Recently Added Section */}
                <div className="px-4 mb-6 flex-shrink-0">
                  <h3 className="text-[17px] font-normal text-white mb-3">Recently Added</h3>
                  <div className="w-full h-36 bg-[#1a1a1a] rounded-xl relative overflow-hidden shadow-lg border border-white/5">
                     <img 
                      src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" 
                      alt="Recents" 
                      className="w-full h-full object-cover opacity-80 mix-blend-screen" 
                     />
                     <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[11px] font-medium text-white">00:20</div>
                  </div>
                </div>
                
                {/* All Videos Section */}
                <div className="px-4 flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-[17px] font-normal text-white">All Videos</h3>
                    <AlignRight className="w-4 h-4 text-neutral-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 pb-24">
                     <div className="flex flex-col gap-1.5">
                       <div className="h-28 bg-[#1a1a1a] rounded-xl relative overflow-hidden shadow-sm border border-white/5">
                          <img 
                            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" 
                            alt="Video 1" 
                            className="w-full h-full object-cover opacity-80 mix-blend-screen" 
                          />
                          <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[11px] font-medium text-white">00:20</div>
                       </div>
                       <span className="text-[11px] text-neutral-100 px-1 truncate font-medium">Screenrecorder-2026</span>
                     </div>
                     <div className="flex flex-col gap-1.5">
                       <div className="h-28 bg-[#111111] rounded-xl relative overflow-hidden border border-white/5">
                          <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[11px] font-medium text-white">21:36</div>
                       </div>
                       <span className="text-[11px] text-neutral-100 px-1 truncate font-medium">(M)DS10E41.mp4</span>
                     </div>
                  </div>
                </div>

                {/* Floating Bottom Nav */}
                <div className="absolute bottom-6 inset-x-4">
                  <div className="h-14 bg-[#1f1f1f] rounded-[2rem] flex items-center justify-between px-8 relative shadow-2xl border border-white/5">
                    <PlaySquare className="w-5 h-5 text-neutral-400" strokeWidth={2.5} />
                    
                    {/* Glowing Home FAB */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                       <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center p-1.5">
                          <div className="w-full h-full rounded-full bg-[#fde047] flex items-center justify-center shadow-[0_0_15px_rgba(253,224,71,0.3)]">
                             <Home className="w-6 h-6 text-black fill-current" strokeWidth={2.5} />
                          </div>
                       </div>
                    </div>

                    <Settings className="w-5 h-5 text-neutral-400" strokeWidth={2.5} />
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
