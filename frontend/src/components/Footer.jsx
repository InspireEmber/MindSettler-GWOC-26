
import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "About": [
      { name: "About Us", href: "/about" },
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
    <footer className="bg-[#2E2A36] text-white py-12 sm:py-16 border-t border-[#3F2965]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12">
          
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4 sm:mb-6 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.svg"
                alt="MindSettler"
                width={100}
                height={100}
                className="h-12 sm:h-14 md:h-16 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-gray-400 mt-2">
              © {currentYear} MindSettler.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors block min-h-[32px] flex items-center"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white font-semibold mb-4 sm:mb-6 text-xs sm:text-sm uppercase tracking-wider">
              Follow us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/mindsettlerbypb/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3F2965] flex items-center justify-center hover:scale-110 transition-transform min-w-[44px] min-h-[44px]"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}