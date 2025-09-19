import { z } from "zod";

// Vehicle Details Schema
export const vehicleDetailsSchema = z.object({
  registrationNumber: z
    .string()
    .min(1, "Registration number is required")
    .max(15, "Registration number cannot exceed 15 characters")
    .transform((val) => val.toUpperCase()),
  type: z.string().min(1, "Vehicle type is required"),
  make: z
    .string()
    .min(1, "Vehicle make is required")
    .max(50, "Vehicle make cannot exceed 50 characters"),
  model: z.string().min(1, "Vehicle model is required"),
  variant: z.string().min(1, "Vehicle variant is required"),
  price: z.string().min(1, "Vehicle worth is required"),
});

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
export const userDetailsSchema = z.object({
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
  occupation: z.string().min(1, "Occupation is required"),
  industry: z.string().min(1, "Industry is required"),
});

// Car Usage Schema
export const carUsageSchema = z.object({
  industry: z.string().min(1, "Industry is required"),
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
});

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
