"use client";
import React from "react";
import GetQuote from "../../getQuote/getQuote";
import styles from "./header.module.css";
import Feature from "../../feature/Feature";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const Header = ({ subTitle, title, description, features }) => {
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  return (
    <div className={"headerContainer"}>
      <Image
        src="/svg/squares-2.svg"
        alt="squares"
        width={1394}
        height={706}
        className={styles.squares}
      />

      <Image
        src="/svg/contact.svg"
        alt="contact-us"
        width={585}
        height={776}
        className={styles.contact}
      />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={`${styles.subTitle} ${manrope.className}`}>
              {subTitle}
            </p>

            <div className={`${styles.title} ${plusJakartaSans.className}`}>
              {withoutLastWord}
              <div className={styles.titleSpan}>
                {lastWord}
                <Image
                  src="/svg/curved-border.svg"
                  alt="curved border"
                  width={393}
                  height={3}
                  className={styles.curvedBorder}
                />
              </div>
            </div>
            <p className={`${styles.description} `}>{description}</p>
            <button className={styles.confirmBtn} onClick={() => {}}>
              Get a Quote{" "}
              <Image
                src="/svg/arrow-right.svg"
                alt="arrow-right"
                width={28}
                height={14}
              />
            </button>
          </div>
          <GetQuote />
        </div>
        <div className={styles.features}>
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
