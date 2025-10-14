"use client";
import React from "react";
import styles from "./sideNavbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { TiDocumentAdd } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePolicy } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi2";
// import { FaBriefcase } from "react-icons/fa";
// <FaBriefcase />

const SideNavbar = ({ isOpen = false, onToggle, isMobile = false }) => {
  const pathname = usePathname();
  const page = pathname.split("/")[2];
  const navItems = [
    {
      label: "Dashboard",
      icon: <RiHome2Line className={styles.icon} />,
      href: "/dashboard",
    },
    {
      label: "Manage Policy",
      icon: <MdOutlinePolicy className={styles.icon} />,
      href: "/dashboard/policy",
    },
    {
      label: "Documents",
      icon: <HiOutlineDocumentText className={styles.icon} />,
      href: "/dashboard/documents",
    },
    {
      label: "Manage Claims",
      icon: <IoSettingsOutline className={styles.icon} />,
      href: "/dashboard/claims",
    },
    {
      label: "Submit a Claim",
      icon: <TiDocumentAdd className={styles.icon} />,
      href: "/dashboard/submit-claim",
    },
    {
      label: "Logout",
      icon: (
        <HiOutlineLogout style={{ rotate: "180deg" }} className={styles.icon} />
      ),
      // href: "/dashboard",
    },
  ];
  return (
    <div
      className={`${styles.container} ${
        isMobile
          ? isOpen
            ? styles.sidebarOpen
            : styles.sidebarClosed
          : styles.sidebarDesktop
      }`}
    >
      <div className={styles.navItems}>
        {navItems.map((item, index) =>
          item.label === "Logout" ? (
            <button
              className={`${styles.navItem} ${
                item.href && page === item.href.split("/")[2]
                  ? styles.activeNavItem
                  : ""
              }`}
              // href={item.href}
              key={item.label}
              style={{
                animationDelay: isOpen ? `${(index + 1) * 0.1}s` : "0s",
              }}
              onClick={() => {
                console.log("Logout button clicked");
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ) : (
            <Link
              className={`${styles.navItem} ${
                item.href && page === item.href.split("/")[2]
                  ? styles.activeNavItem
                  : ""
              }`}
              href={item.href}
              key={item.label}
              style={{
                animationDelay: isOpen ? `${(index + 1) * 0.1}s` : "0s",
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default SideNavbar;
