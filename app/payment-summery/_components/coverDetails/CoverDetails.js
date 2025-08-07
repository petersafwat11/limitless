import React from "react";
import HeaderTitle from "../headerTitle/HeaderTitle";
import Image from "next/image";
import styles from "./coverDetails.module.css";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";

const CoverDetails = () => {
  return (
    <ComponentWrapper title="Cover Details" icon={{width: 62, height: 62}}>
      <div className={styles.content}>
        <div className={styles.first}>
          <h3 className={styles.title}>What type of vehicle is it?</h3>
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
          <h3 className={styles.title}>
            When would you like the cover to start?
          </h3>
          <div className={styles.row}>
            <div className={styles.dataGroup}>
              <p className={styles.label}>Date</p>
              <div className={styles.data}>
                <div className={styles.iconWrapper}>
                  <Image
                    src="/svg/date.svg"
                    alt="calendar "
                    width={24}
                    height={24}
                  />
                </div>
                <p className={styles.dataAnswer}>01/01/1998</p>
              </div>
            </div>
            <div className={styles.dataGroup}>
              <p className={styles.label}>Start Time</p>
              <div className={styles.data}>
                <div className={styles.iconWrapper}>
                  <Image
                    src="/svg/time.svg"
                    alt="calendar "
                    width={24}
                    height={24}
                  />
                </div>
                <p className={styles.dataAnswer}>03:33:17</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetails;
