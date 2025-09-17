"use client";
import React from "react";
import styles from "./footer.module.css";
import { menus } from "./data";
import Link from "next/link";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoLinkedin } from "react-icons/bi";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import NoHiddenFees from "../noHiddenFees/NoHiddenFees";

// List of all valid pages in the app directory
const validPages = [
  "/",
  "/about-us",
  "/change-password",
  "/comming-soon",
  "/complaints",
  "/contact-us",
  "/cookies-policy",
  "/courier",
  "/courier-insurance",
  "/dashboard",
  "/delivery",
  "/error-404",
  "/FAQ",
  "/forget-password",
  "/impound",
  "/impound-insurance",
  "/login",
  "/payment",
  "/payment-summery",
  "/privacy-policy",
  "/temporary",
  "/temporary-insurance",
  "/terms-and-conditions",
  "/testing",
];

// Helper function to determine if special styles should be applied
const shouldUseSpecialStyles = (pathname) => {
  // Always use special styles for contact-us
  if (pathname === "/contact-us") return true;

  // Use special styles for any page that doesn't exist in our valid pages list
  // This covers 404/not-found scenarios
  return !validPages.includes(pathname) && !pathname.startsWith("/dashboard");
};

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <footer
      className={styles.container}
      style={{
        background: shouldUseSpecialStyles(pathname) ? "#F2F5FE" : "",
      }}
    >
      <div className={`centeredContent ${styles.contentContainer}`}>
        {!pathname.startsWith("/dashboard") &&
          !["/login", "/forget-password", "/change-password"].includes(
            pathname
          ) &&
          !shouldUseSpecialStyles(pathname) && <NoHiddenFees />}
        <div className={styles.content}>
          <div className={styles.menus}>
            {menus.map((menu, index) => (
              <div key={index} className={styles.menu}>
                <h3
                  style={{
                    color: shouldUseSpecialStyles(pathname)
                      ? "rgba(0, 8, 34, 0.34)"
                      : "",
                  }}
                  className={styles.menuTitle}
                >
                  {menu.title}
                </h3>
                <menu className={styles.menuItems}>
                  {menu.items.map((item, index) => (
                    <li key={index} className={styles.menuItem}>
                      <Link
                        href={item.link}
                        style={{
                          color: shouldUseSpecialStyles(pathname)
                            ? "#000822"
                            : "",
                        }}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </menu>
              </div>
            ))}
          </div>
          <div className={styles.socials}>
            <div className={styles.socialsContainer}>
              <h3
                className={styles.socialsTitle}
                style={{
                  color: shouldUseSpecialStyles(pathname)
                    ? "rgba(0, 8, 34, 0.34)"
                    : "",
                }}
              >
                Social Media
              </h3>
              <div className={styles.socialsItems}>
                <div
                  className={`${styles.socialsItem} ${
                    shouldUseSpecialStyles(pathname)
                      ? styles["socials-item-black"]
                      : ""
                  }`}
                >
                  <BiLogoInstagramAlt
                    className={`${styles.socialsIcon} ${
                      shouldUseSpecialStyles(pathname)
                        ? styles["socials-icon-black"]
                        : ""
                    }`}
                    size={20}
                  />
                </div>
                <div
                  className={`${styles.socialsItem} ${
                    shouldUseSpecialStyles(pathname)
                      ? styles["socials-item-black"]
                      : ""
                  }`}
                >
                  <BiLogoFacebook
                    className={`${styles.socialsIcon} ${
                      shouldUseSpecialStyles(pathname)
                        ? styles["socials-icon-black"]
                        : ""
                    }`}
                    size={20}
                  />
                </div>
                <div
                  className={`${styles.socialsItem} ${
                    shouldUseSpecialStyles(pathname)
                      ? styles["socials-item-black"]
                      : ""
                  }`}
                >
                  <BiLogoTwitter
                    className={`${styles.socialsIcon} ${
                      shouldUseSpecialStyles(pathname)
                        ? styles["socials-icon-black"]
                        : ""
                    }`}
                    size={20}
                  />
                </div>
                <div
                  className={`${styles.socialsItem} ${
                    shouldUseSpecialStyles(pathname)
                      ? styles["socials-item-black"]
                      : ""
                  }`}
                >
                  <BiLogoLinkedin
                    className={`${styles.socialsIcon} ${
                      shouldUseSpecialStyles(pathname)
                        ? styles["socials-icon-black"]
                        : ""
                    }`}
                    size={20}
                  />
                </div>
              </div>
            </div>
            <div className={styles.stores}>
              <h3
                className={styles.socialsTitle}
                style={{
                  color: shouldUseSpecialStyles(pathname)
                    ? "rgba(0, 8, 34, 0.34)"
                    : "",
                }}
              >
                Download Our App
              </h3>
              <div className={styles.storesContainer}>
                <Image
                  onClick={() => router.push("/comming-soon")}
                  className={styles.store}
                  src={`${
                    shouldUseSpecialStyles(pathname)
                      ? "/svg/light-google-store.svg"
                      : "/svg/google-store.svg"
                  }`}
                  alt="logo"
                  width={161}
                  height={54}
                />

                <Image
                  onClick={() => router.push("/comming-soon")}
                  className={styles.store}
                  src={`${
                    shouldUseSpecialStyles(pathname)
                      ? "/svg/light-apple-store.svg"
                      : "/svg/apple-store.svg"
                  }`}
                  alt="logo"
                  width={161}
                  height={54}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          © 2025 Limitless Trading Services . All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
