import React from "react";
import Header from "./_components/header/Header";
import OrderSummery from "./_components/orderSummery/OrderSummery";
import VehicleCovered from "./_components/vehicleCovered/VehicleCovered";
import Details from "./_components/details/Details";
import Duration from "./_components/duration/Duration";
import CoverLevel from "./_components/coverLevel/CoverLevel";
import styles from "./page.module.css";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";

const page = async ({ searchParams }) => {
  const { id } = await searchParams;
  let insuranceData = null;
  let error = null;

  try {
    const response = await axios.get(`${API_BASE_URL}/api/insurance/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });

    if (response.status === 200 && response.data.data) {
      insuranceData = response.data.data.data || response.data.data;
    } else {
      error = "Insurance not found";
    }
  } catch (err) {
    console.error("Error fetching insurance:", err);
    error =
      err.response?.status === 404
        ? "Insurance not found"
        : "Failed to load insurance details";
  }

  // Redirect if no insurance found or error
  if (!insuranceData || error) {
    redirect("/error");
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
                // editIcon={true}
              />
              <Duration
                img={"/svg/start-time.svg"}
                title="Start Time"
                value={getStartTimeValue()}
                // editIcon={true}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
