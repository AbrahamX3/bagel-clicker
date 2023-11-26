import type { Metadata } from "next";
import Loglib from "@loglib/tracker/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

import { SiteFooter } from "~/components/footer";
import SiteHeader from "~/components/header";
import { ThemeProvider } from "~/components/theme-provider";

import "~/styles/globals.css";
import "~/styles/styles.css";

export const metadata: Metadata = {
  title: "Bagel Clicker",
  description: "Created By AbrahamX3",
  icons: {
    icon: "/bagel.webp",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
          <Loglib
            config={{
              id: "bagel",
            }}
          />
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
