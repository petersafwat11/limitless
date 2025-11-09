import React from "react";
import styles from "./textInput.module.css";
const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  reg,
  button,
  error,
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.wrapper}>
        <div className={`${styles.inputContainer} ${error ? styles.error : ""}`}>
          {reg && <span className={styles.inputSpan}> GB</span>}
          <input
            type={type}
            placeholder={placeholder}
            className={`${styles.input} ${reg ? styles.reg : ""} ${error ? styles.error : ""}`}
            value={value || ""}
            onChange={onChange}
          />
        </div>
        {button && button}
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
          {error.message || error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
