"use client";

import { motion } from "framer-motion";

export default function LoadingScreen({ message = "Loading..." }) {
     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0220] overflow-hidden">
               {/* Dynamic Background Gradients */}
               <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                         animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.5, 0.3],
                              x: [0, 50, 0],
                              y: [0, 30, 0],
                         }}
                         transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "easeInOut",
                         }}
                         className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#3F2965]/40 rounded-full blur-[120px]"
                    />
                    <motion.div
                         animate={{
                              scale: [1.2, 1, 1.2],
                              opacity: [0.2, 0.4, 0.2],
                              x: [0, -50, 0],
                              y: [0, -30, 0],
                         }}
                         transition={{
                              duration: 10,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: 1,
                         }}
                         className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#DD1764]/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                         animate={{
                              opacity: [0.1, 0.3, 0.1],
                         }}
                         transition={{
                              duration: 5,
                              repeat: Infinity,
                              ease: "easeInOut",
                         }}
                         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a167a5]/10 rounded-full blur-[100px]"
                    />
               </div>

               {/* Glass Container */}
               <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 flex flex-col items-center justify-center p-12 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl"
               >
                    {/* Logo/Title */}
                    <div className="relative mb-8">
                         <motion.h1
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.8 }}
                              className="text-4xl md:text-5xl font-serif italic text-white tracking-wide"
                         >
                              MindSettler
                         </motion.h1>
                         <motion.div
                              initial={{ width: 0, opacity: 0 }}
                              animate={{ width: "100%", opacity: 0.5 }}
                              transition={{ delay: 0.6, duration: 1 }}
                              className="absolute -bottom-2 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#eeb9ff] to-transparent"
                         />
                    </div>

                    {/* Loading Indicator */}
                    <div className="relative w-12 h-12 mb-6">
                         <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-0 rounded-full border-[2px] border-t-[#eeb9ff] border-r-transparent border-b-[#a167a5]/30 border-l-transparent"
                         />
                         <motion.div
                              animate={{ rotate: -360 }}
                              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                              className="absolute inset-2 rounded-full border-[2px] border-t-transparent border-r-[#DD1764]/50 border-b-transparent border-l-[#eeb9ff]/30"
                         />
                    </div>

                    {/* Text */}
                    <motion.p
                         key={message}
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ duration: 0.5 }}
                         className="text-[#eeb9ff]/80 font-redhat text-xs sm:text-sm tracking-[0.2em] uppercase font-medium text-center max-w-[200px]"
                    >
                         <motion.span
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                         >
                              {message}
                         </motion.span>
                    </motion.p>
               </motion.div>
          </div>
     );
}
