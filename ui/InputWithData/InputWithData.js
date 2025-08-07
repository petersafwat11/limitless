import React from "react";
import Image from "next/image";
import styles from "./inputWithData.module.css";

const InputWithData = ({ item }) => {
  return (
    <div
      style={{
        paddingLeft: item.label === "Date of Birth" ? "0.6rem" : "",
      }}
      className={styles.item}
    >
      <p className={styles.label}>{item.label}</p>
      <div className={styles.value}>
        {item.label === "Date of Birth" && (
          <div className={styles.iconWrapper}>
            <Image src={"/svg/date.svg"} alt="edit" width={24} height={24} />
          </div>
        )}
        {item.value}
      </div>
    </div>
  );
};

export default InputWithData;
