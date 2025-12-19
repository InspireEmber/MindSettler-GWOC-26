import "../styles/globals.css";
import Header from "../components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F6F4FA] text-[#2E2A36]">
        <Header />

        <main>
          {children}
        </main>

        <footer className="text-center py-8 text-[#5E5A6B] border-t border-[#3F2965]/10 bg-white">
          <p className="text-sm">© {new Date().getFullYear()} MindSettler. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
