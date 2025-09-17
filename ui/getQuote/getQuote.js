"use client";
import React, { useState } from "react";
import styles from "./getQuote.module.css";
import Image from "next/image";
import TextInput from "../inputs/textInput/TextInput";
import Selection1 from "../inputs/selections/selection1/Selection1";
import Dropdown from "../inputs/dropdown/Dropdown";
const GetQuote = () => {
  const [showRegDetails, setShowRegDetails] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [data, setData] = useState({
    type: "",
    period: "",
    startDate: "2025-01-01",
    startTime: "10:00",
  });

  const handleShowRegDetails = () => {
    if (!showRegDetails) {
      // Transitioning to dropdowns
      setIsTransitioning(true);
      // Wait for fade-out animation to complete before switching content
      setTimeout(() => {
        setShowRegDetails(true);
        setIsTransitioning(false);
      }, 500); // Match the fade-out duration + buffer
    } else {
      // Transitioning back to registration input
      setIsTransitioning(true);
      setTimeout(() => {
        setShowRegDetails(false);
        setIsTransitioning(false);
      }, 500);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        {/* Registration Input */}
        {!showRegDetails && (
          <div
            className={`${styles.regInputContainer} ${
              isTransitioning ? styles.fadeOut : styles.fadeIn
            }`}
          >
            <TextInput
              label="Enter your Registration number"
              placeholder="Enter your Registration number"
              reg={true}
            />
          </div>
        )}

        {/* Dropdown Rows */}
        {showRegDetails && (
          <div
            className={`${styles.rows} ${
              isTransitioning ? styles.fadeOut : styles.fadeIn
            }`}
          >
            <div className={styles.row}>
              <Dropdown
                label="My Vehicle is a...."
                options={["Car", "Motorcycle", "Truck", "Bus"]}
                placeholder="Choose Vehicle"
                // selected={vehicleType}
                // setSelected={setVehicleType}
              />
              <Dropdown
                label="Make"
                options={["Toyota", "Honda", "Ford", "Chevrolet"]}
                placeholder="Choose Make"
                // selected={vehicleType}
                // setSelected={setVehicleType}
              />
            </div>
            <div className={styles.row}>
              <Dropdown
                label="Model"
                options={["Camry", "Accord", "F-150", "Silverado"]}
                placeholder="Choose Model"
                // selected={vehicleType}
                // setSelected={setVehicleType}
              />
              <Dropdown
                label="Variant"
                options={["Camry", "Accord", "F-150", "Silverado"]}
                placeholder="Choose Variant"
                // selected={vehicleType}
                // setSelected={setVehicleType}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.selection}>
        <p className={styles.label}>How long will you need it?</p>
        <Selection1
          items={["1 Day", "2 Days", "1 Week"]}
          selectedItem={data.type}
          setSelectedItem={(item) => setData({ ...data, type: item })}
          type="checkbox"
        />
      </div>
      <div className={styles.selection}>
        <p className={styles.label}>Need it specific? Choose your duration</p>
        <Selection1
          items={["Hours", "Days", "Weeks"]}
          selectedItem={data.type}
          setSelectedItem={(item) => setData({ ...data, type: item })}
          type="checkbox"
        />
      </div>

      {["Hours", "Days", "Weeks"].includes(data.type) && (
        <div className={styles.selection}>
          <p className={styles.label}>Select the duration of your cover</p>
          <Selection1
            items={
              data.type === "Days"
                ? ["1", "2", "3", "4", "5", "6", "7"]
                : data.type === "Hours"
                ? [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                  ]
                : ["1 Week", "2 Weeks", "3 Weeks", "4 Weeks"]
            }
            selectedItem={data.period}
            setSelectedItem={(item) => setData({ ...data, period: item })}
          />
        </div>
      )}

      <button className={styles.button}>
        Continue{" "}
        <Image
          src="/svg/arrow-right.svg"
          alt="arrow-right"
          width={27}
          height={14}
        />
      </button>
      <button onClick={handleShowRegDetails} className={styles.notYet}>
        {showRegDetails
          ? "Back to registration number"
          : "I don't know my reg yet"}
      </button>
    </div>
  );
};

export default GetQuote;
