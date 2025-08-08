import React from "react";
import styles from "./serviceCovered.module.css";
import Image from "next/image";
const ServiceCovered = ({ title, description, covered, unCovered }) => {
  const impoundCoverDetails={
    covered:{
      title:"What's covered",
      features:[
          "Releasing your vehicle from the impound",
        "Social, Domestic & Pleasure driving for the period of 30 days",
        "Damages to any third-party vehicles",
        "Driving in the UK",
      ]
    },
    unCovered:{
      title:"What's not covered",
      features:[
        "Additional drivers – we can only cover the driver named on the policy who must be the owner of the impounded car",
        "Commuting, business use, or hire or reward driving",
        "Car modifications",
        "Exporting the car",
      ]
    }
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>
        <div className={styles.covered}>
          <div className={styles.header}>
            <Image
              src={"/svgs/covered.svg"}
              alt="arrow-right"
              width={89}
              height={64}
            />
            <h4 className={styles.coveredTitle}>{covered.title}</h4>
          </div>
          <div className={styles.features}>
            {covered.features.map((feature, index) => (
              <div className={styles.feature} key={index}>
                <Image
                  src={"/svgs/covered-check.svg"}
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
                <p className={styles.featureText}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.unCovered}>
          <div className={styles.header}>
            <Image
              src={"/svgs/covered.svg"}
              alt="arrow-right"
              width={89}
              height={64}
            />
            <h4 className={styles.unCoveredTitle}>{unCovered.title}</h4>
          </div>
          <div className={styles.features}>
            {unCovered.features.map((feature, index) => (
              <div className={styles.feature} key={index}>
                <Image
                  src={"/svgs/covered-check.svg"}
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
                <p className={styles.featureText}>{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Image
          src={"/svgs/covered-title.svg"}
          alt="arrow-right"
          width={89}
          height={60}
        />
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCovered;
