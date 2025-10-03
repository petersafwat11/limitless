
"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Header from "./_components/header/Header";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { data } from "./data";
const Page = () => {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  return (
    <div className={styles.container}>
      <Header  title="Frequently Asked Questions" />
      <h1 onClick={() => setShowPaymentPopup(true)}>show iframe</h1>

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

      {/* Iframe overlay - preloaded in background */}
      <div 
        className={styles["iframe-container"]}
        style={{ display: showPaymentPopup ? 'flex' : 'none' }}
      >
        <iframe
          src="https://www.limitlesstrading.co.uk/payment"
          title="SumUp Payment"
          className={styles["iframe"]}
        />
      </div>
    </div>
  );
};

export default Page;
