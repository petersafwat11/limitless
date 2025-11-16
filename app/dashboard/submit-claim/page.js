"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Stepper from "./_components/stepper/Stepper";
import styles from "./page.module.css";
import ClaimFeature from "./_components/claimFeature/ClaimFeature";
import { Plus_Jakarta_Sans } from "next/font/google";
import Submitted from "./_components/submitted/Submitted";
import ClaimReason from "./_components/claimReason/ClaimReason";
import Guidelines from "./_components/guidelines/Guidelines";
import Form from "./_components/form/Form";
import { steps, firstClaim, secondClaim, guidelinesData } from "./data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const SubmitClaimContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isLoading } = useAuth();

  const type = searchParams.get("type");
  const step = searchParams.get("step");
  const reason = searchParams.get("reason");

  // Determine current step based on URL parameters
  let currentStep = 0;
  if (step === "submitted") {
    currentStep = 3;
  } else if (step === "form") {
    currentStep = 2;
  } else if (step === "reason") {
    currentStep = 1;
  } else if (type === "optional-cover") {
    currentStep = 0;
  } else if (!type && !step) {
    currentStep = 0; // Default claim selection
  }

  // All hooks must be called before any conditional returns
  useEffect(() => {
    // Save current step data to sessionStorage
    if (typeof window !== "undefined") {
      const claimData = JSON.parse(sessionStorage.getItem("claimData") || "{}");

      if (type) claimData.type = type;
      if (reason) claimData.reason = reason;

      sessionStorage.setItem("claimData", JSON.stringify(claimData));
    }
  }, [type, reason]);

  useEffect(() => {
    // Validate step access for car insurance flow only when necessary
    if (type === "car-insurance" && typeof window !== "undefined") {
      const claimData = JSON.parse(sessionStorage.getItem("claimData") || "{}");

      // Check if user is trying to access step 2 without reason
      if (step === "form" && !reason && !claimData.reason) {
        router.replace(
          "/dashboard/submit-claim?type=car-insurance&step=reason"
        );
        return;
      }

      // Check if user is trying to access step 3 without form data
      if (step === "submitted" && !claimData.formData) {
        router.replace("/dashboard/submit-claim");
        return;
      }
    }
  }, [type, step, reason, router]);

  // Check auth and redirect if needed - AFTER all hooks
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          color: "#666",
        }}
      >
        Loading...
      </div>
    );
  }

  // Don't render if not authenticated (redirect will happen via useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Render different components based on search params
  const renderContent = () => {
    // If submitted successfully
    if (step === "submitted") {
      return <Submitted />;
    }

    // If optional cover claims selected - show guidelines only
    if (type === "optional-cover") {
      return <Guidelines data={guidelinesData} />;
    }

    // If car insurance claims selected
    if (type === "car-insurance") {
      // Show form if on form step
      if (step === "form") {
        return (
          <div className={styles.fullWidthContainer}>
            <Stepper steps={steps} currentStep={currentStep} />
            <Form claimReason={reason} />
          </div>
        );
      }

      // Show claim reason selection if on reason step
      if (step === "reason") {
        return (
          <div className={styles.fullWidthContainer}>
            <Stepper steps={steps} currentStep={currentStep} />
            <ClaimReason />
          </div>
        );
      }
    }

    // Default view - show claim selection
    return (
      <div>
        <Stepper steps={steps} currentStep={currentStep} />
        <div className={styles.claims}>
          <h2 className={`${styles.claimsTitle} ${plusJakartaSans.className}`}>
            Choose your Claim
          </h2>
          <div className={styles.claimsContainer}>
            <ClaimFeature
              img={firstClaim.img}
              title={firstClaim.title}
              description={firstClaim.description}
              features={firstClaim.features}
              btnText="Make a car insurance claims"
              claimType="car-insurance"
            />
            <ClaimFeature
              img={secondClaim.img}
              title={secondClaim.title}
              description={secondClaim.description}
              features={secondClaim.features}
              btnText="Optional Cover claims"
              claimType="optional-cover"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className={styles.page}>{renderContent()}</div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
            color: "#666",
          }}
        >
          Loading...
        </div>
      }
    >
      <SubmitClaimContent />
    </Suspense>
  );
};

export default Page;
