import { z } from "zod";

// Helper function to validate date is in the past
const isPastDate = (dateString) => {
  const inputDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day
  return inputDate <= today;
};

// UK Postcode validation regex
const UK_POSTCODE_REGEX = /^([A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/i;

// Submit Claim Schema aligned with claimsModel.js
export const submitClaimSchema = z.object({
  // Claim Details Section
  claimDetails: z.object({
    policyNumber: z
      .string()
      .min(1, "Policy number is required. Please specify the policy number")
      .trim(),
    placeHolderFirstName: z
      .string()
      .min(2, "Place holder first name must be at least 2 characters")
      .max(50, "Place holder first name cannot exceed 50 characters")
      .trim(),
    placeHolderLastName: z
      .string()
      .min(2, "Place holder last name must be at least 2 characters")
      .max(50, "Place holder last name cannot exceed 50 characters")
      .trim(),
    claimentsName: z.string().trim().optional(),
    emailAddress: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email address is required")
      .trim(),
    incidentDescription: z
      .string()
      .min(10, "Incident description must be at least 10 characters")
      .max(1000, "Incident description cannot exceed 1000 characters")
      .trim(),
    incidentDate: z
      .string()
      .min(1, "Incident date is required. Please specify the incident date")
      .trim()
      .refine(
        (date) => isPastDate(date),
        "Incident date must be in the past, not in the future"
      ),
    responsible: z.boolean({
      required_error: "Please specify if you are responsible for the incident",
    }),
    detailsIfNotResponsible: z.string().default("N/A").optional(),
    vehicleLocation: z
      .string()
      .min(
        1,
        "Vehicle location is required. Please specify the vehicle location"
      )
      .trim(),
  }),

  // Third Party Details Section
  thirdPartyDetails: z.object({
    thirdPartyFullName: z
      .string()
      .min(4, "Third party full name must be at least 4 characters")
      .max(150, "Third party full name cannot exceed 150 characters")
      .trim(),
    thirdPartyPhone: z
      .string()
      .min(7, "Third party phone must be at least 7 characters")
      .max(20, "Third party phone cannot exceed 20 characters")
      .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number")
      .trim(),
    thirdPartyPostcode: z
      .string()
      .min(
        1,
        "Third party postcode is required. Please specify the third party postcode"
      )
      .trim()
      .regex(UK_POSTCODE_REGEX, "Please enter a valid UK postcode"),
    thirdPartyAddress: z
      .string()
      .min(
        1,
        "Third party address is required. Please specify the third party address"
      )
      .trim(),
    thirdPartyVehicleRegistration: z
      .string()
      .max(15, "Third party vehicle registration cannot exceed 15 characters")
      .min(1, "Third party vehicle registration is required")
      .trim(),
    thirdPartyVehicleMake: z
      .string()
      .max(50, "Third party vehicle make cannot exceed 50 characters")
      .min(1, "Third party vehicle make is required")
      .trim(),
    thirdPartyVehicleModel: z
      .string()
      .max(50, "Third party vehicle model cannot exceed 50 characters")
      .min(1, "Third party vehicle model is required")
      .trim(),
    thirdPartyDamage: z
      .string()
      .min(
        1,
        "Third party damage is required. Please specify the third party damage"
      )
      .trim(),
    drivable: z
      .string()
      .min(1, "Please specify if the vehicle is drivable")
      .trim(),
  }),

  // Claim Reason
  claimreason: z
    .string()
    .min(1, "Claim type is required. Please specify the claim type"),
});

// Flattened schema for easier form handling (matches the current form structure)
export const submitClaimFlatSchema = z.object({
  // Policy and Personal Details
  policyNumber: z.string().min(1, "Policy number is required").trim(),
  placeHolderFirstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name cannot exceed 50 characters")
    .trim(),
  placeHolderLastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name cannot exceed 50 characters")
    .trim(),
  claimentsName: z.string().trim().optional(),
  emailAddress: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email address is required")
    .trim(),

  // Incident Details
  incidentDescription: z
    .string()
    .min(10, "Incident description must be at least 10 characters")
    .max(1000, "Incident description cannot exceed 1000 characters")
    .trim(),
  incidentDate: z
    .string()
    .min(1, "Incident date is required")
    .trim()
    .refine(
      (date) => isPastDate(date),
      "Incident date must be in the past, not in the future"
    ),
  responsible: z
    .string()
    .min(1, "Please specify who is responsible")
    .transform((val) => val === "Yes" || val === "Policyholder"),
  detailsIfNotResponsible: z.string().optional(),
  vehicleLocation: z.string().min(1, "Vehicle location is required").trim(),

  // Third Party Details
  thirdPartyFullName: z
    .string()
    .min(4, "Third party full name must be at least 4 characters")
    .max(150, "Third party full name cannot exceed 150 characters")
    .trim(),
  thirdPartyPhone: z
    .string()
    .min(7, "Third party phone must be at least 7 characters")
    .max(20, "Third party phone cannot exceed 20 characters")
    .regex(/^\+?[\d\s\-()]+$/, "Please enter a valid phone number")
    .trim(),
  thirdPartyPostcode: z
    .string()
    .min(1, "Third party postcode is required")
    .trim()
    .regex(UK_POSTCODE_REGEX, "Please enter a valid UK postcode"),
  thirdPartyAddress: z
    .string()
    .min(1, "Third party address is required")
    .trim(),
  thirdPartyVehicleRegistration: z
    .string()
    .max(15, "Vehicle registration cannot exceed 15 characters")
    .min(1, "Third party vehicle registration is required")
    .trim(),
  thirdPartyVehicleMake: z
    .string()
    .max(50, "Vehicle make cannot exceed 50 characters")
    .min(1, "Third party vehicle make is required")
    .trim(),
  thirdPartyVehicleModel: z
    .string()
    .max(50, "Vehicle model cannot exceed 50 characters")
    .min(1, "Third party vehicle model is required")
    .trim(),
  thirdPartyDamage: z
    .string()
    .min(1, "Please describe the third party damage")
    .trim(),
  drivable: z
    .string()
    .min(1, "Please specify if the vehicle is drivable")
    .trim(),

  // Claim Type
  claimreason: z.string().min(1, "Claim type is required"),
});

// Transform function to convert flat form data to nested structure for API
export const transformFormDataToApiFormat = (flatData) => {
  return {
    claimDetails: {
      policyNumber: flatData.policyNumber,
      placeHolderFirstName: flatData.placeHolderFirstName,
      placeHolderLastName: flatData.placeHolderLastName,
      claimentsName: flatData.claimentsName || "",
      emailAddress: flatData.emailAddress || "",
      incidentDescription: flatData.incidentDescription,
      incidentDate: flatData.incidentDate,
      responsible: flatData.responsible,
      detailsIfNotResponsible: flatData.detailsIfNotResponsible || "N/A",
      vehicleLocation: flatData.vehicleLocation,
    },
    thirdPartyDetails: {
      thirdPartyFullName: flatData.thirdPartyFullName,
      thirdPartyPhone: flatData.thirdPartyPhone,
      thirdPartyPostcode: flatData.thirdPartyPostcode,
      thirdPartyAddress: flatData.thirdPartyAddress,
      thirdPartyVehicleRegistration: flatData.thirdPartyVehicleRegistration,
      thirdPartyVehicleMake: flatData.thirdPartyVehicleMake,
      thirdPartyVehicleModel: flatData.thirdPartyVehicleModel,
      thirdPartyDamage: flatData.thirdPartyDamage,
      drivable: flatData.drivable,
    },
    claimreason: flatData.claimreason,
  };
};
