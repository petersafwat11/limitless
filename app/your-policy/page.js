import React from "react";
import styles from "./page.module.css";

import { notFound, redirect } from "next/navigation";
import { serverFetch } from "@/utils/serverFetch";
import PolicyDetailsReview from "../dashboard/policy/_components/PolicyDetailsReview";

const page = async ({ searchParams }) => {
  const { id } = await searchParams;
  let insurance = null;

  try {
    const response = await serverFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/insurance/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (response.ok) {
      const result = await response.json();
      insurance = result.data?.data || null;
    }
  } catch (error) {
    console.error("Error fetching insurance:", error);
  }

  if (!insurance) {
    notFound();
    // redirect("/dashboard/policy");
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {insurance.referenceNumber ||
            `LC-${insurance._id.toString().slice(-8).toUpperCase()}`}
        </h1>
      </div>
      <PolicyDetailsReview policy={insurance} />
    </div>
  );
};

export default page;
