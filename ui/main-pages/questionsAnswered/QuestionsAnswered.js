"use client";
import React from "react";
import styles from "./questionsAnswered.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { useRouter } from "next/navigation";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "600"],
});
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "300"] });
const QuestionsAnswered = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h2 className={`${styles.header} ${plusJakartaSans.className}`}>
        Need Questions <span>Answered?</span>
      </h2>
      <div className={styles.wrapper}>
        <div className={styles.question1}>
          <Image
            className={styles.image}
            src="/svg/FAQ.svg"
            alt="FAQ"
            width={469}
            height={238}
          />
          <div className={styles.contentContainer}>
            <div className={styles.content}>
              <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
                Frequently Asked Questions
              </h3>
              <p className={`${styles.description} ${manrope.className}`}>
                Have questions? Check our FAQ to see if your question has
                already been addressed before.{" "}
              </p>
            </div>
            <div className={styles.iconWrapper}>
              <Image
                src="/svg/right-arrow-3.svg"
                alt="arrow-down"
                width={27}
                height={27}
                onClick={() => router.push("/faq")}
              />
            </div>
          </div>
        </div>

        <div className={styles.questions}>
          <div className={styles.question}>
            <Image
              className={styles.image}
              src="/svg/learn-more.svg"
              alt="learn-more"
              width={101}
              height={87}
            />
            <div className={styles.contentContainer}>
              <div className={styles.content}>
                <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
                  Learn More About Our Services{" "}
                </h3>
                <p className={`${styles.description} ${manrope.className}`}>
                  Buying insurance can be a stressful experience! Feel free to
                  read our documentation and guides on each insurance we provide
                  to make your decision simpler.{" "}
                </p>
              </div>
              <div className={styles.iconWrapper}>
                <Image
                  src="/svg/right-arrow-3.svg"
                  alt="arrow-down"
                  width={27}
                  height={27}
                  onClick={() => router.push("/about-us")}
                />
              </div>
            </div>
          </div>
          <div className={styles.question}>
            <Image
              className={styles.image}
              src="/svg/humans.svg"
              alt="humans"
              width={119}
              height={101}
            />
            <div className={styles.contentContainer}>
              <div className={styles.content}>
                <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
                  Real Human Customer Support
                </h3>
                <p className={`${styles.description} ${manrope.className}`}>
                  {`Can’t find your question? Feel free to email our support team
                  and we will get back to you as soon as possible.`}
                </p>
              </div>
              <div className={styles.iconWrapper}>
                <Image
                  src="/svg/right-arrow-3.svg"
                  alt="arrow-down"
                  width={27}
                  height={27}
                  onClick={() => router.push("/contact")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAnswered;
