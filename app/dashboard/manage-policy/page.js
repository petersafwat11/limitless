import React from "react";
import Table from "./_components/table/Table";
import styles from "./page.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import PolicyPageClient from "./_components/PolicyPageClient";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

// Helper function to calculate remaining days
const calculateRemainingDays = (coverDetails) => {
  if (!coverDetails) return "N/A";

  const { startDate, startTime, type, period, impoundType } = coverDetails;

  if (!startDate) return "N/A";

  try {
    // Parse start date and time
    const [year, month, day] = startDate.split("-");
    const [hours, minutes] = (startTime || "00:00").split(":");
    const startDateTime = new Date(year, month - 1, day, hours, minutes);

    // Calculate end date based on type and period
    let endDateTime = new Date(startDateTime);

    if (impoundType) {
      // Impound insurance - typically 1 day
      endDateTime.setDate(endDateTime.getDate() + 1);
    } else if (type === "Hours") {
      endDateTime.setHours(endDateTime.getHours() + period);
    } else if (type === "Days") {
      endDateTime.setDate(endDateTime.getDate() + period);
    } else if (type === "Weeks") {
      endDateTime.setDate(endDateTime.getDate() + period * 7);
    } else if (type === "Months") {
      endDateTime.setMonth(endDateTime.getMonth() + period);
    } else if (type === "Years") {
      endDateTime.setFullYear(endDateTime.getFullYear() + period);
    }

    // Calculate remaining time
    const now = new Date();
    const diffMs = endDateTime - now;

    if (diffMs <= 0) {
      return "Expired";
    }

    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""}`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""}`;
    }
  } catch (error) {
    console.error("Error calculating remaining days:", error);
    return "N/A";
  }
};

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    redirect("/login");
  }

  let activePolicies = [];
  let expiredPolicies = [];

  try {
    // Fetch all insurances for the logged-in user
    const response = await fetch(`${API_BASE_URL}/api/insurance`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      const result = await response.json();
      const insurances = result.data?.data || [];

      insurances.forEach((insurance) => {
        const policyData = {
          id: insurance._id,
          policyNumber: `${insurance.type
            .substring(0, 2)
            .toUpperCase()}-${insurance._id.substring(
            insurance._id.length - 6
          )}`,
          remaining: calculateRemainingDays(insurance.coverDetails),
          name: insurance.userDetails
            ? `${insurance.userDetails.firstName} ${insurance.userDetails.surname}`
            : "N/A",
          vehicleReg:
            insurance.vehicleDetails?.registrationNumber?.toUpperCase() ||
            "N/A",
          details: "View",
          isPaid: insurance.quote?.paid || false,
        };

        // Check if policy is active or expired
        if (policyData.remaining === "Expired" || !policyData.isPaid) {
          expiredPolicies.push(policyData);
        } else {
          activePolicies.push(policyData);
        }
      });
      console.log(insurances);
    }
  } catch (error) {
    console.error("Error fetching policies:", error);
  }

  return (
    <div className={styles.page}>
      <PolicyPageClient
        activePolicies={activePolicies}
        expiredPolicies={expiredPolicies}
        styles={styles}
        plusJakartaSans={plusJakartaSans}
      />
    </div>
  );
};

export default Page;
