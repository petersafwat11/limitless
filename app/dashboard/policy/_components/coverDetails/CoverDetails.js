"use client";
import React, { useState } from "react";
import styles from "./coverDetails.module.css";
import Image from "next/image";
import Dropdown from "../policyDetails/Dropdown";
import Card from "./card/Card";
import { Plus_Jakarta_Sans } from "next/font/google";
import CoverStart from "./coverStart/CoverStart";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CoverDetails = ({ insurance, policyNumber }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleOptionClick = (option) => {
    console.log("Selected option:", option);
    // Handle option selection here
    if (option === "edit") {
      // Handle edit action
    } else if (option === "cancel") {
      // Handle cancel policy action
    }
  };

  const vehicleDetails = insurance?.vehicleDetails || {};
  const coverDetails = insurance?.coverDetails || {};
  const carUsage = insurance?.carUsage || {};

  // Format vehicle title
  const vehicleTitle = `${vehicleDetails.make || ""} ${vehicleDetails.model || ""}`.trim() || "Vehicle";

  // Format vehicle description
  const vehicleDescription = [
    vehicleDetails.type,
    vehicleDetails.doors ? `${vehicleDetails.doors} Door` : null,
    vehicleDetails.transmission,
    vehicleDetails.fuel,
    vehicleDetails.year,
  ]
    .filter(Boolean)
    .join(", ");

  // Format insurance type
  const insuranceType = insurance?.type === "Temp" 
    ? "Temporary Insurance" 
    : insurance?.type === "Impound" 
    ? coverDetails.impoundType || "Impound Insurance"
    : insurance?.type || "N/A";

  // Format cover period
  const formatCoverPeriod = () => {
    if (coverDetails.impoundType) {
      return "1 Day (Impound)";
    }
    if (coverDetails.type && coverDetails.period) {
      return `${coverDetails.period} ${coverDetails.type}`;
    }
    return "N/A";
  };

  // Format date and time
  const formatDateTime = (dateString, timeString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year} at ${timeString || "00:00"}`;
    } catch {
      return dateString;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titles}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Your Cover Details
          </h2>
          <p className={styles.subtitle}>
            Policy number: <span>{policyNumber}</span>
          </p>
        </div>
        <div className={styles.actions}>
          <Image
            className={styles.icon}
            src="/svg/3-dots.svg"
            alt="edit"
            width={4}
            height={18}
            onClick={handleDropdownToggle}
            style={{ cursor: "pointer" }}
          />
          <Dropdown
            isOpen={isDropdownOpen}
            onClose={handleDropdownClose}
            onOptionClick={handleOptionClick}
          />
        </div>
      </div>
      <div className={styles.body}>
        <Card
          title={vehicleTitle.toUpperCase()}
          value={vehicleDescription || "No vehicle details available"}
          img={{ src: "/svg/bluee-car.svg", width: 37, height: 47 }}
        />
        <div className={styles.row}>
          <Card 
            title="Cover Period" 
            value={formatCoverPeriod()} 
          />
          <Card 
            title="Vehicle Worth" 
            value={vehicleDetails.worth ? `£${vehicleDetails.worth}` : "N/A"} 
          />
          <Card 
            title="Voluntary Excess" 
            value={carUsage.voluntaryExcess || "N/A"} 
          />
        </div>
        <div className={styles.row}>
          <Card 
            title="Type of Insurance" 
            value={insuranceType} 
          />
          <Card 
            title="Car Usage" 
            value={carUsage.usageType || "N/A"} 
          />
        </div>
        <Card 
          title="License Type" 
          value={carUsage.licenseType || "N/A"} 
        />
        <Card 
          title="No Claims Bonus" 
          value={carUsage.NCB ? `${carUsage.NCB} years` : "N/A"} 
        />
        <CoverStart 
          startDate={coverDetails.startDate}
          startTime={coverDetails.startTime}
        />
      </div>
    </div>
  );
};

export default CoverDetails;
