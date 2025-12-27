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
        <Navbar />

        <main className="w-full">
          {children}
        </main>

        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
