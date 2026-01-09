"use client";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Red_Hat_Text } from "next/font/google";

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  variable: "--font-redhat",
  weight: "variable", // Supports variable weights
  display: "swap",
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isHowItWorks = pathname === "/how-it-works";
  const isLogin = pathname === "/login";

  // Routes that should NOT have the global parallax background
  // Added /signup to exclusion list as it has its own specific backgrounds
  const isGlobalBackgroundExcluded = ["/admin"].some((path) =>
    pathname?.startsWith(path)
  );

  const showGlobalBackground = !isGlobalBackgroundExcluded;

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body
        className={clsx(
          "w-full transition-colors duration-300",
          redHatText.variable,
          showGlobalBackground ? "bg-black text-white selection:bg-[#DD1764] selection:text-white" : "bg-[#F6F4FA] text-[#2E2A36]"
        )}
      >
        {/* GLOBAL BACKGROUND LAYER (Only if active) */}
        {showGlobalBackground && (
          <div className="fixed inset-0 -z-10">
            <Image
              src="https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978664/mindsettler_assets/bg4.jpg"
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        <div className="min-h-screen flex flex-col relative z-0">
          {!isAdminRoute && <Navbar />}

          <main
            className={clsx(
              "w-full flex-grow",
              !isAdminRoute && pathname !== "/" && "pt-20 md:pt-24"
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
