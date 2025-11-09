import React from "react";
import styles from "./title.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Title = ({ title }) => {
  return (
    <h3 className={`${styles.title} ${plusJakartaSans.className}`}>{title}</h3>
  );
};

export default Title;
