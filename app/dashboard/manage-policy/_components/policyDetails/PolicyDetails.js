"use client";
import React, { useState } from "react";
import styles from "./policyDetails.module.css";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import Dropdown from "./Dropdown";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const PolicyDetails = () => {
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
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Your Policy Details
        </h2>
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
        <div className={styles.row}>
          <InputWithData2
            item={{ label: "Registration", value: "Roland Maguire" }}
          />
          <InputWithData2
            item={{ label: "Date of Birth", value: "01/01/1998", type: "date" }}
          />
        </div>

        <div className={styles.row}>
          <InputWithData2
            item={{ label: "Email Address", value: "johnsmith@outlook.com" }}
          />
          <InputWithData2
            item={{ label: "Phone Number", value: "+44 3847 837 8329" }}
          />
        </div>
        <InputWithData2
          item={{
            label: "Home Address",
            value: "Home Address: 21 London Town",
          }}
        />

        <div className={styles.row}>
          <InputWithData2 item={{ label: "Postcode", value: "NC8 2BC" }} />
          <InputWithData2 item={{ label: "City", value: "London" }} />
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;
