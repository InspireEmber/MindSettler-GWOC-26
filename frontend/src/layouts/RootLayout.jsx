import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import clsx from "clsx";

export default function RootLayout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname?.startsWith("/admin");
  const showGlobalBackground = !["/admin"].some((path) =>
    pathname?.startsWith(path)
  );

  return (
    <div
      className={clsx(
        "w-full transition-colors duration-300 font-sans",
        showGlobalBackground
          ? "bg-transparent text-white selection:bg-[#DD1764] selection:text-white"
          : "bg-[#F6F4FA] text-[#2E2A36]"
      )}
    >
      {/* GLOBAL BACKGROUND LAYER */}
      {showGlobalBackground && (
        <div className="fixed inset-0 z-0">
          <img
            src="/images/bg4.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <div className="min-h-screen flex flex-col relative z-10">
        {!isAdminRoute && <Navbar />}

        <main
          className={clsx(
            "w-full flex-grow",
            !isAdminRoute && pathname !== "/" && "pt-20 md:pt-24"
          )}
        >
          <Outlet />
        </main>

        {!isAdminRoute && <Footer />}
      </div>
      {!isAdminRoute && <Chatbot />}
    </div>
  );
}
