import React from "react";
import Updates from "../_components/updates/Updates";
import PolicyDetails from "../_components/policyDetails/PolicyDetails";
import ThirdPartyDetails from "../_components/thirdPartyDetails/ThirdPartyDetails";
import styles from "./page.module.css";
import Buttons from "../_components/buttons/Buttons";

const page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Your Claim</h1>
      </div>
      <div className={styles.container}>
        <PolicyDetails />
        <ThirdPartyDetails />
        <Updates
          columns={["Description", "Date", "Time"]}
          data={[
            {
              description: "Claim rejected",
              date: "06/12/2025",
              time: "10:00",
            },
            {
              description: "Claim accepted",
              date: "06/12/2025",
              time: "10:00",
            },
            {
              description: "Claim approved",
              date: "06/12/2025",
              time: "10:00",
            },
          ]}
        />
        <Buttons />
      </div>
    </div>
  );
};

export default page;
