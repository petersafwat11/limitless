"use client";
import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const Card = ({ img, title, description, href, button }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className={styles.img}
        />
      </div>

      <div className={styles.body}>
        <div className={`${styles.content}`}>
          <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
            {title}
          </h3>
          <p className={styles.description}>{description}</p>
        </div>
        <button className={styles.button} onClick={() => router.push(href)}>
          {button ? button : "Get Started"}{" "}
          <FaArrowRightLong className={styles.arrow} />
        </button>
      </div>
    </div>
  );
};

export default Card;
