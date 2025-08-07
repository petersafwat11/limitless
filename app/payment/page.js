import React from "react";
import Header from "./_components/header/Header";
import OrderSummery from "./_components/orderSummery/OrderSummery";
import VehicleCovered from "./_components/vehicleCovered/VehicleCovered";
import Details from "./_components/details/Details";
import Duration from "./_components/duration/Duration";
import CoverLevel from "./_components/coverLevel/CoverLevel";
import styles from "./page.module.css";
const page = () => {
  return (
    <div>
      <Header title="Thank you for your purchase" />
      <OrderSummery />
      <div className={styles.container}>
        <div className={styles.left}>
          <VehicleCovered />
          <div className={styles.durationContainer}>

          <Duration
            img={"/svg/duration.svg"}
            title="Duration"
            value="1 week"
            editIcon={true}
          />
          <Duration
            img={"/svg/start-time.svg"}
            title="Start Time"
            value="Policy starts immediately"
            editIcon={true}
          />
          </div>
          <Details />
        </div>
        <div className={styles.right}>
          <CoverLevel />
        </div>
      </div>
    </div>
  );
};

export default page;
