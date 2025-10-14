import React from "react";
import styles from "./buttons.module.css";
const Buttons = () => {
  return (
    <div className={styles.buttons}>
      <button className={styles.backButton}>Back</button>
      <button className={styles.cancelButton}>Cancel</button>
    </div>
  );
};

export default Buttons;
