import React from "react";
import styles from "./selection.module.css";
const Selection1 = ({ items, selectedItem, setSelectedItem, type, style , noDotMobile}) => {
  return (
    <div
      className={`${styles.selectionContainer} ${
        style === "dark" ? styles.dark : ""
      }`}
    >
      {items.map((item, index) => (
        <div
          style={{
            boxShadow: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12",
            ].includes(item)
              ? "none"
              : "",
          }}
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
              } ${style === "dark" ? styles.darkSpan : ""} ${noDotMobile ? styles.noDotMobile : ""}`}
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
