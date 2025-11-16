import { z } from "zod";

// ============================================
// BASE FIELD SCHEMAS (Reusable Building Blocks)
// ============================================

// Basic vehicle fields object
const baseVehicleFieldsSchema = z.object({
  registrationNumber: z
    .string()
    .max(15, "Registration number cannot exceed 15 characters")
    .transform((val) => val.toUpperCase())
    .optional(),
  type: z.string().optional(),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.string().optional(),
  fuel: z.string().optional(),
  transmission: z.string().optional(),
  doors: z.string().optional(),
  colour: z.string().optional(),
  apiData: z
    .object({
      registration: z.string().optional(),
      make: z.string().optional(),
      model: z.string().optional(),
      year: z.string().optional(),
      fuel: z.string().optional(),
      transmission: z.string().optional(),
      colour: z.string().optional(),
      cylinderCapacity: z.string().optional(),
      insuranceGroup: z.string().optional(),
    })
    .nullable()
    .optional(),
});

// Safety & Security fields (used in all insurance types)
const safetySecurityFieldsSchema = z.object({
  trackingDevice: z.string().optional(),
  alarmImmobiliser: z.string().optional(),
  importedVehicle: z.string().optional(),
  vehicleModified: z.string().optional(),
  vehicleModifications: z.array(z.string()).optional(),
  worth: z.string().optional(),
});

// Ownership fields (used in all insurance types)
const ownershipFieldsSchema = z.object({
  purchaseDate: z.string().optional(),
  legalOwner: z.string().optional(),
  owner: z.string().optional(),
  ownerOther: z.string().optional(),
  registeredKeeper: z.string().optional(),
  registeredKeeperOther: z.string().optional(),
});

// ============================================
// STEP 1: VEHICLE DETAILS VALIDATIONS (Shared across all insurance types)
// ============================================

// Validation: User must enter reg number OR manually select all vehicle details
const manualVehicleValidation = (schema) => {
  return schema
    .refine(
      (data) => {
        // If API data exists, validation passes
        if (data.apiData && data.apiData.make && data.apiData.model) {
          return true;
        }

        // Count how many manual fields are filled
        const filledFields = [
          data.type,
          data.make,
          data.model,
          data.year,
          data.doors,
          data.fuel,
          data.transmission,
        ].filter((field) => field && field.length > 0);

        // If less than 3 fields filled, user is still starting - don't show error
        // This prevents error from showing when user just selects vehicle type
        if (filledFields.length < 3) {
          return true;
        }

        // If 3+ fields filled, check if ALL required fields are complete
        const hasManualFields =
          data.type &&
          data.type.length > 0 &&
          data.make &&
          data.make.length > 0 &&
          data.model &&
          data.model.length > 0 &&
          data.year &&
          data.year.length > 0 &&
          data.doors &&
          data.doors.length > 0 &&
          data.fuel &&
          data.fuel.length > 0 &&
          data.transmission &&
          data.transmission.length > 0;
        return hasManualFields;
      },
      {
        message:
          "Please enter registration number to lookup vehicle OR manually select all vehicle details",
        path: ["type"],
      }
    )
    .refine(
      (data) => {
        if (data.apiData && data.apiData.make && data.apiData.model)
          return true;
        return data.make && data.make.length > 0;
      },
      { message: "Make is required", path: ["make"] }
    )
    .refine(
      (data) => {
        if (data.apiData && data.apiData.make && data.apiData.model)
          return true;
        return data.model && data.model.length > 0;
      },
      { message: "Model is required", path: ["model"] }
    )
    .refine(
      (data) => {
        if (data.apiData && data.apiData.make && data.apiData.model)
          return true;
        return data.year && data.year.length > 0;
      },
      { message: "Year is required", path: ["year"] }
    )
    .refine(
      (data) => {
        if (data.apiData && data.apiData.make && data.apiData.model)
          return true;
        return data.doors && data.doors.length > 0;
      },
      { message: "Doors is required", path: ["doors"] }
    )
    .refine(
      (data) => {
        if (data.apiData && data.apiData.make && data.apiData.model)
          return true;
        return data.fuel && data.fuel.length > 0;
      },
      { message: "Fuel type is required", path: ["fuel"] }
    )
    .refine(
      (data) => {
        if (data.apiData && data.apiData.make && data.apiData.model)
          return true;
        return data.transmission && data.transmission.length > 0;
      },
      { message: "Transmission is required", path: ["transmission"] }
    );
};

// Validation: Safety & Security fields (required for all insurance types)
const safetySecurityValidation = (schema) => {
  return schema
    .refine(
      (data) => data.trackingDevice && data.trackingDevice.trim().length > 0,
      {
        message: "Tracking device selection is required",
        path: ["trackingDevice"],
      }
    )
    .refine(
      (data) =>
        data.alarmImmobiliser && data.alarmImmobiliser.trim().length > 0,
      {
        message: "Alarm / Immobiliser selection is required",
        path: ["alarmImmobiliser"],
      }
    )
    .refine(
      (data) => data.importedVehicle && data.importedVehicle.trim().length > 0,
      {
        message: "Imported vehicle selection is required",
        path: ["importedVehicle"],
      }
    )
    .refine(
      (data) => data.vehicleModified && data.vehicleModified.trim().length > 0,
      {
        message: "Vehicle modification status is required",
        path: ["vehicleModified"],
      }
    )
    .refine((data) => data.worth && data.worth.trim().length > 0, {
      message: "Vehicle worth is required",
      path: ["worth"],
    });
};

// Validation: Ownership fields (required for all insurance types)
const ownershipValidation = (schema) => {
  return schema
    .refine(
      (data) => {
        if (!data.purchaseDate || data.purchaseDate.trim().length === 0) {
          if (data.legalOwner === "Yes") return true;
          return false;
        }
        return true;
      },
      { message: "Purchase date is required", path: ["purchaseDate"] }
    )
    .refine(
      (data) => {
        if (!data.purchaseDate || data.purchaseDate.trim().length === 0) {
          return data.legalOwner && data.legalOwner.trim().length > 0;
        }
        return true;
      },
      {
        message: "Please specify if you will be the legal and registered owner",
        path: ["legalOwner"],
      }
    )
    .refine(
      (data) => {
        if (data.legalOwner !== "Yes") {
          return data.owner && data.owner.trim().length > 0;
        }
        return true;
      },
      { message: "Owner selection is required", path: ["owner"] }
    )
    .refine(
      (data) => {
        if (data.legalOwner !== "Yes") {
          return (
            data.registeredKeeper && data.registeredKeeper.trim().length > 0
          );
        }
        return true;
      },
      {
        message: "Registered keeper selection is required",
        path: ["registeredKeeper"],
      }
    )
    .refine(
      (data) => {
        if (data.owner === "Other") {
          return data.ownerOther && data.ownerOther.trim().length > 0;
        }
        return true;
      },
      { message: "Please specify who the owner is", path: ["ownerOther"] }
    )
    .refine(
      (data) => {
        if (data.registeredKeeper === "Other") {
          return (
            data.registeredKeeperOther &&
            data.registeredKeeperOther.trim().length > 0
          );
        }
        return true;
      },
      {
        message: "Please specify who the registered keeper is",
        path: ["registeredKeeperOther"],
      }
    );
};

// ============================================
// COMPLETE VEHICLE SCHEMAS (Step 1 for each insurance type)
// ============================================

// Complete vehicle details schema - SAME for all insurance types (Annual, Impound, Temp)
export const completeVehicleDetailsSchema = ownershipValidation(
  safetySecurityValidation(
    manualVehicleValidation(
      baseVehicleFieldsSchema
        .merge(safetySecurityFieldsSchema)
        .merge(ownershipFieldsSchema)
    )
  )
);

// ============================================
// STEP 2: COVER DETAILS SCHEMAS
// ============================================

// Cover Details Schema - for Temporary insurance
export const tempCoverDetailsSchema = z.object({
  type: z.enum(["Hours", "Days", "Weeks", "Months", "Years"], {
    required_error: "Cover type is required",
  }),
  period: z
    .number()
    .min(1, "Period must be at least 1")
    .max(365, "Period cannot exceed 365"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid time format (HH:MM)"
    ),
});

// Cover Details Schema - for Impound insurance
export const impoundCoverDetailsSchema = z.object({
  impoundType: z.enum(
    [
      "Impound Insurance",
      "Under 21 Impound Insurance",
      "Impounded Van Insurance",
      "Banned driver impound insurance",
      "Provisional Impound Insurance",
      "Named Driver Impound Insurance",
    ],
    {
      required_error: "Please select an impound insurance type",
    }
  ),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid time format (HH:MM)"
    ),
});

// Cover Details Schema - for Annual insurance
export const annualCoverDetailsSchema = z.object({
  level: z.enum(["comprehensive", "tpft", "tpo"], {
    required_error: "Please select a cover level",
  }),
  startDate: z.string().min(1, "Start date is required"),
});

// ============================================
// STEP 2.5: OPTIONAL EXTRAS (Annual only)
// ============================================

export const optionalExtrasSchema = z
  .object({
    protectedNCD: z.boolean().nullable().optional().default(false),
    motorLegal: z.boolean().nullable().optional().default(false),
    courtesyCar: z.boolean().nullable().optional().default(false),
    breakdownCover: z.boolean().nullable().optional().default(false),
    foreignUseCover: z.boolean().nullable().optional().default(false),
  })
  .optional();

// ============================================
// STEP 3: PERSONAL DETAILS SCHEMA (Shared across all insurance types)
// ============================================

export const userDetailsSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .trim(),
    surname: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .trim(),
    email: z
      .string()
      .email("Please enter a valid email")
      .max(100, "Email cannot exceed 100 characters")
      .toLowerCase(),
    phone: z
      .string()
      .min(7, "Phone number must be at least 7 characters")
      .max(20, "Phone number cannot exceed 20 characters")
      .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    postCode: z.string().optional(),
    address: z.string().optional(),
    employmentStatus: z.string().min(1, "Employment status is required"),
    occupation: z.string().optional(),
    industry: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.employmentStatus === "Retired" ||
        data.employmentStatus === "Unemployed"
      ) {
        return true;
      }
      return (
        data.industry &&
        data.industry.trim().length > 0 &&
        data.occupation &&
        data.occupation.trim().length > 0
      );
    },
    {
      message:
        "Industry and occupation are required unless you are retired or unemployed",
      path: ["industry"],
    }
  )
  .refine(
    (data) => {
      if (
        data.employmentStatus === "Retired" ||
        data.employmentStatus === "Unemployed"
      ) {
        return true;
      }
      return data.occupation && data.occupation.trim().length > 0;
    },
    {
      message: "Occupation is required unless you are retired or unemployed",
      path: ["occupation"],
    }
  );

// ============================================
// CAR USAGE SCHEMA (Shared across all insurance types)
// ============================================

export const carUsageSchema = z.object({
  industry: z.string().optional().default(""),
  keepingCarDuringDay: z.enum(
    [
      "At home",
      "Office or factory car park",
      "Open public car park",
      "Secure public car park",
      "Street away from home",
    ],
    {
      required_error: "Please specify where you keep your car during the day",
    }
  ),
  keepingCarDuringNight: z.enum(
    [
      "Drive",
      "Street outside home",
      "Locked garage",
      "Street away from home",
      "Public car park",
      "Work car park",
      "Private property",
    ],
    {
      required_error: "Please specify where you keep your car during the night",
    }
  ),
  usageType: z.enum(
    [
      "Social use only",
      "Social and commuting",
      "Social, commuting and business",
    ],
    {
      required_error: "Please specify how you use your car",
    }
  ),
  otherVehicles: z.boolean().nullable().optional(),
  otherVehiclesType: z
    .enum([
      "Own another car or van",
      "Have use of another car",
      "Company car (including personal use)",
      "Company car (excluding personal use)",
    ])
    .optional()
    .or(z.literal(""))
    .optional(),
  hasAdditionalQualifications: z.boolean().nullable().optional(),
  additionalQualificationType: z
    .enum(["AA Proficiency", "Institute of Advanced Motorists", "Pass Plus"])
    .optional()
    .or(z.literal(""))
    .optional(),
  qualificationMonth: z.string().optional(),
  qualificationYear: z.string().optional(),
  ownsHome: z.boolean().nullable().optional(),
  childrenUnder16: z.boolean().nullable().optional(),
  livedInUKSinceBirth: z.boolean().nullable().optional(),
  licenseType: z.string().min(1, "License type is required"),
  licenseHeld: z.string().min(1, "License held is required"),
  licenseNumber: z.string().optional(),
  NCB: z.string().min(1, "No claims bonus years is required"),
  voluntaryExcess: z.string().min(1, "Voluntary excess is required"),
  criminalConvictions: z
    .boolean({
      required_error: "Please select Yes or No for criminal convictions",
      invalid_type_error: "Please select Yes or No for criminal convictions",
    })
    .nullable()
    .refine((val) => val !== null && val !== undefined, {
      message: "Please select Yes or No for criminal convictions",
    }),
  medicalConditions: z
    .boolean({
      required_error: "Please select Yes or No for medical conditions",
      invalid_type_error: "Please select Yes or No for medical conditions",
    })
    .nullable()
    .refine((val) => val !== null && val !== undefined, {
      message: "Please select Yes or No for medical conditions",
    }),
  insuranceCancelledOrClaimRefusedOrPolicyVoided: z
    .boolean({
      required_error: "Please select Yes or No for insurance history",
      invalid_type_error: "Please select Yes or No for insurance history",
    })
    .nullable()
    .refine((val) => val !== null && val !== undefined, {
      message: "Please select Yes or No for insurance history",
    }),
  hasAdditionalDrivers: z.boolean().nullable().default(null),
  additionalDrivers: z
    .array(
      z.object({
        relationship: z.string().min(1, "Relationship is required"),
        title: z.string().min(1, "Title is required"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        dateOfBirth: z.string().min(1, "Date of birth is required"),
        relationshipStatus: z
          .string()
          .min(1, "Relationship status is required"),
        livedInUKSinceBirth: z.boolean().nullable(),
        employmentStatus: z.string().min(1, "Employment status is required"),
        licenseType: z.string().min(1, "License type is required"),
        licenseHeld: z.string().min(1, "License held is required"),
        otherVehicles: z.boolean().nullable(),
        medicalConditions: z.boolean().nullable(),
        insuranceHistory: z.boolean().nullable(),
        criminalConvictions: z.boolean().nullable(),
      })
    )
    .default([])
    .optional(),
});

// ============================================
// STEP 4: TERMS SCHEMA (Shared across all insurance types)
// ============================================

export const termsSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed",
  }),
  acceptMarketing: z.boolean().default(false),
});

// ============================================
// HELPER: NCB Validation (Shared across all insurance types)
// ============================================

const ncbValidationRefine = {
  refine: (data) => {
    if (data.userDetails?.dateOfBirth && data.carUsage?.NCB) {
      const dob = new Date(data.userDetails.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      let exactAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        exactAge--;
      }

      const maxNCBYears = Math.max(0, exactAge - 17);
      const ncbValue =
        data.carUsage.NCB === "15+" ? 15 : parseInt(data.carUsage.NCB);

      if (ncbValue > maxNCBYears) {
        return false;
      }
    }
    return true;
  },
  message: "No claims bonus years cannot exceed the years since you turned 17",
  path: ["carUsage", "NCB"],
};

// ============================================
// FINAL COMPLETE SCHEMAS (One for each insurance type)
// ============================================

// TEMPORARY INSURANCE SCHEMA
export const temporaryInsuranceSchema = z
  .object({
    type: z.enum(["Temp"], {
      required_error: "Insurance type is required",
    }),
    vehicleDetails: completeVehicleDetailsSchema,
    coverDetails: tempCoverDetailsSchema,
    userDetails: userDetailsSchema.optional(),
    carUsage: carUsageSchema,
    terms: termsSchema,
  })
  .refine(ncbValidationRefine.refine, {
    message: ncbValidationRefine.message,
    path: ncbValidationRefine.path,
  });

// IMPOUND INSURANCE SCHEMA
export const impoundInsuranceSchema = z
  .object({
    type: z.literal("Impound"),
    vehicleDetails: completeVehicleDetailsSchema,
    coverDetails: impoundCoverDetailsSchema,
    userDetails: userDetailsSchema.optional(),
    carUsage: carUsageSchema,
    terms: termsSchema,
  })
  .refine(ncbValidationRefine.refine, {
    message: ncbValidationRefine.message,
    path: ncbValidationRefine.path,
  });

// ANNUAL INSURANCE SCHEMA
export const annualInsuranceSchema = z
  .object({
    type: z.enum(["Annual"], {
      required_error: "Insurance type is required",
    }),
    vehicleDetails: completeVehicleDetailsSchema,
    coverDetails: annualCoverDetailsSchema,
    optionalExtras: optionalExtrasSchema,
    userDetails: userDetailsSchema.optional(),
    carUsage: carUsageSchema,
    terms: termsSchema,
  })
  .refine(ncbValidationRefine.refine, {
    message: ncbValidationRefine.message,
    path: ncbValidationRefine.path,
  });

// ============================================
// LEGACY EXPORTS (for backward compatibility)
// ============================================

export const insuranceSchema = temporaryInsuranceSchema;
export const vehicleDetailsSchema = completeVehicleDetailsSchema;
export const coverDetailsSchema = tempCoverDetailsSchema;
export const impoundTempVehicleDetailsSchema = completeVehicleDetailsSchema;
export const annualVehicleDetailsSchema = completeVehicleDetailsSchema;

export default temporaryInsuranceSchema;
