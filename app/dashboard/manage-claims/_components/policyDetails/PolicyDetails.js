import React from "react";
import styles from "./policyDetails.module.css";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const PolicyDetails = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Policy Details
      </h2>
      <div className={styles.body}>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Claim Type",
              value: "09 December 2024",
            }}
          />
          <InputWithData2
            item={{
              label: "Policyholder Name",
              value: "08 January 2025",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Claimant's Name",
              value: "09 December 2024",
            }}
          />
          <InputWithData2
            item={{
              label: "Email Address",
              value: "08 January 2025",
            }}
          />
        </div>
        <InputWithData2
          item={{
            label: "Claimants Name",
            value: "08 January 2025",
          }}
        />
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Date of Incident",
              value: "08 January 2025",
              type: "date",
            }}
          />
          <InputWithData2
            item={{
              label: "Responsible?",
              value: "08 January 2025",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "If not, give details",
              value: "08 January 2025",
            }}
          />
          <InputWithData2
            item={{
              label: "Vehicle location:",
              value: "08 January 2025",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
