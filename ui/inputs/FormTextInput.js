import React from "react";
import TextInput from "./textInput/TextInput";
import styles from "./textInput/textInput.module.css";

const FormTextInput = ({
  label,
  placeholder,
  type = "text",
  reg,
  button,
  error,
  ...props
}) => {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>{label}</label>
      <div className={styles.wrapper}>
        <div className={styles.inputContainer}>
          {reg && <span className={styles.inputSpan}>GB</span>}
          <input
            type={type}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : ""}`}
            {...props}
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
          {error.message}
        </span>
      )}
    </div>
  );
};

export default FormTextInput;
