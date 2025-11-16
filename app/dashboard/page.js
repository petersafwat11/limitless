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

  if (!token) {
    console.log("No JWT token found, redirecting to login");
    redirect("/login");
  }

  let activePoliciesCount = 0;
  let pendingClaimsCount = 0;

  try {
    // Fetch active policies count
    const insuranceResponse = await serverFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/insurance/user/my-insurances`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (insuranceResponse.ok) {
      const insuranceResult = await insuranceResponse.json();
      const activeInsurances =
        insuranceResult.data?.data.filter(
          (insurance) => insurance.quote?.paid === true
        ) || [];
      activePoliciesCount = activeInsurances.length;
    }

    // Fetch pending claims count (same logic as claims page)
    const claimsResponse = await serverFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/claims`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (claimsResponse.ok) {
      const claimsResult = await claimsResponse.json();
      const claims = claimsResult.data?.claims || [];
      // Count only pending claims
      const pendingClaims = claims.filter(
        (claim) => claim.status === "Pending"
      );
      pendingClaimsCount = pendingClaims.length;
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
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
