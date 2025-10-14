import React from "react";
import styles from "./thirdPartyDetails.module.css";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const ThirdPartyDetails = ({ claimData }) => {
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
              value: claimData.thirdPartyFullName || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Third Party Contact No.",
              value: claimData.thirdPartyPhone || "N/A",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Third Party Address",
              value: claimData.thirdPartyAddress || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Third Party Postcode",
              value: claimData.thirdPartyPostcode || "N/A",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Vehicle Registration",
              value: claimData.thirdPartyVehicleRegistration || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Vehicle Make",
              value: claimData.thirdPartyVehicleMake || "N/A",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Vehicle Model",
              value: claimData.thirdPartyVehicleModel || "N/A",
            }}
          />
          <InputWithData2
            item={{
              label: "Third Party Damage",
              value: claimData.thirdPartyDamage || "N/A",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "Drivable?",
              value: claimData.drivable || "N/A",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyDetails;
