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
  const [foundVehicleData, setFoundVehicleData] = useState(null);
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
        fuel: "",
        transmission: "",
        doors: "",
        colour: "",
        worth: "",
        apiData: null,
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
    console.log("🎯 onSubmit function called", {
      url: `${API_BASE_URL}/api/insurance`,
      method: "POST",
      data: {
        ...data,
        vehicleDetails: {
          ...data.vehicleDetails,
          apiData: data.vehicleDetails.apiData ? "Present" : "Not present",
        },
      },
    });

    // Validate form before submission
    const isValid = await form.trigger();
    if (!isValid) {
      console.log("❌ Validation failed. Form errors:", form.formState.errors);
      Object.keys(form.formState.errors).forEach((key) => {
        console.log(`Error in ${key}:`, form.formState.errors[key]);
      });
      return;
    }

    setIsSubmitting(true);

    // Debug: Log form state and data
    console.log("📝 Form State:", {
      isValid: form.formState.isValid,
      isDirty: form.formState.isDirty,
      errors: form.formState.errors,
    });

    console.log("📋 Submitting data:", {
      ...data,
      vehicleDetails: {
        ...data.vehicleDetails,
        apiData: data.vehicleDetails.apiData
          ? "API Data Present"
          : "No API Data",
      },
    });
    console.log("🚀 Starting form submission with data:", {
      type: data.type,
      vehicleDetails: {
        ...data.vehicleDetails,
        apiData: data.vehicleDetails.apiData ? "Present" : "Not present",
      },
      coverDetails: data.coverDetails,
      userDetails: {
        ...data.userDetails,
        email: data.userDetails.email ? "Present" : "Not present",
      },
      carUsage: data.carUsage,
      terms: data.terms,
    });

    try {
      // Include found vehicle data in the submission
      const submissionData = {
        ...data,
        foundVehicleData: foundVehicleData,
      };

      console.log("📤 Sending request to API...");
      const response = await fetch(`${API_BASE_URL}/api/insurance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();
      console.log("📥 API Response:", {
        status: response.status,
        ok: response.ok,
        data: result,
      });

      if (response.status === 409) {
        console.log("⚠️ Email already exists:", data.userDetails.email);
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
        console.error("❌ API Error:", result);
        throw new Error(
          result.message || "Failed to submit insurance application"
        );
      }

      console.log("✅ Submission successful:", result);

      if (result.data.needsPasswordSetup) {
        console.log("👤 New user - needs password setup");
        alert(
          "Insurance application submitted successfully! Please check your email to set up your password and complete the process."
        );
        router.push("/login");
      } else {
        console.log("👤 Existing user - redirecting to dashboard");
        alert("Insurance application submitted successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        response: error.response,
      });
      alert(
        error.message ||
          "Failed to submit insurance application. Please try again."
      );
    } finally {
      console.log("🏁 Form submission process completed");
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header title="Temporary Insurance" />
      <div className="centeredContent">
        {/* <div className="insuranceQuotesContainer"> */}
        <form
          onSubmit={form.handleSubmit(async (data) => {
            console.log("🎯 Form submit event triggered");
            console.log("📋 Submitting form data:", {
              ...data,
              vehicleDetails: {
                ...data.vehicleDetails,
                apiData: data.vehicleDetails.apiData
                  ? "Present"
                  : "Not present",
              },
            });

            try {
              setIsSubmitting(true);
              await onSubmit(data);
            } catch (error) {
              console.error("❌ Form submission error:", error);
              alert("Failed to submit form. Please try again.");
            } finally {
              setIsSubmitting(false);
            }
          })}
          className="insuranceQuotesContainer"
          noValidate
        >
          <VehicleDetailsForm
            form={form}
            isLoadingVehicleData={isLoadingVehicleData}
            onVehicleDataFound={setFoundVehicleData}
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
