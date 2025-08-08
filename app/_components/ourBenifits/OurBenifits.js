import React from "react";
import styles from "./ourBenifits.module.css";
import Image from "next/image";
const OurBenifits = () => {
  const benifits = [
    {
      title: "No hidden fees - what you see is what you get",
      img: {
        src: "/svg/transparent.svg",
        alt: "transparent",
        width: 150,
        height: 105,
      },
    },
    {
      title: "Flexible duration on temporary insurance.",
      img: {
        src: "/svg/flexible.svg",
        alt: "flexible",
        width: 140,
        height: 135,
      },
    },
    {
      title:
        "No long delays or phone calls to solve a claim - all claims are handled online.  ",
      img: {
        src: "/svg/fast.svg",
        alt: "transparent",
        width: 129,
        height: 149,
      },
    },
    {
      title:
        "Accessible to all drivers - all valid license holders aged 17+ are eligible for a quote",
      img: {
        src: "/svg/accessible.svg",
        alt: "accessible",
        width: 134,
        height: 138,
      },
    },
    {
      title:
        "Cheapest rates online - average customer saves 65% when choosing Limitless Cover.",
      img: {
        src: "/svg/cheapest.svg",
        alt: "cheapest",
        width: 147,
        height: 136,
      },
    },
    {
      title:
        "No risk of driving uninsured as we upload to the Motor Insurance Database every day, 365 days a year.",
      img: {
        src: "/svg/no-risk.svg",
        alt: "no-risk",
        width: 165,
        height: 101,
      },
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2 className={styles.title}>Why Choose Limitless Cover</h2>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Arcu placerat suspendisse
          aenean cras aliquam est pellentesque. Lobortis integer orci quam
          consectetur accumsan sapien. Urna maecenas viverra sapien neque
          ullamcorper.{" "}
        </p>
      </div>
      <div className={styles.benifits}>
        {benifits.map((benifit, index) => (
          <div className={styles.benifit} key={index}>
            <Image
              src={benifit.img.src}
              alt={benifit.img.alt}
              width={benifit.img.width}
              height={benifit.img.height}
            />
            <h3 className={styles.title}>{benifit.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurBenifits;
