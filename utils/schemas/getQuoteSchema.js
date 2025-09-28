import { z } from "zod";

export const getQuoteSchema = z
  .object({
    // Vehicle identification - either registration OR manual details
    vehicleIdentification: z.object({
      registrationNumber: z.string().optional(),
      vehicleType: z.string().optional(),
      make: z.string().optional(),
      model: z.string().optional(),
      year: z.string().optional(),
    }),

    // Duration selection
    duration: z.object({
      // Quick selection (1 Day, 2 Days, 1 Week)
      quickSelection: z.string().optional(),

      // Custom duration
      customDuration: z
        .object({
          type: z.enum(["Hours", "Days", "Weeks"]).optional(),
          value: z.string().optional(),
        })
        .optional(),
    }),
  })
  .refine(
    (data) => {
      // At least registration number OR all vehicle details must be provided
      const hasRegistration =
        data.vehicleIdentification.registrationNumber?.trim();
      const hasVehicleDetails =
        data.vehicleIdentification.vehicleType &&
        data.vehicleIdentification.make &&
        data.vehicleIdentification.model &&
        data.vehicleIdentification.year;

      return hasRegistration || hasVehicleDetails;
    },
    {
      message:
        "Either registration number or complete vehicle details are required",
      path: ["vehicleIdentification"],
    }
  )
  .refine(
    (data) => {
      // At least one duration option must be selected
      const hasQuickSelection = data.duration.quickSelection;
      const hasCustomDuration =
        data.duration.customDuration?.type &&
        data.duration.customDuration?.value;

      return hasQuickSelection || hasCustomDuration;
    },
    {
      message: "Duration selection is required",
      path: ["duration"],
    }
  );
