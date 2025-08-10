import React from "react";
import styles from "./sideNavbar.module.css";
import Image from "next/image";
import Link from "next/link";
import {

} from "react-icons/md";
import { RiHome2Line } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { TiDocumentAdd } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePolicy } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi2";
// import { FaBriefcase } from "react-icons/fa";
// <FaBriefcase />

const SideNavbar = () => {
  const navItems = [
    {
      label: "Dashboard",
      icon: <RiHome2Line className={styles.icon} />,
      href: "/dashboard",
    },
    {
      label: "Manage Policy",
      icon: <MdOutlinePolicy className={styles.icon} />,
      href: "/dashboard/manage-policy",
    },
    {
      label: "Documents",
      icon: <HiOutlineDocumentText className={styles.icon} />,
      href: "/dashboard/documents",
    },
    {
      label: "Manage Claims",
      icon: <IoSettingsOutline className={styles.icon} />,
      href: "/dashboard/manage-claims",
    },
    {
      label: "Submit a Claim",
      icon: <TiDocumentAdd className={styles.icon} />,
      href: "/dashboard/submit-claim",
    },
    {
      label: "Logout",
      icon: <HiOutlineLogout style={{ rotate: "180deg" }} className={styles.icon} />,
      href: "/dashboard",
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.navItems}>
        {navItems.map((item) => (
          <Link className={styles.navItem} href={item.href} key={item.label}>
            {item.icon}
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavbar;
