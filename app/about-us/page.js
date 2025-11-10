import React from "react";
import styles from "./page.module.css";
import Header from "./_components/header/Header";
import OurVision from "./_components/ourVision/OurVision";
import AboutUs from "./_components/aboutUs/AboutUs";
import FastAndFair from "./_components/fastAndFair/FastAndFair";
import Reviews from "../../ui/main-pages/reviews/Reviews";
import { data, data2 } from "./data";

export const metadata = {
  title: "About Limitless Cover | Limitless Cover",
};

const page = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={"centeredContent"}>
        <div className={styles.aboutUsContainer}>
          <AboutUs data={data} />
        </div>
        <OurVision />
        {/* <OurStory /> */}
        <AboutUs
          data={data2}
          maxWidths={{
            description1: "max-width: 41rem",
            description2: "max-width: 43rem",
          }}
        />
        <FastAndFair />
        <div className={styles.reviewsContainer}>
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default page;
