import React from "react";
import styles from "./page.module.css";
import DashboardClient from "./_components/DashboardClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/utils/config";
import { serverFetch } from "@/utils/serverFetch";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    redirect("/login");
  }

  let activePoliciesCount = 0;
  let pendingClaimsCount = 0;

  try {
    // Fetch dashboard stats from backend
    const response = await serverFetch(
      `${API_BASE_URL}/api/user-dashboard/stats`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (response.ok) {
      const result = await response.json();
      activePoliciesCount = result.data?.activePolicies || 0;
      pendingClaimsCount = result.data?.pendingClaims || 0;
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
  }

  return (
    <div className={styles.page}>
      <DashboardClient 
        activePoliciesCount={activePoliciesCount}
        pendingClaimsCount={pendingClaimsCount}
      />
    </div>
  );
};

export default Page;
