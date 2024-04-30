import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

import { Header } from "@/components/header";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Real Estate",
  icons: { icon: "/icon.svg" },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <ClerkProvider>
      <html>
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
