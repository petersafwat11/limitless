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
import FormDateInput from "@/ui/inputs/FormDateInput";
import Title from "@/ui/insurance-quotes/title/Title";
import VehicleModificationsModal from "@/app/annual/get-quote/_components/VehicleModificationsModal";
import styles from "@/app/annual/get-quote/_components/annualVehicle.module.css";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";
import {
  buildVehicleQuery,
  clearDependentFields,
  shouldAutoSelect,
} from "../helperFucntion";

import axios from "axios";

// Simplified state for vehicle data
const initialState = {
  makes: [],
  error: null,
  options: {
    models: [],
    years: [],
    doors: [],
    fuels: [],
    transmissions: [],
  },
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

const vehicleWorthOptions = [
  "£0 - £5,000",
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

const trackingDeviceOptions = [
  "No",
  "Yes - Factory Fitted",
  "Yes - Aftermarket",
];
const alarmImmobiliserOptions = [
  "No",
  "Thatcham approved immobiliser",
  "Thatcham approved alarm",
  "Thatcham approved alarm and immobiliser",
  "Factory fitted immobiliser",
  "Factory fitted alarm and immobiliser",
  "Other",
];
const yesNoOptions = ["No", "Yes"];
const ownerOptions = [
  "Policyholder",
  "Spouse/Partner",
  "Parent",
  "Company",
  "Other",
];
const keeperOptions = [
  "Policyholder",
  "Spouse/Partner",
  "Parent",
  "Company",
  "Other",
];

const VehicleDetailsForm = ({
  form,
  onVehicleDataFound,
  autoTriggerLookup = false,
}) => {
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const [isLoadingVehicleData, setIsLoadingVehicleData] = useState(false);
  const [state, dispatch] = useReducer(vehicleReducer, initialState);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [foundVehicleData, setFoundVehicleData] = useState(null);
  const [showFoundData, setShowFoundData] = useState(false);
  const [haventBoughtYet, setHaventBoughtYet] = useState(false);
  const [showModificationsModal, setShowModificationsModal] = useState(false);
  const isAutoSelectingRef = useRef(false);
  const hasAutoTriggeredRef = useRef(false);

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
  const purchaseDate = watch("vehicleDetails.purchaseDate");
  const owner = watch("vehicleDetails.owner");
  const registeredKeeper = watch("vehicleDetails.registeredKeeper");
  const legalOwner = watch("vehicleDetails.legalOwner");
  const vehicleModified = watch("vehicleDetails.vehicleModified");
  const vehicleModifications =
    watch("vehicleDetails.vehicleModifications") || [];
  const previousVehicleModifiedRef = useRef(vehicleModified);

  // Open modifications modal only when user actively changes to "Yes", not on mount or back navigation
  useEffect(() => {
    const previous = previousVehicleModifiedRef.current;
    if (
      vehicleModified === "Yes" &&
      previous !== "Yes" &&
      vehicleModifications.length === 0
    ) {
      setShowModificationsModal(true);
    }
    previousVehicleModifiedRef.current = vehicleModified;
  }, [vehicleModified, vehicleModifications.length]);

  // Clear owner and keeper fields if legal owner is "Yes"
  useEffect(() => {
    if (legalOwner === "Yes") {
      setValue("vehicleDetails.owner", "", { shouldValidate: false });
      setValue("vehicleDetails.registeredKeeper", "", {
        shouldValidate: false,
      });
      setValue("vehicleDetails.ownerOther", "", { shouldValidate: false });
      setValue("vehicleDetails.registeredKeeperOther", "", {
        shouldValidate: false,
      });
    }
  }, [legalOwner, setValue]);

  const handleModificationsConfirm = (selectedModifications) => {
    setValue("vehicleDetails.vehicleModifications", selectedModifications, {
      shouldValidate: true,
      shouldDirty: true,
    });
    // If no modifications are selected, reset vehicle modified to "No"
    if (selectedModifications.length === 0) {
      setValue("vehicleDetails.vehicleModified", "No", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setShowModificationsModal(false);
  };

  const handleModificationsCancel = () => {
    // Only reset to "No" if no modifications have been selected yet
    if (vehicleModifications.length === 0) {
      setValue("vehicleDetails.vehicleModified", "No", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setShowModificationsModal(false);
  };

  const toggleVehicleDetails = () => {
    setShowVehicleDetails(!showVehicleDetails);
  };

  const handleDropdownChange = (field, value) => {
    setValue(`vehicleDetails.${field}`, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });

    dispatch({
      type: "SET_VEHICLE_DATA",
      payload: {
        values: { [field]: value },
        options: state.options,
      },
    });
  };

  const fetchMakes = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vehicle-models/makes`
      );
      if (response.ok) {
        const result = await response.json();
        const makes = result.data || [];
        dispatch({ type: "SET_MAKES", payload: makes });

        if (shouldAutoSelect(makes)) {
          setValue("vehicleDetails.make", makes[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching makes:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [setValue]);

  const fetchVehicleData = useCallback(async () => {
    const queryString = buildVehicleQuery(watch);
    if (!queryString) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vehicle-models/options?${queryString}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}: Failed to fetch vehicle data`
        );
      }

      const result = await response.json();

      if (result.status === "success") {
        const { options, autoSelect } = result.data;

        const optionsToUpdate = {
          models: options?.models || [],
          years: options?.years || [],
          doors: options?.doors || [],
          fuels: options?.fuel || [],
          transmissions: options?.transmissions || [],
        };

        // Ensure auto-selected values are included in options
        if (autoSelect) {
          const fieldMapping = {
            model: "models",
            year: "years",
            doors: "doors",
            fuel: "fuels",
            transmission: "transmissions",
          };

          Object.entries(autoSelect).forEach(([field, value]) => {
            const optionKey = fieldMapping[field];
            if (optionKey && !optionsToUpdate[optionKey].includes(value)) {
              optionsToUpdate[optionKey].push(value);
            }
          });
        }

        let valuesToUpdate = {};
        let fieldsToTrigger = [];

        if (autoSelect && Object.keys(autoSelect).length > 0) {
          isAutoSelectingRef.current = true;

          Object.entries(autoSelect).forEach(([field, value]) => {
            valuesToUpdate[field] = value;
            fieldsToTrigger.push(`vehicleDetails.${field}`);
          });
        }

        dispatch({
          type: "SET_VEHICLE_DATA",
          payload: {
            values: valuesToUpdate,
            options: optionsToUpdate,
          },
        });

        if (Object.keys(valuesToUpdate).length > 0) {
          Object.entries(valuesToUpdate).forEach(([field, value]) => {
            setValue(`vehicleDetails.${field}`, value, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
          });

          if (fieldsToTrigger.length > 0) {
            trigger(fieldsToTrigger);
          }
        }

        setForceUpdate((prev) => prev + 1);

        if (isAutoSelectingRef.current) {
          setTimeout(() => {
            isAutoSelectingRef.current = false;
          }, 100);
        }
      } else {
        throw new Error(result.message || "Failed to fetch vehicle data");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  }, [watch, setValue, trigger]);

  const lastQueryRef = useRef("");

  useEffect(() => {
    fetchMakes();
  }, [fetchMakes]);

  useEffect(() => {
    if (isAutoSelectingRef.current) return;

    const currentQuery = buildVehicleQuery(watch);
    const previousQuery = lastQueryRef.current;

    if (currentQuery !== previousQuery) {
      const previousParams = new URLSearchParams(previousQuery);
      const currentParams = new URLSearchParams(currentQuery);

      let fieldsToClear = {};
      let shouldClearOptions = false;

      const fieldChanges = [
        {
          param: "make",
          clear: { model: "", year: "", doors: "", fuel: "", transmission: "" },
          clearOptions: true,
        },
        {
          param: "model",
          clear: { year: "", doors: "", fuel: "", transmission: "" },
          clearOptions: false,
        },
        {
          param: "year",
          clear: { doors: "", fuel: "", transmission: "" },
          clearOptions: false,
        },
        {
          param: "doors",
          clear: { fuel: "", transmission: "" },
          clearOptions: false,
        },
        { param: "fuel", clear: { transmission: "" }, clearOptions: false },
      ];

      for (const { param, clear, clearOptions } of fieldChanges) {
        if (previousParams.get(param) !== currentParams.get(param)) {
          clearDependentFields(
            param,
            setValue,
            isAutoSelectingRef,
            clearErrors
          );
          fieldsToClear = clear;
          shouldClearOptions = clearOptions;
          break;
        }
      }

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

      if (selectedMake) {
        fetchVehicleData();
      } else {
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

  const handleFindVehicle = useCallback(async () => {
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
      // Use DVLA endpoint
      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/vehicle-search/dvla/${encodeURIComponent(cleanRegNumber)}`;

      const response = await axios.get(apiUrl);
      if (response.data.status === "success" && response.data.data) {
        const vehicleData = response.data.data;

        setFoundVehicleData(vehicleData);
        setShowFoundData(true);

        if (onVehicleDataFound) {
          onVehicleDataFound(vehicleData);
        }

        // Populate all vehicle fields from DVLA API data
        setValue("vehicleDetails.apiData", vehicleData);
        setValue(
          "vehicleDetails.registrationNumber",
          vehicleData.registrationNumber || cleanRegNumber
        );
        setValue("vehicleDetails.type", "Car");
        setValue("vehicleDetails.make", vehicleData.make || "");
        setValue("vehicleDetails.model", vehicleData.model || "");
        setValue("vehicleDetails.year", vehicleData.yearOfManufacture || "");
        setValue("vehicleDetails.fuel", vehicleData.fuelType || "");
        setValue("vehicleDetails.transmission", vehicleData.transmission || "");
        setValue("vehicleDetails.colour", vehicleData.colour || "");

        // Set additional fields if available
        if (vehicleData.cylinderCapacity) {
          setValue("vehicleDetails.engineSize", vehicleData.cylinderCapacity);
        }
        if (vehicleData.doors) {
          setValue("vehicleDetails.doors", vehicleData.doors);
        }

        clearErrors("vehicleDetails.registrationNumber");
        clearErrors("vehicleDetails.type");
        clearErrors("vehicleDetails.make");
        clearErrors("vehicleDetails.model");
      }
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      setError("vehicleDetails.registrationNumber", {
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch vehicle data. Please check the registration number.",
      });
    } finally {
      setIsLoadingVehicleData(false);
    }
  }, [watch, setError, onVehicleDataFound, setValue, clearErrors]);

  const handleChangeVehicle = () => {
    setFoundVehicleData(null);
    setShowFoundData(false);
    setValue("vehicleDetails.registrationNumber", "");
    setValue("vehicleDetails.apiData", null);
    clearErrors("vehicleDetails.registrationNumber");

    if (onVehicleDataFound) {
      onVehicleDataFound(null);
    }
  };

  // Auto-trigger vehicle lookup when registration number is provided from URL
  useEffect(() => {
    if (autoTriggerLookup && !hasAutoTriggeredRef.current) {
      const registrationNumber = watch("vehicleDetails.registrationNumber");
      if (registrationNumber && registrationNumber.trim()) {
        hasAutoTriggeredRef.current = true;
        // Small delay to ensure form is ready
        setTimeout(() => {
          handleFindVehicle();
        }, 500);
      }
    }
  }, [autoTriggerLookup, watch, handleFindVehicle]);

  const handleHaventBoughtChange = (e) => {
    const isChecked = e.target.checked;
    setHaventBoughtYet(isChecked);
    if (isChecked) {
      setValue("vehicleDetails.purchaseDate", "");
    } else {
      // When unchecking, also clear the legal owner field
      setValue("vehicleDetails.legalOwner", "", { shouldValidate: false });
    }
  };

  return (
    <>
      <VehicleModificationsModal
        isOpen={showModificationsModal}
        onClose={handleModificationsCancel}
        onConfirm={handleModificationsConfirm}
        selectedModifications={vehicleModifications}
      />
      <ComponentWrapper title="Your Vehicle Information">
        <div className={styles.content}>
          {/* Instruction Message */}
          <div className={styles.instructionBox}>
            <div className={styles.instructionIcon}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#5a6b7d"
                  strokeWidth="2"
                />
                <path
                  d="M12 16V12M12 8H12.01"
                  stroke="#5a6b7d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className={styles.instructionContent}>
              <p className={styles.instructionText}>
                Please provide accurate vehicle details to ensure we calculate
                the correct insurance quote for you.
              </p>
            </div>
          </div>

          {/* Vehicle Registration Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Vehicle Registration</h3>
              <p className={styles.sectionDescription}>
                Find your vehicle using its registration number or enter details
                manually
              </p>
            </div>
            <div className={styles.registrationSection}>
              {!showFoundData ? (
                <div className={styles.registrationInputWrapper}>
                  <div className={styles.inputContainer}>
                    <FormTextInput
                      reg={true}
                      label="What is your registration number?"
                      placeholder=""
                      value={watch("vehicleDetails.registrationNumber") || ""}
                      onChange={(e) => {
                        const formattedValue = e.target.value.toUpperCase();
                        setValue(
                          "vehicleDetails.registrationNumber",
                          formattedValue,
                          {
                            shouldValidate: false,
                            shouldDirty: true,
                            shouldTouch: true,
                          }
                        );
                      }}
                      error={errors.vehicleDetails?.registrationNumber}
                      disabled={showFoundData || isLoadingVehicleData}
                      button={
                        <ConfirmBtn
                          title={
                            isLoadingVehicleData
                              ? "Searching..."
                              : "Find Vehicle"
                          }
                          onClick={handleFindVehicle}
                          disabled={
                            isLoadingVehicleData ||
                            !watch("vehicleDetails.registrationNumber")?.trim()
                          }
                          type="button"
                          hideArrow={true}
                          variant="primary"
                        />
                      }
                    />
                  </div>
                  <div className={styles.dividerWithText}>
                    <span className={styles.dividerText}>OR</span>
                  </div>
                  <button
                    type="button"
                    className={styles.manualEntryBtn}
                    onClick={toggleVehicleDetails}
                  >
                    <span className={styles.manualEntryIcon}>✎</span>
                    <span className={styles.manualEntryText}>
                      Enter Vehicle Details Manually
                    </span>
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.vehicleDataDisplay}>
                    <p className={styles.vehicleDataRow}>
                      {foundVehicleData.make} {foundVehicleData.model}{" "}
                      {foundVehicleData.yearOfManufacture}
                    </p>
                    <p className={styles.vehicleDataRow}>
                      {foundVehicleData.cylinderCapacity || "N/A"}cc{" "}
                      {foundVehicleData.colour || "N/A"}{" "}
                      {foundVehicleData.fuelType || "N/A"}{" "}
                      {foundVehicleData.transmission || "N/A"}
                    </p>
                  </div>
                  <button
                    type="button"
                    className={styles.changeVehicleBtn}
                    onClick={handleChangeVehicle}
                  >
                    Change Vehicle
                  </button>
                </>
              )}
            </div>
          </div>

          {showVehicleDetails && !foundVehicleData && (
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Vehicle Specification</h3>
                <p
                  className={styles.sectionDescription}
                >{`Provide details about your vehicle's make, model, and features`}</p>
              </div>
            </div>
          )}

          {/* Manual Vehicle Entry */}
          <div
            className={`${styles.vehicleDetailsContainer} ${
              showVehicleDetails && !foundVehicleData
                ? styles.vehicleDetailsVisible
                : styles.vehicleDetailsHidden
            }`}
          >
            <div className={styles.rows}>
              {!foundVehicleData && (
                <div className={styles.cleanFormGrid2Col}>
                  <FormDropdown
                    label="My Vehicle is a...."
                    options={["Car", "Motorcycle", "Truck", "Bus"]}
                    placeholder="Choose Vehicle"
                    {...register("vehicleDetails.type")}
                    error={errors.vehicleDetails?.type}
                    disabled={!!foundVehicleData}
                  />
                  {watch("vehicleDetails.type") && !foundVehicleData && (
                    <FormDropdown
                      label="Make"
                      options={state.makes}
                      placeholder="Select Make"
                      value={state.values.make || selectedMake || ""}
                      onChange={(e) =>
                        handleDropdownChange("make", e.target.value)
                      }
                      {...register("vehicleDetails.make")}
                      error={errors.vehicleDetails?.make}
                      disabled={!!foundVehicleData}
                    />
                  )}
                </div>
              )}

              {selectedMake && !foundVehicleData && (
                <div
                  className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}
                >
                  <FormDropdown
                    key={`model-${forceUpdate}`}
                    label="Model"
                    options={state.options.models}
                    placeholder="Select Model"
                    disabled={
                      !!foundVehicleData ||
                      !selectedMake ||
                      state.options.models.length === 0
                    }
                    value={state.values.model || selectedModel || ""}
                    onChange={(e) =>
                      handleDropdownChange("model", e.target.value)
                    }
                    {...register("vehicleDetails.model")}
                    error={errors.vehicleDetails?.model}
                  />
                  <FormDropdown
                    key={`year-${forceUpdate}`}
                    label="Year"
                    options={state.options.years}
                    placeholder="Select Year"
                    disabled={
                      !!foundVehicleData ||
                      !selectedMake ||
                      state.options.years.length === 0
                    }
                    value={state.values.year || selectedYear || ""}
                    onChange={(e) =>
                      handleDropdownChange("year", e.target.value)
                    }
                    {...register("vehicleDetails.year")}
                    error={errors.vehicleDetails?.year}
                  />
                </div>
              )}

              {selectedYear && !foundVehicleData && (
                <div
                  className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}
                >
                  <FormDropdown
                    key={`doors-${forceUpdate}`}
                    label="Doors"
                    options={state.options.doors}
                    placeholder="Select Doors"
                    disabled={
                      !!foundVehicleData ||
                      !selectedYear ||
                      state.options.doors.length === 0
                    }
                    value={state.values.doors || selectedDoors || ""}
                    onChange={(e) =>
                      handleDropdownChange("doors", e.target.value)
                    }
                    {...register("vehicleDetails.doors")}
                    error={errors.vehicleDetails?.doors}
                  />
                  <FormDropdown
                    key={`fuel-${forceUpdate}`}
                    label="Fuel Type"
                    options={state.options.fuels}
                    placeholder="Select Fuel Type"
                    disabled={
                      !!foundVehicleData ||
                      !selectedYear ||
                      state.options.fuels.length === 0
                    }
                    value={state.values.fuel || selectedFuel || ""}
                    onChange={(e) =>
                      handleDropdownChange("fuel", e.target.value)
                    }
                    {...register("vehicleDetails.fuel")}
                    error={errors.vehicleDetails?.fuel}
                  />
                </div>
              )}

              {selectedFuel && !foundVehicleData && (
                <div
                  className={`${styles.cleanFormGrid2Col} ${styles.progressiveRow}`}
                >
                  <FormDropdown
                    key={`transmission-${forceUpdate}`}
                    label="Transmission"
                    options={state.options.transmissions}
                    placeholder="Select Transmission"
                    disabled={
                      !!foundVehicleData ||
                      !selectedFuel ||
                      state.options.transmissions.length === 0
                    }
                    value={
                      state.values.transmission ||
                      watch("vehicleDetails.transmission") ||
                      ""
                    }
                    onChange={(e) =>
                      handleDropdownChange("transmission", e.target.value)
                    }
                    {...register("vehicleDetails.transmission")}
                    error={errors.vehicleDetails?.transmission}
                  />
                  <FormDropdown
                    label="Vehicle Color"
                    options={carColors}
                    placeholder="Select Color"
                    {...register("vehicleDetails.colour")}
                    error={errors.vehicleDetails?.colour}
                    disabled={!!foundVehicleData}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Safety & Security Features Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                Safety & Security Features
              </h3>
              <p
                className={styles.sectionDescription}
              >{`Tell us about your vehicle's safety and security features`}</p>
            </div>
            <div className={styles.additionalDetailsSection}>
              <div className={styles.cleanFormGrid2Col}>
                <FormDropdown
                  label="Tracking device"
                  options={trackingDeviceOptions}
                  placeholder="Please select"
                  {...register("vehicleDetails.trackingDevice")}
                  error={errors.vehicleDetails?.trackingDevice}
                />
                <FormDropdown
                  label="Alarm / Immobiliser"
                  options={alarmImmobiliserOptions}
                  placeholder="Please select"
                  {...register("vehicleDetails.alarmImmobiliser")}
                  error={errors.vehicleDetails?.alarmImmobiliser}
                />
              </div>

              <div className={styles.cleanFormGrid2Col}>
                <FormDropdown
                  label="Imported vehicle"
                  options={yesNoOptions}
                  placeholder="Please select"
                  {...register("vehicleDetails.importedVehicle")}
                  error={errors.vehicleDetails?.importedVehicle}
                />
                <FormDropdown
                  label="Has your vehicle been modified?"
                  options={yesNoOptions}
                  placeholder="Please select"
                  {...register("vehicleDetails.vehicleModified")}
                  error={errors.vehicleDetails?.vehicleModified}
                />
              </div>
              {vehicleModified === "Yes" && vehicleModifications.length > 0 && (
                <div className={styles.modificationsListContainer}>
                  <div className={styles.modificationsLabelWrapper}>
                    <p className={styles.modificationsLabel}>
                      Selected Modifications:
                    </p>
                    <button
                      type="button"
                      className={styles.editModificationsBtn}
                      onClick={() => setShowModificationsModal(true)}
                    >
                      Edit
                    </button>
                  </div>
                  <div className={styles.modificationsTagsList}>
                    {vehicleModifications.map((modification) => (
                      <span
                        key={modification}
                        className={styles.modificationTag}
                      >
                        {modification}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.cleanFormGrid2Col}>
                <FormDropdown
                  label="How much is your vehicle worth?"
                  options={vehicleWorthOptions}
                  placeholder="Please select"
                  {...register("vehicleDetails.worth")}
                  error={errors.vehicleDetails?.worth}
                />
              </div>
            </div>
          </div>

          {/* Purchase & Ownership Section */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Purchase & Ownership</h3>
              <p className={styles.sectionDescription}>
                Details about when you purchased the vehicle and who owns it
              </p>
            </div>
            <div className={styles.ownershipSection}>
              <div className={styles.cleanFormGrid2Col}>
                <div
                  className={`${styles.dateWithCheckbox} ${
                    haventBoughtYet ? styles.disabled : ""
                  }`}
                >
                  <FormDateInput
                    type="date"
                    dateLabel="When was the car bought?"
                    {...register("vehicleDetails.purchaseDate")}
                    value={purchaseDate || ""}
                    onChange={(e) =>
                      setValue("vehicleDetails.purchaseDate", e.target.value)
                    }
                    error={errors.vehicleDetails?.purchaseDate}
                    allowPastDates={true}
                    reducedPadding={true}
                    minDate={new Date(1960, 0, 1)}
                    maxDate={new Date()}
                    disabled={haventBoughtYet}
                  />
                  <button
                    type="button"
                    className={styles.haventBoughtBtn}
                    onClick={(e) =>
                      handleHaventBoughtChange({
                        target: { checked: !haventBoughtYet },
                      })
                    }
                  >
                    {`I haven't bought it yet`}
                  </button>
                </div>
                {haventBoughtYet && (
                  <FormDropdown
                    label="Will you be the legal and registered owner?"
                    options={yesNoOptions}
                    placeholder="Please select"
                    {...register("vehicleDetails.legalOwner")}
                    error={errors.vehicleDetails?.legalOwner}
                  />
                )}
              </div>

              {legalOwner !== "Yes" && (
                <div className={styles.cleanFormGrid2Col}>
                  <div className={styles.ownerFieldWrapper}>
                    <FormDropdown
                      label={
                        haventBoughtYet
                          ? "Who will be the owner?"
                          : "Who is the owner?"
                      }
                      options={ownerOptions}
                      placeholder="Please select"
                      {...register("vehicleDetails.owner")}
                      error={errors.vehicleDetails?.owner}
                    />
                    {owner === "Other" && (
                      <FormTextInput
                        label="Please specify owner"
                        placeholder="Enter owner details"
                        {...register("vehicleDetails.ownerOther")}
                        error={errors.vehicleDetails?.ownerOther}
                      />
                    )}
                  </div>
                  <div className={styles.keeperFieldWrapper}>
                    <FormDropdown
                      label={
                        haventBoughtYet
                          ? "Who will be the registered keeper?"
                          : "Who is the registered keeper?"
                      }
                      options={keeperOptions}
                      placeholder="Please select"
                      {...register("vehicleDetails.registeredKeeper")}
                      error={errors.vehicleDetails?.registeredKeeper}
                    />
                    {registeredKeeper === "Other" && (
                      <FormTextInput
                        label="Please specify registered keeper"
                        placeholder="Enter registered keeper details"
                        {...register("vehicleDetails.registeredKeeperOther")}
                        error={errors.vehicleDetails?.registeredKeeperOther}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ComponentWrapper>
    </>
  );
};

export default VehicleDetailsForm;
