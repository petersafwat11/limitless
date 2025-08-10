"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans } from "next/font/google";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Form = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Welcome back
      </h2>
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
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Password
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.iconWrapper}>
              <Image
                src={"/svg/password.svg"}
                alt="password"
                width={24}
                height={24}
              />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password.."
              className={styles.input}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <IoEyeOffOutline className={styles.eyeIcon} />
              ) : (
                <IoEyeOutline className={styles.eyeIcon} />
              )}
            </button>
          </div>
        </div>
      </div>
      <button className={styles.dontKnow}>{`Don’t know the reg yet?`}</button>
      <ConfirmButton
        style={{ justifyContent: "center" }}
        title="Login"
        onClick={() => {}}
        className={styles.button}
      />
    </div>
  );
};

export default Form;
