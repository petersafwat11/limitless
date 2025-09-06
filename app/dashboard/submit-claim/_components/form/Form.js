"use client";
import React, { useState } from "react";
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
import { API_BASE_URL } from "@/utils/config";

const Form = ({ claimReason }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
  } = useForm({
    resolver: zodResolver(submitClaimFlatSchema),
    defaultValues: {
      policyNumber: "",
      placeHolderFirstName: "",
      placeHolderLastName: "",
      claimentsName: "",
      emailAddress: "",
      incidentDescription: "",
      incidentDate: "",
      responsible: "",
      detailsIfNotResponsible: "",
      vehicleLocation: "",
      thirdPartyFullName: "",
      thirdPartyPhone: "",
      thirdPartyPostcode: "",
      thirdPartyAddress: "",
      thirdPartyVehicleRegistration: "",
      thirdPartyVehicleMake: "",
      thirdPartyVehicleModel: "",
      thirdPartyDamage: "",
      drivable: "",
      claimreason: claimReason || "",
    },
  });

  const watchedValues = watch();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Transform flat form data to nested structure for API
      const apiData = transformFormDataToApiFormat(data);

      // Add userId from auth context
      apiData.userId = user?.id || user?._id;

      const response = await fetch(`${API_BASE_URL}/api/claims`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(apiData),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to success page
        router.push("/dashboard/submit-claim?step=submitted");
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
            padding: "0.75rem",
            marginBottom: "1rem",
            borderRadius: "0.25rem",
            border: "1px solid #f5c6cb",
          }}
        >
          {errors.root.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Date of incident (Or estimate the date)*"
              placeholder="DD/MM/YYYY"
              error={errors.incidentDate}
              value={watchedValues.incidentDate}
              onChange={(date) => setValue("incidentDate", date)}
            />
            <FormDropdown
              label="Do you take responsibility for the incident?*"
              options={["Yes", "No"]}
              placeholder="Select Responsibility"
              error={errors.responsible}
              value={watchedValues.responsible}
              onChange={(value) => setValue("responsible", value)}
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
            onChange={(value) => setValue("drivable", value)}
          />

          {/* Submit Button */}
          <div style={{ marginTop: "2rem" }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "1rem",
                backgroundColor: isSubmitting ? "#ccc" : "#007bff",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
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
