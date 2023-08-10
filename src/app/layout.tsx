import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Owy Shoppy",
  description: "fullstack ecommerce by Goldie",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` ${inter.className}`}>
        <NavBar />
        <main className="p-4 max-w-7×1 m-auto min-w-[300px] ">{children}</main>
      </body>
    </html>
  );
}
