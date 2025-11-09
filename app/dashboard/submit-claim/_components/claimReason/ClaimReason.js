"use client";
import React from "react";
import styles from "./claimReason.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const ClaimReason = () => {
  const router = useRouter();
  const reasons = [
    {
      title: "Damage to my vehivcle",
      img: {
        src: "/svg/reason-1.svg",
        width: 76,
        height: 78,
      },
    },
    {
      title: "Flood or drove through water",
      img: {
        src: "/svg/reason-2.svg",
        width: 76,
        height: 70,
      },
    },
    {
      title: "I broke down",
      img: {
        src: "/svg/reason-3.svg",
        width: 89,
        height: 85,
      },
    },

    {
      title: "Theft (incl. attempted theft)",
      img: {
        src: "/svg/reason-4.svg",
        width: 76,
        height: 78,
      },
    },
    {
      title: "Fire or vandalism",
      img: {
        src: "/svg/reason-5.svg",
        width: 76,
        height: 78,
      },
    },
    {
      title: "Something else",
      img: {
        src: "/svg/reason-6.svg",
        width: 54,
        height: 62,
      },
    },
  ];
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        What happened?{" "}
      </h2>
      <div className={styles.reasons}>
        {reasons.map((reason, index) => (
          <div
            className={styles.reason}
            key={index}
            onClick={() => {
              const reasonSlug = reason.title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[()]/g, "");
              router.push(
                `/dashboard/submit-claim?type=car-insurance&step=form&reason=${encodeURIComponent(
                  reasonSlug
                )}`
              );
            }}
          >
            <div className={styles.content}>
              <Image
                className={styles.img}
                src={reason.img.src}
                alt={reason.title}
                width={reason.img.width}
                height={reason.img.height}
              />
              <p
                className={`${styles.reasonTitle} ${plusJakartaSans.className}`}
              >
                {reason.title}
              </p>
            </div>
            <Image
              className={styles.arrow}
              src="/svg/right-arrow-2.svg"
              alt="right-arrow"
              width={48}
              height={48}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimReason;
