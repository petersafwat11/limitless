"use client";
import React from "react";
import styles from "./stepActions.module.css";

const StepActions = ({
  onBack,
  onNext,
  onSubmit,
  currentStep,
  totalSteps,
  isLoading = false,
  backLabel = "Back",
  nextLabel = "Next",
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className={styles.actionsContainer}>
      {!isFirstStep ? (
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          disabled={isLoading}
        >
          {backLabel}
        </button>
      ) : (
        <div className={styles.spacer} />
      )}

      {isLastStep ? (
        <button
          type="submit"
          className={styles.nextBtn}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : nextLabel}
        </button>
      ) : (
        <button
          type="button"
          className={styles.nextBtn}
          onClick={onNext}
          disabled={isLoading}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default StepActions;
