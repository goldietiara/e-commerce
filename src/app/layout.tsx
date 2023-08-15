import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar/NavBar";
import SessionProvider from "./SessionProvider";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Owy Shoppy",
  description: "fullstack e-commerce by Goldie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` relative ${inter.className}`}>
        <SessionProvider>
          <div className="sticky top-0 z-40">
            <NavBar />
          </div>
          <main className="max-w-7×1 m-auto min-w-[300px] p-4 ">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
