"use client";
import React, { useState, useEffect } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans } from "next/font/google";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { loginSchema } from "@/utils/authSchemas";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check for success message from URL params
  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      setSuccessMessage(message);
      // Clear the message from URL after showing it
      const newUrl = window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Clear error when component mounts or when user starts typing
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    clearError();
    setSuccessMessage("");

    const result = await login(data.email, data.password);

    if (result.success) {
      // Force a hard redirect to ensure cookie is properly set
      // Use window.location for a full page reload which ensures middleware runs with fresh cookies
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
    } else {
      setError("root", { message: result.message });
    }
  };
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
        Welcome back
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div
          className={styles.successMessage}
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "0.25rem",
            border: "1px solid #c3e6cb",
          }}
        >
          {successMessage}
        </div>
      )}

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
              <span
                className={styles.errorMessage}
                style={{ color: "#dc3545", fontSize: "0.875rem" }}
              >
                {errors.email.message}
              </span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
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
                className={`${styles.input} ${
                  errors.password ? styles.error : ""
                }`}
                {...register("password")}
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
            {errors.password && (
              <span
                className={styles.errorMessage}
                style={{ color: "#dc3545", fontSize: "0.875rem" }}
              >
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          className={styles.dontKnow}
          onClick={() => router.push("/forget-password")}
        >
          {`Forgot your password?`}
        </button>

        <ConfirmButton
          style={{ justifyContent: "center", width: "100%" }}
          title={isLoading ? "Logging in..." : "Login"}
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className={styles.button}
        />
      </form>
    </div>
  );
};

export default Form;
