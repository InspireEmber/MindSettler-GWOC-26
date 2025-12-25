"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import api from "../../services/api";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Carousel state (mirrors login page)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [touchStartY, setTouchStartY] = useState(null);
  const [direction, setDirection] = useState(0);
  const desktopCarouselRef = useRef(null);
  const mobileCarouselRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Same images as login page (from public/images)
  const images = [
    "/images/loginimage4.jpg",
    "/images/loginimage1.jpg",
    "/images/loginimage5.jpg",
  ].filter((url) => url !== "");

  useEffect(() => {
    if (images.length > 1 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [images.length, isHovered]);

  const goToNext = () => {
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };
  const onTouchMove = (e) => {
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    if (touchStart !== null && touchStartY !== null) {
      const deltaX = Math.abs(currentX - touchStart);
      const deltaY = Math.abs(currentY - touchStartY);
      if (deltaX > deltaY * 2 && deltaX > 15) {
        e.preventDefault();
        isScrollingRef.current = true;
      } else if (deltaY > deltaX * 2) {
        isScrollingRef.current = false;
      }
    }
    setTouchEnd(currentX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
    setTouchStart(null);
    setTouchEnd(null);
    setTouchStartY(null);
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  };

  const handleWheel = (e) => {
    const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 2;
    if (isHorizontalScroll && Math.abs(e.deltaX) > 15) {
      e.preventDefault();
      e.stopPropagation();
      if (e.deltaX > 0) goToNext();
      else goToPrevious();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // --- CLIENT SIDE VALIDATION START ---
    
    // 1. Check for empty Name
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      setLoading(false);
      return;
    }

    // 2. Validate Email Format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // 3. Validate Phone (Basic length check, adjust as needed)
    if (!formData.phone || formData.phone.length < 10) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    // 4. Validate Password Length
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    // --- CLIENT SIDE VALIDATION END ---

    try {
      await api.userSignup(formData);
      router.push("/login");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F4FA] p-2 sm:p-4 relative overflow-hidden">
      {/* Blurred Background Effect */}
      <div className="absolute inset-0 bg-[#F6F4FA] backdrop-blur-md -z-10" />

      {/* Animated Purple-Pink Rays */}
      <motion.div
        className="absolute inset-0 -z-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(63, 41, 101, 0.15) 25%, rgba(221, 23, 100, 0.15) 50%, rgba(63, 41, 101, 0.15) 75%, transparent 100%)`,
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 -z-0 opacity-10"
        style={{
          background: `linear-gradient(45deg, transparent 0%, rgba(221, 23, 100, 0.1) 30%, rgba(63, 41, 101, 0.1) 70%, transparent 100%)`,
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["100% 100%", "0% 0%", "100% 100%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Two-column container (carousel + form) */}
      <div className="w-full max-w-[99vw] xl:max-w-[97vw] 2xl:max-w-[95vw] flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch justify-center relative z-10 min-h-[600px]">
        {/* Left: Desktop Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="hidden lg:flex lg:w-1/2 relative flex-1 bg-gradient-to-br from-[#2E2A36] to-[#3F2965] overflow-hidden rounded-lg sm:rounded-xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {images.length > 0 ? (
            <div
              ref={desktopCarouselRef}
              className="relative w-full h-full overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onWheel={handleWheel}
              style={{
                touchAction: "pan-y pinch-zoom",
                overscrollBehaviorX: "contain",
                overscrollBehaviorY: "auto",
                WebkitOverflowScrolling: "touch",
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority={currentImageIndex === 0}
                    sizes="50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg:white/30 transition-all text-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg:white/30 transition-all text-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white w-8" : "bg-white/50 w-2 hover:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">Add image URLs in the code</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right: Signup Form */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full lg:w-1/2 bg-white/95 backdrop-blur-sm flex flex-col rounded-lg sm:rounded-xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 border border-white/50"
          style={{ minHeight: "400px" }}
        >
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 md:px-12 py-4 sm:py-6 md:py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <h1 className="text-3xl sm:text-4xl font-light text-[#2E2A36] mb-2">Create an Account</h1>
              <p className="text-sm sm:text-base text-[#5E5A6B] mb-8">
                Sign up to book and track your psycho-education sessions more easily.
              </p>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-6 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#2E2A36] mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2A36] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2A36] mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
                    placeholder="+91..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2E2A36] mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-[#3F2965]/20 focus:ring-2 focus:ring-[#3F2965] outline-none bg-white min-h-[44px] text-sm sm:text-base"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5E5A6B] hover:text-[#3F2965] transition-colors p-1"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 sm:py-4 rounded-full bg-[#3F2965] text-white font-medium text-sm sm:text-base hover:bg-[#3F2965]/90 hover:shadow-lg transition-all disabled:opacity-60 min-h-[44px]"
                >
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#3F2965]/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/95 backdrop-blur-sm text-[#5E5A6B]">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white text-[#2E2A36] font-medium text-sm hover:bg-[#F6F4FA] hover:border-[#3F2965]/30 transition-all min-h-[44px]"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#3F2965]/20 bg-white text-[#2E2A36] font-medium text-sm hover:bg-[#F6F4FA] hover:border-[#3F2965]/30 transition-all min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
              </div>

              <p className="text-sm text-[#5E5A6B] text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-[#3F2965] font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Carousel (below form on small screens) */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:hidden w-full relative bg-gradient-to-br from-[#2E2A36] to-[#3F2965] overflow-hidden rounded-lg sm:rounded-xl shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 order-2"
            style={{ minHeight: "400px", height: "400px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              ref={mobileCarouselRef}
              className="relative w-full h-full overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                touchAction: "pan-y pinch-zoom",
                overscrollBehaviorX: "contain",
                overscrollBehaviorY: "auto",
                WebkitOverflowScrolling: "touch",
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentImageIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={`Slide ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    priority={currentImageIndex === 0}
                    sizes="100vw"
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm active:bg-white/40 transition-all text-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm active:bg-white/40 transition-all text-white"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentImageIndex ? "bg-white w-8" : "bg-white/50 w-2 active:bg-white/70"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}