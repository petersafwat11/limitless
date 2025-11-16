"use client";

import React, { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { annualInsuranceSchema } from "@/utils/schemas/insuranceSchema";
import GetQuoteHeaderWithNav from "@/ui/getQuote/GetQuoteHeaderWithNav";
import StepActions from "@/app/temporary/get-quote/_components/StepActions";
import LoadingOverlay from "@/ui/loadingSpinner/LoadingOverlay";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "@/utils/toast";
import { annualDefaultValues, STEPS } from "@/utils/defaultValues";
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
const AnnualCoverDetailsForm = dynamic(
  () => import("./_components/AnnualCoverDetailsForm"),
  { loading: () => <StepFallback /> }
);
const AnnualPersonalDetailsForm = dynamic(
  () => import("./_components/AnnualPersonalDetailsForm"),
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

const AnnualInsuranceContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(STEPS.VEHICLE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [shouldAutoTrigger, setShouldAutoTrigger] = useState(false);

  const form = useForm({
    resolver: zodResolver(annualInsuranceSchema),
    defaultValues: annualDefaultValues,
    mode: "onChange", // Enable real-time validation - errors disappear when fixed
  });

  const {
    setValue,
    trigger,
    formState: { errors },
  } = form;

  useEffect(() => {
    const stepParam = searchParams.get("step");
    if (stepParam) {
      const step = parseInt(stepParam);
      if (step >= STEPS.VEHICLE && step <= STEPS.REVIEW) {
        setCurrentStep(step);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const fromQuote = searchParams.get("fromQuote");
    if (fromQuote === "true") {
      const registrationNumber = searchParams.get("registrationNumber");
      if (registrationNumber) {
        setValue(
          "vehicleDetails.registrationNumber",
          registrationNumber.toUpperCase()
        );
        setShouldAutoTrigger(true);
      }
    }
  }, [searchParams, setValue]);

  const onNext = async () => {
    await handleNextStep({
      currentStep,
      defaultValues: annualDefaultValues,
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
      insuranceType: "Annual",
      router,
      searchParams,
      setIsSubmitting,
      setShowLoading,
      toast,
    });
  };

  const onError = (errors) => {
    console.log("=== Form Submit Validation Errors ===");
    console.log("Insurance Type: Annual");
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
        title="Annual Insurance Quote"
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
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
              <AnnualCoverDetailsForm form={form} />
            )}
            {currentStep === STEPS.PERSONAL && (
              <AnnualPersonalDetailsForm form={form} />
            )}
            {currentStep === STEPS.REVIEW && (
              <ReviewQuote form={form} insuranceType="Annual" />
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

const AnnualInsurancePage = () => {
  return (
    <Suspense
      fallback={
        <GetQuoteHeaderWithNav
          title="Annual Insurance Quote"
          currentStep={1}
          totalSteps={4}
        />
      }
    >
      <AnnualInsuranceContent />
    </Suspense>
  );
};

export default AnnualInsurancePage;
