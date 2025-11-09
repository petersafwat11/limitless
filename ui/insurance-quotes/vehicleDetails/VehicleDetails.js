"use client";
import React, { useState } from "react";
import ComponentWrapper from "../componentWrapper/ComponentWrapper";
import styles from "./vehicleDetails.module.css";
import TextInput from "@/ui/inputs/textInput/TextInput";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import Title from "../title/Title";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
const VehicleDetails = () => {
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const toggleVehicleDetails = () => {
    setShowVehicleDetails(!showVehicleDetails);
  };
  return (
    <ComponentWrapper title="Vehicle Details">
      <div className={styles.content}>
        <div className={styles.first}>
          <TextInput
            label="Registration Number"
            // value={registrationNumber}
            // setValue={setRegistrationNumber}
            placeholder="Enter your Registration number"
            reg={true}
            button={<ConfirmBtn title="Find Vehicle " />}
          />
          <button
            className={styles.regBtn}
            onClick={toggleVehicleDetails}
          >{`Don’t know the reg yet?`}</button>
        </div>
        <Title title="What type of vehicle is it?" />
        <div
          className={`${styles.vehicleDetailsContainer} ${
            showVehicleDetails
              ? styles.vehicleDetailsVisible
              : styles.vehicleDetailsHidden
          }`}
        >
          <div className={styles.rows}>
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
              <Dropdown
                label="How much is your vehicle worth?"
                options={["10000", "20000", "30000", "40000"]}
                placeholder="Choose Price"
                // selected={vehicleType}
                // setSelected={setVehicleType}
              />
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetails;
