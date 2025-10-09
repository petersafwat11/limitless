"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./actions.module.css";

const Actions = ({ insuranceId, showPopUp }) => {
  const router = useRouter();

  const handlePayment = () => {
    if (insuranceId) {
      router.push(`/payment?id=${insuranceId}`);
    }
    // if (showPopUp) {
    //   showPopUp();
    // }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className={styles.actions}>
      <button className={styles.cancelButton} onClick={handleBack}>
        Back
      </button>
      <button className={styles.payButton} onClick={handlePayment}>
        Pay
        <Image
          src="/svg/arrow-right.svg"
          alt="arrow-right"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Actions;
