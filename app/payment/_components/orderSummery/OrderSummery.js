import React from "react";
import Image from "next/image";
import styles from "./orderSummery.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const OrderSummery = () => {
  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        Order Summary
      </h3>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <Image
            src="/svg/insurance-quote.svg"
            alt="order-summary"
            width={22}
            height={22}
          />
          <p className={styles.headerItemTitle}>Order Reference</p>
        </div>
        <p className={styles.headerItemValue}>#kL10AFJJ019</p>
      </div>
      <div className={styles.summary}>
        <div className={styles.items}>
          {[
            {
              title: "Impound insurance / KW68 BHK",
              value: "£120.00",
            },
            {
              title: "VAT",
              value: "£4.38",
            },
            {
              title: "Promo",
              value: "£4.38",
            },
          ].map((item, index) => (
            <div className={styles.summaryItem} key={index}>
              <p className={styles.summaryItemTitle}>{item.title}</p>
              <p className={styles.summaryItemValue}>{item.value}</p>
            </div>
          ))}
        </div>
        <div className={styles.total}>
          <p className={styles.totalTitle}>Total</p>
          <p className={styles.totalValue}>£120.00</p>
        </div>
        <button className={styles.dashboardButton}>
          Customer Dashboard
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="18"
            viewBox="0 0 32 18"
            fill="none"
          >
            <path
              d="M22.457 1.66272L30.226 9.00005L22.457 16.3374"
              stroke="#0388FF"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M30.2598 9.01691H1.74023"
              stroke="#0388FF"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerText}>
          <p className={`${styles.title} ${plusJakartaSans.className}`}>
            You will receive a special login link via email.
          </p>
          <p className={styles.footerTextSupport}>
            Please<span style={{ color: "#0388FF" }}>contact support</span> if
            you have not received
          </p>
        </div>
        <div className={styles.voluntaryExcess}>
          <p className={styles.voluntaryText}>Voluntary excess</p>
          <p className={`${styles.voluntaryValue} ${plusJakartaSans.className}`}>
            £120.00
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
