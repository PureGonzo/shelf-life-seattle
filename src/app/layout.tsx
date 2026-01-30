import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: {
    default: "Shelf Life Seattle",
    template: "%s | Shelf Life Seattle",
  },
  description:
    "Discover Seattle's vibrant independent bookstore community. Explore an interactive map, read about local shops, and stay connected with the literary scene.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} flex min-h-screen flex-col text-gray-900`}
      >
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        >
          <div className="h-full w-full bg-amber-50/90" />
        </div>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
