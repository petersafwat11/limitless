import React from "react";
import Table from "./_components/table/Table";
import styles from "./page.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import CreateBtn from "@/ui/dashboard/createBtn/CreateBtn";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import axios from "axios";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    redirect("/login");
  }

  let claims = [];
  let error = null;

  try {
    // Fetch user's claims with authentication
    const response = await axios.get(`${API_BASE_URL}/api/claims`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = response.data;
      claims = data.data.claims || [];
      console.log(claims);
    } else {
      error = "Failed to fetch claims";
    }
  } catch (err) {
    console.error("Error fetching claims:", err);
    error = err.message;
  }
  // Transform claims data for table display
  const formatClaimsData = (claims) => {
    return claims.map((claim) => ({
      date: new Date(claim.estimatedResolutionDate).toLocaleDateString(),
      ref: `Claim Reference ${claim.orderReference}`,
      status: claim.status || "Pending",
      claimant: `${claim.claimDetails.placeHolderFirstName} ${claim.claimDetails.placeHolderLastName}`,
      pendingActions: new Date(claim.updatedAt).toLocaleDateString(),
      id: claim._id,
    }));
  };

  const formattedClaims = formatClaimsData(claims);
  const pendingClaims = formattedClaims.filter(
    (claim) => claim.status === "Pending"
  );
  const completedClaims = formattedClaims.filter(
    (claim) => claim.status !== "Pending"
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Your Claims
        </h2>
        <CreateBtn title="Create a new claim" href="/dashboard/submit-claim" />
      </div>

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "0.25rem",
            border: "1px solid #f5c6cb",
          }}
        >
          {error}
        </div>
      )}

      {claims.length === 0 && !error ? (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>No claims found</h3>
          <p className={styles.emptyDescription}>
            You haven&apos;t submitted any claims yet.
          </p>
        </div>
      ) : (
        <>
          {pendingClaims.length > 0 && (
            <Table
              title="Pending Claims"
              columns={[
                "Date of Claim",
                "Status",
                "Claimant",
                "Last Updated",
                "Actions",
              ]}
              data={pendingClaims}
            />
          )}

          {completedClaims.length > 0 && (
            <Table
              title="Claim History"
              columns={[
                "Date of Claim",
                "Status",
                "Claimant",
                "Last Updated",
                "Actions",
              ]}
              data={completedClaims}
            />
          )}
        </>
      )}
    </div>
  );
};

export default page;
