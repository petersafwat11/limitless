import { z } from "zod";

// Personal Details Schema
const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters"),
  surname: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email")
    .max(100, "Email cannot exceed 100 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Phone number must be at least 7 characters")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  postCode: z
    .string()
    .trim()
    .min(1, "Post code is required"),
  address: z
    .string()
    .trim()
    .min(1, "Address is required"),
  employmentStatus: z
    .string()
    .trim()
    .min(1, "Employment status is required"),
  occupation: z
    .string()
    .trim()
    .min(1, "Occupation is required"),
  industry: z
    .string()
    .trim()
    .min(1, "Industry is required"),
  keepingCarDuringDay: z.enum([
    "At home",
    "Office or factory car park",
    "Open public car park",
    "Secure public car park",
    "Street away from home",
  ], {
    required_error: "Keeping car during day is required",
  }),
  keepingCarDuringNight: z.enum([
    "Drive",
    "Street outside home",
    "Locked garage",
    "Street away from home",
    "Public car park",
    "Work car park",
    "Private property",
  ], {
    required_error: "Keeping car during night is required",
  }),
  usageType: z.enum([
    "Social use only",
    "Social and commuting",
    "Social, commuting and business",
  ], {
    required_error: "Car usage is required",
  }),
  licenseType: z
    .string()
    .trim()
    .min(1, "License type is required"),
  licenseHeld: z
    .string()
    .trim()
    .min(1, "License held is required"),
  NCB: z
    .string()
    .trim()
    .min(1, "No claims bonus years is required"),
  voluntaryExcess: z
    .string()
    .trim()
    .min(1, "Voluntary excess is required"),
  criminalConvictions: z.boolean().default(false),
  medicalConditions: z.boolean().default(false),
  insuranceCancelledOrClaimRefusedOrPolicyVoided: z.boolean().default(false),
  insurance: z.string().optional(), // ObjectId reference
});

// Cover Details Schema
const coverDetailsSchema = z.object({
  type: z.enum(["Hours", "Days", "Weeks", "Months", "Years"], {
    required_error: "Cover type is required",
  }),
  period: z
    .number()
    .min(1, "Period must be at least 1")
    .max(365, "Period cannot exceed 365"),
  startDate: z
    .string()
    .trim()
    .min(1, "Start date is required"),
  startTime: z
    .string()
    .trim()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Please enter a valid time format (HH:MM)"),
  insurance: z.string().optional(), // ObjectId reference
});

// Vehicle Details Schema
const vehicleDetailsSchema = z.object({
  registrationNumber: z
    .string()
    .trim()
    .toUpperCase()
    .max(15, "Registration number cannot exceed 15 characters")
    .min(1, "Registration number is required"),
  type: z
    .string()
    .trim()
    .min(1, "Vehicle type is required"),
  make: z
    .string()
    .trim()
    .max(50, "Vehicle make cannot exceed 50 characters")
    .min(1, "Vehicle make is required"),
  model: z
    .string()
    .trim()
    .min(1, "Vehicle model is required"),
  variant: z
    .string()
    .trim()
    .min(1, "Vehicle variant is required"),
  price: z
    .string()
    .trim()
    .min(1, "Vehicle worth is required"),
  insurance: z.string().optional(), // ObjectId reference
});

// Price Schema for Quotes
const priceSchema = z.object({
  amount: z
    .number()
    .min(0, "Amount cannot be negative")
    .max(1000000, "Amount cannot exceed 1,000,000"),
  currency: z.enum([
    "GBP", "USD", "EUR", "AUD", "CAD", "CHF", "CNY", "JPY",
    "KRW", "MXN", "NZD", "RUB", "SAR", "SEK", "SGD", "THB",
    "TRY", "ZAR"
  ], {
    required_error: "Currency is required",
  }),
  vat: z.number(),
  fee: z.number(),
  total: z.number(),
});

// Quotes Schema
const quotesSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number"),
  countryCode: z
    .string()
    .trim()
    .min(1, "Country is required"),
  nationality: z
    .string()
    .trim()
    .min(1, "Nationality is required"),
  paymentMethod: z.enum(["Credit Card", "Debit Card", "Apple Pay", "Google Pay"], {
    required_error: "Payment method is required",
  }),
  price: priceSchema,
  orderRef: z
    .string()
    .trim()
    .min(1, "Order reference is required"),
  insurance: z.string().optional(), // ObjectId reference
  paid: z.boolean().default(false),
});

// Main Insurance Schema
const insuranceSchema = z.object({
  type: z.enum(["Impound", "Delivery", "Temp", "Other"], {
    required_error: "Type is required",
  }),
  coverDetails: z.union([z.string(), coverDetailsSchema]).optional(), // Can be ObjectId or full object
  personalDetails: z.union([z.string(), personalDetailsSchema]).optional(), // Can be ObjectId or full object
  vehicleDetails: z.union([z.string(), vehicleDetailsSchema]).optional(), // Can be ObjectId or full object
  quote: z.union([z.string(), quotesSchema]).optional(), // Can be ObjectId or full object
});

// Complete Insurance Schema with all nested data
const completeInsuranceSchema = z.object({
  type: z.enum(["Impound", "Delivery", "Temp", "Other"], {
    required_error: "Type is required",
  }),
  coverDetails: coverDetailsSchema,
  personalDetails: personalDetailsSchema,
  vehicleDetails: vehicleDetailsSchema,
  quote: quotesSchema,
});

// Form Schemas for Frontend (without ObjectId references)
const personalDetailsFormSchema = personalDetailsSchema.omit({ insurance: true });
const coverDetailsFormSchema = coverDetailsSchema.omit({ insurance: true });
const vehicleDetailsFormSchema = vehicleDetailsSchema.omit({ insurance: true });
const quotesFormSchema = quotesSchema.omit({ insurance: true });

// Export all schemas
export {
  insuranceSchema,
  completeInsuranceSchema,
  personalDetailsSchema,
  coverDetailsSchema,
  vehicleDetailsSchema,
  quotesSchema,
  priceSchema,
  personalDetailsFormSchema,
  coverDetailsFormSchema,
  vehicleDetailsFormSchema,
  quotesFormSchema,
};

// Export default main schema
export default insuranceSchema;
