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
              value: claimData.claimreason,
            }}
          />
          <InputWithData2
            item={{
              label: "Policyholder Name",
              value: claimData.claimDetails.placeHolderFirstName + " " + claimData.claimDetails.placeHolderLastName,
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Claimant's Name",
              value: claimData.claimDetails.claimentsName,
            }}
          />
          <InputWithData2
            item={{
              label: "Email Address",
              value: claimData.claimDetails.emailAddress,
            }}
          />
        </div>
        <InputWithData2
          item={{
            label: "Incident Description",
            value: claimData.incidentDescription,
          }}
        />
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Date of Incident",
              value: claimData.incidentDate,
              type: "date",
            }}
          />
          <InputWithData2
            item={{
              label: "Responsible?",
              value: claimData.responsible,
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "If not, give details",
              value: claimData.detailsIfNotResponsible,
            }}
          />
          <InputWithData2
            item={{
              label: "Vehicle location",
              value: claimData.vehicleLocation,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
