import React from "react";
import PolicyDetails from "../_components/policyDetails/PolicyDetails";
import styles from "./page.module.css";

const page = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>CI-273782</h1>
      </div>
      <PolicyDetails />
    </div>
  );
};

export default page;
