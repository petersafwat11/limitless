import React from "react";
import styles from "./vehicleDetails.module.css";
import VehicleCovered from "@/app/payment/_components/vehicleCovered/VehicleCovered";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import Duration from "@/app/payment/_components/duration/Duration";

const VehicleDetails = () => {
  return (
    <ComponentWrapper title="Vehicle Details" icon={{ width: 62, height: 62 }}>
      <div className={styles.content}>
        <VehicleCovered />
        <div className={styles.cards}>
          {[
            {
              title: "Your annual mileage",
              value: "Up to 4,000 a year",
            },
            {
              title: "Vehicle modifications",
              value: "None",
            },
            {
              title: "Voluntary excess",
              value: "£284.50",
            },
          ].map((item, index) => (
            <Duration
              key={index}
              title={item.title}
              value={item.value}
              // editIcon={true}
            />
            // <Card
            //   key={index}
            //   title={item.title}
            //   value={item.value}
            //   //   editIcon={true}
            // />
          ))}
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetails;
