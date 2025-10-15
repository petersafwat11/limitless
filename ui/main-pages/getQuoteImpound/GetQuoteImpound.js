"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./getQuoteImpound.module.css";
import Image from "next/image";
import TextInput from "../../inputs/textInput/TextInput";
import Selection1 from "../../inputs/selections/selection1/Selection1";
import FormDropdown from "../../inputs/FormDropdown";
const GetQuoteImpound = () => {
  const router = useRouter();
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [period, setPeriod] = useState("30 Days");
  const [startDateDay, setStartDateDay] = useState("");
  const [startDateMonth, setStartDateMonth] = useState("");
  const [startDateYear, setStartDateYear] = useState("");
  const [error, setError] = useState("");

  // Get current date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-11
  const currentDay = today.getDate();

  // Generate year options (current year + next 10 years)
  const yearOptions = Array.from({ length: 11 }, (_, i) => (currentYear + i).toString());

  // Month names
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Generate available months based on selected year
  const getAvailableMonths = () => {
    if (!startDateYear) return monthNames;
    const selectedYear = parseInt(startDateYear);
    if (selectedYear > currentYear) {
      return monthNames; // All months available for future years
    }
    // For current year, only show current month onwards
    return monthNames.slice(currentMonth);
  };

  // Generate available days based on selected month and year
  const getAvailableDays = () => {
    if (!startDateYear || !startDateMonth) {
      return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    }

    const selectedYear = parseInt(startDateYear);
    const selectedMonthIndex = monthNames.indexOf(startDateMonth);
    
    // Get number of days in the selected month
    const daysInMonth = new Date(selectedYear, selectedMonthIndex + 1, 0).getDate();
    const allDays = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    // If it's the current month and year, only show days from today onwards
    if (selectedYear === currentYear && selectedMonthIndex === currentMonth) {
      return allDays.filter(day => parseInt(day) >= currentDay);
    }

    return allDays;
  };

  const handleContinue = () => {
    // Validate inputs
    if (!registrationNumber.trim()) {
      setError("Please enter a registration number");
      return;
    }

    if (!startDateDay || !startDateMonth || !startDateYear) {
      setError("Please select a policy start date");
      return;
    }

    // Create URL parameters
    const params = new URLSearchParams();
    params.set("fromQuote", "true");
    params.set("registrationNumber", registrationNumber.trim().toUpperCase());
    params.set("startDateDay", startDateDay);
    params.set("startDateMonth", startDateMonth);
    params.set("startDateYear", startDateYear);

    // Redirect to impound get-quote with parameters
    router.push(`/impound/get-quote?${params.toString()}`);
  };

  const handleDontKnowReg = () => {
    router.push("/impound/get-quote");
  };

  const handleRegistrationChange = (e) => {
    const value = e.target.value.toUpperCase();
    setRegistrationNumber(value);
    setError("");
  };

  // Handle year change - reset month and day if they become invalid
  const handleYearChange = (year) => {
    setStartDateYear(year);
    const availableMonths = getAvailableMonths();
    if (startDateMonth && !availableMonths.includes(startDateMonth)) {
      setStartDateMonth("");
      setStartDateDay("");
    }
    setError("");
  };

  // Handle month change - reset day if it becomes invalid
  const handleMonthChange = (month) => {
    setStartDateMonth(month);
    const availableDays = getAvailableDays();
    if (startDateDay && !availableDays.includes(startDateDay)) {
      setStartDateDay("");
    }
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
          <TextInput
            label="Enter your Registration number"
            placeholder="Enter your Registration number"
            reg={true}
            value={registrationNumber}
            onChange={(e) => handleRegistrationChange(e)}
          />
        </div>
      </div>
      <div className={styles.selection}>
        <p className={styles.label}>How long will you need it?</p>
        <Selection1
          items={["30 Days"]}
          selectedItem={period}
          setSelectedItem={(item) => setPeriod(item)}
          type="checkbox"
        />
      </div>
      <div className={styles.inputGroup}>
        <p className={styles.label}>Policy start date</p>
        <div className={styles.startDateDropdowns}>
          <FormDropdown
            options={getAvailableDays()}
            placeholder="DD"
            value={startDateDay}
            onChange={(e) => {
              setStartDateDay(e.target.value);
              setError("");
            }}
            disabled={!startDateYear || !startDateMonth}
          />
          <FormDropdown
            options={getAvailableMonths()}
            placeholder="MM"
            value={startDateMonth}
            onChange={(e) => handleMonthChange(e.target.value)}
            disabled={!startDateYear}
          />
          <FormDropdown
            options={yearOptions}
            placeholder="YYYY"
            value={startDateYear}
            onChange={(e) => handleYearChange(e.target.value)}
          />
        </div>
      </div>
      <button type="button" onClick={handleContinue} className={styles.button}>
        Continue{" "}
        <Image
          src="/svg/arrow-right.svg"
          alt="arrow-right"
          width={27}
          height={14}
        />
      </button>
      <button type="button" onClick={handleDontKnowReg} className={styles.notYet}>
        I don&apos;t know my reg yet
      </button>
    </div>
  );
};

export default GetQuoteImpound;
