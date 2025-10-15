"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./getQuote.module.css";
import Image from "next/image";
import FormTextInput from "../inputs/FormTextInput";
import Selection1 from "../inputs/selections/selection1/Selection1";
const GetQuote = () => {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [quickSelection, setQuickSelection] = useState("");
  const [customDurationType, setCustomDurationType] = useState("");
  const [customDurationValue, setCustomDurationValue] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    // Validate inputs
    if (!registrationNumber.trim()) {
      setError("Please enter a registration number");
      return;
    }

    if (!quickSelection && !customDurationValue) {
      setError("Please select a duration");
      return;
    }

    // Prepare duration data
    let durationData = {};
    if (quickSelection) {
      if (quickSelection.includes("Day")) {
        durationData = { type: "Days", value: quickSelection.split(" ")[0] };
      } else if (quickSelection.includes("Week")) {
        durationData = { type: "Weeks", value: quickSelection.split(" ")[0] };
      }
    } else if (customDurationType && customDurationValue) {
      durationData = {
        type: customDurationType,
        value: customDurationValue,
      };
    }

    // Create URL parameters
    const params = new URLSearchParams();
    params.set("fromQuote", "true");
    params.set("registrationNumber", registrationNumber.trim().toUpperCase());
    
    if (durationData.type) {
      params.set("durationType", durationData.type);
    }
    if (durationData.value) {
      params.set("durationValue", durationData.value);
    }

    // Redirect to temporary-insurance with parameters
    router.push(`/temporary/get-quote?${params.toString()}`);
  };

  const handleDontKnowReg = () => {
    router.push("/temporary/get-quote");
  };

  const handleRegistrationChange = (e) => {
    const value = e.target.value.toUpperCase();
    setRegistrationNumber(value);
    setError("");
  };
  return (
    <div className={styles.container}>
      {/* Display errors */}
      {error && (
        <div
          style={{
            color: "red",
            marginBottom: "1rem",
            padding: "0.5rem",
            backgroundColor: "#fee",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      <div className={styles.contentContainer}>
        <div className={styles.regInputContainer}>
          <FormTextInput
            label="Enter your Registration number"
            placeholder="Enter your Registration number"
            reg={true}
            value={registrationNumber}
            onChange={handleRegistrationChange}
          />
        </div>
      </div>
      <div className={styles.selection}>
        <p className={styles.label}>How long will you need it?</p>
        <Selection1
          items={["1 Day", "2 Days", "1 Week"]}
          selectedItem={quickSelection}
          setSelectedItem={(item) => {
            setQuickSelection(item);
            setCustomDurationType("");
            setCustomDurationValue("");
            setError("");
          }}
          type="checkbox"
        />
      </div>

      <div className={styles.selection}>
        <p className={styles.label}>Need it specific? Choose your duration</p>
        <Selection1
          items={["Hours", "Days", "Weeks"]}
          selectedItem={customDurationType}
          setSelectedItem={(item) => {
            setCustomDurationType(item);
            setCustomDurationValue("");
            setQuickSelection("");
            setError("");
          }}
          type="checkbox"
        />
      </div>

      {["Hours", "Days", "Weeks"].includes(customDurationType) && (
        <div className={styles.selection}>
          <p className={styles.label}>Select the duration of your cover</p>
          <Selection1
            items={
              customDurationType === "Days"
                ? ["1", "2", "3", "4", "5", "6", "7"]
                : customDurationType === "Hours"
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
                : ["1", "2", "3", "4"]
            }
            selectedItem={customDurationValue}
            setSelectedItem={(item) => {
              setCustomDurationValue(item);
              setError("");
            }}
          />
        </div>
      )}

      <button type="button" onClick={handleContinue} className={styles.button}>
        Continue{" "}
        <Image
          src="/svg/arrow-right.svg"
          alt="arrow-right"
          width={27}
          height={14}
        />
      </button>

      <button
        type="button"
        onClick={handleDontKnowReg}
        className={styles.notYet}
      >
        I don&apos;t know my reg yet
      </button>
    </div>
  );
};

export default GetQuote;
