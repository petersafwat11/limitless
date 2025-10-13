import React from "react";
import Image from "next/image";
import styles from "./InsuranceCreation.module.css";

const InsuranceCreation = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="Limitless Cover Logo"
          width={66}
          height={66}
          priority
        />
        <h1 className={styles.title}>Welcome to Limitless Cover</h1>
        <p className={styles.description}>
          Hello John, thank you for insuring your vehicle with us! There are
          just a few things we need to tell you.
        </p>
        <button className={styles.button}>Set up your account</button>
      </header>

      {/* Policy Details Section */}
      <section className={styles.policyDetails}>
        <p className={styles.policyNumber}>
          Policy Number: <span>FPM6022435210FC</span>
        </p>
        <p className={styles.type}>
          Type: <span>Impound</span>
        </p>
        <p className={styles.startDate}>
          Start Date: <span>15/09/24</span>
        </p>
        <p className={styles.voluntaryExcess}>
          Voluntary Excess: <span>£1000</span>
        </p>
      </section>

      {/* Car Details Section */}
      <section className={styles.carDetails}>
        <p className={styles.carNumber}>
          Your Car: <span>SS17</span>
        </p>
        <p className={styles.cover}>
          Cover: <span>Comprehensive</span>
        </p>
        <p className={styles.excess}>
          Compulsory Excess* <span>£250</span>
        </p>
      </section>
      <p className={styles.note}>
        *All excesses that apply are shown on your Schedule. If you need to make
        a claim, you are responsible for paying all excesses applying to the
        cover, even if the incident is not your fault.
      </p>
      <h2>So what next?</h2>
      <div>
        <div>
          <Image
            src="/logo.svg"
            alt="Limitless Cover Logo"
            width={66}
            height={66}
            priority
          />
          {`Your Certificate of Motor Insurance is attached. All your other
          documents are kept safe and sound in Your Account. Log in using your
          email address and password. If you haven't already set up a password,
          your password will be your policy number. If this is the first time
          logging in to Your Account, you'll be asked to change your password
          once you've logged in.`}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default InsuranceCreation;
