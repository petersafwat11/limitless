import React from "react";
import Header from "./_components/header/Header";
import styles from "./page.module.css";
const page = () => {
  return (
    <div className={styles.page}>
      <span className={styles.squareLight}></span>
      {/* <span className={styles.squareLight2}></span> */}
      <Header />
    </div>
  );
};

export default page;
