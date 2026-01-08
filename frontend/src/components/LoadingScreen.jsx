"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
     return (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-[#3F2965]/20 via-[#0b0220]/40 to-[#DD1764]/20 backdrop-blur-xl overflow-hidden">
               {/* Ambient Background Glows */}
               <motion.div
                    animate={{
                         scale: [1, 1.2, 1],
                         opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                         duration: 4,
                         repeat: Infinity,
                         ease: "easeInOut",
                    }}
                    className="absolute w-[500px] h-[500px] bg-[#3F2965]/30 rounded-full blur-[100px] pointer-events-none"
               />
               <motion.div
                    animate={{
                         scale: [1.2, 1, 1.2],
                         opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                         duration: 5,
                         repeat: Infinity,
                         ease: "easeInOut",
                         delay: 1,
                    }}
                    className="absolute w-[400px] h-[400px] bg-[#DD1764]/20 rounded-full blur-[100px] translate-x-12 translate-y-12 pointer-events-none"
               />

               {/* Central Loading Content */}
               <div className="relative z-10 text-center">
                    <motion.div
                         initial={{ opacity: 0, scale: 0.9 }}
                         animate={{ opacity: 1, scale: 1 }}
                         transition={{ duration: 0.8, ease: "easeOut" }}
                         className="mb-8"
                    >
                         <h1 className="text-4xl md:text-6xl font-serif italic text-white tracking-wide drop-shadow-lg">
                              MindSettler
                         </h1>
                         <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-[#eeb9ff] to-transparent mx-auto mt-4 opacity-70" />
                    </motion.div>

                    {/* Breathing Text */}
                    <motion.p
                         animate={{ opacity: [0.4, 1, 0.4] }}
                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                         className="text-[#eeb9ff] font-redhat text-sm tracking-[0.2em] uppercase drop-shadow-md"
                    >
                         Loading...
                    </motion.p>
               </div>
          </div>
     );
}
