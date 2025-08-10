import React from "react";
import styles from "./calculator.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/company-pages/mainPages/confirmButton/ConfirmButton";
const Calculator = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Temporary Vehicle Insurance Calculator </h3>
      <div className={styles.conten}>
        <div className={styles.first}>
          <Image
            src={"/svgs/calc-car.svg"}
            alt="calculator-1"
            width={161}
            height={99}
          />
          <h4 className={styles.contentTitle}>Get your price estimate</h4>
          <p className={styles.description}>
            {`It couldn't be simpler get a short term insurance policy. You can buy a policy online anytime you need it, and with our straightforward quote process, you can get a price in under 2 minutes!`}
          </p>
        </div>
        <div className={styles.form}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.left}>
                <Image
                  src={"/svgs/card-icon.svg"}
                  alt="card-icon"
                  width={16}
                  height={57}
                />
                <h5 className={styles.cardTitle}>
                  The average pricing for 1 day{" "}
                </h5>
              </div>
              <h4 className={styles.cardPrice}>£12</h4>
            </div>
            <p className={styles.cardDescription}>
              Prices based on the averageprice 19,765 policies for the displayed
              durations (January 2025){" "}
            </p>
            <ConfirmButton
              title="Get a quote"
              onClick={() => {}}
              className={styles.cardButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
