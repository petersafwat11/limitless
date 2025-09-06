"use client";
import React from "react";
import styles from "./createBtn.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
const CreateBtn = ({ title, href }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.push(href)} className={styles.button}>
      <Image src="/svg/plus.svg" alt="plus" width={24} height={24} />
      <span> {title}</span>
    </button>
  );
};

export default CreateBtn;
