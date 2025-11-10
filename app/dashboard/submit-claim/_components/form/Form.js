"use client";
import React, { useState, useEffect } from "react";
import styles from "./form.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  submitClaimFlatSchema,
  transformFormDataToApiFormat,
} from "@/utils/schemas/submitClaimSchema";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormTextArea from "@/ui/inputs/FormTextArea";
import FormDropdown from "@/ui/inputs/FormDropdown";
import FormDateInput from "@/ui/inputs/FormDateInput";
import { useAuth } from "@/contexts/AuthContext";

const Form = ({ claimReason }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get saved form data from sessionStorage
  const getSavedFormData = () => {
    if (typeof window === "undefined") return {};
    const claimData = JSON.parse(sessionStorage.getItem("claimData") || "{}");
    return claimData.formData || {};
  };

  const savedFormData = getSavedFormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    reset,
  } = useForm({
    resolver: zodResolver(submitClaimFlatSchema),
    defaultValues: {
      policyNumber: savedFormData.policyNumber || "",
      placeHolderFirstName: savedFormData.placeHolderFirstName || "",
      placeHolderLastName: savedFormData.placeHolderLastName || "",
      claimentsName: savedFormData.claimentsName || "",
      emailAddress: savedFormData.emailAddress || "",
      incidentDescription: savedFormData.incidentDescription || "",
      incidentDate: savedFormData.incidentDate || "",
      responsible: savedFormData.responsible || "",
      detailsIfNotResponsible: savedFormData.detailsIfNotResponsible || "",
      vehicleLocation: savedFormData.vehicleLocation || "",
      thirdPartyFullName: savedFormData.thirdPartyFullName || "",
      thirdPartyPhone: savedFormData.thirdPartyPhone || "",
      thirdPartyPostcode: savedFormData.thirdPartyPostcode || "",
      thirdPartyAddress: savedFormData.thirdPartyAddress || "",
      thirdPartyVehicleRegistration:
        savedFormData.thirdPartyVehicleRegistration || "",
      thirdPartyVehicleMake: savedFormData.thirdPartyVehicleMake || "",
      thirdPartyVehicleModel: savedFormData.thirdPartyVehicleModel || "",
      thirdPartyDamage: savedFormData.thirdPartyDamage || "",
      drivable: savedFormData.drivable || "",
      claimreason: claimReason || "",
    },
  });

  // Save form data to sessionStorage on every change
  useEffect(() => {
    const subscription = watch((value) => {
      if (typeof window !== "undefined") {
        try {
          // Filter out non-serializable values and DOM elements
          const serializableValue = {};
          Object.keys(value).forEach((key) => {
            const val = value[key];
            // Only include primitive values and plain objects
            if (
              val !== null &&
              val !== undefined &&
              (typeof val === "string" ||
                typeof val === "number" ||
                typeof val === "boolean" ||
                (typeof val === "object" && val.constructor === Object))
            ) {
              serializableValue[key] = val;
            }
          });

          const claimData = JSON.parse(
            sessionStorage.getItem("claimData") || "{}"
          );
          claimData.formData = serializableValue;
          sessionStorage.setItem("claimData", JSON.stringify(claimData));
        } catch (error) {
          console.warn("Failed to save form data to sessionStorage:", error);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const watchedValues = watch();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Get claim data from sessionStorage
      const claimData = JSON.parse(sessionStorage.getItem("claimData") || "{}");

      // Save form data to sessionStorage for step validation (clean data only)
      const cleanData = {};
      Object.keys(data).forEach((key) => {
        const val = data[key];
        if (
          val !== null &&
          val !== undefined &&
          (typeof val === "string" ||
            typeof val === "number" ||
            typeof val === "boolean" ||
            (typeof val === "object" && val.constructor === Object))
        ) {
          cleanData[key] = val;
        }
      });
      claimData.formData = cleanData;
      sessionStorage.setItem("claimData", JSON.stringify(claimData));

      // Transform flat form data to nested structure for API
      const apiData = transformFormDataToApiFormat(data);

      // userId will be set by backend from authenticated user
      // No need to send it from frontend

      const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This sends HTTP-only cookies with the request
        body: JSON.stringify(apiData),
      });

      // Check if response is JSON before parsing
      const contentType = response.headers.get("content-type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        // Server returned HTML (likely an error page)
        const text = await response.text();
        console.error(
          "Server returned non-JSON response:",
          text.substring(0, 200)
        );
        throw new Error(
          `Server error (${response.status}). Please try again or contact support.`
        );
      }

      if (response.ok) {
        console.log("API Response:", result); // Debug: Full API response

        // Extract orderReference from API response
        const orderRef =
          result.data?.orderReference ||
          result.orderReference ||
          result.data?.data?.orderReference;

        console.log("Extracted orderReference:", orderRef); // Debug: Extracted value

        if (orderRef) {
          // Redirect to success page with orderReference in URL
          router.push(
            `/dashboard/submit-claim?step=submitted&orderReference=${orderRef}`
          );
        } else {
          console.error("No orderReference found in API response");
          // Redirect anyway but without orderReference
          router.push("/dashboard/submit-claim?step=submitted");
        }

        // Clean up sessionStorage
        sessionStorage.removeItem("claimData");
      } else {
        // Handle validation errors
        if (result.errors) {
          Object.keys(result.errors).forEach((field) => {
            setError(field, { message: result.errors[field] });
          });
        } else {
          setError("root", {
            message: result.message || "Failed to submit claim",
          });
        }
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      setError("root", { message: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>Tell us your claim</h2>

      {/* Display general error */}
      {errors.root && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "0.25rem",
            border: "1px solid #f5c6cb",
            fontSize: "2rem",
          }}
        >
          {errors.root.message}
        </div>
      )}

      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formContainer}>
          {/* Policy Number */}
          <FormTextInput
            label="Enter your policy no.*"
            placeholder="Enter Policy Number"
            type="text"
            error={errors.policyNumber}
            {...register("policyNumber")}
          />

          {/* Policy Holder Names */}
          <div className={styles.row}>
            <FormTextInput
              label="Policyholder first name*"
              placeholder="Enter Policy Holder First Name"
              type="text"
              error={errors.placeHolderFirstName}
              {...register("placeHolderFirstName")}
            />
            <FormTextInput
              label="Policyholder last name*"
              placeholder="Enter Policy Holder Last Name"
              type="text"
              error={errors.placeHolderLastName}
              {...register("placeHolderLastName")}
            />
          </div>

          {/* Claimant Details */}
          <div className={styles.row}>
            <FormTextInput
              label="Your name (if you are not the policyholder)"
              placeholder="Enter Your Name"
              type="text"
              error={errors.claimentsName}
              {...register("claimentsName")}
            />
            <FormTextInput
              label="Email address"
              placeholder="Enter Email Address"
              type="email"
              error={errors.emailAddress}
              {...register("emailAddress")}
            />
          </div>

          {/* Incident Description */}
          <FormTextArea
            label="Incident description*"
            placeholder="Enter Incident Description"
            rows={6}
            error={errors.incidentDescription}
            {...register("incidentDescription")}
          />

          {/* Date and Responsibility */}
          <div className={styles.row}>
            <FormDateInput
              dateLabel="Date of incident (Or estimate the date)*"
              name="incidentDate"
              type="date"
              allowPastDates={true}
              error={errors.incidentDate}
              value={watchedValues.incidentDate}
              onChange={(e) => setValue("incidentDate", e.target.value)}
            />
            <FormDropdown
              label="Do you take responsibility for the incident?*"
              options={["Yes", "No"]}
              placeholder="Select Responsibility"
              error={errors.responsible}
              value={watchedValues.responsible}
              onChange={(value) => {
                // Handle both string values and event objects
                const stringValue =
                  typeof value === "string"
                    ? value
                    : value?.target?.value || value;
                setValue("responsible", stringValue);
              }}
            />
          </div>

          {/* Details if not responsible */}
          <FormTextArea
            label="If not, please give details"
            placeholder="Enter Extra Details"
            rows={3}
            error={errors.detailsIfNotResponsible}
            {...register("detailsIfNotResponsible")}
          />

          {/* Vehicle Location and Third Party Name */}
          <div className={styles.row}>
            <FormTextInput
              label="Where is the vehicle currently?*"
              placeholder="Enter Vehicle Current Location"
              type="text"
              error={errors.vehicleLocation}
              {...register("vehicleLocation")}
            />
            <FormTextInput
              label="Third party name*"
              placeholder="Enter Third Party Name"
              type="text"
              error={errors.thirdPartyFullName}
              {...register("thirdPartyFullName")}
            />
          </div>

          {/* Third Party Contact */}
          <div className={styles.row}>
            <FormTextInput
              label="Third party phone number*"
              placeholder="Enter Third Party Phone"
              type="text"
              error={errors.thirdPartyPhone}
              {...register("thirdPartyPhone")}
            />
            <FormTextInput
              label="Third party postcode*"
              placeholder="Enter Third Party Postcode"
              type="text"
              error={errors.thirdPartyPostcode}
              {...register("thirdPartyPostcode")}
            />
          </div>

          {/* Third Party Vehicle Details */}
          <div className={styles.row}>
            <FormTextInput
              label="Third party vehicle registration number*"
              placeholder="Enter Vehicle Registration"
              type="text"
              error={errors.thirdPartyVehicleRegistration}
              {...register("thirdPartyVehicleRegistration")}
            />
            <FormTextInput
              label="Third party address*"
              placeholder="Enter Third Party Address"
              type="text"
              error={errors.thirdPartyAddress}
              {...register("thirdPartyAddress")}
            />
          </div>

          <div className={styles.row}>
            <FormTextInput
              label="Third party vehicle make*"
              placeholder="Enter Vehicle Make"
              type="text"
              error={errors.thirdPartyVehicleMake}
              {...register("thirdPartyVehicleMake")}
            />
            <FormTextInput
              label="Third party vehicle model*"
              placeholder="Enter Vehicle Model"
              type="text"
              error={errors.thirdPartyVehicleModel}
              {...register("thirdPartyVehicleModel")}
            />
          </div>

          {/* Damage Description */}
          <FormTextInput
            label="Tell us about any damage to the third party vehicle*"
            placeholder="Enter Third Party Vehicle Damage"
            type="text"
            error={errors.thirdPartyDamage}
            {...register("thirdPartyDamage")}
          />

          {/* Vehicle Drivability */}
          <FormDropdown
            label="Is the vehicle drivable?*"
            options={["Yes", "No"]}
            placeholder="Select Drivability"
            error={errors.drivable}
            value={watchedValues.drivable}
            onChange={(value) => {
              // Handle both string values and event objects
              const stringValue =
                typeof value === "string"
                  ? value
                  : value?.target?.value || value;
              setValue("drivable", stringValue);
            }}
          />

          {/* Submit Button */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              // style={{
              //   width: "100%",
              //   padding: "1rem",
              //   backgroundColor: isSubmitting ? "#ccc" : "#007bff",
              //   color: "white",
              //   border: "none",
              //   borderRadius: "0.5rem",
              //   fontSize: "1rem",
              //   cursor: isSubmitting ? "not-allowed" : "pointer",
              // }}
              className={styles.submitButton}
            >
              {isSubmitting ? "Submitting Claim..." : "Submit Claim"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
