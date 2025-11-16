import React from "react";
import PolicyDetailsReview from "../_components/PolicyDetailsReview";
import styles from "./page.module.css";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { serverFetch } from "@/utils/serverFetch";

const page = async ({ params }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    redirect("/login");
  }

  const { id } = await params;
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
    redirect("/dashboard/policy");
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
