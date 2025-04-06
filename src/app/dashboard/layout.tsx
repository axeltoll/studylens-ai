"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useUsage } from "@/lib/hooks/useUsage";
import DashboardLayout from "@/app/components/DashboardLayout";
import TrialCheckoutModal from "@/app/components/TrialCheckoutModal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | StudyLens AI",
  description: "Your AI homework assistant",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const { isProUser, isTrialUser } = useUsage();
  const [showTrialModal, setShowTrialModal] = useState(false);
  
  useEffect(() => {
    // Show trial modal when user enters dashboard if they're not pro or trial
    if (user && !loading && !isProUser && !isTrialUser) {
      setShowTrialModal(true);
    }
  }, [user, loading, isProUser, isTrialUser]);

  return (
    <DashboardLayout>
      {children}
      
      {/* Trial Modal */}
      {showTrialModal && (
        <TrialCheckoutModal onClose={() => setShowTrialModal(false)} />
      )}
    </DashboardLayout>
  );
} 