import React, { forwardRef } from "react";
import Image from "next/image";
import styles from "./dropdown/dropdown.module.css";

const FormDropdown = forwardRef(
  ({ label, options, placeholder, error, ...props }, ref) => {
    return (
      <div className={styles.container}>
        <p className={styles.label}>{label}</p>
        <div className={styles.selectWrapper}>
          <select
            ref={ref}
            className={`${styles.select} ${error ? styles.error : ""}`}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className={styles.arrowContainer}>
            <Image
              src="/svg/arrow-down.svg"
              alt="arrow-down"
              width={24}
              height={24}
              className={styles.arrowDown}
            />
          </div>
        </div>
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);

FormDropdown.displayName = "FormDropdown";

export default FormDropdown;
