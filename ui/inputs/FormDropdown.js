import React, { useState } from "react";
import styles from "./dropdown/dropdown.module.css";
import Image from "next/image";

const FormDropdown = ({
  label,
  options,
  placeholder,
  error,
  value,
  onChange,
  ...props
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setShowDropdown(false);
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <div
        className={`${styles.dropdown} ${error ? styles.error : ""}`}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p className={styles.selected}>{value || placeholder}</p>
        <Image
          src="/svg/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
        {showDropdown && (
          <div className={styles.dropdownOptions}>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.dropdownOption} ${
                  value === option ? styles.selectedOption : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                <span
                  className={`${styles.selectionSpan} ${
                    value === option ? styles.selectedSpan : ""
                  }`}
                ></span>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
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
  );
};

export default FormDropdown;
