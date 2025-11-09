import React from "react";
import styles from "./policyDetails.module.css";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const PolicyDetails = ({ claimData }) => {
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
              value: claimData?.claimreason || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Policyholder Name",
              value:
                claimData?.claimDetails?.placeHolderFirstName &&
                claimData?.claimDetails?.placeHolderLastName
                  ? `${claimData.claimDetails.placeHolderFirstName} ${claimData.claimDetails.placeHolderLastName}`
                  : "N/A",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Claimant's Name",
              value: claimData?.claimDetails?.claimentsName || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Email Address",
              value: claimData?.claimDetails?.emailAddress || "N/A",
            }}
          />
        </div>
        <InputWithData2
          item={{
            label: "Incident Description",
            value: claimData.claimDetails?.incidentDescription || "N/A",
          }}
        />
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Date of Incident",
              value: claimData.claimDetails?.incidentDate || "N/A",
              type: "date",
            }}
          />
          <InputWithData2
            item={{
              label: "Responsible?",
              value: claimData.claimDetails?.responsible ? "Yes" : "No",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "If not, give details",
              value: claimData.claimDetails?.detailsIfNotResponsible || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Vehicle location",
              value: claimData.claimDetails?.vehicleLocation || "N/A",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
