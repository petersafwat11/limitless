"use client";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { usePathname } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const Header = ({ title }) => {
  const pathname = usePathname();
  const words = title.split(" ");
  const lastWord = title.includes("Complaints") ? "" : words[words.length - 1];
  const withoutLastWord = title.includes("Complaints")
    ? "Complaints"
    : words.slice(0, -1).join(" ");
  console.log(lastWord);
  return (
    <div className="headerContainer">
      <div className="centeredContent">
        <Image
          src="/svg/squares-2.svg"
          alt="squares"
          width={1394}
          height={706}
          className={styles.squares}
        />
        <Image
          src="/svg/squares-mobile.svg"
          alt="squares"
          width={485}
          height={246}
          className={styles.squaresMobile}
        />

        <div className={styles.content}>
          <div className={`${styles.title} ${plusJakartaSans.className}`}>
            {withoutLastWord}{" "}
            <div className={styles.titleSpan}>
              {lastWord}
              <Image
                src="/svg/curved-border.svg"
                alt="curved border"
                width={393}
                height={3}
                className={styles.curvedBorder}
              />
            </div>
          </div>
          <menu className={styles.menu}>
            {[
              "Privacy Policy",
              "Terms And Conditions",
              "Cookies Policy",
              "Complaints",
            ].map((item, index) => (
              <li key={index}>
                <Link
                  href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  className={`${styles.menuLink} ${
                    pathname === `/${item.toLowerCase().replace(/ /g, "-")}`
                      ? styles.activeMenuLink
                      : ""
                  }`}
                >
                  {item === "Terms And Conditions"
                    ? "Terms & Conditions"
                    : item}
                </Link>
              </li>
            ))}
          </menu>
        </div>
      </div>
    </div>
  );
};

export default Header;
