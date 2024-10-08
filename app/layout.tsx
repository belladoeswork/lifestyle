import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ClerkProvider, SignedOut, SignedIn } from '@clerk/nextjs';

const lexendDeca = localFont({
  src: [
    {
      path: './fonts/LexendDeca-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/LexendDeca-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/LexendDeca-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-lexend-deca',
});

export const metadata: Metadata = {
  title: "Self-Improvement Modules",
  description: "Interactive modules for personal growth",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${lexendDeca.variable} font-sans`}>
        <body className="font-sans" >
          <main className="min-h-screen bg-white text-[#2F3336]">
            <SignedIn>
              {children}
            </SignedIn>
            <SignedOut>
              {children}
            </SignedOut>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
