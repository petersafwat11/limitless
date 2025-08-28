import React from "react";
import styles from "./thirdPartyDetails.module.css";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const ThirdPartyDetails = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Third Party Details
      </h2>
      <div className={styles.body}>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Third Party Name",
              value: "09 December 2024",
            }}
          />
          <InputWithData2
            item={{
              label: "Third Party Contact No.",
              value: "08 January 2025",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Third Party Address",
              value: "09 December 2024",
            }}
          />
          <InputWithData2
            item={{
              label: "Vehicle Registration",
              value: "08 January 2025",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Make and Model",
              value: "08 January 2025",
            }}
          />

          <InputWithData2
            item={{
              label: "Third Party Damage",
              value: "08 January 2025",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Drivable?",
              value: "08 January 2025",
            }}
          />
            <InputWithData2 
            item={{
              label: "If not, give details",
              value: "08 January 2025",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyDetails;
