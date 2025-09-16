"use client";
import React, { useState } from "react";
import Table from "./_components/table/Table";
import styles from "./page.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import TemporaryPopup from "./_components/popups/temporaryPopup/TemporaryPopup";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Page = () => {
  const [showCreatePolicyPopup, setShowCreatePolicyPopup] = useState(false);
  return (
    <div className={styles.page}>
      {showCreatePolicyPopup && (
        <TemporaryPopup setShowCreatePolicyPopup={setShowCreatePolicyPopup} />
      )}

      <div className={styles.header}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Your Policy{" "}
        </h2>
        <button
          className={styles.button}
          onClick={() => setShowCreatePolicyPopup(true)}
        >
          <Image src="/svg/plus.svg" alt="plus" width={24} height={24} />
          <span>Create a new policy</span>
        </button>
      </div>
      <Table
        title="Active Policies"
        tableType="active"
        columns={[
          "Policy Number",
          "Remaining",
          "Name",
          "Vehicle Reg",
          "Details",
        ]}
        data={[
          {
            policyNumber: "CI-273782",
            remaining: "25 days",
            name: "James Charles",
            vehicleReg: "ZV12 LPM",
            details: "View",
          },
        ]}
      />
      {/* <Table
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
      /> */}
    </div>
  );
};

export default Page;
