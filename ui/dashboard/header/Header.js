"use client";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Header = ({ title = "Welcome, James" }) => {
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  return (
    <div className="headerDashboardContainer">
      <Image
        src="/svg/squares-2.svg"
        alt="squares"
        width={1394}
        height={706}
        className={styles.squares}
      />
      <div className="centeredContent">
        <div className={styles.wrapper}>
          <Image
            src="/svg/dash-header.svg"
            alt="dash-header"
            width={585}
            height={776}
            className={styles.dashHeader}
          />

          <div className={styles.titles}>
            <p className={`${styles.subTitle} ${manrope.className}`}>
              DASHBOARD
            </p>

            <div className={`${styles.title} ${plusJakartaSans.className}`}>
              Lorem Ipsum
              <div className={styles.titleSpan}>
                Dolor Sit{" "}
                <Image
                  src="/svg/curved-border.svg"
                  alt="curved border"
                  width={393}
                  height={3}
                  className={styles.curvedBorder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
