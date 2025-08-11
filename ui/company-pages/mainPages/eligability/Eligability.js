import React from "react";
import styles from "./eligability.module.css";
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
const Eligability = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          Check your eligibility for impound car insurance
        </h3>
        <p className={styles.description}>
          {`Want to check  eligibility criteria for temporary car insurance? Here's everything you need to know:`}
        </p>
      </div>
      <div className={styles.eligibility}>
        <div className={styles.first}>
          <div className={styles.header}>
            <Image
              src={"/svg/driver-must.svg"}
              alt="arrow-right"
              width={132}
              height={169}
            />
            <h4 className={`${styles.title} ${plusJakartaSans.className}`}>
              Driver eligibility
            </h4>
          </div>
          <div className={styles.features}>
            {[
              "For full UK driving licence holders, you'll usually need to be aged 17-70 to use Cuvva, and have held your licence for over a day if you're a newer driver",
              "If you're a provisional licence holder you'll need to be aged 17-50 and not have held your licence for over 15 years",
              "To use Limitless, you can either use a UK licence or use a full driving licence from Belgium, Bulgaria, France, Germany, Greece, Italy, the Netherlands, Poland, Portugal, the Republic of Ireland, Romania, Spain, Sweden, or Switzerland or any other foreign country.",
            ].map((item, index) => (
              <div className={styles.feature} key={index}>
                <Image
                  src={"/svg/gray-check.svg"}
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
                <p className={`${styles.featureText} ${manrope.className}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.second}>
          <div className={styles.header}>
            <Image
              src={"/svg/car-must.svg"}
              alt="arrow-right"
              width={177}
              height={145}
            />
            <h4 className={`${styles.title} ${plusJakartaSans.className}`}>
              Your car must
            </h4>
          </div>
          <div className={styles.features}>
            {[
              "Be at most 60 years old (if you're driving a car on a full licence) or at most 40 years old (for learner licences, or vans)",
              "Be worth less than £300,000 (cars), or be worth less than £200,000 (vans/commercial vehicles)",
              "Meet our modification rules. We accept lots, including any to aid a disability, but there are some we can't insure.",
              "Meet our insurance group requirements",
              "Not be scrapped or impounded temporarily",
            ].map((item, index) => (
              <div className={styles.feature} key={index}>
                <Image
                  src={"/svg/gray-check.svg"}
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
                <p className={`${styles.featureText} ${manrope.className}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligability;
