// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Invite",
  description: "We heartily invite you to celebrate our Nikkah",
  openGraph: {
    title: "Digital Invite",
    description: "Join us in celebrating the blessed union of wedding",
    url: "https://mohdgani.github.io/Invite",
    siteName: "Dream Pages",
    images: [
      {
        url: "image.webp", // ✅ absolute path
        width: 1200,
        height: 630,
        alt: "Wedding Invite",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Invite",
    description: "Join us in celebrating the blessed union of wedding",
    images: ["image.webp"], // ✅ absolute path
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
