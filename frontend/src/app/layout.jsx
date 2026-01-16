import "../styles/globals.css";
import { Red_Hat_Text, Baskervville } from "next/font/google"; // fonts work in server components
import ClientLayout from "./ClientLayout";
import clsx from "clsx";

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

export const metadata = {
  metadataBase: new URL('https://mindsettler.com'), // Replace with actual domain when known or use localhost for dev
  title: {
    default: 'MindSettler - Mental Well-being & Consultation',
    template: '%s | MindSettler'
  },
  description: 'MindSettler by Parnika is a safe space to understand your mind, settle emotional distress, and begin your mental well-being journey.',
  keywords: ['Mental Health', 'Therapy', 'Counseling', 'MindSettler', 'Parnika', 'Well-being', 'Psychology', 'Consultation'],
  openGraph: {
    title: 'MindSettler - Mental Well-being & Consultation',
    description: 'MindSettler by Parnika is a safe space to understand your mind, settle emotional distress, and begin your mental well-being journey.',
    url: 'https://mindsettler.com',
    siteName: 'MindSettler',
    images: [
      {
        url: 'https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978664/mindsettler_assets/bg4.jpg', // Using the background image as a fallback OG image
        width: 1200,
        height: 630,
        alt: 'MindSettler Environment',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindSettler - Mental Well-being & Consultation',
    description: 'Begin your mental well-being journey with MindSettler.',
    images: ['https://res.cloudinary.com/dlplhnb7o/image/upload/v1767978664/mindsettler_assets/bg4.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "w-full transition-colors duration-300",
          redHatText.variable,
          baskervville.variable
        )}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
