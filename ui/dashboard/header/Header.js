"use client";
import React from "react";
import styles from "./header.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500"],
});

const Header = ({ page }) => {
  const { user } = useAuth();
  const pathname = usePathname();

  // Determine the title based on the page prop or pathname
  const getTitle = () => {
    // If page prop is provided, use it
    if (page) {
      switch (page) {
        case "claims":
          return "Manage Claims";
        case "policy":
          return "Manage Policy";
        case "submit-claim":
          return "Submit Claim";
        case "documents":
          return "Policy Documents";
        case "dashboard":
        default:
          return user ? `Welcome, ${user.firstName}` : "Welcome";
      }
    }

    // Otherwise, determine from pathname
    if (pathname.includes("/claims")) {
      return "Manage Claims";
    } else if (pathname.includes("/policy")) {
      return "Manage Policy";
    } else if (pathname.includes("/submit-claim")) {
      return "Submit Claim";
    } else if (pathname.includes("/documents")) {
      return "Policy Documents";
    } else {
      return user ? `Welcome, ${user.firstName}` : "Welcome";
    }
  };

  const title = getTitle();
  const words = title.split(" ");
  const lastWord = words[words.length - 1];
  const withoutLastWord = words.slice(0, -1).join(" ");
  return (
    <div className="headerDashboardContainer">
      <Image
        src="/svg/squares-2.svg"
        alt="squares"
        width={1394}
        height={706}
        className={styles.squares}
      />
      <div className="centeredContent">
        <div className={styles.wrapper}>
          <Image
            src="/svg/dash-header.svg"
            alt="dash-header"
            width={585}
            height={776}
            className={styles.dashHeader}
          />

          <div className={styles.titles}>
            <p className={`${styles.subTitle} ${manrope.className}`}>
              DASHBOARD
            </p>

            <div className={`${styles.title} ${plusJakartaSans.className}`}>
              {withoutLastWord}
              <div className={styles.titleSpan}>
                {lastWord}{" "}
                <Image
                  src="/svg/curved-border.svg"
                  alt="curved border"
                  width={393}
                  height={3}
                  className={styles.curvedBorder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
