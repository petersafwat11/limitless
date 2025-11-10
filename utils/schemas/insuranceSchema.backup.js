import { z } from "zod";

// Vehicle Details Schema with conditional validation
export const vehicleDetailsSchema = z
  .object({
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
    worth: z.string().optional(),
    // Annual insurance specific fields
    trackingDevice: z.string().optional(),
    alarmImmobiliser: z.string().optional(),
    importedVehicle: z.string().optional(),
    vehicleModified: z.string().optional(),
    vehicleModifications: z.array(z.string()).optional(),
    purchaseDate: z.string().optional(),
    legalOwner: z.string().optional(),
    owner: z.string().optional(),
    ownerOther: z.string().optional(),
    registeredKeeper: z.string().optional(),
    registeredKeeperOther: z.string().optional(),
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
  })
  .refine(
    (data) => {
      // If we have API data with required fields, validation passes
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }

      // Check if we have manual fields - all are required if no API data
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
      // Validate individual manual fields only if no API data
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }
      return data.make && data.make.length > 0;
    },
    {
      message: "Make is required",
      path: ["make"],
    }
  )
  .refine(
    (data) => {
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }
      return data.model && data.model.length > 0;
    },
    {
      message: "Model is required",
      path: ["model"],
    }
  )
  .refine(
    (data) => {
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }
      return data.year && data.year.length > 0;
    },
    {
      message: "Year is required",
      path: ["year"],
    }
  )
  .refine(
    (data) => {
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }
      return data.doors && data.doors.length > 0;
    },
    {
      message: "Doors is required",
      path: ["doors"],
    }
  )
  .refine(
    (data) => {
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }
      return data.fuel && data.fuel.length > 0;
    },
    {
      message: "Fuel type is required",
      path: ["fuel"],
    }
  )
  .refine(
    (data) => {
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }
      return data.transmission && data.transmission.length > 0;
    },
    {
      message: "Transmission is required",
      path: ["transmission"],
    }
  );

// Extended vehicle details schema for impound and temp insurance with required safety fields
export const impoundTempVehicleDetailsSchema = vehicleDetailsSchema
  .refine(
    (data) => data.trackingDevice && data.trackingDevice.trim().length > 0,
    {
      message: "Tracking device selection is required",
      path: ["trackingDevice"],
    }
  )
  .refine(
    (data) => data.alarmImmobiliser && data.alarmImmobiliser.trim().length > 0,
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
  .refine(
    (data) => data.worth && data.worth.trim().length > 0,
    {
      message: "Vehicle worth is required",
      path: ["worth"],
    }
  )
  .refine(
    (data) => {
      // If purchaseDate is empty and legalOwner is not set, then purchaseDate is required
      if (!data.purchaseDate || data.purchaseDate.trim().length === 0) {
        // Check if legalOwner exists and is "Yes" (meaning they haven't bought it yet)
        if (data.legalOwner === "Yes") {
          return true; // Valid - they haven't bought it yet
        }
        return false; // Invalid - need purchase date
      }
      return true; // Valid - has purchase date
    },
    {
      message: "Purchase date is required",
      path: ["purchaseDate"],
    }
  )
  .refine(
    (data) => {
      // If they haven't bought it yet, legalOwner must be selected
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
      // Owner is required if legalOwner is not "Yes"
      if (data.legalOwner !== "Yes") {
        return data.owner && data.owner.trim().length > 0;
      }
      return true;
    },
    {
      message: "Owner selection is required",
      path: ["owner"],
    }
  )
  .refine(
    (data) => {
      // Registered keeper is required if legalOwner is not "Yes"
      if (data.legalOwner !== "Yes") {
        return data.registeredKeeper && data.registeredKeeper.trim().length > 0;
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
      // If owner is "Other", ownerOther must be filled
      if (data.owner === "Other") {
        return data.ownerOther && data.ownerOther.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify who the owner is",
      path: ["ownerOther"],
    }
  )
  .refine(
    (data) => {
      // If registered keeper is "Other", registeredKeeperOther must be filled
      if (data.registeredKeeper === "Other") {
        return data.registeredKeeperOther && data.registeredKeeperOther.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify who the registered keeper is",
      path: ["registeredKeeperOther"],
    }
  );

// Extended vehicle details schema for annual insurance with required annual fields
export const annualVehicleDetailsSchema = vehicleDetailsSchema
  .refine(
    (data) => data.trackingDevice && data.trackingDevice.trim().length > 0,
    {
      message: "Tracking device selection is required",
      path: ["trackingDevice"],
    }
  )
  .refine(
    (data) => data.alarmImmobiliser && data.alarmImmobiliser.trim().length > 0,
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
  .refine(
    (data) => data.worth && data.worth.trim().length > 0,
    {
      message: "Vehicle worth is required",
      path: ["worth"],
    }
  )
  .refine(
    (data) => {
      // If purchaseDate is empty and legalOwner is not set, then purchaseDate is required
      if (!data.purchaseDate || data.purchaseDate.trim().length === 0) {
        // Check if legalOwner exists and is "Yes" (meaning they haven't bought it yet)
        if (data.legalOwner === "Yes") {
          return true; // Valid - they haven't bought it yet
        }
        return false; // Invalid - need purchase date
      }
      return true; // Valid - has purchase date
    },
    {
      message: "Purchase date is required",
      path: ["purchaseDate"],
    }
  )
  .refine(
    (data) => {
      // If they haven't bought it yet, legalOwner must be selected
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
      // Owner is required if legalOwner is not "Yes"
      if (data.legalOwner !== "Yes") {
        return data.owner && data.owner.trim().length > 0;
      }
      return true;
    },
    {
      message: "Owner selection is required",
      path: ["owner"],
    }
  )
  .refine(
    (data) => {
      // Registered keeper is required if legalOwner is not "Yes"
      if (data.legalOwner !== "Yes") {
        return data.registeredKeeper && data.registeredKeeper.trim().length > 0;
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
      // If owner is "Other", ownerOther must be filled
      if (data.owner === "Other") {
        return data.ownerOther && data.ownerOther.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify who the owner is",
      path: ["ownerOther"],
    }
  )
  .refine(
    (data) => {
      // If registered keeper is "Other", registeredKeeperOther must be filled
      if (data.registeredKeeper === "Other") {
        return data.registeredKeeperOther && data.registeredKeeperOther.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please specify who the registered keeper is",
      path: ["registeredKeeperOther"],
    }
  );

// Cover Details Schema - for temporary/impound insurance
export const coverDetailsSchema = z.object({
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

// Cover Details Schema - for annual insurance
export const annualCoverDetailsSchema = z.object({
  level: z.enum(["comprehensive", "tpft", "tpo"], {
    required_error: "Please select a cover level",
  }),
  startDate: z.string().min(1, "Start date is required"),
});

// User Details Schema
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
      // If employment status is Retired or Unemployed, industry and occupation can be N/A
      if (data.employmentStatus === "Retired" || data.employmentStatus === "Unemployed") {
        return true;
      }
      // Otherwise, industry and occupation are required
      return (
        data.industry &&
        data.industry.trim().length > 0 &&
        data.occupation &&
        data.occupation.trim().length > 0
      );
    },
    {
      message: "Industry and occupation are required unless you are retired or unemployed",
      path: ["industry"],
    }
  )
  .refine(
    (data) => {
      // If employment status is Retired or Unemployed, industry and occupation can be N/A
      if (data.employmentStatus === "Retired" || data.employmentStatus === "Unemployed") {
        return true;
      }
      // Otherwise, industry and occupation are required
      return data.occupation && data.occupation.trim().length > 0;
    },
    {
      message: "Occupation is required unless you are retired or unemployed",
      path: ["occupation"],
    }
  );

// Car Usage Schema
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
  otherVehiclesType: z.enum(
    [
      "Own another car or van",
      "Have use of another car",
      "Company car (including personal use)",
      "Company car (excluding personal use)",
    ]
  ).optional().or(z.literal("")).optional(),
  hasAdditionalQualifications: z.boolean().nullable().optional(),
  additionalQualificationType: z.enum(
    [
      "AA Proficiency",
      "Institute of Advanced Motorists",
      "Pass Plus",
    ]
  ).optional().or(z.literal("")).optional(),
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
  criminalConvictions: z.boolean({
    required_error: "Please select Yes or No for criminal convictions",
    invalid_type_error: "Please select Yes or No for criminal convictions",
  }).nullable().refine(val => val !== null && val !== undefined, {
    message: "Please select Yes or No for criminal convictions"
  }),
  medicalConditions: z.boolean({
    required_error: "Please select Yes or No for medical conditions",
    invalid_type_error: "Please select Yes or No for medical conditions",
  }).nullable().refine(val => val !== null && val !== undefined, {
    message: "Please select Yes or No for medical conditions"
  }),
  insuranceCancelledOrClaimRefusedOrPolicyVoided: z.boolean({
    required_error: "Please select Yes or No for insurance history",
    invalid_type_error: "Please select Yes or No for insurance history",
  }).nullable().refine(val => val !== null && val !== undefined, {
    message: "Please select Yes or No for insurance history"
  }),
  hasAdditionalDrivers: z.boolean().nullable().default(null),
  additionalDrivers: z.array(z.object({
    relationship: z.string().min(1, "Relationship is required"),
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    relationshipStatus: z.string().min(1, "Relationship status is required"),
    livedInUKSinceBirth: z.boolean().nullable(),
    employmentStatus: z.string().min(1, "Employment status is required"),
    licenseType: z.string().min(1, "License type is required"),
    licenseHeld: z.string().min(1, "License held is required"),
    otherVehicles: z.boolean().nullable(),
    medicalConditions: z.boolean().nullable(),
    insuranceHistory: z.boolean().nullable(),
    criminalConvictions: z.boolean().nullable(),
  })).default([]).optional(),
});

// Terms and Conditions Schema
export const termsSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed",
  }),
  acceptMarketing: z.boolean().default(false),
});

// Main Insurance Schema (for Temp insurance)
export const insuranceSchema = z.object({
  type: z.enum(["Impound", "Delivery", "Temp", "Other"], {
    required_error: "Insurance type is required",
  }),
  vehicleDetails: impoundTempVehicleDetailsSchema,
  coverDetails: coverDetailsSchema,
  userDetails: userDetailsSchema.optional(), // Optional for dashboard users
  carUsage: carUsageSchema,
  terms: termsSchema,
}).refine(
  (data) => {
    // Validate NCB against date of birth
    // User cannot have NCB before their 17th birthday
    if (data.userDetails?.dateOfBirth && data.carUsage?.NCB) {
      const dob = new Date(data.userDetails.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      // Calculate exact age
      let exactAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        exactAge--;
      }

      // Maximum NCB years = current age - 17 (minimum driving age)
      const maxNCBYears = Math.max(0, exactAge - 17);

      // Parse NCB value (handle "15+" case)
      const ncbValue = data.carUsage.NCB === "15+" ? 15 : parseInt(data.carUsage.NCB);

      if (ncbValue > maxNCBYears) {
        return false;
      }
    }
    return true;
  },
  {
    message: "No claims bonus years cannot exceed the years since you turned 17",
    path: ["carUsage", "NCB"],
  }
);

// Optional Extras Schema - for annual insurance
export const optionalExtrasSchema = z.object({
  protectedNCD: z.boolean().nullable().optional().default(false),
  motorLegal: z.boolean().nullable().optional().default(false),
  courtesyCar: z.boolean().nullable().optional().default(false),
  breakdownCover: z.boolean().nullable().optional().default(false),
  foreignUseCover: z.boolean().nullable().optional().default(false),
}).optional();

// Annual Insurance Schema
export const annualInsuranceSchema = z.object({
  type: z.enum(["Annual"], {
    required_error: "Insurance type is required",
  }),
  vehicleDetails: annualVehicleDetailsSchema,
  coverDetails: annualCoverDetailsSchema,
  optionalExtras: optionalExtrasSchema,
  userDetails: userDetailsSchema.optional(), // Optional for dashboard users
  carUsage: carUsageSchema,
  terms: termsSchema,
}).refine(
  (data) => {
    // Validate NCB against date of birth
    // User cannot have NCB before their 17th birthday
    if (data.userDetails?.dateOfBirth && data.carUsage?.NCB) {
      const dob = new Date(data.userDetails.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();

      // Calculate exact age
      let exactAge = age;
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        exactAge--;
      }

      // Maximum NCB years = current age - 17 (minimum driving age)
      const maxNCBYears = Math.max(0, exactAge - 17);

      // Parse NCB value (handle "15+" case)
      const ncbValue = data.carUsage.NCB === "15+" ? 15 : parseInt(data.carUsage.NCB);

      if (ncbValue > maxNCBYears) {
        return false;
      }
    }
    return true;
  },
  {
    message: "No claims bonus years cannot exceed the years since you turned 17",
    path: ["carUsage", "NCB"],
  }
);

// Schema for dashboard users (without userDetails)
export const dashboardInsuranceSchema = z.object({
  type: z.enum(["Impound", "Delivery", "Temp", "Other"], {
    required_error: "Insurance type is required",
  }),
  vehicleDetails: vehicleDetailsSchema,
  coverDetails: coverDetailsSchema,
  carUsage: carUsageSchema,
  terms: termsSchema,
});

export default insuranceSchema;
