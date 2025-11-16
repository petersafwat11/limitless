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
import { toast } from "react-toastify";
import { impoundDefaultValues, STEPS } from "@/utils/defaultValues";
import {
  handleNextStep,
  handlePreviousStep,
  submitInsurance,
} from "@/lib/getQuotePagesHelper";
import styles from "@/app/temporary/get-quote/stepForm.module.css";

const VehicleDetailsForm = dynamic(
  () => import("@/app/temporary/get-quote/_components/VehicleDetailsForm"),
  { loading: () => <StepFallback /> }
);
const ImpoundCoverDetailsForm = dynamic(
  () => import("./_components/ImpoundCoverDetailsForm"),
  { loading: () => <StepFallback /> }
);
const PersonalDetailsForm = dynamic(
  () => import("@/app/temporary/get-quote/_components/PersonalDetailsForm"),
  { loading: () => <StepFallback /> }
);
const ReviewQuote = dynamic(
  () => import("@/app/temporary/get-quote/_components/ReviewQuote"),
  { loading: () => <StepFallback /> }
);

const StepFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "400px",
      color: "#666",
      fontSize: "1.3rem",
    }}
  >
    Loading...
  </div>
);

const TOTAL_STEPS = 4;

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
    defaultValues: impoundDefaultValues,
    mode: "onChange", // Enable real-time validation - errors disappear when fixed
  });

  const {
    setValue,
    trigger,
    formState: { errors },
  } = form;

  // Handle step parameter from URL
  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= STEPS.VEHICLE && step <= STEPS.REVIEW) {
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
        setValue(
          "vehicleDetails.registrationNumber",
          registrationNumber.toUpperCase()
        );
        // Auto-trigger vehicle lookup
        setShouldAutoTrigger(true);
      }
    }
  }, [searchParams, setValue]);

  const onNext = async () => {
    await handleNextStep({
      currentStep,
      defaultValues: impoundDefaultValues,
      trigger,
      setCurrentStep,
      totalSteps: TOTAL_STEPS,
      formErrors: errors,
    });
  };

  const onBack = () => {
    handlePreviousStep({
      currentStep,
      setCurrentStep,
    });
  };

  const onSubmit = async (data) => {
    await submitInsurance({
      data,
      insuranceType: "Impound",
      router,
      searchParams,
      setIsSubmitting,
      setShowLoading,
      toast,
    });
  };

  const onError = (errors) => {
    console.log("=== Form Submit Validation Errors ===");
    console.log("Insurance Type: Impound");
    console.log("Errors:", errors);
    console.log("=====================================");
  };

  return (
    <div
      suppressHydrationWarning
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <LoadingOverlay isVisible={showLoading} />
      <GetQuoteHeaderWithNav
        title="Impound Insurance Quote"
        currentStep={currentStep}
        totalSteps={4}
      />
      <div
        className="centeredContent"
        suppressHydrationWarning
        style={{ position: "relative", zIndex: 1 }}
      >
        <form
          className={styles.stepFormContainer}
          onSubmit={form.handleSubmit(onSubmit, onError)}
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
            {currentStep === STEPS.COVER && (
              <ImpoundCoverDetailsForm form={form} />
            )}
            {currentStep === STEPS.PERSONAL && (
              <PersonalDetailsForm form={form} />
            )}
            {currentStep === STEPS.REVIEW && (
              <ReviewQuote form={form} insuranceType="Impound" />
            )}
          </div>

          <StepActions
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onNext={onNext}
            onBack={onBack}
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
