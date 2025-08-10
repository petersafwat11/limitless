import React from "react";
import Table from "./_components/table/Table";
import styles from "./page.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Your Claims{" "}
        </h2>
        <button className={styles.button}>
          <Image src="/svg/plus.svg" alt="plus" width={24} height={24} />
          Create a new claim{" "}
        </button>
      </div>
      <Table
        title="Pending Claims"
        columns={[
          "Date of Claim",
          "Status",
          "Claimant",
          "Pending Actions",
          "Actions",
        ]}
        data={[
          {
            date: "2025-01-01",
            ref: "1234567890",
            status: "Pending",
            claimant: "John Doe",
            pendingActions: "Feb 21 2025",
          },
        ]}
      />
      <Table
        title="Claim history"
        columns={[
          "Date of Claim",
          "Status",
          "Claimant",
          "Pending Actions",
          "Actions",
        ]}
        data={[
          {
            date: "2025-01-01",
            ref: "1234567890",
            status: "Completed",
            claimant: "John Doe",
            pendingActions: "Feb 21 2025",
          },
          {
            date: "2025-01-01",
            ref: "1234567890",
            status: "Cancelled",
            claimant: "John Doe",
            pendingActions: "Feb 21 2025",
          },
        ]}
      />
    </div>
  );
};

export default page;
