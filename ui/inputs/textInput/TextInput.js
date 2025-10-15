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
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.wrapper}>
        <div className={styles.inputContainer}>
          {reg && <span className={styles.inputSpan}> GB</span>}
          <input
            type={type}
            placeholder={placeholder}
            className={`${styles.input} ${reg ? styles.reg : ""}`}
            value={value || ""}
            onChange={onChange}
          />
        </div>
        {button && button}
      </div>
    </div>
  );
};

export default TextInput;
