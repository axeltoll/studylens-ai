"use client";

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface UsageData {
  isProUser: boolean;
  usedQueries: number;
  maxQueries: number;
  usedStorage: number;
  maxStorage: number;
  usedExports: number;
  maxExports: number;
}

export function useUsage() {
  const { user } = useAuth();
  const [usageData, setUsageData] = useState<UsageData>({
    isProUser: false,
    usedQueries: 0,
    maxQueries: 25,
    usedStorage: 0,
    maxStorage: 100, // MB
    usedExports: 0,
    maxExports: 5
  });
  
  useEffect(() => {
    // In a real implementation, we would fetch this data from a database
    // based on the current user's ID
    if (user) {
      // Simulate fetching user data
      // In a real app, this would be an API call to your backend
      const fetchUsageData = async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // For demo purposes, checking if email contains "pro" to simulate a pro user
        const isPro = user.email?.includes('pro') || false;
        
        setUsageData({
          isProUser: isPro,
          usedQueries: Math.floor(Math.random() * 20),
          maxQueries: isPro ? 999999 : 25,
          usedStorage: Math.floor(Math.random() * 50),
          maxStorage: isPro ? 10000 : 100, // MB
          usedExports: Math.floor(Math.random() * 3),
          maxExports: isPro ? 999999 : 5
        });
      };
      
      fetchUsageData();
    }
  }, [user]);

  const getRemainingPercentage = (used: number, max: number) => {
    return Math.max(0, Math.min(100, 100 - (used / max * 100)));
  };
  
  return {
    ...usageData,
    queryUsagePercentage: getRemainingPercentage(usageData.usedQueries, usageData.maxQueries),
    storageUsagePercentage: getRemainingPercentage(usageData.usedStorage, usageData.maxStorage),
    exportUsagePercentage: getRemainingPercentage(usageData.usedExports, usageData.maxExports)
  };
} 