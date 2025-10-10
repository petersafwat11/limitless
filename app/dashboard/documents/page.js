import React from "react";
import styles from "./page.module.css";
import Booklets from "./_components/booklets/Booklets";
import Table from "./_components/table/Table";
import DownloadButton from "./_components/DownloadButton";
import { Plus_Jakarta_Sans } from "next/font/google";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

  let insurances = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/insurance`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      const result = await response.json();
      if (result.data && Array.isArray(result.data)) {
        insurances = result.data;
      }
    }
    // }
  } catch (error) {
    console.error("Error fetching insurance:", error);
  }

  // Format data for table
  const tableData = insurances.map((insurance) => {
    // Format creation date as DD/MM/YYYY
    const createdDate = new Date(insurance.createdAt);
    const formattedDate = `${String(createdDate.getDate()).padStart(
      2,
      "0"
    )}/${String(createdDate.getMonth() + 1).padStart(
      2,
      "0"
    )}/${createdDate.getFullYear()}`;

    return {
      document: insurance._id, // Policy Number is the insurance ID
      documentNumber: `Document ${formattedDate}`,
      documentType: (
        <DownloadButton
          insuranceId={insurance._id}
          insuranceType={insurance.type}
        />
      ),
    };
  });

  return (
    <div className={styles.page}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        Your Policy documents
      </h3>

      {tableData.length > 0 ? (
        <Table
          title="Policy documents"
          columns={["Policy Number", "Document number", "Document type"]}
          data={tableData}
        />
      ) : (
        <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
          <p>No insurance policies found.</p>
          <p style={{ fontSize: "14px", marginTop: "8px" }}>
            Please complete your insurance application to view your documents.
          </p>
        </div>
      )}

      <Booklets />
    </div>
  );
};

export default page;
