import { STEPS } from "@/utils/defaultValues";

const extractFieldPaths = (obj, prefix = "") => {
  const fields = [];

  for (const key in obj) {
    const value = obj[key];
    const path = prefix ? `${prefix}.${key}` : key;

    if (key === "type" || key === "terms") continue;
    if (key === "otherVehiclesType" || key === "additionalQualificationType")
      continue;
    if (key === "ownerOther" || key === "registeredKeeperOther") continue;
    if (key === "qualificationMonth" || key === "qualificationYear") continue;
    if (Array.isArray(value)) continue;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      fields.push(...extractFieldPaths(value, path));
    } else {
      fields.push(path);
    }
  }

  return fields;
};

export const getFieldsForStep = (step, defaultValues) => {
  const allFields = extractFieldPaths(defaultValues);

  switch (step) {
    case STEPS.VEHICLE:
      return allFields.filter((field) => field.startsWith("vehicleDetails."));

    case STEPS.COVER:
      return allFields.filter(
        (field) =>
          field.startsWith("coverDetails.") ||
          field.startsWith("optionalExtras.")
      );

    case STEPS.PERSONAL:
      return allFields.filter(
        (field) =>
          field.startsWith("userDetails.") || field.startsWith("carUsage.")
      );

    default:
      return [];
  }
};

export const handleNextStep = async ({
  currentStep,
  defaultValues,
  trigger,
  setCurrentStep,
  totalSteps = 4,
  formErrors,
}) => {
  const fieldsToValidate = getFieldsForStep(currentStep, defaultValues);
  const isValid = await trigger(fieldsToValidate);

  if (!isValid) {
    // Log validation errors for the current step
    console.log("=== Step Validation Errors ===");
    console.log(`Step: ${currentStep}`);
    console.log("Fields validated:", fieldsToValidate);

    // Filter and log only errors related to current step fields
    const stepErrors = {};
    fieldsToValidate.forEach((field) => {
      const fieldParts = field.split(".");
      let errorRef = formErrors;
      let hasError = false;

      // Navigate through nested error structure
      for (const part of fieldParts) {
        if (errorRef && errorRef[part]) {
          errorRef = errorRef[part];
          hasError = true;
        } else {
          hasError = false;
          break;
        }
      }

      if (hasError && errorRef.message) {
        stepErrors[field] = errorRef.message;
      }
    });

    console.log("Errors:", stepErrors);
    console.log("==============================");

    return false;
  }

  if (currentStep < totalSteps) {
    // Force immediate scroll to top before changing step
    window.scrollTo({ top: 0, behavior: "instant" });

    // Use setTimeout to ensure scroll happens after React state update
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);

    setCurrentStep(currentStep + 1);
  }

  return true;
};

export const handlePreviousStep = ({ currentStep, setCurrentStep }) => {
  if (currentStep > STEPS.VEHICLE) {
    setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export const submitInsurance = async ({
  data,
  insuranceType,
  router,
  searchParams,
  setIsSubmitting,
  setShowLoading,
  toast,
}) => {
  setIsSubmitting(true);
  setShowLoading(true);

  try {
    const submissionData = prepareSubmissionData(data, insuranceType);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/insurance`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      }
    );

    const result = await response.json();

    if (response.status === 409) {
      toast.error(
        `An account with email ${data.userDetails.email} already exists. Please login to continue.`
      );
      router.push(`/login?email=${encodeURIComponent(data.userDetails.email)}`);
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
      style: {
        height: "auto",
        padding: "2rem",
        height: "auto",
      },
    });

    const skipPayment = searchParams.get("payment") === "false";

    setTimeout(() => {
      if (skipPayment) {
        router.push(`/dashboard/policy`);
      } else {
        router.push(`/payment-summary?id=${insuranceId}`);
      }
    }, 1000);
  } catch (error) {
    toast.error(
      error.message ||
        "Failed to submit insurance application. Please try again."
    );
    throw error;
  } finally {
    setIsSubmitting(false);
    setShowLoading(false);
  }
};

const prepareSubmissionData = (data, insuranceType) => {
  const baseData = {
    type: insuranceType,
    vehicleDetails: data.vehicleDetails,
    coverDetails: data.coverDetails,
    userDetails: {
      ...data.userDetails,
      address: data.userDetails?.address || "N/A",
    },
    carUsage: data.carUsage,
    terms: data.terms,
  };

  if (insuranceType === "Annual") {
    baseData.optionalExtras = {
      protectedNCD: data.optionalExtras?.protectedNCD === true,
      motorLegal: data.optionalExtras?.motorLegal === true,
      courtesyCar: data.optionalExtras?.courtesyCar === true,
      breakdownCover: data.optionalExtras?.breakdownCover === true,
      foreignUseCover: data.optionalExtras?.foreignUseCover === true,
    };

    baseData.carUsage = {
      ...data.carUsage,
      otherVehiclesType:
        data.carUsage?.otherVehiclesType === ""
          ? undefined
          : data.carUsage?.otherVehiclesType,
      additionalQualificationType:
        data.carUsage?.additionalQualificationType === ""
          ? undefined
          : data.carUsage?.additionalQualificationType,
    };
  }

  return baseData;
};
