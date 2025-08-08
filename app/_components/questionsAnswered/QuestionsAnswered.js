import React from "react";
import styles from "./questionsAnswered.module.css";
import Image from "next/image";
const QuestionsAnswered = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Need Questions Answered?</h2>
      <div className={styles.question}>
        <Image src="/svg/FAQ.svg" alt="FAQ" width={469} height={238} />
        <div className={styles.container}>
          <div className={styles.content}>
            <h3 className={styles.title}>Frequently Asked Questions</h3>
            <p className={styles.description}>
              Have questions? Check our FAQ to see if your question has already
              been addressed before.{" "}
            </p>
          </div>
          <div className={styles.iconWrapper}></div>
        </div>
      </div>

      <div className={styles.questions}>
        <div className={styles.question}>
          <Image
            src="/svg/learn-more.svg"
            alt="learn-more"
            width={101}
            height={87}
          />
          <div className={styles.container}>
            <div className={styles.content}>
              <h3 className={styles.title}>What is temporary car insurance?</h3>
              <p className={styles.description}>
                Temporary car insurance is a type of insurance that provides
                coverage for a short period of time, usually for a few days or
                weeks. It is often used for people who are renting a car for a
                short period of time, or for people who are driving a car that
                is not their own.
              </p>
            </div>
            <div className={styles.iconWrapper}></div>
          </div>
        </div>
        <div className={styles.question}>
          <Image src="/svg/humans.svg" alt="humans" width={119} height={101} />
          <div className={styles.container}>
            <div className={styles.content}>
              <h3 className={styles.title}>Real Human Customer Support</h3>
              <p className={styles.description}>
                Can’t find your question? Feel free to email our support team
                and we will get back to you as soon as possible.{" "}
              </p>
            </div>
            <div className={styles.iconWrapper}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionsAnswered;
