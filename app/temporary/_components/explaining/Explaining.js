import React from "react";
import styles from "./explaining.module.css";
import Image from "next/image";
const Explaining = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <div className={styles.images}>
          <Image
            src={"/svgs/temp-explain-1.svg"}
            alt="explaining-1"
            width={222}
            height={244}
          />
          <Image
            src={"/svgs/temp-explain-1.svg"}
            alt="explaining-1"
            width={529}
            height={401}
          />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>What is temporary vehicle insurance?</h3>
          <p className={styles.description}>
            {" "}
            Temporary car insurance is a short-term, flexible policy that
            provides fully comprehensive cover for driving a vehicle in the UK,
            ranging from one hour to 28 days. Ideal for situations like
            borrowing a car, test-driving a new vehicle, or covering a short
            trip, it offers the same protection as an annual policy without the
            long-term commitment. With Limitless Cover, young drivers, couriers,
            and those with convictions can quickly secure affordable insurance
            tailored to their needs, with instant quotes and hassle-free
            activation through our online platform.
          </p>
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.content}>
          <h3 className={styles.title}>What is temporary vehicle insurance?</h3>
          <p className={styles.description}>
            {" "}
            Temporary car insurance is a short-term, flexible policy that
            provides fully comprehensive cover for driving a vehicle in the UK,
            ranging from one hour to 28 days. Ideal for situations like
            borrowing a car, test-driving a new vehicle, or covering a short
            trip, it offers the same protection as an annual policy without the
            long-term commitment. With Limitless Cover, young drivers, couriers,
            and those with convictions can quickly secure affordable insurance
            tailored to their needs, with instant quotes and hassle-free
            activation through our online platform.
          </p>
        </div>
        <div className={styles.features}>
          {[
            {
              title: "Enter your vehicle registration",
              description:
                "Don’t know the vehicle reg? No problem, narrow down the car by make, model and variant.",
            },
            {
              title: "Let us know how long you will need it",
              description:
                "Select which date you would like to start and let us know whether you need for an hour or weeks.",
            },
            {
              title: "Provide some details about yourself",
              description:
                "Let us know some details to help us offer the best quote we can.",
            },
            {
              title: "Pay to get insured",
              description:
                "Once paid, visit your member portal and collect your insurance documents.",
            },
          ].map((item, index) => (
            <div className={styles.feature} key={index}>
              <div className={styles.featureNumber}>{index + 1}</div>
              <div className={styles.featureContent}>
                <h4 className={styles.featureTitle}>{item.title}</h4>
                <p className={styles.featureDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explaining;
