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
    worth: z.string().optional(), // Made optional - will be validated conditionally
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

      // Check if we have manual fields (registration number is optional)
      const hasManualFields =
        data.type &&
        data.type.length > 0 &&
        data.make &&
        data.make.length > 0 &&
        data.model &&
        data.model.length > 0;

      return hasManualFields;
    },
    {
      message:
        "Please fill in vehicle details: type, make, and model are required (registration number is optional)",
      path: ["type"],
    }
  )
  .refine(
    (data) => {
      // If we have API data, worth is not required
      if (data.apiData && data.apiData.make && data.apiData.model) {
        return true;
      }
      // Otherwise, worth is required
      return data.worth && data.worth.trim().length > 0;
    },
    {
      message: "Vehicle worth is required when entering manual vehicle details",
      path: ["worth"],
    }
  );

// Cover Details Schema
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
    postCode: z.string().min(1, "Post code is required"),
    address: z.string().min(1, "Address is required"),
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
  licenseType: z.string().min(1, "License type is required"),
  licenseHeld: z.string().min(1, "License held is required"),
  licenseNumber: z.string().optional(),
  NCB: z.string().min(1, "No claims bonus years is required"),
  voluntaryExcess: z.string().min(1, "Voluntary excess is required"),
  criminalConvictions: z.boolean().default(false),
  medicalConditions: z.boolean().default(false),
  insuranceCancelledOrClaimRefusedOrPolicyVoided: z.boolean().default(false),
});

// Terms and Conditions Schema
export const termsSchema = z.object({
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to proceed",
  }),
  acceptMarketing: z.boolean().default(false),
});

// Main Insurance Schema
export const insuranceSchema = z.object({
  type: z.enum(["Impound", "Delivery", "Temp", "Other"], {
    required_error: "Insurance type is required",
  }),
  vehicleDetails: vehicleDetailsSchema,
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
