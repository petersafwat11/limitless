import React from "react";
import HeaderTitle from "../headerTitle/HeaderTitle";
import Image from "next/image";
import styles from "./coverDetails.module.css";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import { Plus_Jakarta_Sans } from "next/font/google";
import InputWithData from "@/ui/InputWithData/InputWithData";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CoverDetails = () => {
  return (
    <ComponentWrapper title="Cover Details" icon={{ width: 62, height: 62 }}>
      <div className={styles.content}>
        <div className={styles.first}>
          <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
            What type of vehicle is it?
          </h3>
          <div className={styles.duration}>
            <p className={styles.durationQuestion}>
              How long will you need it?
            </p>
            <div className={styles.period}>
              <Image
                src="/svg/included.svg"
                alt="included"
                width={18}
                height={18}
              />
              <p className={styles.periodAnswer}> 6 Days</p>
            </div>
          </div>
        </div>
        <div className={styles.second}>
          <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
            When would you like the cover to start?
          </h3>
          <div className={styles.row}>
            <InputWithData
              item={{
                label: "Date",
                type: "date",
                value: "01/01/1998",
              }}
            />
            <InputWithData
              item={{
                label: "Start Time",
                type: "time",
                value: "03:33:17",
              }}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetails;
