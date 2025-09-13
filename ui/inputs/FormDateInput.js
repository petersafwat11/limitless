import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./selections/dataAndTime/dataAndTime.module.css";

const FormDateInput = ({
  label,
  placeholder = "DD/MM/YYYY",
  error,
  value,
  onChange,
  ...props
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null
  );

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toLocaleDateString("en-GB") : "";
    onChange(formattedDate);
    setShowDatePicker(false);
  };

  const handleDateIconClick = () => {
    setShowDatePicker(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>{label}</label>
        <div
          className={`${styles.inputContainer} ${error ? styles.error : ""}`}
          onClick={handleDateIconClick}
        >
          <div className={styles.iconContainer}>
            <Image
              src="/svg/date.svg"
              alt="calendar"
              width={24}
              height={24}
              className={styles.icon}
            />
          </div>
          <input
            value={value || ""}
            type="text"
            placeholder={placeholder}
            className={styles.input}
            readOnly
            {...props}
          />
          <Image
            src="/svg/arrow-down.svg"
            alt="arrow-down"
            width={24}
            height={24}
            className={styles.arrowDown}
          />
        </div>
        {showDatePicker && (
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              calendarClassName={styles.customCalendar}
              onClickOutside={() => setShowDatePicker(false)}
            />
          </div>
        )}
        {error && (
          <span
            className={styles.errorMessage}
            style={{
              color: "#dc3545",
              fontSize: "0.875rem",
              marginTop: "0.25rem",
            }}
          >
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormDateInput;



