"use client";
import React from "react";
import Table from "./table/Table";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PolicyPageClient = ({
  activePolicies,
  expiredPolicies,
  styles,
  plusJakartaSans,
}) => {
  const router = useRouter();

  return (
    <>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Your Policy
        </h2>
        <button
          onClick={() => {
            router.push("/dashboard/policy/create");
          }}
          className={styles.button}
        >
          <Image src="/svg/plus.svg" alt="plus" width={24} height={24} />
          <span>Create a new policy</span>
        </button>
      </div>

      {activePolicies.length > 0 && (
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
          data={activePolicies}
        />
      )}

      {expiredPolicies.length > 0 && (
        <Table
          title="Expired/Unpaid Policies"
          tableType="inactive"
          columns={[
            "Policy Number",
            "Status",
            "Name",
            "Vehicle Reg",
            "Details",
          ]}
          data={expiredPolicies}
        />
      )}

      {activePolicies.length === 0 && expiredPolicies.length === 0 && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", color: "#666" }}>
            No policies found. Create your first policy to get started.
          </p>
        </div>
      )}
    </>
  );
};

export default PolicyPageClient;
