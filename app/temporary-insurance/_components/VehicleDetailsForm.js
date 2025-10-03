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
} from "../helperFucntion";
import axios from "axios";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

// Simplified state for vehicle data
const initialState = {
  makes: [],
  error: null,
  // Dynamic options based on backend response
  options: {
    models: [],
    years: [],
    doors: [],
    fuels: [],
    transmissions: [],
  },
  // Current form values for controlled components
  values: {
    make: "",
    model: "",
    year: "",
    doors: "",
    fuel: "",
    transmission: "",
  },
};

const vehicleReducer = (state, action) => {
  switch (action.type) {
    case "SET_MAKES":
      return { ...state, makes: action.payload };
    case "SET_VEHICLE_DATA":
      return {
        ...state,
        options: action.payload.options || state.options,
        values: { ...state.values, ...(action.payload.values || {}) },
        error: null,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_OPTIONS":
      return {
        ...state,
        options: {
          models: [],
          years: [],
          doors: [],
          fuels: [],
          transmissions: [],
        },
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
const carColors = [
  "White",
  "Black",
  "Gray",
  "Silver",
  "Blue",
  "Red",
  "Green",
  "Brown",
  "Orange",
  "Beige",
  "Purple",
  "Gold",
  "Yellow",
];

const VehicleDetailsForm = ({ form, onVehicleDataFound }) => {
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [isLoadingVehicleData, setIsLoadingVehicleData] = useState(false);
  const [state, dispatch] = useReducer(vehicleReducer, initialState);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [showFoundData, setShowFoundData] = useState(false);
  const isAutoSelectingRef = useRef(false);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
    trigger,
    clearErrors,
    reset,
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

  // Handle dropdown value changes
  const handleDropdownChange = (field, value) => {
    console.log(`🔄 User changed ${field} to:`, value);

    // Update React Hook Form
    setValue(`vehicleDetails.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    // Update local state in a single dispatch
    dispatch({
      type: "SET_VEHICLE_DATA",
      payload: {
        values: { [field]: value },
        options: state.options, // Keep existing options
      },
    });
  };

  // Fetch makes on component mount
  const fetchMakes = useCallback(async () => {
    console.log("🔄 Fetching makes...");
    try {
      const response = await fetch(`${API_BASE_URL}/api/vehicle-models/makes`);
      if (response.ok) {
        const result = await response.json();
        const makes = result.data || [];

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

  // Simplified function to fetch vehicle data from backend
  const fetchVehicleData = useCallback(async () => {
    const queryString = buildVehicleQuery(watch);
    if (!queryString) return;

    console.log("🔄 Fetching vehicle data:", queryString);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/vehicle-models/options?${queryString}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Failed to fetch vehicle data`
        );
      }

      const result = await response.json();
      console.log("📡 Backend response:", result);

      if (result.status === "success") {
        const { options, autoSelect } = result.data;
        const isComplete = result.complete;

        console.log("📡 Backend response - Options:", options);
        console.log("📡 Backend response - AutoSelect:", autoSelect);

        // Update dropdown options first (always available)
        const optionsToUpdate = {
          models: options?.models || [],
          years: options?.years || [],
          doors: options?.doors || [],
          fuels: options?.fuel || [],
          transmissions: options?.transmissions || [],
        };

        // Ensure auto-selected values are included in options
        if (autoSelect) {
          Object.keys(autoSelect).forEach((field) => {
            const value = autoSelect[field];
            const optionKey = field === "fuel" ? "fuels" : `${field}s`;

            if (field === "model" && !optionsToUpdate.models.includes(value)) {
              optionsToUpdate.models.push(value);
            } else if (
              field === "year" &&
              !optionsToUpdate.years.includes(value)
            ) {
              optionsToUpdate.years.push(value);
            } else if (
              field === "doors" &&
              !optionsToUpdate.doors.includes(value)
            ) {
              optionsToUpdate.doors.push(value);
            } else if (
              field === "fuel" &&
              !optionsToUpdate.fuels.includes(value)
            ) {
              optionsToUpdate.fuels.push(value);
            } else if (
              field === "transmission" &&
              !optionsToUpdate.transmissions.includes(value)
            ) {
              optionsToUpdate.transmissions.push(value);
            }
          });
        }

        // Handle auto-selection and prepare single state update
        let valuesToUpdate = {};
        let fieldsToTrigger = [];

        if (autoSelect && Object.keys(autoSelect).length > 0) {
          console.log(
            "🎯 Processing auto-selections (all at once):",
            autoSelect
          );

          isAutoSelectingRef.current = true;

          // Collect all values to update
          Object.keys(autoSelect).forEach((field) => {
            const value = autoSelect[field];
            console.log(`✅ Auto-selecting ${field}:`, value);
            valuesToUpdate[field] = value;
            fieldsToTrigger.push(`vehicleDetails.${field}`);
          });

          console.log("🎯 Auto-selected all fields at once:", valuesToUpdate);
        }

        // SINGLE STATE UPDATE - update everything at once
        dispatch({
          type: "SET_VEHICLE_DATA",
          payload: {
            values: valuesToUpdate,
            options: optionsToUpdate,
          },
        });

        // Update React Hook Form for auto-selected fields
        if (Object.keys(valuesToUpdate).length > 0) {
          Object.keys(valuesToUpdate).forEach((field) => {
            setValue(`vehicleDetails.${field}`, valuesToUpdate[field], {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          });

          // Trigger validation for all auto-selected fields at once
          if (fieldsToTrigger.length > 0) {
            trigger(fieldsToTrigger);
          }
        }

        // Single force update
        setForceUpdate((prev) => prev + 1);

        // Reset auto-selecting flag
        if (isAutoSelectingRef.current) {
          setTimeout(() => {
            isAutoSelectingRef.current = false;
          }, 100);
        }
      } else {
        throw new Error(result.message || "Failed to fetch vehicle data");
      }
    } catch (error) {
      console.error("❌ Error fetching vehicle data:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [watch, setValue, trigger]);

  // Track the last query to avoid duplicate requests
  const lastQueryRef = useRef("");

  // Load makes on mount
  useEffect(() => {
    fetchMakes();
  }, [fetchMakes]);

  // Debug: Log state changes
  useEffect(() => {
    console.log("🔍 State values updated:", state.values);
  }, [state.values]);

  // Simplified useEffect that triggers when vehicle selection changes
  useEffect(() => {
    console.log("🔄 Vehicle selection changed:", {
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

    // Clear dependent fields when parent changes
    const currentQuery = buildVehicleQuery(watch);
    const previousQuery = lastQueryRef.current;

    if (currentQuery !== previousQuery) {
      const previousParams = new URLSearchParams(previousQuery);
      const currentParams = new URLSearchParams(currentQuery);

      // Detect which field changed and clear dependents
      let fieldsToClear = {};
      let shouldClearOptions = false;

      if (previousParams.get("make") !== currentParams.get("make")) {
        console.log("🔄 Make changed - clearing dependent fields");
        clearDependentFields("make", setValue, isAutoSelectingRef, clearErrors);
        fieldsToClear = {
          model: "",
          year: "",
          doors: "",
          fuel: "",
          transmission: "",
        };
        shouldClearOptions = true;
      } else if (previousParams.get("model") !== currentParams.get("model")) {
        console.log("🔄 Model changed - clearing dependent fields");
        clearDependentFields(
          "model",
          setValue,
          isAutoSelectingRef,
          clearErrors
        );
        fieldsToClear = { year: "", doors: "", fuel: "", transmission: "" };
      } else if (previousParams.get("year") !== currentParams.get("year")) {
        console.log("🔄 Year changed - clearing dependent fields");
        clearDependentFields("year", setValue, isAutoSelectingRef, clearErrors);
        fieldsToClear = { doors: "", fuel: "", transmission: "" };
      } else if (previousParams.get("doors") !== currentParams.get("doors")) {
        console.log("🔄 Doors changed - clearing dependent fields");
        clearDependentFields(
          "doors",
          setValue,
          isAutoSelectingRef,
          clearErrors
        );
        fieldsToClear = { fuel: "", transmission: "" };
      } else if (previousParams.get("fuel") !== currentParams.get("fuel")) {
        console.log("🔄 Fuel changed - clearing dependent fields");
        clearDependentFields("fuel", setValue, isAutoSelectingRef, clearErrors);
        fieldsToClear = { transmission: "" };
      }

      // Single dispatch to clear all dependent fields
      if (Object.keys(fieldsToClear).length > 0) {
        const optionsToUse = shouldClearOptions
          ? { models: [], years: [], doors: [], fuels: [], transmissions: [] }
          : state.options;

        dispatch({
          type: "SET_VEHICLE_DATA",
          payload: {
            values: fieldsToClear,
            options: optionsToUse,
          },
        });
      }

      lastQueryRef.current = currentQuery;

      // Only fetch if we have at least a make selected
      if (selectedMake) {
        console.log("🚀 Fetching vehicle data for:", currentQuery);
        fetchVehicleData();
      } else {
        console.log("⏸️ No make selected - clearing options");
        dispatch({ type: "CLEAR_OPTIONS" });
      }
    }
  }, [
    selectedMake,
    selectedModel,
    selectedYear,
    selectedDoors,
    selectedFuel,
    fetchVehicleData,
    watch,
    setValue,
    clearErrors,
    state.options,
  ]);

  const handleFindVehicle = async () => {
    const registrationNumber = watch("vehicleDetails.registrationNumber");

    if (!registrationNumber?.trim()) {
      setError("vehicleDetails.registrationNumber", {
        message: "Please enter a registration number",
      });
      return;
    }

    const cleanRegNumber = registrationNumber.trim().toUpperCase();

    setIsLoadingVehicleData(true);
    try {
      const apiUrl = `${API_BASE_URL}/api/insurance/combined-vehicle-data/${encodeURIComponent(
        cleanRegNumber
      )}`;

      const response = await axios.get(apiUrl);
      if (response.data.status === "success" && response.data.data) {
        const vehicleData = response.data.data;
        console.log("🚗 Vehicle data found:", vehicleData);

        // Check if there are any errors in the response
        if (vehicleData.errors) {
          console.log("⚠️ Some data fetch errors:", vehicleData.errors);
          // We can still proceed if we have basic vehicle data
        }

        // Store the found vehicle data
        setFoundVehicleData(vehicleData);
        setShowFoundData(true);

        // Pass data to parent component
        if (onVehicleDataFound) {
          onVehicleDataFound(vehicleData);
        }

        // Store API data separately without affecting form fields
        setValue("vehicleDetails.apiData", vehicleData);

        // Set vehicle type only
        setValue("vehicleDetails.type", "Car");

        // Clear any previous errors
        clearErrors("vehicleDetails.registrationNumber");

        // Show vehicle details section
        // setShowVehicleDetails(true);
      }
    } catch (error) {
      console.error("❌ Error fetching vehicle data:", error);
      setError("vehicleDetails.registrationNumber", {
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch vehicle data",
      });
    } finally {
      setIsLoadingVehicleData(false);
    }
  };

  const handleChangeVehicle = () => {
    setFoundVehicleData(null);
    setShowFoundData(false);
    setValue("vehicleDetails.registrationNumber", "");

    // Clear found vehicle data from parent
    if (onVehicleDataFound) {
      onVehicleDataFound(null);
    }

    // Clear API data
    setValue("vehicleDetails.apiData", null);
    clearErrors("vehicleDetails.registrationNumber");
  };

  return (
    <ComponentWrapper title="Vehicle Details">
      <div className={styles.content}>
        <div className={styles.first}>
          {!showFoundData ? (
            <>
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
            </>
          ) : (
            <>
              <InputWithData2
                item={{
                  label: "Registration Number",
                  value: foundVehicleData?.registration || "",
                  type: "text",
                }}
                button={
                  <ConfirmBtn
                    title={
                      isLoadingVehicleData ? "Loading..." : "Change Vehicle"
                    }
                    onClick={handleChangeVehicle}
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
            </>
          )}
          {showFoundData && foundVehicleData && (
            <div className={styles.vehicleDataDisplay}>
              <p className={styles.vehicleDataRow}>
                {foundVehicleData.make + " "} {foundVehicleData.model + " "}
                {foundVehicleData.year + " "}{" "}
                {foundVehicleData.registration + " "}
              </p>
              <p className={styles.vehicleDataRow}>
                {foundVehicleData.cylinderCapacity || "N/A"}{" "}
                {foundVehicleData.colour || "N/A"}{" "}
                {foundVehicleData.fuel || "N/A"}{" "}
                {foundVehicleData.transmission || "N/A"}
              </p>
            </div>
          )}
        </div>

        {/* Vehicle Data Display */}

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
                {...register("vehicleDetails.type", {
                  required: !foundVehicleData
                    ? "Please select vehicle type"
                    : false,
                })}
                error={errors.vehicleDetails?.type}
              />
              <FormDropdown
                label="Make"
                options={state.makes}
                placeholder="Select Make"
                value={state.values.make || selectedMake || ""}
                onChange={(e) => handleDropdownChange("make", e.target.value)}
                {...register("vehicleDetails.make", {
                  required: !foundVehicleData ? "Please select a make" : false,
                })}
                error={errors.vehicleDetails?.make}
              />
            </div>
            <div className={styles.row}>
              <FormDropdown
                key={`model-${forceUpdate}`}
                label="Model"
                options={state.options.models}
                placeholder={
                  !selectedMake ? "Select make first" : "Select Model"
                }
                disabled={!selectedMake || state.options.models.length === 0}
                value={state.values.model || selectedModel || ""}
                onChange={(e) => handleDropdownChange("model", e.target.value)}
                {...register("vehicleDetails.model", {
                  required:
                    selectedMake && !foundVehicleData
                      ? "Please select a model"
                      : false,
                })}
                error={errors.vehicleDetails?.model}
              />
              <FormDropdown
                key={`year-${forceUpdate}`}
                label="Year"
                options={state.options.years}
                placeholder={
                  !selectedModel ? "Select model first" : "Select Year"
                }
                disabled={!selectedModel || state.options.years.length === 0}
                value={state.values.year || selectedYear || ""}
                onChange={(e) => handleDropdownChange("year", e.target.value)}
                {...register("vehicleDetails.year", {
                  required:
                    selectedModel && !foundVehicleData
                      ? "Please select a year"
                      : false,
                })}
                error={errors.vehicleDetails?.year}
              />
            </div>
            <div className={styles.row}>
              <FormDropdown
                key={`doors-${forceUpdate}`}
                label="Doors"
                options={state.options.doors}
                placeholder={
                  !selectedYear ? "Select year first" : "Select Doors"
                }
                disabled={!selectedYear || state.options.doors.length === 0}
                value={state.values.doors || selectedDoors || ""}
                onChange={(e) => handleDropdownChange("doors", e.target.value)}
                {...register("vehicleDetails.doors", {
                  required:
                    selectedYear && !foundVehicleData
                      ? "Please select doors"
                      : false,
                })}
                error={errors.vehicleDetails?.doors}
              />
              <FormDropdown
                key={`fuel-${forceUpdate}`}
                label="Fuel Type"
                options={state.options.fuels}
                placeholder={
                  !selectedDoors ? "Select doors first" : "Select Fuel Type"
                }
                disabled={!selectedDoors || state.options.fuels.length === 0}
                value={state.values.fuel || selectedFuel || ""}
                onChange={(e) => handleDropdownChange("fuel", e.target.value)}
                {...register("vehicleDetails.fuel", {
                  required:
                    selectedDoors && !foundVehicleData
                      ? "Please select fuel type"
                      : false,
                })}
                error={errors.vehicleDetails?.fuel}
              />
            </div>
            <div className={styles.row}>
              <FormDropdown
                key={`transmission-${forceUpdate}`}
                label="Transmission"
                options={state.options.transmissions}
                placeholder={
                  !selectedFuel
                    ? "Select fuel type first"
                    : "Select Transmission"
                }
                disabled={
                  !selectedFuel || state.options.transmissions.length === 0
                }
                value={
                  state.values.transmission ||
                  watch("vehicleDetails.transmission") ||
                  ""
                }
                onChange={(e) =>
                  handleDropdownChange("transmission", e.target.value)
                }
                {...register("vehicleDetails.transmission", {
                  required:
                    selectedFuel && !foundVehicleData
                      ? "Please select transmission"
                      : false,
                })}
                error={errors.vehicleDetails?.transmission}
              />
              <FormDropdown
                label="Vehicle Color"
                options={carColors}
                placeholder="Select Color"
                {...register("vehicleDetails.colour", {
                  required: !foundVehicleData ? "Please select a color" : false,
                })}
                error={errors.vehicleDetails?.colour}
              />
            </div>
            <div className={styles.row}>
              <FormDropdown
                label="How much is your vehicle worth?"
                options={vehicleWorthOptions}
                placeholder="Choose Price Range"
                {...register("vehicleDetails.worth", {
                  required: "Please select vehicle worth",
                })}
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
