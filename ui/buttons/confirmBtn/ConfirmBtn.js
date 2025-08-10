import Image from "next/image";
import React from "react";
import styles from "./confirmBtn.module.css";
const ConfirmBtn = ({ title, onClick, style }) => {
  return (
    <button className={styles.confirmBtn} onClick={onClick} style={style}>
      {title}{" "}
      <Image
        src="/svg/arrow-right.svg"
        alt="arrow-right"
        width={28}
        height={14}
      />
    </button>
  );
};

export default ConfirmBtn;
