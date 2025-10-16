import React from "react";
import PolicyDetails from "../_components/policyDetails/PolicyDetails";
import styles from "./page.module.css";
import CoverDetails from "../_components/coverDetails/CoverDetails";
import { API_BASE_URL } from "@/utils/config";
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
    const response = await serverFetch(`${API_BASE_URL}/api/insurance/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (response.ok) {
      const result = await response.json();
      insurance = result.data?.data || null;
    }
  } catch (error) {
    console.error("Error fetching insurance:", error);
  }


  // Generate policy number
  const policyNumber = `${insurance.type
    .substring(0, 2)
    .toUpperCase()}-${insurance._id.substring(insurance._id.length - 6)}`;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>{policyNumber}</h1>
      </div>
      <PolicyDetails insurance={insurance} />
      <CoverDetails insurance={insurance} policyNumber={policyNumber} />
    </div>
  );
};

export default page;
