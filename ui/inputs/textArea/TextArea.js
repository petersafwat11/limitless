import React from "react";
import styles from "./textArea.module.css";

const TextArea = ({ label, value, onChange, placeholder, rows = 5 }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <textarea
        placeholder={placeholder}
        className={styles.input}
        value={value || ""}
        onChange={onChange}
        rows={rows}
      />
    </div>
  );
};

export default TextArea;
