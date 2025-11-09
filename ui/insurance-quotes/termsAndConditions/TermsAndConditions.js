import React from "react";
import styles from "./termsAndConditions.module.css";
import Image from "next/image";
import ComponentWrapper from "../componentWrapper/ComponentWrapper";
const TermsAndConditions = () => {
  return (
    <ComponentWrapper title="Terms and conditions">
      <div className={styles.content}>
        <div className={styles.terms}>
          <p className={styles.termItem}>
            {` As set out in our privacy policy, Comparison Creator and our partners
            may exchange information through various databases or use data from
            loyalty schemes (including transactional information) to help check
            the information provided, to prevent fraud and to assess your premium.`}
          </p>
          <p className={styles.termItem}>
            {`Please read our terms & conditions and privacy policy  before you proceed, as by clicking 'Accept and Get Quotes' you confirm  you have read and accept them.`}
          </p>
          <p className={styles.termItem}>
            {`By clicking the button below you confirm that you have read and accept our privacy policy and Terms and conditions. You can read more about Comparison Creator's service here.`}
          </p>
        </div>
        <div className={styles.selection}>
          <label className={styles.customCheckbox}>
            <input type="checkbox" />
            <span className={styles.checkboxStyle} />
            <p className={styles.selectionText}>
              By ticking this box, you are confirming that you understand and
              agree to the terms & conditions of Limitless Cover.{" "}
            </p>
          </label>
          <label className={styles.customCheckbox}>
            <input type="checkbox" />
            <span className={styles.checkboxStyle} />
            <p className={styles.selectionText}>
              If you would like to sign up for marketing emails from Limitless
              Cover to keep up with the best offers, please tick this box.
              (Optional)
            </p>
          </label>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.back}>Back</button>
        <button className={styles.next}>
          Next{" "}
          <Image
            src="/svg/arrow-right.svg"
            alt="arrow-right"
            width={28}
            height={14}
          />{" "}
        </button>
      </div>
    </ComponentWrapper>
  );
};

export default TermsAndConditions;
