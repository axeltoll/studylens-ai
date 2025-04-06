import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { UsageProvider } from "@/lib/contexts/UsageContext";

export const metadata: Metadata = {
  title: "StudyLens AI | The AI Homework Helper",
  description: "Get step-by-step answers for any homework problem with our AI-powered study assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <AuthProvider>
          <UsageProvider>
            {children}
          </UsageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
