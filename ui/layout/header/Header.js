"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  return pathname === "/login" ? null : (
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
      {!isDashboard && (
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
      )}
      <div
        style={{ gap: isDashboard ? "1.2rem" : "" }}
        className={styles.buttons}
      >
        {isDashboard ? (
          <div className={styles.chatIcon}>
            <Image src="/svg/live-chat.svg" alt="chat" width={30} height={30} />
          </div>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
        <button className={styles.quoteBtn}>
          {isDashboard ? "Live chat" : "Get Quote"}
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
