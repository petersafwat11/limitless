import React from "react";
import styles from "./stepper.module.css";
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

const Stepper = ({ steps }) => {
  return (
    <div className={styles.stepper}>
      {steps.map((step, index) => (
        <div  key={index} className={styles.stepperContainer}>
          <div
            style={{ margin: index !== 0 ? "1rem 0 1rem" : "0" }}
            className={styles.stepperItem}
          >
            <Image
              src={step.img.src}
              alt="stepper"
              width={step.img.width}
              height={step.img.height}
            />
            <div className={styles.stepperItemText}>
              <div
                className={`${styles.stepperNumber} ${plusJakartaSans.className}`}
              >
                Step {index + 1}
              </div>
              <p className={`${styles.stepperTitle} ${manrope.className}`}>
                {step.title}
              </p>
            </div>
          </div>
          {index === 0 && (
            <div className={styles.stepperLine}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="147"
                height="2"
                viewBox="0 0 147 2"
                fill="none"
              >
                <path
                  d="M145.5 1L1 1"
                  stroke="url(#paint0_linear_93_834)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_93_834"
                    x1="145.5"
                    y1="0.5"
                    x2="1"
                    y2="0.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0388FF" />
                    <stop offset="1" stopColor="#0388FF" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}

          {(index === 1 || index === 2) && (
            <div className={styles.stepperLine2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="147"
                height="2"
                viewBox="0 0 147 2"
                fill="none"
              >
                <path
                  d="M1.5 1L146 0.999987"
                  stroke="#000822"
                  strokeOpacity="0.07"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
