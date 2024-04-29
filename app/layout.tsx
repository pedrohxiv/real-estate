import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real Estate",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <body className={font.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
