"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Menu, X, User, LogOut, LogIn, 
  UserPlus, Info, Sparkles, BookOpen, 
  ChevronRight, CalendarCheck 
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const navLinkVariants = {
    hover: { scale: 1.05, color: "#3F2965" },
    tap: { scale: 0.95 }
  };

  const NavLink = ({ href, children, icon: Icon }) => (
    <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
      <Link
        href={href}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-[#5E5A6B] hover:bg-[#3F2965]/5 transition-all"
      >
        <Icon size={16} className="text-[#DD1764]" />
        {children}
      </Link>
    </motion.div>
  );

  return (
    /* Updated Header: 
       - Removed bg-white/70 
       - Added bg-gradient-to-r with Blue, Violet, Pink, and White tints
       - Maintained backdrop-blur for a premium feel
    */
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/30 shadow-sm bg-gradient-to-r from-white/80 via-blue-50/60 via-violet-50/60 to-pink-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 md:py-4">
        <div className="flex items-center justify-between">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo.svg"
                alt="MindSettler"
                width={120}
                height={40}
                className="h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-transform"
                priority
              />
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/about" icon={Info}>About</NavLink>
            <NavLink href="/how-it-works" icon={Sparkles}>How It Works</NavLink>
            <NavLink href="/resources" icon={BookOpen}>Resources</NavLink>
            
            <div className="h-6 w-[1px] bg-[#3F2965]/10 mx-2" />

            <Link
              href="/book-session"
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-br from-[#3F2965] to-[#2E2A36] text-white shadow-lg hover:shadow-[#3F2965]/20 transition-all overflow-hidden"
            >
              <CalendarCheck size={18} />
              <span className="font-semibold text-sm">Book Session</span>
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>

            <div className="flex items-center gap-3 ml-4">
              {!loading && !user && (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="p-2 text-[#5E5A6B] hover:text-[#3F2965]"><LogIn size={20} /></Link>
                  <Link href="/signup" className="px-4 py-2 text-sm font-bold text-[#3F2965] border border-[#3F2965]/20 rounded-full hover:bg-[#3F2965]/5">Signup</Link>
                </div>
              )}

              {!loading && user && (
                <div className="flex items-center gap-4">
                  <Link
                    href="/profile"
                    className="group flex items-center gap-2 p-1 pr-4 rounded-full bg-white/50 border border-[#3F2965]/10 hover:border-[#3F2965]/30 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#3F2965] text-white flex items-center justify-center shadow-md">
                      <User size={16} />
                    </div>
                    <span className="text-xs font-bold text-[#3F2965]">My Account</span>
                  </Link>
                  <button onClick={handleLogout} className="text-[#5E5A6B] hover:text-red-500 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          </nav>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/40 text-[#3F2965]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              /* Mobile Drawer also gets the Mixed Background */
              className="md:hidden overflow-hidden mt-2 bg-gradient-to-b from-transparent to-white/90 rounded-b-2xl"
            >
              <div className="flex flex-col gap-2 pb-6 pt-4 border-t border-[#3F2965]/5">
                {[
                  { href: "/about", label: "About", icon: Info },
                  { href: "/how-it-works", label: "How It Works", icon: Sparkles },
                  { href: "/resources", label: "Resources", icon: BookOpen },
                  { href: "/book-session", label: "Book Session", icon: CalendarCheck, primary: true },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all ${
                      item.primary ? "bg-[#3F2965] text-white" : "bg-white/60 text-[#2E2A36]"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3 font-medium">
                      <item.icon size={20} className={item.primary ? "text-white" : "text-[#DD1764]"} />
                      {item.label}
                    </div>
                    <ChevronRight size={16} className="opacity-50" />
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}