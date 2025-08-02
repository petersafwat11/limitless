import React from "react";
import styles from "./footer.module.css";
import { menus } from "./data";
import Link from "next/link";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BiLogoFacebook } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoLinkedin } from "react-icons/bi";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.menus}>
          {menus.map((menu, index) => (
            <div key={index} className={styles.menu}>
              <h3 className={styles.menuTitle}>{menu.title}</h3>
              <menu className={styles.menuItems}>
                {menu.items.map((item, index) => (
                  <li key={index} className={styles.menuItem}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              </menu>
            </div>
          ))}
        </div>
        <div className={styles.socials}>
          <div className={styles.socialsContainer}>
            <h3 className={styles.socialsTitle}>Social Media</h3>
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
            <h3 className={styles.socialsTitle}>Download Our App</h3>
            <div className={styles.storesContainer}>
              <Image
                className={styles.store}
                src="/svg/google-store.svg"
                alt="logo"
                width={161}
                height={54}
              />

              <Image
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
