"use client";
import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "About": [
      { name: "About Us", href: "/about" },
      { name: "The Journey", href: "/journey" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "What Makes Us Different", href: "/what-makes-us-different" }
    ],
    "Resources": [
      { name: "Psycho-Education", href: "/psycho-education" },
      { name: "Resources", href: "/resources" },
      { name: "FAQs", href: "/faqs" }
    ],
    "Legal": [
      { name: "Privacy Policy", href: "/policies/privacy" },
      { name: "Non-Refund Policy", href: "/policies/non-refund" },
      { name: "Confidentiality Policy", href: "/policies/confidentiality" }
    ]
  };

  return (
    <footer className="bg-[#3A3545] text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Changed lg:grid-cols-5 to lg:grid-cols-6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Logo Section (Spans 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image
                src="/logo.svg"
                alt="MindSettler"
                width={120}
                height={40}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Settle the mind, understand the self. A dedicated space for structured psycho-education.
            </p>
          </div>

          {/* Dynamic Links Sections (Each spans 1 column) */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h3 className="text-[#DD1764] font-bold mb-6 text-xs uppercase tracking-[0.15em]">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-gray-400 hover:text-white transition-all flex items-center gap-1 group"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-[#DD1764] transition-all duration-300 group-hover:w-full" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Section (Now fits in the 6th column) */}
          <div className="flex flex-col lg:col-span-1">
            <h3 className="text-[#DD1764] font-bold mb-6 text-xs uppercase tracking-[0.15em]">
              Follow us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mindsettlerbypb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#DD1764] hover:scale-110 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-gray-300 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-500 font-medium tracking-widest uppercase">
            © {currentYear} MindSettler. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
             <Link href="/contact" className="text-[11px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
               Contact Support
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}