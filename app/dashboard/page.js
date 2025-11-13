import React from "react";
import styles from "./page.module.css";
import DashboardClient from "./_components/DashboardClient";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { serverFetch } from "@/utils/serverFetch";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;
  const allCookies = cookieStore.getAll();

  console.log("Dashboard Page - JWT Token present:", !!token);
  console.log("Dashboard Page - All cookies:", allCookies.map(c => c.name));

  if (!token) {
    console.log("No JWT token found, redirecting to login");
    redirect("/login");
  }

  let activePoliciesCount = 0;
  let pendingClaimsCount = 0;

  try {
    // Fetch dashboard stats from backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const fullUrl = `${apiUrl}/api/user-dashboard/stats`;
    
    console.log("Fetching dashboard stats from:", fullUrl);
    console.log("API URL from env:", process.env.NEXT_PUBLIC_API_URL);
    
    const response = await serverFetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("Response received:", {
      ok: response?.ok,
      status: response?.status,
      statusText: response?.statusText,
    });

    if (response && response.ok) {
      const result = await response.json();
      console.log("Dashboard stats data:", result);
      activePoliciesCount = result.data?.activePolicies || 0;
      pendingClaimsCount = result.data?.pendingClaims || 0;
    } else if (response) {
      const errorText = await response.text().catch(() => "Unable to read response");
      console.error("Dashboard stats fetch failed:", {
        status: response.status,
        statusText: response.statusText,
        url: fullUrl,
        body: errorText,
      });
    } else {
      console.error("No response received from server");
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", {
      message: error.message,
      stack: error.stack,
      error: error,
    });
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
