import React from "react";
import styles from "./aboutUs.module.css";
import Image from "next/image";
const AboutUs = ({ data, maxWidths }) => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <Image
          className={styles.titleIcon}
          src="/svg/title-icon.svg"
          alt="about-us-car"
          width={98}
          height={49}
        />
        <h3 className={styles.title}>
          {data.title
            .replace("Limitless Cover", "<span>Limitless Cover</span>")
            .split("<span>")
            .map((part, index) => {
              if (index === 1) {
                const [highlightText, ...rest] = part.split("</span>");
                return (
                  <React.Fragment key={index}>
                    <span>{highlightText}</span>
                    {rest.join("</span>")}
                  </React.Fragment>
                );
              }
              return part;
            })}
        </h3>
      </div>
      <div className={styles.second}>
        <Image
          className={styles.icon}
          src="/svg/last-updated.svg"
          alt="lastUpdated"
          width={42}
          height={42}
        />

        <p
          className={styles.description}
          style={{
            maxWidth: maxWidths?.description1?.replace("max-width: ", "") || "",
          }}
        >
          {data.description1}
        </p>
        <p
          className={styles.description}
          style={{
            maxWidth: maxWidths?.description2?.replace("max-width: ", "") || "",
          }}
        >
          {data.description2}
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
