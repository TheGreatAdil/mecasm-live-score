import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import CustomFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-poppins",
});

const formula1_black = CustomFont({
  src: "../fonts/Formula1-Black.woff2",
  variable: "--font-formula-black",
});

const formula1_bold = CustomFont({
  src: "../fonts/Formula1-Bold.ttf",
  variable: "--font-formula-bold",
});

export const metadata: Metadata = {
  title: "MECASM '25",
  description: "MECASM '25 Live Score By Tascbar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${formula1_black.variable} ${formula1_bold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
