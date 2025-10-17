"use client";

import Header from "./header/Header";
import OrderSummery from "./orderSummery/OrderSummery";
import VehicleCovered from "./vehicleCovered/VehicleCovered";
import Details from "./details/Details";
import Duration from "./duration/Duration";
import CoverLevel from "./coverLevel/CoverLevel";
import styles from "../page.module.css";
import { redirect } from "next/navigation";

export default function PaymentConfirmationClient({ insuranceData }) {
  const { quote } = insuranceData;
  console.log("quote", quote);
  console.log(`/payment-summary?id=${insuranceData?._id}`);
  if (quote.paid === false || !quote.sumupData) {
    redirect(`/payment-summary?id=${insuranceData?._id}`);
  }
  // Format duration value
  const getDurationValue = () => {
    if (!insuranceData.coverDetails) return "N/A";
    const { type, period } = insuranceData.coverDetails;
    if (type === "Days") {
      return period === 1 ? "1 day" : `${period} days`;
    } else if (type === "Weeks") {
      return period === 1 ? "1 week" : `${period} weeks`;
    } else if (type === "Months") {
      return period === 1 ? "1 month" : `${period} months`;
    }
    return `${period} ${type}`;
  };

  // Format start time value
  const getStartTimeValue = () => {
    if (!insuranceData.coverDetails) return "N/A";
    const { startDate, startTime } = insuranceData.coverDetails;
    if (startDate && startTime) {
      return `${startDate} at ${startTime}`;
    }
    return "Policy starts immediately";
  };

  return (
    <div>
      <Header title="Thank you for your purchase" />
      <div className={"centeredContent"}>
        <div className={styles.orderSummeryContainer}>
          <div className={styles.orderSummery}>
            <OrderSummery
              data={insuranceData.quote}
              vehicleDetails={insuranceData.vehicleDetails}
              carUsage={insuranceData.carUsage}
            />
          </div>
          <div className={styles.coverLevel}>
            <CoverLevel
              data={insuranceData.quote}
              insuranceType={insuranceData.type}
            />
            {/* No action buttons - payment already completed */}
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.vehicleCoveredLarge}>
              <VehicleCovered data={insuranceData.vehicleDetails} />
            </div>
            <div className={styles.durationContainer}>
              <Duration
                img={"/svg/duration.svg"}
                title="Duration"
                value={getDurationValue()}
              />
              <Duration
                img={"/svg/start-time.svg"}
                title="Start Time"
                value={getStartTimeValue()}
              />
            </div>
            <Details
              data={insuranceData.userDetails}
              carUsage={insuranceData.carUsage}
            />
          </div>
          <div className={styles.right}>
            <CoverLevel
              data={insuranceData.quote}
              insuranceType={insuranceData.type}
            />
            {/* No action buttons - payment already completed */}
          </div>
        </div>
      </div>
    </div>
  );
}
