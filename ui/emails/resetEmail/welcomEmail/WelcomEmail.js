import React from "react";
import Image from "next/image";
import styles from "./welcomEmail.module.css";
const WelcomEmail = ({ name, resetURL }) => {
  return (
    <div className={styles.container}>
      <Image
        className={styles.logo}
        src="/svg/logo.svg"
        alt="logo"
        width={66}
        height={66}
      />
      <h1 className={styles.title}>
        Welcome to
        <span> LIMITLESS COVER</span>
      </h1>
      <div className={styles.textContainer}>
        <p className={styles.description}>Hi {name},</p>
        <p className={styles.description}>
          Thank you for insuring you car with us. Please find your
          secure login link to access the user portal below.
        </p>
        <a href={resetURL} className={styles.link}>
          Sign in (Valid for 30 days){" "}
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
        <span> LIMITLESS COVER </span>
      </p>
    </div>
  );
};

export default WelcomEmail;
