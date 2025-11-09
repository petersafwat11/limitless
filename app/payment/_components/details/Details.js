import React from "react";
import Image from "next/image";
import styles from "./details.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Details = ({ data, carUsage }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getFullName = () => {
    if (!data) return "N/A";
    return `${data.firstName || ""} ${data.surname || ""}`.trim() || "N/A";
  };

  const detailsItems = [
    { 
      label: "Full Name", 
      value: getFullName() 
    },
    { 
      label: "Date of Birth", 
      value: formatDate(data?.dateOfBirth), 
      type: "date" 
    },
    { 
      label: "Licence Hold for", 
      value: carUsage?.licenseHeld || "N/A" 
    },
    { 
      label: "Licence Type", 
      value: carUsage?.licenseType || "N/A" 
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          src="/svg/insurance-quote.svg"
          alt="your-details"
          width={60}
          height={60}
          className={styles.icon}
        />
        <p className={`${styles.headerTitle} ${plusJakartaSans.className}`}>
          Your Details
        </p>
      </div>
      <div className={styles.content}>
        {detailsItems.map((item, index) => (
          <InputWithData2
            item={item}
            index={index}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Details;
