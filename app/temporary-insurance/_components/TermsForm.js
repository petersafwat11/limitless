"use client";
import React from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import styles from "./components.module.css";
import ActionBtns from "@/ui/insurance-quotes/actionBtns/ActionBtns";

const TermsForm = ({ form, onBack, isSubmitting }) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    trigger,
  } = form;

  const handleFormSubmit = async () => {
    console.log("🔍 Validating form...");
    const isValid = await trigger();

    if (!isValid) {
      console.log("❌ Form validation errors:", errors);
      return false;
    }

    console.log("✅ Form is valid, proceeding with submission");
    return true;
  };

  return (
    <ComponentWrapper title="Terms and Conditions">
      <div className={styles.content}>
        <div className={styles.terms}>
          <p className={styles.termItem}>
            As set out in our privacy policy, Comparison Creator and our
            partners may exchange information through various databases or use
            data from loyalty schemes (including transactional information) to
            help check the information provided, to prevent fraud and to assess
            your premium.
          </p>
          <p className={styles.termItem}>
            {`Please read our terms & conditions and privacy policy before you
            proceed, as by clicking 'Submit Application' you confirm you have
            read and accept them.`}
          </p>
          <p className={styles.termItem}>
            {`By clicking the submit button you confirm that you have read and
            accept our privacy policy and Terms and conditions. You can read
            more about Comparison Creator's service here.`}
          </p>
        </div>

        <div className={styles.selection}>
          <label className={styles.customCheckbox}>
            <input type="checkbox" {...register("terms.acceptTerms")} />
            <span className={styles.checkboxStyle} />
            <p className={styles.selectionText}>
              By ticking this box, you are confirming that you understand and
              agree to the terms & conditions of Limitless Cover.{" "}
              <span className={styles.required}>*</span>
            </p>
          </label>
          {errors.terms?.acceptTerms && (
            <span className={styles.error}>
              {errors.terms.acceptTerms.message}
            </span>
          )}

          <label className={styles.customCheckbox}>
            <input type="checkbox" {...register("terms.acceptMarketing")} />
            <span className={styles.checkboxStyle} />
            <p className={styles.selectionText}>
              If you would like to sign up for marketing emails from Limitless
              Cover to keep up with the best offers, please tick this box.
              (Optional)
            </p>
          </label>
        </div>
      </div>
      <ActionBtns
        onBack={onBack}
        onNext={async (e) => {
          e.preventDefault();
          console.log("🔘 Submit button clicked");
          const isValid = await handleFormSubmit();
          if (isValid) {
            console.log("📤 Triggering form submission");
            // Get the parent form's onSubmit handler
            const formElement = e.target.closest("form");
            if (formElement) {
              formElement.dispatchEvent(
                new Event("submit", { cancelable: true })
              );
            }
          }
        }}
        nextLabel={isSubmitting ? "Submitting..." : "Submit Application"}
        nextType="button"
        isSubmitting={isSubmitting}
      />
    </ComponentWrapper>
  );
};

export default TermsForm;
