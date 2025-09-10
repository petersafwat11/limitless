import React from "react";
import Header from "./_components/header/Header";
import PersonalDetails from "./_components/personalDetails/PersonalDetails";
import CoverDetails from "./_components/coverDetails/CoverDetails";
import VehicleDetails from "./_components/vehicleDetails/VehicleDetails";
import styles from "./page.module.css";
import CoverLevel from "./_components/coverLevel/CoverLevel";
import Image from "next/image";

const page = () => {
  return (
    <div>
      <Header title="Payment Summary" />
      <div className={styles.container}>
        <div className={styles.first}>
          <VehicleDetails />
          <CoverDetails />
          <PersonalDetails />
        </div>
        <div className={styles.second}>
          <CoverLevel />
          <div className={styles.actions}>
            <button className={styles.cancelButton}>Back</button>
            <button className={styles.payButton}>
              Pay{" "}
              <Image
                src="/svg/arrow-right.svg"
                alt="arrow-right"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
