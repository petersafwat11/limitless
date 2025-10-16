"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import ConfirmButton from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  clientSetPasswordSchema,
} from "@/utils/authSchemas";
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
  const searchParams = useSearchParams();
  const {
    resetPassword,
    setPassword,
    getUserInfo,
    error,
    resetPasswordSuccess,
    clearError,
    clearSuccessStates,
  } = useAuth();

  const [userInfo, setUserInfo] = useState(null);
  const [pageType, setPageType] = useState("loading"); // "loading", "setPassword", "resetPassword", "error"
  const [isSubmitting, setIsSubmitting] = useState(false); // Local loading state for form submission

  // track visibility for each input separately
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  // Refs for input focus
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  // Get URL parameters
  const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const userType = searchParams.get("type"); // 'admin' or 'client'

  // Determine which schema and API to use
  const getFormConfig = () => {
    if (token) {
      return {
        schema: resetPasswordSchema,
        type: "resetPassword",
        defaultValues: { token, password: "", passwordConfirm: "" },
      };
    } else if (email && userId) {
      return {
        schema: clientSetPasswordSchema,
        type: "setPassword",
        defaultValues: { password: "", confirmPassword: "" },
      };
    }
    return null;
  };

  const formConfig = getFormConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: formConfig ? zodResolver(formConfig.schema) : undefined,
    defaultValues: formConfig?.defaultValues || {},
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Fetch user info for set password flow
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (email && userId && !token) {
        const result = await getUserInfo(email, userId);
        if (result.success) {
          setUserInfo(result.data);
          setPageType("setPassword");
        } else {
          setPageType("error");
        }
      } else if (token) {
        setPageType("resetPassword");
      } else {
        setPageType("error");
      }
    };

    fetchUserInfo();
  }, [email, userId, token, getUserInfo]);

  const onSubmit = async (data) => {
    clearError();
    setIsSubmitting(true); // Start loading
    
    try {
      let result;

      if (pageType === "setPassword") {
        result = await setPassword(
          email,
          userId,
          data.password,
          data.confirmPassword
        );
      } else if (pageType === "resetPassword") {
        result = await resetPassword(
          token,
          data.password,
          data.passwordConfirm,
          userType || "client"
        );
      }

      if (result?.success) {
        // Success - redirect to appropriate login page
        const loginPath =
          result.data?.userType === "admin" || userType === "admin"
            ? "/admin-login"
            : "/login";
        const message =
          pageType === "setPassword"
            ? "Password set successfully. You can now login."
            : "Password reset successfully. You can now login.";

        router.push(`${loginPath}?message=${encodeURIComponent(message)}`);
      } else {
        setError("root", {
          message: result?.message || "Something went wrong. Please try again.",
        });
        setIsSubmitting(false); // Stop loading on error
      }
    } catch (error) {
      console.error("Submit error:", error);
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
      setIsSubmitting(false); // Stop loading on error
    }
  };

  // Loading state
  if (pageType === "loading") {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Loading...
          </h2>
          <p className={`${styles.description} ${manrope.className}`}>
            Please wait while we verify your request.
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (pageType === "error") {
    return (
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
            Invalid Link
          </h2>
          <p className={`${styles.description} ${manrope.className}`}>
            This password reset link is invalid or has expired. Please request a
            new one.
          </p>
        </div>
        <ConfirmButton
          style={{
            justifyContent: "center",
            width: "100%",
            marginTop: "2.6rem",
          }}
          title="Go to Login"
          onClick={() => router.push("/login")}
          // className={styles.button}
        />
      </div>
    );
  }

  const getPageTitle = () => {
    if (pageType === "setPassword") {
      return userInfo ? `Welcome ${userInfo.firstName}!` : "Welcome!";
    }
    if (userType === "admin") {
      return "Reset Admin Password";
    }
    return "Reset Your Password";
  };

  const getPageDescription = () => {
    if (pageType === "setPassword") {
      return "Please create a secure password for your account to complete the setup.";
    }
    if (userType === "admin") {
      return "Please enter your new admin password and confirm it.";
    }
    return "Please enter your new password and confirm it.";
  };

  const getPasswordFieldName = () => {
    return pageType === "resetPassword" ? "passwordConfirm" : "confirmPassword";
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h2 className={`${styles.title} ${plusJakartaSans.className}`}>
          {getPageTitle()}
        </h2>
        <p className={`${styles.description} ${manrope.className}`}>
          {getPageDescription()}
        </p>
        {userInfo && (
          <p
            className={`${styles.description} ${manrope.className}`}
            style={{ fontSize: "14px", marginTop: "0.5rem" }}
          >
            Setting up password for: <strong>{userInfo.email}</strong>
          </p>
        )}
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
          {/* New Password */}
          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              {pageType === "setPassword" ? "Create Password" : "New Password"}
            </label>
            <div className={styles.inputContainer} onClick={() => passwordInputRef.current?.focus()}>
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
                className={`${styles.input} ${
                  errors.password ? styles.error : ""
                }`}
                {...(() => {
                  const { ref, ...rest } = register("password");
                  return {
                    ...rest,
                    ref: (e) => {
                      ref(e);
                      passwordInputRef.current = e;
                    },
                  };
                })()}
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
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.inputGroup}>
            <label htmlFor={getPasswordFieldName()} className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.inputContainer} onClick={() => confirmPasswordInputRef.current?.focus()}>
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
                id={getPasswordFieldName()}
                placeholder="Re-enter your password.."
                className={`${styles.input} ${
                  errors[getPasswordFieldName()] ? styles.error : ""
                }`}
                {...(() => {
                  const { ref, ...rest } = register(getPasswordFieldName());
                  return {
                    ...rest,
                    ref: (e) => {
                      ref(e);
                      confirmPasswordInputRef.current = e;
                    },
                  };
                })()}
              />
              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => togglePasswordVisibility("confirmPassword")}
                aria-label={
                  showPassword.confirmPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword.confirmPassword ? (
                  <IoEyeOffOutline className={styles.eyeIcon} />
                ) : (
                  <IoEyeOutline className={styles.eyeIcon} />
                )}
              </button>
            </div>
            {errors[getPasswordFieldName()] && (
              <span className={styles.errorMessage}>
                {errors[getPasswordFieldName()].message}
              </span>
            )}
          </div>
        </div>

        <ConfirmButton
          style={{ justifyContent: "center", width: "100%" }}
          title={
            isSubmitting
              ? "Setting Password..."
              : pageType === "setPassword"
              ? "Set Password"
              : "Reset Password"
          }
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          // className={styles.button}
        />
      </form>
    </div>
  );
};

export default Form;
