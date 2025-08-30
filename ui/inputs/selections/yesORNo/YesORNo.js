import React from "react";
import styles from "./yesORNo.module.css";
const YesORNo = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <p
        className={`${styles.button} ${value ? styles.active : ""}`}
        onClick={() => onChange(true)}
      >
        <span
          className={`${styles.selectionSpan} ${
            value ? styles.selectedSpan : ""
          }`}
        ></span>
        Yes
      </p>
      <p
        className={`${styles.button} ${value ? "" : styles.active}`}
        onClick={() => onChange(false)}
      >
        <span
          className={`${styles.selectionSpan} ${
            value ? "" : styles.selectedSpan
          }`}
        ></span>
        No
      </p>
    </div>
  );
};

export default YesORNo;
