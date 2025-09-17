import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Form from "./_components/form/Form";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const page = () => {
  return (
    <div className={"centeredContent"}>
      <div className={styles.page}>
        <div className={styles.images}>
          <Image
            src="/svg/squares-2.svg"
            alt="squares"
            width={948}
            height={480} // 1185×0.8, 600×0.8
            className={styles.squares}
          />
          <Image
            className={styles.image1}
            src={"/svg/login-image.svg"}
            alt="login-1"
            width={400}
            height={410}
          />
          <Image
            className={styles.image4}
            src={"/svg/login-mobile.svg"}
            alt="login-1"
            width={293}
            height={389}
          />
        </div>
        <div className={styles.form}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default page;
