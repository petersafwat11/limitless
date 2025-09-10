import React from "react";
import Image from "next/image";
import styles from "./resetEmail.module.css";
const ResetEmail = ({ name, resetURL }) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src="/svg/logo.svg"
        alt="logo"
        width={66}
        height={66}
      />
      <h1 className={styles.title}>RESET PASSWORD</h1>
      <div className={styles.textContainer}>
        <p className={styles.description}>Hi {name},</p>
        <p className={styles.description}>
          Please use the secure link below to reset your password and access
          your account
        </p>
        <a href={resetURL} className={styles.link}>
          Reset your password (Valid for 24 hours){" "}
        </a>
      </div>

      <div className={styles.buttonContainer}>
        <p className={styles.ifNotWorking}>
          *If clicking the button doesn’t seem to work, you can copy and paste
          the following link into your browser.
        </p>
        <a href={resetURL} className={styles.button}>
          {resetURL}
        </a>
      </div>
      <p className={styles.greeting}>
        Kind regards,
        <span > LIMITLESS COVER </span>
      </p>
    </div>
  );
};

export default ResetEmail;
