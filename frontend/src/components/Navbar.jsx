"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu, X, User, LogOut, LogIn,
  Info, Sparkles, BookOpen, Map,
  ChevronRight, CalendarCheck, Brain, Star, HelpCircle, MessageCircle
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const mobileNavItems = [
    {
      label: "About",
      href: "/about",
      icon: Info,
      children: [
        { label: "About Us", href: "/about", icon: Info },
        { label: "The Journey", href: "/journey", icon: Map },
        { label: "How It Works", href: "/how-it-works", icon: Sparkles },
        { label: "What Makes Us Different", href: "/what-makes-us-different", icon: Star }
      ]
    },
    {
      label: "Resources",
      href: "/resources",
      icon: BookOpen
    },
    {
      label: "Awareness",
      href: "/awareness",
      icon: Brain
    },
    {
      label: "FAQ",
      href: "/faqs",
      icon: HelpCircle,
      children: [
        { label: "FAQs", href: "/faqs", icon: HelpCircle },
        { label: "Contact Us", href: "/contact", icon: MessageCircle }
      ]
    },
    {
      label: "Book Session",
      href: "/book-session",
      icon: CalendarCheck,
      primary: true
    }
  ];

  // Scroll listener for glass effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  const navLinkVariants = {
    hover: {
      scale: 1.05,
      textShadow: "0 0 8px rgba(255,255,255,0.5)"
    },
    tap: { scale: 0.95 }
  };

  const NavLink = ({ href, children, icon: Icon, dropdownItems }) => {
    const isActive = pathname === href;

    // Dynamic dropdown styles based on scroll state - matches navbar exactly
    const dropdownBg = scrolled
      ? "bg-[#a167a5]/50 backdrop-blur-xl border-white/10"
      : "bg-white/10 backdrop-blur-xl border-white/20";

    const dropdownItemHover = scrolled
      ? "hover:bg-[#a167a5]/40"
      : "hover:bg-white/20";

    return (
      <div className="relative group">
        <motion.div variants={navLinkVariants} whileHover="hover" whileTap="tap">
          <Link
            href={href}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? "text-white" : "text-white/80 hover:text-white"
              }`}
          >
            <Icon size={16} className={isActive ? "text-[#eeb9ff]" : "text-[#eeb9ff] opacity-90"} />
            <span className="tracking-wide">{children}</span>
          </Link>
        </motion.div>
        {isActive && (
          <motion.div
            layoutId="navbar-underline"
            className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-[#eeb9ff] to-[#DD1764] rounded-full shadow-[0_0_8px_rgba(238,185,255,0.6)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        {dropdownItems && (
          <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 min-w-[220px]">
            <div className={`${dropdownBg} border rounded-xl shadow-xl overflow-hidden p-1.5 flex flex-col gap-1 transition-all duration-500`}>
              {dropdownItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/80 hover:text-white ${dropdownItemHover} transition-colors`}
                >
                  {item.icon && <item.icon size={16} className="text-[#eeb9ff]" />}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-[#a167a5]/40 backdrop-blur-xl border-b border-white/10 shadow-lg"
        : "bg-transparent border-b border-transparent py-4"
        }`}
    >
      <div className="w-full mx-auto px-4 sm:px-8 md:px-12 py-3">
        <div className="flex items-center justify-between">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center gap-3 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Image
                src="/logo.svg"
                alt="MindSettler"
                width={120}
                height={40}
                className="h-10 sm:h-12 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all duration-300"
                priority
              />
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              href="/about"
              icon={Info}
              dropdownItems={[
                { label: "About Us", href: "/about", icon: Info },
                { label: "The Journey", href: "/journey", icon: Map },
                { label: "How It Works", href: "/how-it-works", icon: Sparkles },
                { label: "What Makes Us Different", href: "/what-makes-us-different", icon: Star }
              ]}
            >
              About
            </NavLink>

            <NavLink
              href="/resources"
              icon={BookOpen}
            >
              Resources
            </NavLink>

            <NavLink
              href="/awareness"
              icon={Brain}
            >
              Awareness
            </NavLink>

            <NavLink
              href="/faqs"
              icon={HelpCircle}
              dropdownItems={[
                { label: "FAQs", href: "/faqs", icon: HelpCircle },
                { label: "Contact Us", href: "/contact", icon: MessageCircle }
              ]}
            >
              FAQ
            </NavLink>

            <div className="h-6 w-[1px] bg-white/20 mx-2" />

            <Link
              href="/book-session"
              className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#a167a5]/30 backdrop-blur-md text-white shadow-xl hover:shadow-[#4A313E]/30 transition-all overflow-hidden ring-1 ring-inset ring-white/10"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
              <CalendarCheck size={18} className="relative z-10" />
              <span className="font-semibold text-sm relative z-10">Book Session</span>
            </Link>

            <div className="flex items-center gap-3 ml-4">
              {!loading && !user && (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors">Log in</Link>
                  <Link
                    href="/signup"
                    className="px-6 py-2.5 rounded-full bg-[#a167a5]/10 backdrop-blur-md text-white shadow-xl hover:bg-[#a167a5]/20 hover:shadow-[#4A313E]/30 transition-all ring-1 ring-inset ring-white/10 font-semibold text-sm text-center"
                  >
                    Signup
                  </Link>
                </div>
              )}

              {!loading && user && (
                <div className="flex items-center gap-4">
                  <Link
                    href="/profile"
                    className="group flex items-center gap-2 p-1 pr-4 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#a167a5]/60 backdrop-blur-md text-white flex items-center justify-center ring-1 ring-inset ring-white/20">
                      <User size={14} />
                    </div>
                    <span className="text-xs font-bold text-white/90">Profile</span>
                  </Link>
                  <button onClick={handleLogout} className="text-white/70 hover:text-[#a167a5] text-xs font-bold transition-colors uppercase tracking-wider">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-colors"
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
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`md:hidden overflow-hidden mt-2 backdrop-blur-xl rounded-2xl border shadow-2xl transition-colors duration-500 ${scrolled
                ? "bg-[#a167a5]/10 border-white/20"
                : "bg-white/10 border-white/20"
                }`}
            >
              <div className="flex flex-col gap-2 pb-6 pt-4 border-t border-white/10">
                {mobileNavItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  const isExpanded = expandedItem === index;
                  const hasChildren = item.children && item.children.length > 0;

                  return (
                    <div key={index} className="flex flex-col">
                      <motion.div
                        whileHover={{ x: 6 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className={`flex items-center justify-between mx-2 rounded-xl transition-colors ${item.primary
                          ? "bg-[#4a313e]/60 backdrop-blur-md text-white ring-1 ring-inset ring-white/10 mt-2"
                          : isActive
                            ? "bg-white/5 text-white border-l-2 border-[#eeb9ff]"
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}>

                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 flex-1 px-5 py-4 font-medium`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon size={20} className={item.primary ? "text-white" : isActive ? "text-[#eeb9ff]" : "text-[#eeb9ff]/70"} />
                          {item.label}
                        </Link>

                        {hasChildren ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setExpandedItem(isExpanded ? null : index);
                            }}
                            className="p-4 hover:bg-white/10 rounded-r-xl transition-colors border-l border-white/5"
                          >
                            <ChevronRight size={16} className={`transition-transform duration-300 ${isExpanded ? "rotate-90 text-[#eeb9ff]" : "opacity-50"}`} />
                          </button>
                        ) : (
                          !item.primary && <div className="pr-5 opacity-50"><ChevronRight size={16} /></div>
                        )}
                      </motion.div>

                      <AnimatePresence>
                        {isExpanded && hasChildren && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-black/5 mx-4 mb-2 rounded-b-xl border-x border-b border-white/5"
                          >
                            {item.children.map((child, idx) => (
                              <motion.div
                                key={idx}
                                whileHover={{ x: 6 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Link
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="flex items-center gap-3 px-6 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 border-t border-white/5 first:border-0 transition-colors"
                                >
                                  <child.icon size={16} className="text-[#eeb9ff]/60" />
                                  {child.label}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {!loading && !user && (
                  <div className="flex gap-3 p-4 mt-2 border-t border-white/10">
                    <Link href="/login" className="flex-1 py-3 text-center text-sm font-bold text-white/90 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10">Log In</Link>
                    <Link href="/signup" className="flex-1 py-3 text-center text-sm font-bold text-white bg-[#a167a5]/60 backdrop-blur-md rounded-xl shadow-xl hover:bg-[#a167a5]/80 transition-all ring-1 ring-inset ring-white/10">Sign Up</Link>
                  </div>
                )}

                {!loading && user && (
                  <div className="flex gap-3 p-4 mt-2 border-t border-white/10">
                    <Link
                      href="/profile"
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-center text-sm font-bold text-white bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User size={16} />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex-1 flex items-center justify-center gap-2 py-3 text-center text-sm font-bold text-white/90 bg-white/5 rounded-xl border border-white/10 hover:bg-[#a167a5]/10 hover:text-[#eeb9ff] hover:border-[#a167a5]/30 transition-all"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}