// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter, usePathname } from "next/navigation";
// import { 
//   LayoutDashboard, 
//   Calendar, 
//   Clock, 
//   Building2, 
//   LogOut,
//   Menu,    // Added for Hamburger
//   X        // Added for Close icon
// } from "lucide-react";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// export default function AdminHeader() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   // Close mobile menu whenever the route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [pathname]);

//   // Prevent scrolling when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isMobileMenuOpen]);

//   const handleLogout = async () => {
//     try {
//       await fetch(`${API_BASE_URL}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (e) {
//       console.error("Admin logout failed", e);
//     } finally {
//       router.push("/admin/login");
//     }
//   };

//   const getLinkClass = (path, isMobile = false) => {
//     const isActive = pathname === path;
//     const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200";
//     const activeClass = "bg-slate-900/5 text-slate-900";
//     const inactiveClass = "text-slate-500 hover:text-slate-900 hover:bg-slate-50";

//     return `${baseClass} ${isActive ? activeClass : inactiveClass} ${isMobile ? "w-full text-base" : ""}`;
//   };

//   const navLinks = [
//     { href: "/admin/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
//     { href: "/admin/appointments", icon: <Calendar size={18} />, label: "Appointments" },
//     { href: "/admin/slots", icon: <Clock size={18} />, label: "Slots" },
//     { href: "/admin/corporate-inquiries", icon: <Building2 size={18} />, label: "Corporate" },
//   ];

//   return (
//     <>
//       <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          
//           {/* Brand */}
//           <Link href="/admin/dashboard" className="flex items-center gap-2 group z-50 relative">
//             <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
//               <LayoutDashboard size={16} />
//             </div>
//             <span className="font-bold text-slate-800 tracking-tight">
//               MindSettler <span className="font-normal text-slate-500">Admin</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center gap-1">
//             {navLinks.map((link) => (
//               <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
//                 {link.icon}
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Logout & Mobile Toggle */}
//           <div className="flex items-center gap-2">
//             {/* Desktop Logout */}
//             <button
//               type="button"
//               onClick={handleLogout}
//               className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-transparent hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all text-sm font-medium group"
//             >
//               <span>Logout</span>
//               <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
//             </button>

//             {/* Mobile Menu Toggle Button */}
//             <button 
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors z-50 relative"
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 px-4 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
//           <nav className="flex flex-col gap-2">
//             {navLinks.map((link) => (
//               <Link 
//                 key={link.href} 
//                 href={link.href} 
//                 className={getLinkClass(link.href, true)}
//               >
//                 {link.icon}
//                 {link.label}
//               </Link>
//             ))}
            
//             <hr className="my-4 border-slate-100" />
            
//             <button
//               type="button"
//               onClick={handleLogout}
//               className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium w-full text-left transition-all"
//             >
//               <LogOut size={18} />
//               Logout
//             </button>
//           </nav>
//         </div>
//       )}
//     </>
//   );
// }


'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Building2, 
  LogOut,
  Menu,    // Added for Hamburger
  X,        // Added for Close icon
  Newspaper // Added for Events
} from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Admin logout failed", e);
    } finally {
      router.push("/admin/login");
    }
  };

  const getLinkClass = (path, isMobile = false) => {
    const isActive = pathname === path;
    const baseClass = "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200";
    const activeClass = "bg-slate-900/5 text-slate-900";
    const inactiveClass = "text-slate-500 hover:text-slate-900 hover:bg-slate-50";

    return `${baseClass} ${isActive ? activeClass : inactiveClass} ${isMobile ? "w-full text-base" : ""}`;
  };

  const navLinks = [
    { href: "/admin/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { href: "/admin/appointments", icon: <Calendar size={18} />, label: "Appointments" },
    { href: "/admin/slots", icon: <Clock size={18} />, label: "Slots" },
    { href: "/admin/corporate-inquiries", icon: <Building2 size={18} />, label: "Corporate" },
    { href: "/admin/latest-events", icon: <Newspaper size={18} />, label: "Events" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          
          {/* Brand */}
          <Link href="/admin/dashboard" className="flex items-center gap-2 group z-50 relative">
            <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <LayoutDashboard size={16} />
            </div>
            <span className="font-bold text-slate-800 tracking-tight">
              MindSettler <span className="font-normal text-slate-500">Admin</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getLinkClass(link.href)}>
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Logout & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Desktop Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-transparent hover:bg-red-50 text-slate-500 hover:text-red-600 transition-all text-sm font-medium group"
            >
              <span>Logout</span>
              <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors z-50 relative"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl pt-24 px-4 md:hidden animate-in fade-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={getLinkClass(link.href, true)}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            
            <hr className="my-4 border-slate-100" />
            
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium w-full text-left transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
