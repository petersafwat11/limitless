import React from "react";
import styles from "./guidelines.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Guidelines = ({ data }) => {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Use contact details to make a claim{" "}
      </h2>
      <div className={styles.guidelines}>
        {data.map((item, index) => (
          <div className={styles.guideline} key={index}>
            <div className={styles.header}>
              <Image
                src="/svg/contact-details.svg"
                alt="contact-details"
                width={24}
                height={50}
              />
              <h4 className={styles.headerTitle}>{item.title}</h4>
            </div>
            <div className={styles.content}>
              {item.content.map((item, index) => (
                <p className={styles.contentTitle} key={index}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guidelines;
