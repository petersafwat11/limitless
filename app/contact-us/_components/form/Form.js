import React from "react";
import styles from "./form.module.css";
import Image from "next/image";
const Form = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Select the Appropriate Option</label>
        <div className={styles.selectionContainer}>
          <div className={styles.selectionItem}>
            {" "}
            <span className={styles.selectionSpan}></span>Question
          </div>
          <div className={styles.selectionItem}>
            {" "}
            <span className={styles.selectionSpan}></span>Complaint
          </div>
          <div className={styles.selectionItem}>
            {" "}
            <span className={styles.selectionSpan}></span>other
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Full Name</label>
          <div className={styles.inputContainer}>
            <input
              type="text"
              placeholder="Enter your Full Name"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email Address</label>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Enter your Email Address"
              className={styles.input}
            />
          </div>
        </div>
      </div>
      <div className={styles.inputGroup}>
          <label className={styles.label}>Message</label>
        <div className={styles.inputContainer}>
          <textarea
            placeholder="Enter your Message"
            className={styles.textarea}
          />
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
    </div>
  );
};

export default Form;
