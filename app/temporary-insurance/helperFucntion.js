// Helper utilities for VehicleDetailsForm

// Correct hierarchy order - bottom ones depend on top ones
export const FIELD_HIERARCHY = [
  "make",
  "model",
  "year",
  "doors",
  "fuel",
  "transmission",
];

// Get fields that depend on the current field (all fields below it in hierarchy)
export function getDependentFields(currentField) {
  const idx = FIELD_HIERARCHY.indexOf(currentField);
  if (idx === -1) return [];
  return FIELD_HIERARCHY.slice(idx + 1);
}

// Check if we should auto-select (exactly one option)
export function shouldAutoSelect(list) {
  return Array.isArray(list) && list.length === 1;
}

// Build query parameters for vehicle options API
export function buildVehicleQuery(watch) {
  const params = new URLSearchParams();
  const make = watch("vehicleDetails.make");
  const model = watch("vehicleDetails.model");
  const year = watch("vehicleDetails.year");
  const doors = watch("vehicleDetails.doors");
  const fuel = watch("vehicleDetails.fuel");

  if (make) params.append("make", make);
  if (model) params.append("model", model);
  if (year) params.append("year", year);
  if (doors) params.append("doors", doors);
  if (fuel) params.append("fuel", fuel);

  return params.toString();
}

// Clear dependent fields when a parent field changes
export function clearDependentFields(
  changedField,
  setValue,
  isAutoSelectingRef,
  clearErrors
) {
  const dependentFields = getDependentFields(changedField);

  console.log(
    `🧹 Clearing dependent fields for ${changedField}:`,
    dependentFields
  );

  isAutoSelectingRef.current = true;
  dependentFields.forEach((field) => {
    console.log(`🧹 Clearing ${field}`);
    setValue(`vehicleDetails.${field}`, "", {
      // Do NOT validate/touch when clearing programmatically
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    // Clear any previous validation errors for this field
    if (typeof clearErrors === "function") {
      clearErrors(`vehicleDetails.${field}`);
    }
  });

  // Reset flag after a short delay
  setTimeout(() => {
    isAutoSelectingRef.current = false;
  }, 50);
}

// Auto-fill fields when we have exactly one record
export function autoFillFields(
  record,
  currentLevel,
  setValue,
  isAutoSelectingRef
) {
  if (!record) return;

  const fieldsToFill = FIELD_HIERARCHY.slice(currentLevel);

  try {
    isAutoSelectingRef.current = true;
    fieldsToFill.forEach((field) => {
      if (record[field]) {
        setValue(`vehicleDetails.${field}`, record[field]);
      }
    });
  } finally {
    isAutoSelectingRef.current = false;
  }
}

// Find the next field that needs user selection (has multiple options)
export function findNextSelectionField(options, currentField) {
  const currentIdx = FIELD_HIERARCHY.indexOf(currentField);
  const remainingFields = FIELD_HIERARCHY.slice(currentIdx + 1);

  for (const field of remainingFields) {
    const fieldOptions = getFieldOptions(options, field);
    if (fieldOptions && fieldOptions.length > 1) {
      return field;
    }
  }
  return null;
}

// Get options for a specific field from the API response
export function getFieldOptions(options, field) {
  const mapping = {
    model: options.models,
    year: options.years,
    doors: options.doors,
    fuel: options.fuel,
    transmission: options.transmissions,
  };
  return mapping[field] || [];
}

// Get the current selection level (how far down the hierarchy we are)
export function getCurrentLevel(watch) {
  for (let i = FIELD_HIERARCHY.length - 1; i >= 0; i--) {
    const field = FIELD_HIERARCHY[i];
    if (watch(`vehicleDetails.${field}`)) {
      return i + 1;
    }
  }
  return 0;
}

// Get the next field that should be filled in the hierarchy
export function getNextFieldToFill(watch) {
  for (let i = 0; i < FIELD_HIERARCHY.length; i++) {
    const field = FIELD_HIERARCHY[i];
    if (!watch(`vehicleDetails.${field}`)) {
      return { field, index: i };
    }
  }
  return null; // All fields are filled
}

// Get all fields that should be auto-filled from a resolved record
export function getFieldsToAutoFill(watch) {
  const fieldsToFill = [];

  for (let i = 0; i < FIELD_HIERARCHY.length; i++) {
    const field = FIELD_HIERARCHY[i];
    if (!watch(`vehicleDetails.${field}`)) {
      fieldsToFill.push(field);
    }
  }

  return fieldsToFill;
}

// Check if all vehicle fields are selected (complete selection)
export function isVehicleComplete(watch) {
  return FIELD_HIERARCHY.every((field) =>
    Boolean(watch(`vehicleDetails.${field}`))
  );
}

// Check if we need to fetch more data based on current selection
export function needsMoreData(watch) {
  // If we have make but not model, we need data
  if (watch("vehicleDetails.make") && !watch("vehicleDetails.model")) {
    return true;
  }

  // If we have make+model but missing other fields, we might need data
  // (unless they were auto-filled from a resolved record)
  if (watch("vehicleDetails.make") && watch("vehicleDetails.model")) {
    const hasYear = watch("vehicleDetails.year");
    const hasDoors = watch("vehicleDetails.doors");
    const hasFuel = watch("vehicleDetails.fuel");
    const hasTransmission = watch("vehicleDetails.transmission");

    // If any field is missing, we might need more data
    return !hasYear || !hasDoors || !hasFuel || !hasTransmission;
  }

  return false;
}

// Log current vehicle selection state
export function logVehicleState(watch, context = "") {
  const vehicleData = {
    make: watch("vehicleDetails.make") || "",
    model: watch("vehicleDetails.model") || "",
    year: watch("vehicleDetails.year") || "",
    doors: watch("vehicleDetails.doors") || "",
    fuel: watch("vehicleDetails.fuel") || "",
    transmission: watch("vehicleDetails.transmission") || "",
  };

  console.group(`🚗 Vehicle Selection ${context ? `- ${context}` : ""}`);
  console.log("Current Values:", vehicleData);
  console.log("Complete:", isVehicleComplete(watch));
  console.log("Needs More Data:", needsMoreData(watch));
  console.groupEnd();

  return vehicleData;
}
