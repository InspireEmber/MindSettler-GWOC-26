"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function SeamlessVideo({ src, className }) {
     const [isMounted, setIsMounted] = useState(false);
     const [activeVideo, setActiveVideo] = useState(0);

     useEffect(() => {
          setIsMounted(true);
     }, []);

     const videoRefs = [useRef(null), useRef(null)];
     const durationRef = useRef(0);
     const CROSSFADE_DURATION = 1.0; // seconds

     if (!isMounted) {
          return <div className={`relative w-full h-full overflow-hidden ${className}`} />;
     }

     const handleTimeUpdate = (index) => {
          // Only verify looping if we are the active video
          if (activeVideo !== index) return;

          const video = videoRefs[index].current;
          if (!video) return;

          // Capture duration if not yet set
          if (durationRef.current === 0 && video.duration) {
               durationRef.current = video.duration;
          }

          if (!durationRef.current) return;

          const timeLeft = durationRef.current - video.currentTime;

          // Trigger crossfade slightly before end
          if (timeLeft <= CROSSFADE_DURATION) {
               const nextIndex = (index === 0) ? 1 : 0;
               const nextVideo = videoRefs[nextIndex].current;

               if (nextVideo) {
                    // Only start the text video if it is strictly paused
                    // This avoids constantly resetting it if timeUpdate fires multiple times
                    if (nextVideo.paused) {
                         nextVideo.currentTime = 0;
                         nextVideo.play().catch((e) => console.error("SeamlessVideo play error:", e));
                         setActiveVideo(nextIndex);
                    }
               }
          }
     };

     /**
      * IMPORTANT:
      * When the active video changes, Framer Motion animates the opacity.
      * vid 0 -> opacity 0 (fades out)
      * vid 1 -> opacity 1 (fades in)
      * 
      * The 'outgoing' video continues playing until the crossfade finishes (and physically ends),
      * providing a seamless transition.
      */

     return (
          <div className={`relative w-full h-full overflow-hidden ${className}`}>
               {[0, 1].map((index) => (
                    <motion.video
                         key={index}
                         ref={videoRefs[index]}
                         src={src}
                         className="absolute inset-0 w-full h-full object-cover"
                         // We set 'initial' to proper opacity so SSR avoids flashing
                         initial={{ opacity: index === 0 ? 1 : 0 }}
                         animate={{ opacity: activeVideo === index ? 1 : 0 }}
                         transition={{ duration: CROSSFADE_DURATION, ease: "linear" }}
                         onTimeUpdate={() => handleTimeUpdate(index)}
                         muted
                         playsInline
                         // Only the first buffer auto-plays on mount
                         autoPlay={index === 0}
                    />
               ))}
          </div>
     );
}
