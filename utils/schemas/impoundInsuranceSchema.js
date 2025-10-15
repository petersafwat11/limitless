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

export default impoundInsuranceSchema;
