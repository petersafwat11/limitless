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
        <>
          <div
            style={{ marginTop: index !== 0 ? "0.5rem" : "0" }}
            className={styles.stepperItem}
            key={index}
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
                width="238"
                height="2"
                viewBox="0 0 238 2"
                fill="none"
              >
                <path
                  d="M237 1L0.999993 1.00002"
                  stroke="url(#paint0_linear_1_7190)"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1_7190"
                    x1="237"
                    y1="1.5"
                    x2="1"
                    y2="1.50002"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#0388FF" />
                    <stop offset="1" stop-color="#0388FF" stop-opacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          )}
          {index === 1 && (
            <div className={styles.stepperLine2}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="238"
                height="2"
                viewBox="0 0 238 2"
                fill="none"
              >
                <path
                  d="M1 1L237 1.00002"
                  stroke="white"
                  stroke-opacity="0.11"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Stepper;
