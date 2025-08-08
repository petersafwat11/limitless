import React from "react";
import styles from "./serviceDescription.module.css";
import Image from "next/image";
const ServiceDescription = ({ services }) => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <Image src="/svg/get-quote.svg" alt="get-quote" width={135} height={75} />
        <h2 className={styles.title}>Impound Vehicle Insurance</h2>
        <p className={styles.description}>
          Temporary compound insurance allows you to release your car quickly
          and easily.
        </p>
        <button className={styles.button}>Get a Quote</button>
      </div>
      <div className={stylesservices}>
        {services.map((service, index) => (
          <div className={styles.service} key={index}>
            <Image
              src="/svg/included.svg"
              alt="include"
              width={42}
              height={42}
            />
            <h3 className={styles.title}>{service.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDescription;
