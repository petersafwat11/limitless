"use client";
import React, { useEffect, useState } from "react";
import styles from "./submitted.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Submitted = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderReference, setOrderReference] = useState("");

  // Get order reference from URL params (set during form submission)
  useEffect(() => {
    const urlOrderRef = searchParams.get("orderReference");
    if (urlOrderRef) {
      setOrderReference(urlOrderRef);
      console.log("Order reference found in URL:", urlOrderRef);
    } else {
      console.warn("No orderReference found in URL params");
    }

    // Clean up sessionStorage claim data since we're done
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("claimData");
    }
  }, [searchParams]);
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
        <p className={styles.headerItemValue}>
          {orderReference ? `#${orderReference}` : "#Loading..."}
        </p>
      </div>

      <p className={styles.description}>
        Your claim has been submitted successfully.
      </p>

      <button
        className={styles.claimsPortal}
        onClick={() => router.push("/dashboard/claims")}
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
