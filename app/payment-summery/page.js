import React from "react";
import Header from "./_components/header/Header";
import PersonalDetails from "./_components/personalDetails/PersonalDetails";
import CoverDetails from "./_components/coverDetails/CoverDetails";
import VehicleDetails from "./_components/vehicleDetails/VehicleDetails";
import styles from "./page.module.css";
import CoverLevel from "./_components/coverLevel/CoverLevel";

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
        </div>
      </div>
    </div>
  );
};

export default page;
