import React from "react";
import styles from "./page.module.css";
import DashboardClient from "./_components/DashboardClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { serverFetch } from "@/utils/serverFetch";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const devMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  if (!token && !devMode) {
    redirect("/login");
  }

  let activePoliciesCount = 0;
  let pendingClaimsCount = 0;

  try {
    // Fetch dashboard stats from backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await serverFetch(
      `${apiUrl}/api/user-dashboard/stats`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (response && response.ok) {
      const result = await response.json();
      activePoliciesCount = result.data?.activePolicies || 0;
      pendingClaimsCount = result.data?.pendingClaims || 0;
    } else {
      console.warn("Dashboard stats fetch failed:", response?.status, response?.statusText);
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Continue rendering with default values
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
