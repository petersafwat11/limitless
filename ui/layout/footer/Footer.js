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

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <footer
      className={styles.container}
      style={{
        background: ["/contact-us", "/error-44"].includes(pathname)
          ? "#F2F5FE"
          : "",
      }}
    >
      {(!pathname.startsWith("/dashboard") &&
        !pathname.startsWith("/error-44") &&
        !pathname.startsWith("/contact-us")) && <NoHiddenFees />}
      <div className={styles.content}>
        <div className={styles.menus}>
          {menus.map((menu, index) => (
            <div key={index} className={styles.menu}>
              <h3
                style={{
                  color: ["/contact-us", "/error-44"].includes(pathname)
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
                        color: ["/contact-us", "/error-44"].includes(pathname)
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
                color: ["/contact-us", "/error-44"].includes(pathname)
                  ? "rgba(0, 8, 34, 0.34)"
                  : "",
              }}
            >
              Social Media
            </h3>
            <div className={styles.socialsItems}>
              <div className={styles.socialsItem}>
                <BiLogoInstagramAlt className={styles.socialsIcon} size={20} />
              </div>
              <div className={styles.socialsItem}>
                <BiLogoFacebook className={styles.socialsIcon} size={20} />
              </div>
              <div className={styles.socialsItem}>
                <BiLogoTwitter className={styles.socialsIcon} size={20} />
              </div>
              <div className={styles.socialsItem}>
                <BiLogoLinkedin className={styles.socialsIcon} size={20} />
              </div>
            </div>
          </div>
          <div className={styles.stores}>
            <h3
              className={styles.socialsTitle}
              style={{
                color: ["/contact-us", "/error-44"].includes(pathname)
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
                src="/svg/google-store.svg"
                alt="logo"
                width={161}
                height={54}
              />

              <Image
                onClick={() => router.push("/comming-soon")}
                className={styles.store}
                src="/svg/apple-store.svg"
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
    </footer>
  );
};

export default Footer;
