import { Providers } from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ToasterProvider } from "@/components/toaster-provider";
import { ModalProvider } from "@/components/modal-provider";
import { CrispProvider } from "@/components/crisp-provider";
import { NFTProvider } from "@/context/NFTContext";

import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NFTHUB",
  description: "NFT AI Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <NFTProvider>
        <html lang="en" suppressHydrationWarning>
          <CrispProvider />
          <body className={font.className}>
            <Providers>
              <ToasterProvider />
              <ModalProvider />
              {children}
            </Providers>
          </body>
        </html>
      </NFTProvider>
    </ClerkProvider>
  );
}
