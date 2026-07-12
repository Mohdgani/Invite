// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "M & J Digital Invite",
  description: "We heartily invite you to celebrate our Nikkah",
  openGraph: {
    title: "M & J Digital Invite",
    description: "Join us in celebrating the blessed union of Mohamed & Jafrin",
    url: "https://mohdgani.github.io/Invite", // 👈 your live URL
    siteName: "Dream Pages",
    images: [
      {
        url: "https://mohdgani.github.io/Invite/preview.png", // 👈 add a preview image
        width: 1200,
        height: 630,
        alt: "M & J Wedding Invite",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "M & J Digital Invite",
    description: "Join us in celebrating the blessed union of Mohamed & Jafrin",
    images: ["https://mohdgani.github.io/Invite/preview.png"],
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
