import React from "react";
import styles from "./not-found.module.css";
import Header from "@/ui/notFoundHeader/header/Header";
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
