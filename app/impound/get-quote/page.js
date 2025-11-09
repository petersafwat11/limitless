"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { impoundInsuranceSchema } from "@/utils/schemas/impoundInsuranceSchema";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";
import StepActions from "@/app/temporary/get-quote/_components/StepActions";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/utils/config";
import { toast } from "react-toastify";
import styles from "@/app/temporary/get-quote/stepForm.module.css";

const VehicleDetailsForm = dynamic(() => import("@/app/temporary/get-quote/_components/VehicleDetailsForm"), { loading: () => <StepFallback /> });
const ImpoundCoverDetailsForm = dynamic(() => import("./_components/ImpoundCoverDetailsForm"), { loading: () => <StepFallback /> });
const PersonalDetailsForm = dynamic(() => import("@/app/temporary/get-quote/_components/PersonalDetailsForm"), { loading: () => <StepFallback /> });
const ReviewQuote = dynamic(() => import("@/app/temporary/get-quote/_components/ReviewQuote"), { loading: () => <StepFallback /> });

const StepFallback = () => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px", color: "#666", fontSize: "1.3rem" }}>
    Loading...
  </div>
);

const STEPS = {
  VEHICLE: 1,
  COVER: 2,
  PERSONAL: 3,
  REVIEW: 4,
};

const ImpoundInsuranceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);

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

  const { setValue, trigger } = form;

  // Handle step parameter from URL
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= STEPS.VEHICLE && step <= STEPS.TERMS) {
        setCurrentStep(step);
      }
    }
  }, [searchParams]);

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
        setValue("vehicleDetails.registrationNumber", registrationNumber.toUpperCase());
        // Auto-trigger vehicle lookup
        setShouldAutoTrigger(true);
      }
    }
  }, [searchParams, setValue]);

  // Step validation fields
  const vehicleFields = [
    "vehicleDetails.registrationNumber",
    "vehicleDetails.type",
    "vehicleDetails.make",
    "vehicleDetails.model",
    "vehicleDetails.year",
    "vehicleDetails.fuel",
    "vehicleDetails.transmission",
    "vehicleDetails.colour",
  ];

  const coverFields = [
    "coverDetails.impoundType",
    "coverDetails.startDate",
    "coverDetails.startTime",
  ];

  const personalFields = [
    "userDetails.firstName",
    "userDetails.surname",
    "userDetails.email",
    "userDetails.phone",
    "userDetails.dateOfBirth",
    "userDetails.postCode",
    "userDetails.address",
    "userDetails.employmentStatus",
    "userDetails.industry",
    "userDetails.occupation",
    "carUsage.keepingCarDuringDay",
    "carUsage.keepingCarDuringNight",
    "carUsage.usageType",
    "carUsage.licenseType",
    "carUsage.licenseHeld",
    "carUsage.NCB",
    "carUsage.voluntaryExcess",
    "carUsage.criminalConvictions",
    "carUsage.medicalConditions",
    "carUsage.insuranceCancelledOrClaimRefusedOrPolicyVoided",
  ];

  const getFieldsForStep = (step) => {
    switch (step) {
      case STEPS.VEHICLE:
        return vehicleFields;
      case STEPS.COVER:
        return coverFields;
      case STEPS.PERSONAL:
        return personalFields;
      default:
        return [];
    }
  };

  const handleNextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (currentStep === STEPS.PERSONAL) {
        setCurrentStep(STEPS.REVIEW);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      if (currentStep === STEPS.REVIEW) {
        // Final step - will be handled by form submission
        return;
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > STEPS.VEHICLE) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Debug: Test if form submission is working
  useEffect(() => {
    const formElement = document.querySelector('form');
    if (formElement) {
      const handleFormSubmit = (e) => {
        console.log('📝 Form submit event detected!', e);
      };
      formElement.addEventListener('submit', handleFormSubmit);
      return () => formElement.removeEventListener('submit', handleFormSubmit);
    }
  }, []);

  // Debug: Log form errors
  useEffect(() => {
    const errors = form.formState.errors;
    if (Object.keys(errors).length > 0) {
      console.log('⚠️ Current form errors:', errors);
      console.log('⚠️ Error fields:', Object.keys(errors));
    }
  }, [form.formState.errors]);

  const onSubmit = async (data) => {
    console.log('🚀 onSubmit function called!');
    console.log('🚀 Form is valid - proceeding with submission');
    setIsSubmitting(true);
    setShowLoading(true);

    try {
      console.log('📋 Form data received:', data);
      console.log('📋 Data keys:', Object.keys(data));
      
      // Clean the data to remove any React internal objects
      const submissionData = {
        type: data.type || "Impound", // Ensure type is always set
        vehicleDetails: data.vehicleDetails,
        coverDetails: data.coverDetails,
        userDetails: {
          ...data.userDetails,
          address: data.userDetails?.address || "N/A",
        },
        carUsage: data.carUsage,
        terms: data.terms,
      };
      
      console.log('📤 Submission data:', submissionData);
      console.log('📤 Submission keys:', Object.keys(submissionData));
      console.log('📤 Type:', submissionData.type);
      console.log('📤 VehicleDetails exists:', !!submissionData.vehicleDetails);
      console.log('📤 CoverDetails exists:', !!submissionData.coverDetails);
      console.log('📤 UserDetails exists:', !!submissionData.userDetails);
      console.log('📤 CarUsage exists:', !!submissionData.carUsage);
      
      // Test JSON stringification
      const jsonString = JSON.stringify(submissionData);
      console.log('📤 JSON string length:', jsonString.length);
      console.log('📤 JSON preview:', jsonString.substring(0, 200));
      console.log('📤 API URL:', `${API_BASE_URL}/api/insurance`);
      
      const response = await fetch(`${API_BASE_URL}/api/insurance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });
      
      console.log('Response status:', response.status);

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

      // Check if payment=false is in search params
      const skipPayment = searchParams.get("payment") === "false";

      setTimeout(() => {
        if (skipPayment) {
          router.push(`/dashboard/policy`);
        } else {
          router.push(`/payment-summary?id=${insuranceId}`);
        }
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.message ||
          "Failed to submit insurance application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
      setShowLoading(false);
    }
  };

  return (
    <div suppressHydrationWarning>
      <LoadingOverlay isVisible={showLoading} />
      <GetQuoteHeaderWithNav title="Impound Insurance Quote" currentStep={currentStep} totalSteps={4} />
      <div className="centeredContent" suppressHydrationWarning>
        <form
          className={styles.stepFormContainer}
          onSubmit={form.handleSubmit(
            onSubmit,
            (errors) => {
              console.error('❌ Form validation failed:', errors);
              console.error('❌ Error fields:', Object.keys(errors));
              toast.error('Please check all required fields are filled correctly');
            }
          )}
          noValidate
          suppressHydrationWarning
        >
          <div className={styles.stepContent}>
            {currentStep === STEPS.VEHICLE && (
              <VehicleDetailsForm
                form={form}
                onVehicleDataFound={setFoundVehicleData}
                autoTriggerLookup={shouldAutoTrigger}
              />
            )}
            {currentStep === STEPS.COVER && <ImpoundCoverDetailsForm form={form} />}
            {currentStep === STEPS.PERSONAL && (
              <PersonalDetailsForm form={form} />
            )}
            {currentStep === STEPS.REVIEW && (
              <ReviewQuote form={form} insuranceType="Impound" />
            )}
          </div>

          <StepActions
            currentStep={currentStep}
            totalSteps={4}
            onNext={handleNextStep}
            onBack={handlePreviousStep}
            isLoading={isSubmitting}
            nextLabel={currentStep === STEPS.REVIEW ? "Get Quote" : "Next"}
            backLabel="Back"
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
