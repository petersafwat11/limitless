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
const CoverDetails = () => {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titles}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Your Cover Details
          </h2>
          <p className={styles.subtitle}>
            Policy number: <span>LC-912JHN12LL</span>
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
          title="VOLKSWAGEN POLO SEL ( 84) 5H"
          value="5 Door Hatchback, 1390 cc, Automatic, Petrol, 2010"
          img={{ src: "/svg/bluee-car.svg", width: 37, height: 47 }}
        />
        <div className={styles.row}>
          <Card title="Your annual mileage" value="Up to 4,000 a year" />
          <Card title="Vehicle modifications" value="None" />
          <Card title="Voluntary excess" value="£284.50" />
        </div>
        <Card title="Type of Insurance" value="Temporary Insurance" />
        <CoverStart />
      </div>
    </div>
  );
};

export default CoverDetails;
