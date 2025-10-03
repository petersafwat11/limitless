import React from "react";
import styles from "./actionBtns.module.css";
import Image from "next/image";

const ActionBtns = ({
  onBack,
  onNext,
  nextLabel = "Next",
  isSubmitting = false,
  nextType = "button",
}) => {
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.back} onClick={onBack}>
        Back
      </button>
      <button
        type={nextType}
        className={styles.next}
        onClick={nextType === "button" && onNext ? onNext : undefined}
        disabled={isSubmitting}
        style={{
          background: isSubmitting ? "#ccc" : "#0388ff",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "Submitting..." : nextLabel}
        {!isSubmitting && (
          <Image
            src="/svg/arrow-right.svg"
            alt="arrow-right"
            width={28}
            height={14}
          />
        )}
      </button>
    </div>
  );
};

export default ActionBtns;
