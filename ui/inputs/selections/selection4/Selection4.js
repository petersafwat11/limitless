import React from "react";
import styles from "./selection.module.css";
const Selection3 = ({ options, selectedItem, setSelectedItem }) => {
  return (
    <div className={styles.container}>
      {options.map((option, index) => (
        <div
          key={index}
          className={styles.option}
          onClick={() => setSelectedItem(option)}
        >
          <span
            className={`${styles.selectionSpan} ${
              selectedItem === option ? styles.selectedSpan : ""
            }`}
          ></span>

          <h4 className={styles.title}>{option}</h4>
        </div>
      ))}
    </div>
  );
};

export default Selection3;
