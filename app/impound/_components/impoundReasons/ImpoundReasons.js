import React from "react";
import styles from "./impoundReasons.module.css";
const ImpoundReasons = () => {
  const reasons = [
    {
      title: "Being Uninsured",
      img: {
        src: "/svg/uninsured.svg",
        alt: "uninsured",
        width: 135,
        height: 134,
      },
    },
    {
      title: "No Road Tax",
      img: {
        src: "/svg/no-road-tax.svg",
        alt: "no-road-tax",
        width: 133,
        height: 125,
      },
    },
    {
      title:
        "Parking Illegally",
      img: {
        src: "/svg/parking-illegal.svg",
        alt: "parking-illegal",
        width: 141,
        height: 106,
      },
    },
    {
      title:
        "Dangerous Driving",
      img: {
        src: "/svg/dangerous-driving.svg",
        alt: "dangerous-driving",
        width: 163,
        height: 110,
      },
    },
    {
      title:
        "Vehicle Stolen and Recovered by Police",
      img: {
        src: "/svg/vehicle-stolen.svg",
        alt: "vehicle-stolen",
        width: 151,
        height: 112,
      },
    },
    {
      title:
        "Vehicle Involved in a Crime",
      img: {
        src: "/svg/vehicle-involved.svg",
        alt: "vehicle-involved",
        width: 158,
        height: 125,
      },
    },
  ];

  return <div className={styles.container}>
    Why might your vehicle be impounded?
  </div>;
};

export default ImpoundReasons;
