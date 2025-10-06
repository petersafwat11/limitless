import React from "react";
import styles from "./vehicleDetails.module.css";
import VehicleCovered from "@/app/payment/_components/vehicleCovered/VehicleCovered";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import Duration from "@/app/payment/_components/duration/Duration";

const VehicleDetails = ({ data }) => {
  return (
    <ComponentWrapper title="Vehicle Details" icon={{ width: 62, height: 62 }}>
      <div className={styles.content}>
        <VehicleCovered data={data} />
        <div className={styles.cards}>
          {[
            {
              title: "Vehicle Type",
              value: `${data?.type || "N/A"}`,
            },
            {
              title: "Vehicle Worth",
              value: `${data?.worth || "N/A"}`,
            },
            {
              title: "Vehicle Worth",
              value: `${data?.worth || "N/A"}`,
            },
          ].map((item, index) => (
            <Duration
              key={index}
              title={item.title}
              value={item.value}
              // editIcon={true}
            />
          ))}
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetails;
