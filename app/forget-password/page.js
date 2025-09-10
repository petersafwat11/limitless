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
            width={1394}
            height={706}
            className={styles.squares}
          />
          <Image
            className={styles.image1}
            src={"/svg/login-1.svg"}
            alt="login-1"
            width={476}
            height={531}
          />
          <Image
            className={styles.image2}
            src={"/svg/login-2.svg"}
            alt="login-1"
            width={125}
            height={128}
          />
          <Image
            className={styles.image3}
            src={"/svg/login-3.svg"}
            alt="login-1"
            width={154}
            height={169}
          />{" "}
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
