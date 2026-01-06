"use client";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isHowItWorks = pathname === "/how-it-works";
  const isLogin = pathname === "/login";
  
  // Routes that should NOT have the global parallax background
  // Added /signup to exclusion list as it has its own specific backgrounds
  const isGlobalBackgroundExcluded = ["/how-it-works", "/admin"].some((path) =>
    pathname?.startsWith(path)
  );

  const showGlobalBackground = !isGlobalBackgroundExcluded;

  // Global Parallax Scroll Logic
  const { scrollYProgress: globalScroll } = useScroll();
  const backgroundY = useTransform(globalScroll, [0, 1], ["0%", "-30%"]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body 
        className={clsx(
          "w-full transition-colors duration-300",
          showGlobalBackground ? "bg-black text-white selection:bg-[#DD1764] selection:text-white" : "bg-[#F6F4FA] text-[#2E2A36]"
        )}
      >
        {/* GLOBAL BACKGROUND LAYER (Only if active) */}
        {showGlobalBackground && (
          <div className="fixed inset-0 -z-10 bg-black overflow-hidden pointer-events-none">
            {/* PARALLAX CONTAINER */}
            <motion.div
              style={{ y: backgroundY }}
              className="absolute inset-0 w-full h-[160vh] -top-[10vh]"
            >
              <Image
                src="/images/bg2.jpg"
                alt="Fluid Art Background"
                fill
                className="object-cover blur-[2px] opacity-50"
                priority
              />
            </motion.div>

            {/* FIXED OVERLAYS */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-[1]" />
            <div className="absolute inset-0 bg-black/10 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#3F2965]/20 via-transparent to-[#3F2965]/40 z-[1]" />
          </div>
        )}

        <div className="min-h-screen flex flex-col relative z-0">
          {!isAdminRoute && <Navbar />}

          <main
            className={clsx(
              "w-full flex-grow",
              !isAdminRoute && "pt-20 md:pt-24"
            )}
          >
            {children}
          </main>

          {!isAdminRoute && <Footer />}
        </div>
        {!isAdminRoute && <Chatbot />}
      </body>
    </html>
  );
}
