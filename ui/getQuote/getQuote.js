import React from "react";
import styles from "./getQuote.module.css";
import Image from "next/image";
// import TextInput from "../inputs/textInput/TextInput";
const getQuote = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <lable className={styles.label}>Enter your Registration number</lable>
        <div className={styles.inputContainer}>
          <span className={styles.inputSpan}> GB</span>
          <input type="text" placeholder="Enter your Registration number" className={styles.input} />
        </div>
      </div>
      <div className={styles.inputGroup}>
        <lable className={styles.label}>How long will you need it?</lable>
        <div className={styles.selectionContainer}>
          <div className={styles.selectionItem}>
            {" "}
            <span className={styles.selectionSpan}></span>1 Day
          </div>
          <div className={styles.selectionItem}>
            {" "}
            <span className={styles.selectionSpan}></span>2 Day
          </div>
          <div className={styles.selectionItem}>
            {" "}
            <span className={styles.selectionSpan}></span>1 Week
          </div>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <lable className={styles.label}>How long will you need it?</lable>
        <div className={styles.selectionContainer}>
          <div className={styles.selectionItem}>
            <span className={styles.selectionSpan}></span>
            Hours
          </div>
          <div className={styles.selectionItem}>
            {" "}
            <span className={styles.selectionSpan}></span>
            Days
          </div>
          <div className={styles.selectionItem}>
            {" "}
            <span className={styles.selectionSpan}></span>
            Weeks
          </div>
        </div>
      </div>
      <button className={styles.button}>
        Continue{" "}
        <Image
          src="/svg/arrow-right.svg"
          alt="arrow-right"
          width={27}
          height={14}
        />
      </button>
      <p className={styles.notYet}>{`I don't know my reg yet`} </p>
    </div>
  );
};

export default getQuote;
