"use client";

import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Red_Hat_Text, Baskervville } from "next/font/google";

const redHatText = Red_Hat_Text({
  subsets: ["latin"],
  variable: "--font-redhat",
  weight: "variable", // Supports variable weights
  display: "swap",
});

const baskervville = Baskervville({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-baskervville",
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

        {/* Primary Meta Tags */}
        <title>MindSettler by Parnika | Mental Health & Psychotherapy Services</title>
        <meta name="title" content="MindSettler by Parnika | Mental Health & Psychotherapy Services" />
        <meta name="description" content="MindSettler by Parnika offers confidential psychotherapy and counseling services in Surat, Gujarat. A safe, non-judgmental space for mental health awareness, emotional well-being, and guided support." />
        <meta name="keywords" content="mental health, psychotherapy, counseling, therapy, emotional well-being, mental health awareness, psychotherapist, counselor, Surat, Gujarat, India, Parnika Bajaj, online therapy, offline therapy, mental health services, emotional support, psychological counseling, psycho-education, trauma healing, relationship counseling, anxiety therapy, depression counseling, stress management, self-awareness, emotional balance" />
        <meta name="author" content="Parnika Bajaj" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://mindsettler.com" />
        <link rel="manifest" href="/manifest.json" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mindsettler.com" />
        <meta property="og:title" content="MindSettler by Parnika | Mental Health & Psychotherapy Services" />
        <meta property="og:description" content="A safe space for mental health awareness, psychotherapy, and emotional well-being. Confidential, non-judgmental, guided support." />
        <meta property="og:image" content="https://mindsettler.com/logo.png" />
        <meta property="og:site_name" content="MindSettler by Parnika" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mindsettler.com" />
        <meta property="twitter:title" content="MindSettler by Parnika | Mental Health & Psychotherapy Services" />
        <meta property="twitter:description" content="A safe space for mental health awareness, psychotherapy, and emotional well-being." />
        <meta property="twitter:image" content="https://mindsettler.com/logo.png" />

        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MindSettler by Parnika",
              "url": "https://mindsettler.com",
              "logo": "https://mindsettler.com/logo.png",
              "description": "Mental health awareness and psychotherapy services",
              "founder": {
                "@type": "Person",
                "name": "Parnika Bajaj"
              },
              "sameAs": [
                // Add social media URLs when available
              ]
            })
          }}
        />

        {/* Structured Data - LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://mindsettler.com",
              "name": "MindSettler by Parnika",
              "image": "https://mindsettler.com/logo.png",
              "description": "Professional psychotherapy and counseling services for mental health and emotional well-being",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Surat",
                "addressRegion": "Gujarat",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "addressCountry": "IN"
              },
              "url": "https://mindsettler.com",
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            })
          }}
        />

        {/* Structured Data - Person Schema (Parnika Bajaj) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Parnika Bajaj",
              "jobTitle": "Psychotherapist",
              "description": "Psychotherapist with B.Sc. in Psychology (Honours) from University of Edinburgh and Master's in Counselling Psychology from Golden Gate University, San Francisco",
              "alumniOf": [
                {
                  "@type": "EducationalOrganization",
                  "name": "University of Edinburgh"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "Golden Gate University"
                }
              ],
              "knowsAbout": [
                "Psychotherapy",
                "Counseling Psychology",
                "Mental Health",
                "Emotional Well-being",
                "Trauma Healing",
                "Relationship Counseling"
              ],
              "affiliation": {
                "@type": "Organization",
                "name": "MindSettler by Parnika"
              }
            })
          }}
        />

        {/* Structured Data - Service Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Psychotherapy and Counseling",
              "provider": {
                "@type": "Organization",
                "name": "MindSettler by Parnika"
              },
              "areaServed": {
                "@type": "Country",
                "name": "India"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Mental Health Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Individual Therapy Sessions",
                      "description": "One-on-one psychotherapy sessions for mental health and emotional well-being"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Online Counseling",
                      "description": "Virtual therapy sessions for convenient access to mental health support"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Corporate Mental Health Programs",
                      "description": "Workplace wellness and mental health support for organizations"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body
        className={clsx(
          "w-full transition-colors duration-300",
          redHatText.variable,
          baskervville.variable,
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
