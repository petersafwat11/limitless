"use client";
import React from "react";
import styles from "./createBtn.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
const CreateBtn = ({ title, href, onClick }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          router.push(href);
        }
      }}
      className={styles.button}
    >
      <Image src="/svg/plus.svg" alt="plus" width={24} height={24} />
      <span> {title}</span>
    </button>
  );
};

export default CreateBtn;
