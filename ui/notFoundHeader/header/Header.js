import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const Header = () => {
  return (
    <div className="headerContainer">
      <Image
        src="/svg/squares-2.svg"
        alt="squares"
        width={1394}
        height={706}
        className={styles.squares}
      />
      <div className={styles.error404Container}>
        <Image
          src="/svg/error-404.svg"
          alt="squares"
          width={220}
          height={220}
          className={styles.error404}
        />
        <div className={styles.error404Span}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.right}>
          <div className={`${styles.title} ${plusJakartaSans.className}`}>
            OOPS! Page
            <div className={styles.mailingList}>
              not Found{" "}
              <Image
                src="/svg/curved-border.svg"
                alt="mailing list"
                width={393}
                height={3}
                className={styles.curvedBorder}
              />
            </div>
          </div>
          <p className={`${styles.description} `}>
            {`Sorry, the page you are looking for does not exist or an error has
          occurred :(`}
          </p>
          <Link href="/" className={styles.returnHome}>
            Return Home <FaArrowRightLong className={styles.arrow} />
          </Link>
        </div>
        <div className={styles.left}>
          <div className={styles.errorMobile}>
            <Image
              src="/svg/error-404.svg"
              alt="squares"
              width={114}
              height={144}
              className={styles.error404}
            />
            <div className={styles.error404Span}></div>
          </div>

          <div className={styles.imageContainer}>
            <Image
              src="/svg/error.svg"
              alt="error-404"
              width={500}
              height={500}
              className={styles.car}
            />
          </div>
        </div>
        <div className={styles.mobileImageContainer}>
          <Image
            src="/svg/error-mobile.svg"
            alt="error-404"
            width={369}
            height={514}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
