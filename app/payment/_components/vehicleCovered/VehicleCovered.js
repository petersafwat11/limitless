import React from "react";
import Image from "next/image";
import styles from "./vehicleCovered.module.css";
const VehicleCovered = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src={"/svg/vehicle-covered.svg"}
          alt="vehicle-covered"
          width={35}
          height={46}
        />
        <p className={styles.headerTitle}>Vehicle to be covered</p>
      </div>
      <div className={styles.content}>
        <p className={styles.vetype}>
          Volkswagen Polo SE FSI (2002-2005) 1390cc,5 DOOR
        </p>
        <div className={styles.vehicleNumber}>
          <span className={styles.inputSpan}> GB</span>
          GC15LLC
        </div>
      </div>
    </div>
  );
};

export default VehicleCovered;
