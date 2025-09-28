"use client";
import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insuranceSchema } from "@/utils/schemas/insuranceSchema";
import Header from "@/ui/insurance-quotes/header/Header";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import VehicleDetailsForm from "./_components/VehicleDetailsForm";
import CoverDetailsForm from "./_components/CoverDetailsForm";
import PersonalDetailsForm from "./_components/PersonalDetailsForm";
import TermsForm from "./_components/TermsForm";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";

const TemporaryInsuranceContent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingVehicleData, setIsLoadingVehicleData] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(insuranceSchema),
    defaultValues: {
      type: "Temp",
      vehicleDetails: {
        registrationNumber: "",
        type: "",
        make: "",
        model: "",
        year: "",
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

  const { setValue } = form;

  // Function to fetch vehicle data from registration number
  const fetchVehicleData = useCallback(
    async (registrationNumber) => {
      setIsLoadingVehicleData(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/insurance/car-insurance-group/${encodeURIComponent(
            registrationNumber.trim()
          )}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch vehicle data");
        }

        const result = await response.json();

        if (result.status === "success" && result.data) {
          console.log("Vehicle data fetched and populated:", result.data);
          // Update form with fetched vehicle data
          setValue("vehicleDetails.type", "Car"); // Default since API is for cars
          setValue("vehicleDetails.make", result.data.make || "");
          setValue("vehicleDetails.model", result.data.model || "");
          setValue("vehicleDetails.year", result.data.year || "");

          console.log("Vehicle data fetched and populated:", result.data);
        } else {
          throw new Error("No vehicle data found for this registration");
        }
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        alert(
          error.message ||
            "Failed to fetch vehicle data. Please enter details manually."
        );
      } finally {
        setIsLoadingVehicleData(false);
      }
    },
    [setValue]
  );

  // Populate form with URL parameters from GetQuote
  useEffect(() => {
    const fromQuote = searchParams.get("fromQuote");

    if (fromQuote === "true") {
      // Duration details from URL parameters (always present)
      const durationType = searchParams.get("durationType");
      const durationValue = searchParams.get("durationValue");

      // Set cover details if provided
      if (durationType) {
        setValue("coverDetails.type", durationType);
      }
      if (durationValue) {
        setValue("coverDetails.period", parseInt(durationValue) || 1);
      }

      // Check if registration number was provided
      const registrationNumber = searchParams.get("registrationNumber");
      if (registrationNumber) {
        // Set registration number and fetch vehicle data
        setValue("vehicleDetails.registrationNumber", registrationNumber);
        fetchVehicleData(registrationNumber);
      } else {
        // Use manual vehicle details from URL parameters
        const vehicleType = searchParams.get("vehicleType");
        const make = searchParams.get("make");
        const model = searchParams.get("model");
        const year = searchParams.get("year");

        if (vehicleType) {
          setValue("vehicleDetails.type", vehicleType);
        }
        if (make) {
          setValue("vehicleDetails.make", make);
        }
        if (model) {
          setValue("vehicleDetails.model", model);
        }
        if (year) {
          setValue("vehicleDetails.year", year);
        }

        console.log("Manual vehicle details populated:", {
          vehicleType,
          make,
          model,
          year,
        });
      }

      console.log("Cover details populated:", {
        durationType,
        durationValue,
      });
    }
  }, [searchParams, setValue, fetchVehicleData]);

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
          <VehicleDetailsForm
            form={form}
            isLoadingVehicleData={isLoadingVehicleData}
          />
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

const TemporaryInsurancePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TemporaryInsuranceContent />
    </Suspense>
  );
};

export default TemporaryInsurancePage;
