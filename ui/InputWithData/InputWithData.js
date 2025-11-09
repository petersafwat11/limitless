import React from "react";
import Image from "next/image";
import styles from "./inputWithData.module.css";

const InputWithData = ({ item }) => {
  return (
    <div className={styles.item}>
      <p className={styles.label}>{item.label}</p>
      <div
        style={{
          paddingLeft:
            item.type === "date" || item.type === "time" ? "0.6rem" : "",
        }}
        className={styles.value}
      >
        {item.type === "date" ? (
          <div className={styles.iconWrapper}>
            <Image src={"/svg/date.svg"} alt="edit" width={24} height={24} />
          </div>
        ) : item.type === "time" ? (
          <div className={styles.iconWrapper}>
            <Image src={"/svg/time.svg"} alt="edit" width={24} height={24} />
          </div>
        ) : (
          ""
        )}
        {item.value}
      </div>
    </div>
  );
};

export default InputWithData;
