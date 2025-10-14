"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./actions.module.css";

const Actions = ({ insuranceId, showPopUp, onPayClick }) => {
  const router = useRouter();

  const handlePayment = () => {
    // If onPayClick is provided (payment page), use it to show iframe
    if (onPayClick) {
      onPayClick();
    } else if (insuranceId) {
      // Otherwise navigate to payment page (payment-summary page)
      router.push(`/payment?id=${insuranceId}`);
    }
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
