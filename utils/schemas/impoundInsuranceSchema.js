import { z } from "zod";
import { vehicleDetailsSchema, userDetailsSchema, carUsageSchema, termsSchema } from "./insuranceSchema";

// Impound Cover Details Schema
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

// Main Impound Insurance Schema
export const impoundInsuranceSchema = z.object({
  type: z.literal("Impound"),
  vehicleDetails: vehicleDetailsSchema,
  coverDetails: impoundCoverDetailsSchema,
  userDetails: userDetailsSchema.optional(), // Optional for dashboard users
  carUsage: carUsageSchema,
  terms: termsSchema,
});

export default impoundInsuranceSchema;
