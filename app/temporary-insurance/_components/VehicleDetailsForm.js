"use client";
import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDropdown from "@/ui/inputs/FormDropdown";
import Title from "@/ui/insurance-quotes/title/Title";
import styles from "./components.module.css";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import { API_BASE_URL } from "@/utils/config";
import {
  buildVehicleQuery,
  clearDependentFields,
  shouldAutoSelect,
  getFieldOptions,
  getNextFieldToFill,
  getFieldsToAutoFill,
  isVehicleComplete,
  needsMoreData,
  logVehicleState,
} from "../helperFucntion";

// Simple state for vehicle data
const initialState = {
  makes: [],
  models: [],
  years: [],
  doors: [],
  fuels: [],
  transmissions: [],
  loading: false,
  error: null,
};

const vehicleReducer = (state, action) => {
  switch (action.type) {
    // case "SET_LOADING":
    //   return { ...state, loading: action.payload };
    case "SET_MAKES":
      return { ...state, makes: action.payload, loading: false };
    case "SET_OPTIONS":
      return {
        ...state,
        models: action.payload.models || [],
        years: action.payload.years || [],
        doors: action.payload.doors || [],
        fuels: action.payload.fuel || [],
        transmissions: action.payload.transmissions || [],
        loading: false,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "CLEAR_OPTIONS":
      return {
        ...state,
        models: [],
        years: [],
        doors: [],
        fuels: [],
        transmissions: [],
      };
    default:
      return state;
  }
};

// Vehicle worth options
const vehicleWorthOptions = [
  "Under £5,000",
  "£5,000 - £10,000",
  "£10,000 - £20,000",
  "£20,000 - £30,000",
  "£30,000 - £50,000",
  "Over £50,000",
];

const VehicleDetailsForm = ({ form }) => {
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [isLoadingVehicleData, setIsLoadingVehicleData] = useState(false);
  const [state, dispatch] = useReducer(vehicleReducer, initialState);
  const [forceUpdate, setForceUpdate] = useState(0);
  const isAutoSelectingRef = useRef(false);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
    trigger,
    clearErrors,
  } = form;

  // Watch all form values
  const selectedMake = watch("vehicleDetails.make");
  const selectedModel = watch("vehicleDetails.model");
  const selectedYear = watch("vehicleDetails.year");
  const selectedDoors = watch("vehicleDetails.doors");
  const selectedFuel = watch("vehicleDetails.fuel");

  const toggleVehicleDetails = () => {
    setShowVehicleDetails(!showVehicleDetails);
  };

  // Fetch makes on component mount
  const fetchMakes = useCallback(async () => {
    console.log("🔄 Fetching makes...");
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicle-models/makes`);
      if (response.ok) {
        const result = await response.json();
        const makes = result.data || [];

        console.log("📡 Makes received:", {
          count: makes.length,
          makes: makes.slice(0, 10), // Show first 10 makes
          total: makes.length > 10 ? `... and ${makes.length - 10} more` : "",
        });

        dispatch({ type: "SET_MAKES", payload: makes });

        // Auto-select if only one make
        if (shouldAutoSelect(makes)) {
          console.log("✅ Auto-selecting single make:", makes[0]);
          setValue("vehicleDetails.make", makes[0]);
        }
      }
    } catch (error) {
      console.error("❌ Error fetching makes:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [setValue]);

  // Main function to fetch vehicle options and handle auto-selection
  const fetchVehicleOptions = useCallback(async () => {
    const queryString = buildVehicleQuery(watch);
    if (!queryString) return;

    // Log current state before API call
    logVehicleState(watch, "Before API Call");
    console.log(
      "🔄 API Request:",
      `${API_BASE_URL}/api/vehicle-models/options?${queryString}`
    );

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/vehicle-models/options?${queryString}`
      );
      if (response.ok) {
        const result = await response.json();
        const options = result.data || {};
        const resolved = result.resolved;

        // Log API response
        console.group("📡 API Response");
        console.log("Options received:", options);
        console.log("Resolved record:", resolved);
        console.log("Available counts:", {
          models: options.models?.length || 0,
          years: options.years?.length || 0,
          doors: options.doors?.length || 0,
          fuel: options.fuel?.length || 0,
          transmissions: options.transmissions?.length || 0,
        });
        console.groupEnd();

        // Normalize options so selects always contain selected values
        const normalizedOptions = {
          models: Array.isArray(options.models) ? [...options.models] : [],
          years: Array.isArray(options.years) ? [...options.years] : [],
          doors: Array.isArray(options.doors) ? [...options.doors] : [],
          fuel: Array.isArray(options.fuel) ? [...options.fuel] : [],
          transmissions: Array.isArray(options.transmissions)
            ? [...options.transmissions]
            : [],
        };

        // If we have a resolved single record, ensure its values exist in the lists
        if (resolved) {
          if (
            resolved.model &&
            !normalizedOptions.models.includes(resolved.model)
          ) {
            normalizedOptions.models.push(resolved.model);
          }
          if (
            resolved.year &&
            !normalizedOptions.years.includes(resolved.year)
          ) {
            normalizedOptions.years.push(resolved.year);
          }
          if (
            resolved.doors &&
            !normalizedOptions.doors.includes(resolved.doors)
          ) {
            normalizedOptions.doors.push(resolved.doors);
          }
          if (
            resolved.fuel &&
            !normalizedOptions.fuel.includes(resolved.fuel)
          ) {
            normalizedOptions.fuel.push(resolved.fuel);
          }
          if (
            resolved.transmission &&
            !normalizedOptions.transmissions.includes(resolved.transmission)
          ) {
            normalizedOptions.transmissions.push(resolved.transmission);
          }
        }

        // Update all options with normalized lists
        dispatch({ type: "SET_OPTIONS", payload: normalizedOptions });

        // Handle auto-selection based on resolved record or single options
        if (resolved) {
          console.log(
            "🎯 Single record found - auto-filling all remaining fields:",
            resolved
          );

          // Get all fields that need to be filled (empty fields in hierarchy order)
          const fieldsToFill = getFieldsToAutoFill(watch);
          const fieldsSet = [];

          console.log("📝 Fields to auto-fill:", fieldsToFill);

          // Set auto-selecting flag to prevent useEffect loops
          isAutoSelectingRef.current = true;

          // Fill all remaining fields from the resolved record
          fieldsToFill.forEach((field) => {
            if (resolved[field]) {
              console.log(`✅ Auto-setting ${field}:`, resolved[field]);
              setValue(`vehicleDetails.${field}`, resolved[field], {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
              fieldsSet.push(`vehicleDetails.${field}`);
            }
          });

          // Trigger validation for all set fields
          if (fieldsSet.length > 0) {
            trigger(fieldsSet);
          }

          // Reset the flag after a short delay to allow form updates
          setTimeout(() => {
            isAutoSelectingRef.current = false;
            console.log("🔄 Auto-selection complete, form should be updated");

            // Debug: Check if form values are actually set
            console.log("🔍 Form values after auto-fill:", {
              make: watch("vehicleDetails.make"),
              model: watch("vehicleDetails.model"),
              year: watch("vehicleDetails.year"),
              doors: watch("vehicleDetails.doors"),
              fuel: watch("vehicleDetails.fuel"),
              transmission: watch("vehicleDetails.transmission"),
            });

            // Log final state to verify
            logVehicleState(watch, "After Auto-Fill Complete");

            // Force a re-render to ensure UI updates
            setForceUpdate((prev) => prev + 1);
          }, 100);
        } else {
          // No resolved record - check for single options in hierarchy order
          console.log("🔄 Multiple records - checking for single options");

          // Get the next field that should be filled
          const nextField = getNextFieldToFill(watch);

          if (nextField) {
            console.log(`📍 Next field to check: ${nextField.field}`);

            const fieldOptions = getFieldOptions(options, nextField.field);

            if (shouldAutoSelect(fieldOptions)) {
              console.log(
                `🔄 Auto-selecting ${nextField.field}:`,
                fieldOptions[0]
              );
              // We want to continue cascading automatically until completion.
              // Set the value, then immediately re-fetch options to see if we can
              // auto-select the remaining fields without user interaction.
              isAutoSelectingRef.current = true;
              setValue(`vehicleDetails.${nextField.field}`, fieldOptions[0], {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
              await trigger([`vehicleDetails.${nextField.field}`]);
              // Recurse: re-fetch with the newly selected value to continue cascade
              await fetchVehicleOptions();
              return; // Stop further processing in this tick
            } else {
              console.log(
                `⏸️ ${nextField.field} has multiple options:`,
                fieldOptions.length
              );
            }
          } else {
            console.log("✅ All fields are already filled");
          }
        }

        // Log final state after processing
        logVehicleState(watch, "After API Processing");
      }
    } catch (error) {
      console.error("❌ Error fetching vehicle options:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [watch, setValue, trigger]);

  // Track the last query to avoid duplicate requests
  const lastQueryRef = useRef("");
  const lastResolvedRef = useRef(false);

  // Load makes on mount
  useEffect(() => {
    fetchMakes();
  }, [fetchMakes]);

  // Smart useEffect that only triggers when we actually need new data
  useEffect(() => {
    // Log every time useEffect is triggered
    console.log("🔄 useEffect triggered with values:", {
      selectedMake,
      selectedModel,
      selectedYear,
      selectedDoors,
      selectedFuel,
      isAutoSelecting: isAutoSelectingRef.current,
    });

    if (isAutoSelectingRef.current) {
      console.log("⏸️ Skipping - auto-selection in progress");
      return;
    }

    // Build queries and detect changed field first, so we can clear dependents even when complete
    const currentQuery = buildVehicleQuery(watch);
    const previousQuery = lastQueryRef.current;
    const previousParams = new URLSearchParams(previousQuery);
    const currentParams = new URLSearchParams(currentQuery);

    let changedField = null;
    if (previousParams.get("make") !== currentParams.get("make")) {
      changedField = "make";
      console.log("🔄 Make changed - clearing all dependent fields");
      clearDependentFields("make", setValue, isAutoSelectingRef, clearErrors);
      dispatch({ type: "CLEAR_OPTIONS" });
    } else if (previousParams.get("model") !== currentParams.get("model")) {
      changedField = "model";
      console.log("🔄 Model changed - clearing dependent fields");
      clearDependentFields("model", setValue, isAutoSelectingRef, clearErrors);
    } else if (previousParams.get("year") !== currentParams.get("year")) {
      changedField = "year";
      console.log("🔄 Year changed - clearing dependent fields");
      clearDependentFields("year", setValue, isAutoSelectingRef, clearErrors);
    } else if (previousParams.get("doors") !== currentParams.get("doors")) {
      changedField = "doors";
      console.log("🔄 Doors changed - clearing dependent fields");
      clearDependentFields("doors", setValue, isAutoSelectingRef, clearErrors);
    } else if (previousParams.get("fuel") !== currentParams.get("fuel")) {
      changedField = "fuel";
      console.log("🔄 Fuel changed - clearing dependent fields");
      clearDependentFields("fuel", setValue, isAutoSelectingRef, clearErrors);
    }

    // Update last query snapshot
    lastQueryRef.current = currentQuery;

    // If no make selected after change, stop here
    if (!selectedMake) {
      console.log("⏸️ Skipping fetch - no make selected after change");
      lastResolvedRef.current = false;
      return;
    }

    // If query hasn't changed and no field changed, skip duplicate request
    if (!changedField && currentQuery === previousQuery) {
      console.log("⏸️ Skipping - query unchanged:", currentQuery);
      return;
    }

    // If vehicle is already complete and nothing changed, skip
    if (!changedField && isVehicleComplete(watch)) {
      console.log("⏸️ Skipping - vehicle selection complete");
      return;
    }

    // If we don't need more data, skip
    if (!needsMoreData(watch)) {
      console.log("⏸️ Skipping - don't need more data");
      return;
    }

    console.log("🚀 Proceeding with fetch - query changed:", {
      previous: previousQuery,
      current: currentQuery,
    });

    // Log current vehicle state before fetch
    logVehicleState(watch, "useEffect - Triggering Fetch");

    // Fetch new options
    fetchVehicleOptions();
  }, [
    selectedMake,
    selectedModel,
    selectedYear,
    selectedDoors,
    selectedFuel,
    fetchVehicleOptions,
    watch,
    setValue,
    clearErrors,
  ]);

  const handleFindVehicle = async () => {
    const registrationNumber = watch("vehicleDetails.registrationNumber");

    if (!registrationNumber?.trim()) {
      setError("vehicleDetails.registrationNumber", {
        message: "Please enter a registration number",
      });
      return;
    }

    setIsLoadingVehicleData(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/insurance/car-insurance-group/${encodeURIComponent(
          registrationNumber.trim()
        )}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch vehicle data");
      }

      const result = await response.json();

      if (result.status === "success" && result.data) {
        setValue("vehicleDetails.make", result.data.make || "");
        setValue("vehicleDetails.model", result.data.model || "");
        setValue("vehicleDetails.type", "Car");
        setShowVehicleDetails(true);
        console.log("Vehicle data fetched successfully:", result.data);
      } else {
        throw new Error("No vehicle data found");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setError("vehicleDetails.registrationNumber", {
        message: error.message || "Failed to fetch vehicle data",
      });
    } finally {
      setIsLoadingVehicleData(false);
    }
  };

  return (
    <ComponentWrapper title="Vehicle Details">
      <div className={styles.content}>
        <div className={styles.first}>
          <FormTextInput
            reg={true}
            label="Registration Number"
            placeholder="Enter your Registration number"
            {...register("vehicleDetails.registrationNumber")}
            error={errors.vehicleDetails?.registrationNumber}
            button={
              <ConfirmBtn
                title={isLoadingVehicleData ? "Loading..." : "Find Vehicle"}
                onClick={handleFindVehicle}
                disabled={isLoadingVehicleData}
                type="button"
              />
            }
          />
          <button
            type="button"
            className={styles.regBtn}
            onClick={toggleVehicleDetails}
          >
            {`Don't know the reg yet?`}
          </button>
        </div>

        <Title title="What type of vehicle is it?" />

        <div
          className={`${styles.vehicleDetailsContainer} ${
            showVehicleDetails
              ? styles.vehicleDetailsVisible
              : styles.vehicleDetailsHidden
          }`}
        >
          <div className={styles.rows}>
            <div className={styles.row}>
              <FormDropdown
                label="My Vehicle is a...."
                options={["Car", "Motorcycle", "Truck", "Bus"]}
                placeholder="Choose Vehicle"
                {...register("vehicleDetails.type")}
                error={errors.vehicleDetails?.type}
              />
              <FormDropdown
                label="Make"
                options={state.makes}
                placeholder={state.loading ? "Loading makes..." : "Choose Make"}
                disabled={state.loading}
                value={selectedMake || ""}
                {...register("vehicleDetails.make")}
                error={errors.vehicleDetails?.make}
              />
            </div>
            <div className={styles.row}>
              <FormDropdown
                label="Model"
                options={state.models}
                placeholder={
                  state.loading
                    ? "Loading models..."
                    : !selectedMake
                    ? "Select make first"
                    : "Choose Model"
                }
                disabled={state.loading || !selectedMake}
                value={selectedModel || ""}
                {...register("vehicleDetails.model", {
                  required: selectedMake ? "Please select a model" : false,
                })}
                error={errors.vehicleDetails?.model}
              />
              <FormDropdown
                label="Year"
                options={state.years}
                placeholder={
                  state.loading
                    ? "Loading years..."
                    : !selectedModel
                    ? "Select model first"
                    : "Choose Year"
                }
                disabled={state.loading || !selectedModel}
                value={selectedYear || ""}
                {...register("vehicleDetails.year")}
                error={errors.vehicleDetails?.year}
              />
            </div>
            <div className={styles.row}>
              <FormDropdown
                label="Doors"
                options={state.doors}
                placeholder={
                  state.loading
                    ? "Loading doors..."
                    : !selectedYear
                    ? "Select year first"
                    : state.doors.length === 0
                    ? "No options available"
                    : "Choose Doors"
                }
                disabled={
                  state.loading || !selectedYear || state.doors.length === 0
                }
                value={selectedDoors || ""}
                {...register("vehicleDetails.doors")}
                error={errors.vehicleDetails?.doors}
              />
              <FormDropdown
                label="Fuel Type"
                options={state.fuels}
                placeholder={
                  state.loading
                    ? "Loading fuel types..."
                    : !selectedDoors
                    ? "Select doors first"
                    : state.fuels.length === 0
                    ? "No options available"
                    : "Choose Fuel Type"
                }
                disabled={
                  state.loading || !selectedDoors || state.fuels.length === 0
                }
                value={selectedFuel || ""}
                {...register("vehicleDetails.fuel")}
                error={errors.vehicleDetails?.fuel}
              />
            </div>
            <div className={styles.row}>
              <FormDropdown
                label="Transmission"
                options={state.transmissions}
                placeholder={
                  state.loading
                    ? "Loading transmissions..."
                    : !selectedFuel
                    ? "Select fuel type first"
                    : state.transmissions.length === 0
                    ? "No options available"
                    : "Choose Transmission"
                }
                disabled={
                  state.loading ||
                  !selectedFuel ||
                  state.transmissions.length === 0
                }
                value={watch("vehicleDetails.transmission") || ""}
                {...register("vehicleDetails.transmission")}
                error={errors.vehicleDetails?.transmission}
              />
              <FormDropdown
                label="How much is your vehicle worth?"
                options={vehicleWorthOptions}
                placeholder="Choose Price Range"
                {...register("vehicleDetails.worth")}
                error={errors.vehicleDetails?.worth}
              />
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetailsForm;
