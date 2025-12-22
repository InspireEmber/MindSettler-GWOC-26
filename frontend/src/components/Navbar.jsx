"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#3F2965]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.svg"
              alt="MindSettler"
              width={100}
              height={100}
              className="h-16 w-auto object-contain"
              priority
            />
          </Link>

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
                    onClick={async () => {
                      await logout();
                      router.push("/login");
                    }}
                    className="text-[#5E5A6B] hover:text-[#3F2965] transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
