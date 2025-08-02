import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
const Header = () => {
  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          className={styles.logo}
          src="/svg/logo.svg"
          alt="logo"
          width={66}
          height={66}
        />
      </div>
      <menu className={styles.menu}>
        <li className={styles.menuItem}>
          <Link className={styles.menuLink} href="/temporary">
            Temporary
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link className={styles.menuLink} href="/impound">
            Impound
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link className={styles.menuLink} href="/courier">
            Courier
          </Link>
        </li>
        <li className={styles.menuItem}>
          <Link className={styles.menuLink} href="/contact-us">
            Contact Us
          </Link>
        </li>
      </menu>
      <div className={styles.buttons}>
        <button className={styles.loginBtn}>Login</button>
        <button className={styles.quoteBtn}>
          Get Quote{" "}
          <Image
            src="/svg/arrow-right.svg"
            alt="arrow-right"
            width={27}
            height={14}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
