"use client";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Stepper from "@/app/payment-summary/_components/header/stepper/Stepper";

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
        <div className={styles.wrapper}>
          <div className={styles.titles}>
            <p className={`${styles.subTitle} ${manrope.className}`}>
              specialized for vehicle insurance
            </p>

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
          <div className={styles.steps}>
            <Stepper
              steps={[
                {
                  img: { src: "/svg/vehicle.svg", width: 76, height: 76 }, // 82 - 7%
                  title: "Vehicle",
                },
                {
                  img: { src: "/svg/quote.svg", width: 67, height: 67 }, // 72 - 7%
                  title: "Quote",
                },
                {
                  img: { src: "/svg/payment.svg", width: 67, height: 67 }, // 72 - 7%
                  title: "Payment",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
