import React from "react";
import styles from "./textArea/textArea.module.css";

const FormTextArea = ({ label, placeholder, rows = 5, error, ...props }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <textarea
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.error : ""}`}
        rows={rows}
        {...props}
      />
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

export default FormTextArea;
