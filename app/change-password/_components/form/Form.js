"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const Form = () => {
  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
  });

  // track visibility for each input separately
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          Welcome back
        </h2>
        <p className={`${styles.description} ${manrope.className}`}>
          Please enter your new password and confirm it.
        </p>
      </div>

      <div className={styles.inputsContainer}>
        {/* New Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            New Password
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
              type={showPassword.password ? "text" : "password"}
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
              onClick={() => togglePasswordVisibility("password")}
              aria-label={
                showPassword.password ? "Hide password" : "Show password"
              }
            >
              {showPassword.password ? (
                <IoEyeOffOutline className={styles.eyeIcon} />
              ) : (
                <IoEyeOutline className={styles.eyeIcon} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <div className={styles.inputContainer}>
            <div className={styles.iconWrapper}>
              <Image
                src={"/svg/password.svg"}
                alt="confirm password"
                width={24}
                height={24}
              />
            </div>
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Re-enter your password.."
              className={styles.input}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => togglePasswordVisibility("confirmPassword")}
              aria-label={
                showPassword.confirmPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword.confirmPassword ? (
                <IoEyeOffOutline className={styles.eyeIcon} />
              ) : (
                <IoEyeOutline className={styles.eyeIcon} />
              )}
            </button>
          </div>
        </div>
      </div>

      <ConfirmButton
        style={{ justifyContent: "center" }}
        title="Change Password"
        onClick={() => {}}
        className={styles.button}
      />
    </div>
  );
};

export default Form;
