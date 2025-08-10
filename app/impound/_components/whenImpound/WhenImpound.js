import React from "react";
import styles from "./whenImpound.module.css";
import Image from "next/image";
const WhenImpound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <div className={styles.images}>
          <Image
            className={styles.image1}
            src={"/svgs/impound-1.svg"}
            alt="impound-1"
            width={510}
            height={395}
          />
          <Image
            className={styles.image2}
            src={"/svgs/impound-2.svg"}
            alt="impound-2"
            width={248}
            height={237}
          />
          <Image
            className={styles.image3}
            src={"/svgs/impound-2.svg"}
            alt="impound-3"
            width={582}
            height={381}
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>
            What happens when your vehicle is impounded
          </h2>
          <p className={styles.description}>
            {`When a vehicle is impounded, it is typically taken by the police or local authorities after being involved in a legal infraction such as driving without insurance, without tax, or being abandoned. Once the vehicle is impounded, it is held in a secure facility, and the owner loses possession until the relevant issues are resolved. This period can vary depending on the reason for the seizure and how quickly the necessary steps are taken to resolve the situation. In most cases, the vehicle is only released once the authorities are satisfied that any legal requirements are met, which may include paying fines, providing proof of insurance, or rectifying any issues that led to the impoundment. Additionally, vehicles that remain unclaimed for a specific period may be sold or disposed of according to local regulations.`}
          </p>
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.images}>
          <Image
            className={styles.image4}
            src={"/svgs/impound-4.svg"}
            alt="impound-4"
            width={225}
            height={226}
          />
          <Image
            className={styles.image5}
            src={"/svgs/impound-5.svg"}
            alt="impound-5"
            width={181}
            height={181}
          />
          <Image
            className={styles.image6}
            src={"/svgs/impound-6.svg"}
            alt="impound-6"
            width={37}
            height={62}
          />
          <Image
            className={styles.image7}
            src={"/svgs/impound-7.svg"}
            alt="impound-7"
            width={170}
            height={188}
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>
            What happens when your vehicle is impounded
          </h2>
          <p className={styles.description}>
            {`When a vehicle is impounded, it is typically taken by the police or local authorities after being involved in a legal infraction such as driving without insurance, without tax, or being abandoned. Once the vehicle is impounded, it is held in a secure facility, and the owner loses possession until the relevant issues are resolved. This period can vary depending on the reason for the seizure and how quickly the necessary steps are taken to resolve the situation. In most cases, the vehicle is only released once the authorities are satisfied that any legal requirements are met, which may include paying fines, providing proof of insurance, or rectifying any issues that led to the impoundment. Additionally, vehicles that remain unclaimed for a specific period may be sold or disposed of according to local regulations.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhenImpound;
