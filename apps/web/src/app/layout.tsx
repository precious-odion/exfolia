import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Exfolia",
  description:
    "An AI-powered data exploration workspace for uploading CSV datasets, building visual queries, and generating insights."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}