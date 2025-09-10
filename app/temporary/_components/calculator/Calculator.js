"use client";
import React, { useState } from "react";
import styles from "./calculator.module.css";
import Image from "next/image";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans } from "next/font/google";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import { useRouter } from "next/navigation";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Calculator = () => {
  const [data, setData] = useState({
    type: "1 Hour",
  });
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Image
        src="/svg/squares-2.svg"
        alt="squares"
        width={1394}
        height={706}
        className={styles.squares}
      />

      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        Temporary Vehicle<span>Insurance Calculator </span>
      </h3>
      <div className={styles.content}>
        <div className={styles.first}>
          <span className={styles.background1}></span>
          <span className={styles.background2}></span>
          <span className={styles.background3}></span>
          <Image
            src={"/svg/calc-car.svg"}
            alt="calculator-1"
            width={161}
            height={99}
          />
          <div className={styles.text}>
            <h4
              className={`${styles.contentTitle} ${plusJakartaSans.className}`}
            >
              Get your price <span>estimate</span>
            </h4>
            <p className={styles.description}>
              {`It couldn't be simpler get a short term insurance policy. You can buy a policy online anytime you need it, and with our straightforward quote process, you can get a price in under 2 minutes!`}
            </p>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.selection}>
            <p className={styles.label}>How long will you need it?</p>
            <Selection1
              style={"dark"}
              items={["1 Hour", "1 Day", "1 Week"]}
              selectedItem={data.type}
              setSelectedItem={(item) => setData({ ...data, type: item })}
              type="checkbox"
            />
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.left}>
                <Image
                  src={"/svg/card-icon.svg"}
                  alt="card-icon"
                  width={16}
                  height={57}
                />
                <h5
                  className={`${styles.cardTitle} ${plusJakartaSans.className}`}
                >
                  The average pricing for 1 day{" "}
                </h5>
              </div>
              <h4
                className={`${styles.cardPrice} ${plusJakartaSans.className}`}
              >
                {data.type === "1 Hour"
                  ? "£12"
                  : data.type === "1 Day"
                  ? "£24"
                  : "£50"}
              </h4>
            </div>
            <p className={styles.cardDescription}>
              Prices based on the averageprice 19,765 policies for the displayed
              durations (January 2025){" "}
            </p>
            <ConfirmBtn
              title="Get a quote"
              onClick={() => {
                router.push("/temporary-insurance");
              }}
              className={styles.cardButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
