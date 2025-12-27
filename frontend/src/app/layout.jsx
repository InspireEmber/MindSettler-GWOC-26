import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body className="bg-[#F6F4FA] text-[#2E2A36] w-full">
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="w-full pt-20 md:pt-24">
            {children}
          </main>

          <Footer />
        </div>
        <Chatbot />
      </body>
    </html>
  );
}
