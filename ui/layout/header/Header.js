"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import SideNavbar from "@/ui/dashboard/layout/sideNavbar/SideNavbar";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false);

  // Function to open Tawk.to chat
  const openLiveChat = () => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };
  return pathname === "/login" ||
    pathname === "/forget-password" ||
    pathname === "/change-password" ? null : (
    <div className="centeredContent">
      <header className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            onClick={() => router.push("/")}
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
              <Link className={styles.menuLink} href="/comming-soon">
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
            <div
              className={styles.chatIcon}
              onClick={openLiveChat}
              style={{ cursor: "pointer" }}
            >
              <Image
                src="/svg/live-chat.svg"
                alt="chat"
                width={30}
                height={30}
              />
            </div>
          ) : (
            <button
              className={styles.loginBtn}
              onClick={() => router.push("/login")}
            >
              Login
            </button>
          )}
          <button
            className={styles.quoteBtn}
            onClick={isDashboard ? openLiveChat : undefined}
          >
            {isDashboard ? "Live chat" : "Get Quote"}
            <Image
              src="/svg/arrow-right.svg"
              alt="arrow-right"
              width={24}
              height={12}
            />
          </button>
        </div>
      </header>
      <header className={styles.mobileContainer}>
        <div className={styles.top}>
          <Image
            onClick={() => router.push("/")}
            className={styles.logoMobile}
            src="/svg/logo.svg"
            alt="logo"
            width={50}
            height={50}
          />
          <button
            onClick={() => {
              if (isDashboard) {
                console.log(
                  "Dashboard sidebar button clicked! Current isOpen:",
                  isDashboardSidebarOpen
                );
                setIsDashboardSidebarOpen(!isDashboardSidebarOpen);
                console.log(
                  "Setting isDashboardSidebarOpen to:",
                  !isDashboardSidebarOpen
                );
              } else {
                console.log("Button clicked! Current isOpen:", isOpen);
                setIsOpen(!isOpen);
                console.log("Setting isOpen to:", !isOpen);
              }
            }}
            className={styles.menuBtn}
          >
            {(isDashboard ? isDashboardSidebarOpen : isOpen) ? (
              <Image src="/svg/close.svg" alt="close" width={13} height={13} />
            ) : (
              <Image src="/svg/menu.svg" alt="menu" width={24} height={24} />
            )}
          </button>
        </div>
        {isDashboard ? (
          <SideNavbar
            isOpen={isDashboardSidebarOpen}
            onToggle={() => setIsDashboardSidebarOpen(!isDashboardSidebarOpen)}
            isMobile={true}
          />
        ) : (
          <div
            className={`${styles.mobileMenu} ${
              isOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed
            }`}
          >
            <nav className={styles.mobileNav}>
              <Link
                className={`${styles.menuLink} ${
                  pathname === "/temporary" ? styles.activeMenuLink : ""
                }`}
                href="/temporary"
                onClick={() => setIsOpen(false)}
              >
                Temporary
              </Link>
              <Link
                className={`${styles.menuLink} ${
                  pathname === "/impound" ? styles.activeMenuLink : ""
                }`}
                href="/impound"
                onClick={() => setIsOpen(false)}
              >
                Impound
              </Link>
              <Link
                className={`${styles.menuLink} ${
                  pathname === "/courier" ? styles.activeMenuLink : ""
                }`}
                href="/comming-soon"
                onClick={() => setIsOpen(false)}
              >
                Courier
              </Link>
              <Link
                className={`${styles.menuLink} ${
                  pathname === "/contact-us" ? styles.activeMenuLink : ""
                }`}
                href="/contact-us"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
            <div className={styles.mobileButtons}>
              <button
                className={styles.loginBtn}
                onClick={() => {
                  router.push("/login");
                  setIsOpen(false);
                }}
              >
                Login
              </button>
              <button
                className={styles.quoteBtn}
                onClick={() => {
                  if (isDashboard) {
                    openLiveChat();
                  }
                  setIsOpen(false);
                }}
              >
                {isDashboard ? "Live chat" : "Get Quote"}
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
