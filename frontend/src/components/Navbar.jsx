import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#3F2965]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/logo.svg"
              alt="MindSettler"
              className="h-16 w-auto"
            />
            <span className="text-2xl font-medium tracking-wide text-[#3F2965]">
              MindSettler
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-[#2E2A36] hover:text-[#3F2965] transition-colors">
              About
            </Link>
            <Link href="/how-it-works" className="text-[#2E2A36] hover:text-[#3F2965] transition-colors">
              How It Works
            </Link>
            <Link href="/resources" className="text-[#2E2A36] hover:text-[#3F2965] transition-colors">
              Resources
            </Link>
            <Link 
              href="/book-session" 
              className="px-6 py-2 rounded-full bg-[#3F2965] text-white hover:bg-[#3F2965]/90 transition-colors"
            >
              Book Session
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
