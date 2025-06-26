import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import ClientWrapper from "../app/ClientWrapper";

import { JSX } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayVia",
  description: "Payvia a simulated wallet app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </Providers>
      </body>
    </html>
  );
}
