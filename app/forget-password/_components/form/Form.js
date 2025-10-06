"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "@/utils/authSchemas";
import { useAuth } from "@/contexts/AuthContext";
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
  const {
    forgotPassword,
    isLoading,
    error,
    forgotPasswordSuccess,
    clearError,
    clearSuccessStates,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    clearError();
    const result = await forgotPassword(data.email);

    if (!result.success) {
      setError("email", { message: result.message });
    }
  };

  if (forgotPasswordSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Check Your Email
          </h2>
          <p className={`${styles.description} ${manrope.className}`}>
            {`We've sent you a password reset link. Please check your email and
            follow the instructions to reset your password.`}
          </p>
        </div>
        <ConfirmButton
          style={{
            justifyContent: "center",
            width: "100%",
            marginTop: "2.6rem",
          }}
          title="Go to Login"
          onClick={() => {
            clearSuccessStates();
            router.push("/login");
          }}
          // className={styles.button}
        />
      </div>
    );
  }

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

      {/* Error Message */}
      {(error || errors.root) && (
        <div
          className={styles.errorMessage}
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "0.25rem",
            border: "1px solid #f5c6cb",
          }}
        >
          {error || errors.root?.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
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
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
                {...register("email")}
              />
            </div>
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        {errors.root && (
          <div
            className={styles.errorMessage}
            style={{ textAlign: "center", marginBottom: "1rem" }}
          >
            {errors.root.message}
          </div>
        )}

        <ConfirmButton
          style={{ justifyContent: "center", width: "100%" }}
          title={isLoading ? "Sending..." : "Send Reset Link"}
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={styles.button}
        />
      </form>

      <button
        className={styles.gotoLogin}
        onClick={() => router.push("/login")}
        disabled={isLoading}
      >
        {`Go back to login`}
      </button>
    </div>
  );
};

export default Form;
