import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";
import "./globals.css";
import ClientFavicon from "@app/ClientFavicon";

// Load custom fonts
const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// Define page metadata
export const metadata: Metadata = {
    title: "Buy everything at PRESEED round",
    description: "Buy everything at PRESEED round",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            {/* Favicon is set in the head */}
            <link id="favicon" rel="icon" href="/frame1.png" />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
        >
        <Providers>{children}</Providers>
        <ClientFavicon />
        </body>
        </html>
    );
}
