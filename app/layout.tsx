import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import CustomFont from "next/font/local";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "700", "800"],
  variable: "--font-poppins",
});

const formula1 = CustomFont({
  src: "../fonts/Formula1.woff2",
  variable: "--font-formula1",
});

const fieldgothic = CustomFont({
  src: "../fonts/Field Gothic.woff2",
  variable: "--font-field",
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
        className={`${poppins.variable} ${formula1.variable} ${fieldgothic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
