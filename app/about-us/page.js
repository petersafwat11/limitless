import React from "react";
import styles from "./page.module.css";
import Header from "./_components/header/Header";
import OurVision from "./_components/ourVision/OurVision";
import AboutUs from "./_components/aboutUs/AboutUs";
import OurStory from "./_components/ourStory/OurStory";
import FastAndFair from "./_components/fastAndFair/FastAndFair";
import Reviews from "../../ui/main-pages/reviews/Reviews";

export const metadata = {
  title: "About Limitless Cover | Limitless Cover",
};

const page = () => {
  const data = {
    title: `Welcome to Limitless Cover , where protecting what matters
          most is our priority. As a forward-thinking vehicle insurance
          brokerage,`,
    description1: `We specialize in offering personalized and flexible coverage options
            that fit your unique needs. Whether you're a first-time car owner, a
            seasoned driver, or someone seeking more affordable, tailored
            insurance, we’ve got you covered. We understand that the world of car
            insurance can be overwhelming, and that’s why we're committed to
            simplifying the process.  `,
    description2: `Through a wide network of trusted insurance providers, we bring you the best options to match your budget and requirements. With a focus on convenience, transparency, and customer satisfaction, we’re here to guide you through every step, from comparing quotes to selecting a policy that gives you peace of mind.`,
  };
  const data2 = {
    title: `At Limitless Cover, we believe everyone deserves a fair chance when it comes to getting insured, no matter their driving history or the type of vehicle they own.`,
    description1: `That’s why we’re proud to offer cover with a 97% acceptance rate, making it easier than ever for drivers from all walks of life to get the protection they need.
  We understand that past mistakes shouldn't define your future. Whether you have driving convictions, points on your licence, or have been refused insurance elsewhere, we’re here to help. `,
    description2: `Our network of specialist insurers is experienced in working with convicted drivers, offering competitive policies without judgment or hidden barriers.
  From standard cars to modified vehicles, vans, or high-performance motors, we’re equipped to insure all vehicles. Our goal is to make insurance simple, flexible, and accessible for every driver, every vehicle, every time.`,
  };
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
