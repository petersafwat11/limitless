import React from "react";
import styles from "./selection.module.css";
const Selection1 = ({ items, selectedItem, setSelectedItem, type, style }) => {
  return (
    <div
      className={`${styles.selectionContainer} ${
        style === "dark" ? styles.dark : ""
      }`}
    >
      {items.map((item, index) => (
        <div
          className={`${styles.selectionItem} ${
            style === "dark" && selectedItem === item
              ? styles.darkSelectedItem
              : selectedItem === item
              ? styles.selectedItem
              : ""
          } ${style === "dark" ? styles.darkItem : ""}`}
          key={index}
          onClick={() => setSelectedItem(item)}
        >
          {type === "checkbox" ? (
            <span
              className={`${styles.selectionSpan} ${
                selectedItem === item ? styles.selectedSpan : ""
              } ${style === "dark" ? styles.darkSpan : ""}`}
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
