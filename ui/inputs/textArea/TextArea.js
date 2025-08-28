import React from "react";
import styles from "./textArea.module.css";

const TextArea = ({ label, value, setValue, placeholder, rows = 5 }) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <textarea
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={rows}
      />
    </div>
  );
};

export default TextArea;
