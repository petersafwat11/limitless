"use client";
import React from "react";
import styles from "./serviceDescription.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const ServiceDescription = ({ services, title, description, button }) => {
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <Image
          src="/svg/get-quote.svg"
          alt="get-quote"
          width={135}
          height={75}
        />
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          {withoutLastWord} <span className={styles.secondPart}>{lastWord}</span>
        </h2>
        <p className={styles.description}>{description}</p>
        <button className={styles.confirmBtn} onClick={() => {}}>
          Get a Quote
          <Image
            src="/svg/arrow-right.svg"
            alt="arrow-right"
            width={28}
            height={14}
          />
        </button>
      </div>
      <div className={styles.services}>
        {services.map((service, index) => (
          <div className={styles.service} key={index}>
            <Image
              src="/svg/included.svg"
              alt="include"
              width={42}
              height={42}
            />
            <h3
              className={`${styles.serviceTitle} ${plusJakartaSans.className}`}
            >
              {service}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDescription;
