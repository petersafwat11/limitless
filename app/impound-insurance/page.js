"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { impoundInsuranceSchema } from "@/utils/schemas/impoundInsuranceSchema";
import Header from "@/ui/insurance-quotes/header/Header";
import VehicleDetailsForm from "../temporary-insurance/_components/VehicleDetailsForm";
import ImpoundCoverDetailsForm from "./_components/ImpoundCoverDetailsForm";
import PersonalDetailsForm from "../temporary-insurance/_components/PersonalDetailsForm";
import TermsForm from "../temporary-insurance/_components/TermsForm";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";
import { toast } from "react-toastify";

const ImpoundInsuranceContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(impoundInsuranceSchema),
    defaultValues: {
      type: "Impound",
      vehicleDetails: {
        registrationNumber: "",
        type: "",
        make: "",
        model: "",
        year: "",
        fuel: "",
        transmission: "",
        doors: "",
        colour: "",
        worth: "",
        apiData: null,
      },
      coverDetails: {
        impoundType: "",
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

  const { setValue } = form;

  // Populate form with URL parameters
  useEffect(() => {
    const fromQuote = searchParams.get("fromQuote");

    if (fromQuote === "true") {
      const registrationNumber = searchParams.get("registrationNumber");
      if (registrationNumber) {
        setValue("vehicleDetails.registrationNumber", registrationNumber);
      } else {
        const vehicleType = searchParams.get("vehicleType");
        const make = searchParams.get("make");
        const model = searchParams.get("model");
        const year = searchParams.get("year");

        if (vehicleType) setValue("vehicleDetails.type", vehicleType);
        if (make) setValue("vehicleDetails.make", make);
        if (model) setValue("vehicleDetails.model", model);
        if (year) setValue("vehicleDetails.year", year);
      }
    }
  }, [searchParams, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const submissionData = {
        ...data,
        foundVehicleData: foundVehicleData,
      };

      const response = await fetch(`${API_BASE_URL}/api/insurance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.status === 409) {
        toast.error(
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

      const insuranceId = result.data.insurance._id;
      
      toast.success("Insurance application submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        router.push(`/payment-summery?id=${insuranceId}`);
      }, 1000);

    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message ||
          "Failed to submit insurance application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header title="Impound Insurance" />
      <div className="centeredContent">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="insuranceQuotesContainer"
          noValidate
        >
          <VehicleDetailsForm
            form={form}
            onVehicleDataFound={setFoundVehicleData}
          />
          <ImpoundCoverDetailsForm form={form} />
          <PersonalDetailsForm form={form} />
          <TermsForm
            form={form}
            onBack={() => router.back()}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

const ImpoundInsurancePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ImpoundInsuranceContent />
    </Suspense>
  );
};

export default ImpoundInsurancePage;
