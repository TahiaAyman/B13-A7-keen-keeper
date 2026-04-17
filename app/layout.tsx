import { TimelineProvider } from "../context/TimelineContext";
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "KeenKeeper",
  description: "Keep your friendships alive",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
  <TimelineProvider>
    <Navbar />
    {children}
  </TimelineProvider>
</body>
    </html>
  );
}