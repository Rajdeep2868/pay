"use client";

import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { WalletProvider } from "@/contexts/WalletContext";
import Navbar from "@/components/navbar";
import MobileNav from "@/components/MobileNav";
import { ThemeProvider } from "@/components/theme-provider";

export function ClientComponents({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        <WalletProvider>
          <Navbar />
          <div className="min-h-screen pb-16 md:pb-0">{children}</div>
          <MobileNav />
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default ClientComponents;