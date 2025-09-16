import React from "react";
import styles from "./dropdown/dropdown.module.css";

const FormDropdown = ({
  label,
  options,
  placeholder,
  error,
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <select
        className={`${styles.dropdown} ${error ? styles.error : ""}`}
        value={value || ""}
        onChange={handleChange}
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
