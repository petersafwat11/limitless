"use client";

import React from "react";
import { useRouter } from "next/navigation";
import toast from "@/utils/toast";
import styles from "./buttons.module.css";

const Buttons = ({ claimId }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleCancel = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel this claim? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/claims/${claimId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete claim");
      }

      toast.success("Claim cancelled successfully!", {
        position: "top-right",
      });

      setTimeout(() => {
        router.push("/dashboard/claims");
      }, 1000);
    } catch (error) {
      toast.error(
        error.message || "Failed to cancel claim. Please try again.",
        {
          position: "top-right",
        }
      );
    }
  };

  return (
    <div className={styles.buttons}>
      <button className={styles.backButton} onClick={handleBack}>
        Back
      </button>
      <button className={styles.cancelButton} onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default Buttons;
