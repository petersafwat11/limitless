"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insuranceSchema } from "@/utils/schemas/insuranceSchema";
import Header from "@/ui/insurance-quotes/header/Header";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import VehicleDetailsForm from "./_components/VehicleDetailsForm";
import CoverDetailsForm from "./_components/CoverDetailsForm";
import PersonalDetailsForm from "./_components/PersonalDetailsForm";
import TermsForm from "./_components/TermsForm";
import { useRouter } from "next/navigation";

const TemporaryInsurancePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(insuranceSchema),
    defaultValues: {
      type: "Temp",
      vehicleDetails: {
        registrationNumber: "",
        type: "",
        make: "",
        model: "",
        variant: "",
        price: "",
      },
      coverDetails: {
        type: "Days",
        period: 1,
        startDate: "",
        startTime: "10:00",
      },
      userDetails: {
        firstName: "",
        surname: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        postCode: "",
        address: "",
        employmentStatus: "",
        occupation: "",
        industry: "",
      },
      carUsage: {
        industry: "",
        keepingCarDuringDay: "",
        keepingCarDuringNight: "",
        usageType: "",
        licenseType: "",
        licenseHeld: "",
        licenseNumber: "",
        NCB: "",
        voluntaryExcess: "",
        criminalConvictions: false,
        medicalConditions: false,
        insuranceCancelledOrClaimRefusedOrPolicyVoided: false,
      },
      terms: {
        acceptTerms: false,
        acceptMarketing: false,
      },
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/insurance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 409) {
        // Email already exists - redirect to login
        alert(
          `An account with email ${data.userDetails.email} already exists. Please login to continue.`
        );
        router.push(
          `/login?email=${encodeURIComponent(data.userDetails.email)}`
        );
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to submit insurance application"
        );
      }

      if (result.data.needsPasswordSetup) {
        alert(
          "Insurance application submitted successfully! Please check your email to set up your password and complete the process."
        );
        router.push("/login");
      } else {
        alert("Insurance application submitted successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error.message ||
          "Failed to submit insurance application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header title="Temporary Insurance" />
      <div className="centeredContent">
        {/* <div className="insuranceQuotesContainer"> */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="insuranceQuotesContainer"
        >
          <VehicleDetailsForm form={form} />
          <CoverDetailsForm form={form} />
          <PersonalDetailsForm form={form} />
          <TermsForm
            form={form}
            onBack={() => router.back()}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
      {/* </div> */}
    </div>
  );
};

export default TemporaryInsurancePage;
