import React from "react";
import styles from "./aboutUs.module.css";
import Image from "next/image";
const AboutUs = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <Image
          className={styles.titleIcon}
          src="/svg/title-icon.svg"
          alt="about-us-car"
          width={98}
          height={49}
        />
        <h3 className={styles.title}>
          Welcome to Limitless Cover, where protecting what matters most is our
          priority. As a forward-thinking vehicle insurance brokerage,
        </h3>
      </div>
      <div className={styles.second}>
        <Image
          className={styles.icon}
          src="/svg/last-updated.svg"
          alt="lastUpdated"
          width={42}
          height={42}
        />

        <p className={styles.description}>
          {`We specialize in offering personalized and flexible coverage options
          that fit your unique needs. Whether you're a first-time car owner, a
          seasoned driver, or someone seeking more affordable, tailored
          insurance, we’ve got you covered. We understand that the world of car
          insurance can be overwhelming, and that’s why we're committed to
          simplifying the process.`}
        </p>
        <p className={styles.description}>
          {`Through a wide network of trusted insurance providers, we bring you the best options to match your budget and requirements. With a focus on convenience, transparency, and customer satisfaction, we’re here to guide you through every step, from comparing quotes to selecting a policy that gives you peace of mind.`}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
