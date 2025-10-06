// "use client";
import React from "react";
import Header from "./_components/header/Header";
import PersonalDetails from "./_components/personalDetails/PersonalDetails";
import CoverDetails from "./_components/coverDetails/CoverDetails";
import VehicleDetails from "./_components/vehicleDetails/VehicleDetails";
import styles from "./page.module.css";
import CoverLevel from "./_components/coverLevel/CoverLevel";
import Image from "next/image";
import axios from "axios";
import { API_BASE_URL } from "@/utils/config";
import { redirect } from "next/navigation";
const page = async ({ searchParams }) => {
  const { id } = await searchParams;
  let insuranceData = null;
  let error = null;
  console.log(id)
console.log(`${API_BASE_URL}/api/insurance/${id}`)

try {
  const response = await axios.get(`${API_BASE_URL}/api/insurance/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

  if (response.status === 200 && response.data.data) {
    // Handle nested data structure: response.data.data.data
    insuranceData = response.data.data.data || response.data.data;
    console.log(insuranceData)
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

  return (
    <div>
      <Header title="Payment Summary" />
      <div className={"centeredContent"}>
        <div className={styles.container}>
          <div className={styles.first}>
            <VehicleDetails data={insuranceData.vehicleDetails} />
            <CoverDetails data={insuranceData.coverDetails} />
            <PersonalDetails data={insuranceData.userDetails}  carUsage={insuranceData.carUsage} />
          </div>
          <div className={styles.second}>
            <CoverLevel 
              data={insuranceData.quote} 
              insuranceType={insuranceData.type}
            />
            <div className={styles.actions}>
              <button 
                className={styles.cancelButton}
                // onClick={() => router.back()}
              >
                Back
              </button>
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
    </div>
  );
};


export default page;
