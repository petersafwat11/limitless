"use client";
import React from "react";
import styles from "./submitted.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Submitted = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Image
        src="/svg/submitted.svg"
        alt="submitted"
        width={136}
        height={151}
        className={styles.submittedImage}
      />

      <div className={`${styles.title} ${plusJakartaSans.className}`}>
        Claim Successfully
        <div className={styles.titleSpan}>
          submitted
          <Image
            src="/svg/curved-border.svg"
            alt="curved border"
            width={393}
            height={3}
            className={styles.curvedBorder}
          />
        </div>
      </div>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <Image
            src="/svg/insurance-quote.svg"
            alt="order-summary"
            width={36}
            height={36}
            className={styles.headerItemIcon}
          />
          <p className={styles.headerItemTitle}>Order Reference</p>
        </div>
        <p className={styles.headerItemValue}>#kL10AFJJ019</p>
      </div>

      <p className={styles.description}>
        Your claim has been submitted successfully.
      </p>

      <button
        className={styles.claimsPortal}
        onClick={() => router.push("/dashboard/manage-claims")}
      >
        Claims Portal
        <Image
          src="/svg/blue-right.svg"
          alt="arrow-right"
          width={28}
          height={14}
        />
      </button>
    </div>
  );
};

export default Submitted;
