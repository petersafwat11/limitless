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

const Header = ({ title }) => {
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  return (
    <div className="headerContainer">
      <div className="centeredContent">
        <Image
          src="/svg/squares-2.svg"
          alt="squares"
          width={1394}
          height={706}
          className={styles.squares}
        />
        <Image
          src="/svg/squares-mobile.svg"
          alt="squares"
          width={485}
          height={246}
          className={styles.squaresMobile}
        />

        <div className={styles.wrapper}>
          <div className={`${styles.title} ${plusJakartaSans.className}`}>
            {withoutLastWord}{" "}
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
        </div>
      </div>
    </div>
  );
};

export default Header;
