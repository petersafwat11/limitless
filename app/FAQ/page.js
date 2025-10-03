
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "./_components/header/Header";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { data } from "./data";
const Page = () => {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);


  useEffect(() => {
    if (showPaymentPopup) {
      const popup = window.open(
        "https://www.limitlesstrading.co.uk/payment",
        "SumUpPayment",
        `width=${window.screen.width},height=${window.screen.height},left=0,top=0`
      );

      // Optional: close popup if parent unmounts
      return () => {
        popup?.close();
      };
    }
  }, [showPaymentPopup]);
  return (
    <div className={styles.container}>
      <h1 onClick={() => setShowPaymentPopup(true)}>show iframe</h1>
      <Header  title="Frequently Asked Questions" />
      <div className={"centeredContent"}>
        <div className={styles.wrapper}>
          {data.map((item) => (
            <QuestionsGroup
              key={item.title}
              title={item.title}
              questions={item.questions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
