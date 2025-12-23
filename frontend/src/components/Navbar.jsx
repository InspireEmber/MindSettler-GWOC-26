"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#3F2965]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/logo.svg"
              alt="MindSettler"
              width={100}
              height={100}
              className="h-12 sm:h-14 md:h-16 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/about"
              className="text-[#2E2A36] hover:text-[#3F2965] transition-colors"
            >
              About
            </Link>
            <Link
              href="/how-it-works"
              className="text-[#2E2A36] hover:text-[#3F2965] transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/resources"
              className="text-[#2E2A36] hover:text-[#3F2965] transition-colors"
            >
              Resources
            </Link>
            <Link
              href="/book-session"
              className="px-6 py-2 rounded-full bg-[#3F2965] text-white hover:bg-[#3F2965]/90 transition-colors"
            >
              Book Session
            </Link>
            <div className="flex items-center gap-4 text-sm">
              {!loading && !user && (
                <>
                  <Link
                    href="/login"
                    className="text-[#5E5A6B] hover:text-[#3F2965] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="text-[#5E5A6B] hover:text-[#3F2965] transition-colors"
                  >
                    Signup
                  </Link>
                </>
              )}

              {!loading && user && (
                <>
                  <Link
                    href="/profile"
                    className="text-[#5E5A6B] hover:text-[#3F2965] transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-[#5E5A6B] hover:text-[#3F2965] transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#2E2A36] hover:text-[#3F2965] transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="min-w-[24px] min-h-[24px]" />
            ) : (
              <Menu size={24} className="min-w-[24px] min-h-[24px]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[#3F2965]/10 pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/about"
                className="px-4 py-3 text-[#2E2A36] hover:text-[#3F2965] hover:bg-[#3F2965]/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/how-it-works"
                className="px-4 py-3 text-[#2E2A36] hover:text-[#3F2965] hover:bg-[#3F2965]/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/resources"
                className="px-4 py-3 text-[#2E2A36] hover:text-[#3F2965] hover:bg-[#3F2965]/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/book-session"
                className="px-4 py-3 rounded-full bg-[#3F2965] text-white hover:bg-[#3F2965]/90 transition-colors text-center min-h-[44px] flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book Session
              </Link>
              <div className="flex flex-col gap-2 pt-2 border-t border-[#3F2965]/10">
                {!loading && !user && (
                  <>
                    <Link
                      href="/login"
                      className="px-4 py-3 text-[#5E5A6B] hover:text-[#3F2965] hover:bg-[#3F2965]/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="px-4 py-3 text-[#5E5A6B] hover:text-[#3F2965] hover:bg-[#3F2965]/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Signup
                    </Link>
                  </>
                )}

                {!loading && user && (
                  <>
                    <Link
                      href="/profile"
                      className="px-4 py-3 text-[#5E5A6B] hover:text-[#3F2965] hover:bg-[#3F2965]/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="px-4 py-3 text-left text-[#5E5A6B] hover:text-[#3F2965] hover:bg-[#3F2965]/5 rounded-lg transition-colors min-h-[44px] flex items-center"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
