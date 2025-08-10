"use client";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Feature from "@/ui/feature/Feature";
import { features } from "./data";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Header = ({ title }) => {
  return (
    <div className="headerContainer">
      <span className={styles.blueBackground}></span>
      <span className={styles.blueBackground2}></span>

      <Image
        src="/svg/squares-2.svg"
        alt="squares"
        width={1394}
        height={706}
        className={styles.squares}
      />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <p className={`${styles.subTitle} ${manrope.className}`}>
              About Us{" "}
            </p>

            <div className={`${styles.title} ${plusJakartaSans.className}`}>
              Lorem Ipsum
              <div className={styles.titleSpan}>
                dolor sit amet{" "}
                <Image
                  src="/svg/curved-border.svg"
                  alt="curved border"
                  width={393}
                  height={3}
                  className={styles.curvedBorder}
                />
              </div>
            </div>
            <p className={`${styles.description} `}>
              Lorem ipsum dolor sit amet consectetur. Nec lorem tempus fringilla
              urna accumsan pellentesque neque. Augue integer pharetra donec
              scelerisque.
            </p>
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
          <div className={styles.imageContainer}>
            <Image
              src="/svg/about-1.svg"
              alt="about-us-image"
              width={413}
              height={254}
              className={styles.image1}
            />
            <Image
              src="/svg/about-2.svg"
              alt="about-us-image"
              width={437}
              height={238}
              className={styles.image2}
            />
            <Image
              src="/svg/about-3.svg"
              alt="about-us-image"
              width={168}
              height={185}
              className={styles.image3}
            />
          </div>
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
