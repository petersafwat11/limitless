import React from "react";
import styles from "./selection.module.css";
const Selection1 = ({ items, selectedItem, setSelectedItem, type }) => {
  return (
    <div className={styles.selectionContainer}>
      {items.map((item, index) => (
        <div
          
          className={`${styles.selectionItem} ${
            selectedItem === item ? styles.selectedItem : ""
          }`}
          key={index}
          onClick={() => setSelectedItem(item)}
        >
          {type === "checkbox" ? (
            <span
              className={`${styles.selectionSpan} ${
                selectedItem === item ? styles.selectedSpan : ""
              }`}
            ></span>
          ) : (
            ""
          )}
          {item}
        </div>
      ))}
    </div>
  );
};

export default Selection1;
