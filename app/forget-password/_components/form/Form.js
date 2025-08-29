"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { useRouter } from "next/navigation";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Form = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Forgot Password
        </h2>
        <p className={`${styles.description} ${manrope.className}`}>
          Lost your password? Please enter your email address. You will receive
          a link to create a new password via email
        </p>
      </div>
      <div className={styles.inputsContainer}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.iconWrapper}>
              <Image
                src={"/svg/email.svg"}
                alt="email"
                width={24}
                height={24}
              />
            </div>
            <input
              type="email"
              id="email"
              placeholder="Enter Email Address"
              className={styles.input}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <ConfirmButton
        style={{ justifyContent: "center" }}
        title="Login"
        onClick={() => {}}
        className={styles.button}
      />
      <button
        className={styles.gotoLogin}
        onClick={() => router.push("/login")}
      >
        {`Go back to login`}
      </button>
    </div>
  );
};

export default Form;
