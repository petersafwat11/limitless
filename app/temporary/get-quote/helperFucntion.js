// Helper utilities for VehicleDetailsForm

const FIELD_HIERARCHY = [
  "make",
  "model",
  "year",
  "doors",
  "fuel",
  "transmission",
];

function getDependentFields(currentField) {
  const idx = FIELD_HIERARCHY.indexOf(currentField);
  if (idx === -1) return [];
  return FIELD_HIERARCHY.slice(idx + 1);
}

export function shouldAutoSelect(list) {
  return Array.isArray(list) && list.length === 1;
}

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

export function clearDependentFields(
  changedField,
  setValue,
  isAutoSelectingRef,
  clearErrors
) {
  const dependentFields = getDependentFields(changedField);

  isAutoSelectingRef.current = true;
  dependentFields.forEach((field) => {
    setValue(`vehicleDetails.${field}`, "", {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    if (typeof clearErrors === "function") {
      clearErrors(`vehicleDetails.${field}`);
    }
  });

  setTimeout(() => {
    isAutoSelectingRef.current = false;
  }, 50);
}

