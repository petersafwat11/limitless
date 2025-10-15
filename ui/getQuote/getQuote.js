"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./getQuote.module.css";
import Image from "next/image";
import FormTextInput from "../inputs/FormTextInput";
import Selection1 from "../inputs/selections/selection1/Selection1";
import FormDropdown from "../inputs/FormDropdown";
const GetQuote = () => {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [quickSelection, setQuickSelection] = useState("");
  const [customDurationType, setCustomDurationType] = useState("");
  const [customDurationValue, setCustomDurationValue] = useState("");
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    // Reset errors
    setErrors({});
    const newErrors = {};

    // Validate inputs
    if (!registrationNumber.trim()) {
      newErrors.registrationNumber = "Please enter a registration number";
    }

    if (!quickSelection && !customDurationValue) {
      newErrors.duration = "Please select a duration";
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
    if (errors.registrationNumber) {
      setErrors({ ...errors, registrationNumber: undefined });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.regInputContainer}>
          <FormTextInput
            label="Enter your Registration number"
            placeholder="Enter your Registration number"
            reg={true}
            value={registrationNumber}
            onChange={handleRegistrationChange}
            error={errors.registrationNumber ? { message: errors.registrationNumber } : null}
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
            if (errors.duration) {
              setErrors({ ...errors, duration: undefined });
            }
          }}
          type="checkbox"
        />
        {errors.duration && (
          <span style={{ color: "#dc3545", fontSize: "1.2rem", marginTop: "0.5rem" }}>
            {errors.duration}
          </span>
        )}
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
            if (errors.duration) {
              setErrors({ ...errors, duration: undefined });
            }
          }}
          type="checkbox"
        />
      </div>

      {["Hours", "Days", "Weeks"].includes(customDurationType) && (
        <div className={styles.selection}>
          <p className={styles.label}>Select the duration of your cover</p>
          <div className={styles.durationSelectionWrapper}>
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
                if (errors.duration) {
                  setErrors({ ...errors, duration: undefined });
                }
              }}
            />
            <div className={styles.dropdownOption}>
              <FormDropdown
                options={
                  customDurationType === "Days"
                    ? Array.from({ length: 23 }, (_, i) => (i + 8).toString())
                    : customDurationType === "Hours"
                    ? Array.from({ length: 12 }, (_, i) => (i + 13).toString())
                    : Array.from({ length: 48 }, (_, i) => (i + 5).toString())
                }
                placeholder="More options"
                value={customDurationValue}
                onChange={(e) => {
                  setCustomDurationValue(e.target.value);
                  if (errors.duration) {
                    setErrors({ ...errors, duration: undefined });
                  }
                }}
              />
            </div>
          </div>
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
