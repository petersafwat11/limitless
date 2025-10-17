"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.css";
import Image from "next/image";

const Dropdown = ({ insurances, selectedInsuranceId, onInsuranceChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedInsurance = insurances.find(
    (ins) => ins._id === selectedInsuranceId
  );

  const getDisplayText = (insurance) => {
    const policyNumber = insurance._id.toString().slice(-8).toUpperCase();
    const vehicleMake = insurance.vehicleDetails?.make || "N/A";
    const vehicleModel = insurance.vehicleDetails?.model || "N/A";
    return `LC-${policyNumber} - ${vehicleMake} ${vehicleModel}`;
  };

  if (insurances.length === 0) {
    return null;
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div
        className={styles.selectedValue}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        <div className={styles.value_text}>
          {selectedInsurance
            ? getDisplayText(selectedInsurance)
            : "Select insurance"}
        </div>
        <Image
          className={styles.arrow}
          src="/svg/arrow-down-2.svg"
          alt="dropdown"
          width={20}
          height={20}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>
      {isOpen && (
        <div className={styles.options}>
          {insurances.map((insurance) => (
            <div
              key={insurance._id}
              className={`${styles.option} ${
                insurance._id === selectedInsuranceId
                  ? styles.selectedOption
                  : ""
              }`}
              onClick={() => {
                onInsuranceChange(insurance._id);
                setIsOpen(false);
              }}
            >
              <div className={styles.value_text}>
                {getDisplayText(insurance)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
