import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Olivia Kids",
  description: "This is Olivia Kids School website.",
};


export default function RootLayout({children}){
    return (
        <html>
            <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="128x128" />
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}


