"use client";
import React, { useState } from "react";
import styles from "./getQuote.module.css";
import Image from "next/image";
import TextInput from "../inputs/textInput/TextInput";
import Selection1 from "../inputs/selections/selection1/Selection1";
import Dropdown from "../inputs/dropdown/Dropdown";
const GetQuote = () => {
  const [showRegDetails, setShowRegDetails] = useState(false);
  const [data, setData] = useState({
    type: "",
    period: "",
    startDate: "2025-01-01",
    startTime: "10:00",
  });
  const handleShowRegDetails = () => {
    setShowRegDetails(!showRegDetails);
  };
  return (
    <div className={styles.container}>
      {showRegDetails ? (
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
          </div>
        </div>
      ) : (
        <TextInput
          label="Enter your Registration number"
          placeholder="Enter your Registration number"
          reg={true}
        />
      )}
      <div className={styles.selection}>
        <p className={styles.label}>How long will you need it?</p>
        <Selection1
          items={["Hours", "Days", "Weeks"]}
          selectedItem={data.type}
          setSelectedItem={(item) => setData({ ...data, type: item })}
          type="checkbox"
        />
      </div>
      {data.type.length > 0 && (
        <div className={styles.selection}>
          <p className={styles.label}>Select the duration of your cover</p>
          <Selection1
            items={
              data.type === "Days"
                ? ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days"]
                : data.type === "Hours"
                ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
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
        {`I don't know my reg yet`}{" "}
      </button>
    </div>
  );
};

export default GetQuote;
