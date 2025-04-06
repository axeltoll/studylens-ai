import { Metadata } from "next";
import DashboardLayout from "@/app/components/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard | StudyLens AI",
  description: "Your AI homework assistant",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 