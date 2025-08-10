import React from "react";
import styles from "./paymentOptions.module.css";
import Image from "next/image";

const PaymentOptions = () => {
  return (
    <div className={styles.paymentOptions}>
      <h4 className={styles.paymentTitle}>
        You can pay for your short term insurance policy in several ways.
      </h4>
      <div className={styles.options}>
        <Image
          src={"/svg/visa.svg"}
          alt="arrow-right"
          width={207}
          height={114}
        />
        <Image
          src={"/svg/mastercard.svg"}
          alt="arrow-right"
          width={207}
          height={114}
        />
        <Image
          src={"/svg/american-express.svg"}
          alt="arrow-right"
          width={207}
          height={114}
        />
      </div>
    </div>
  );
};

export default PaymentOptions;
