"use client";
import React, { useState } from "react";
import styles from "./ourStory.module.css";
import Image from "next/image";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const OurStory = () => {
  const [activeYear, setActiveYear] = useState(2019);
  const [currentIndex, setCurrentIndex] = useState(0);
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025];

  // Story data for each year
  const storyData = {
    2019: {
      title: "The Beginning",
      description:
        "Founded with a vision to revolutionize the insurance industry through innovative technology and customer-centric solutions.",
    },
    2020: {
      title: "Digital Transformation",
      description:
        "Launched our first digital platform, making insurance more accessible and transparent for our customers worldwide.",
    },
    2021: {
      title: "Expanding Horizons",
      description:
        "Introduced new insurance products and expanded our services to cover more industries and customer segments.",
    },
    2022: {
      title: "Tech Innovation",
      description:
        "Implemented AI-driven solutions for faster claim processing and personalized insurance recommendations.",
    },
    2023: {
      title: "Global Reach",
      description:
        "Expanded internationally and partnered with leading companies to provide comprehensive insurance solutions.",
    },
    2024: {
      title: "Sustainability Focus",
      description:
        "Launched green insurance initiatives and sustainable business practices to protect our environment.",
    },
    2025: {
      title: "Future Vision",
      description:
        "Looking ahead with cutting-edge technology and continued commitment to exceptional customer service.",
    },
  };

  const handlePrevYear = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextYear = () => {
    if (currentIndex < years.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleYearClick = (year) => {
    setActiveYear(year);
    setCurrentIndex(years.indexOf(year));
  };

  return (
    <div className={styles.container}>
      <div className={styles.topText}>
        <h2 className={styles.title}>
          Our <span>Story</span>
        </h2>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur. Nec lorem tempus fringilla
          urna accumsan pellentesque neque. Augue integer pharetra donec
          scelerisque.{" "}
        </p>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.arrows}>
          <div
            className={`${styles.arrow} ${styles.leftArrow}`}
            onClick={handlePrevYear}
            style={{
              opacity: currentIndex === 0 ? 0.5 : 1,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            <IoIosArrowBack />
          </div>
          <div
            className={`${styles.arrow} ${styles.rightArrow}`}
            onClick={handleNextYear}
            style={{
              opacity: currentIndex === years.length - 1 ? 0.5 : 1,
              cursor:
                currentIndex === years.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            <IoIosArrowForward />
          </div>
        </div>

        <div className={styles.cards}>
          <div
            className={styles.cardsWrapper}
            style={{
              transform: `translateX(-${currentIndex * (528 + 24)}px)`,
            }}
          >
            {years.map((year) => (
              <div className={styles.card} key={year}>
                <div className={styles.header}>
                  <p className={styles.year}>
                    {year}
                    <span className={styles.background1}></span>
                    <span className={styles.background2}></span>
                    <span className={styles.background3}></span>
                  </p>
                  <Image
                    src="/svg/year-icon.svg"
                    alt="year-icon"
                    width={82}
                    height={82}
                    className={styles.yearIcon}
                  />
                </div>
                <div className={styles.content}>
                  <h4 className={styles.cardTitle}>{storyData[year].title}</h4>
                  <p className={styles.cardDescription}>
                    {storyData[year].description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.yearsItems}>
        {years.map((year, index) => (
          <div
            className={`${styles.yearItem} ${
              index === currentIndex ? styles.activeYearItem : ""
            }`}
            key={year}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStory;
