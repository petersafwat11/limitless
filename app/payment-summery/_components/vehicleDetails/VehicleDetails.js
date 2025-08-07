import React from "react";
import styles from "./vehicleDetails.module.css";
import HeaderTitle from "../headerTitle/HeaderTitle";
import VehicleCovered from "@/app/payment/_components/vehicleCovered/VehicleCovered";
import Duration from "@/app/payment/_components/duration/Duration";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";

const VehicleDetails = () => {
  return (
    <ComponentWrapper title="Vehicle Details" icon={{width: 62, height: 62}}>
      <div className={styles.content}>
        {/* <div className={styles.Vehicle}>
          <div className={styles.header}>
            <Image
              src="/svg/vehicle-covered.svg"
              alt="vehicle covered"
              width={24}
              height={24}
              className={styles.icon}
            />
            <h4 className={styles.title}>Vehicle to be covered</h4>
          </div>
          <div className={styles.body}>
            <p className={styles.vehicleName}>
              VOLKSWAGEN POLO SE FSI (2002-2005) 1390cc,5 DOOR
            </p>
            <div className={styles.vehicleDetails}>
                
            </div>
          </div>
        </div> */}
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
              //   editIcon={true}
            />
          ))}
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetails;
