"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { getQuoteSchema } from "@/utils/schemas/getQuoteSchema";
import { API_BASE_URL } from "@/utils/config";
import styles from "./getQuote.module.css";
import Image from "next/image";
import FormTextInput from "../inputs/FormTextInput";
import Selection1 from "../inputs/selections/selection1/Selection1";
import Dropdown from "../inputs/dropdown/Dropdown";
const GetQuote = () => {
  const [showRegDetails, setShowRegDetails] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(getQuoteSchema),
    defaultValues: {
      vehicleIdentification: {
        registrationNumber: "",
        vehicleType: "",
        make: "",
        model: "",
        year: "",
      },
      duration: {
        quickSelection: "",
        customDuration: {
          type: "",
          value: "",
        },
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = form;

  const watchedValues = watch();

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // Prepare duration data
      let durationData = {};
      if (data.duration.quickSelection) {
        // Parse quick selection (e.g., "1 Day" -> type: "Days", value: "1")
        const quickSelection = data.duration.quickSelection;
        if (quickSelection.includes("Day")) {
          durationData = { type: "Days", value: quickSelection.split(" ")[0] };
        } else if (quickSelection.includes("Week")) {
          durationData = { type: "Weeks", value: quickSelection.split(" ")[0] };
        }
      } else if (
        data.duration.customDuration?.type &&
        data.duration.customDuration?.value
      ) {
        durationData = {
          type: data.duration.customDuration.type,
          value: data.duration.customDuration.value,
        };
      }

      // Create URL parameters based on what user provided
      const params = new URLSearchParams();
      params.set("fromQuote", "true");

      // Add duration parameters (always present)
      if (durationData.type) {
        params.set("durationType", durationData.type);
      }
      if (durationData.value) {
        params.set("durationValue", durationData.value);
      }

      // Check if user provided registration number
      if (data.vehicleIdentification.registrationNumber?.trim()) {
        // Only send registration number - temporary-insurance will fetch the rest
        params.set(
          "registrationNumber",
          data.vehicleIdentification.registrationNumber.trim()
        );
      } else {
        // Send manual vehicle details only if registration not provided
        if (data.vehicleIdentification.vehicleType) {
          params.set("vehicleType", data.vehicleIdentification.vehicleType);
        }
        if (data.vehicleIdentification.make) {
          params.set("make", data.vehicleIdentification.make);
        }
        if (data.vehicleIdentification.model) {
          params.set("model", data.vehicleIdentification.model);
        }
        if (data.vehicleIdentification.year) {
          params.set("year", data.vehicleIdentification.year);
        }
      }

      // Redirect to temporary-insurance with parameters
      router.push(`/temporary/get-quote?${params.toString()}`);
    } catch (error) {
      console.error("Error submitting quote:", error);
      setError("root", {
        message: "Failed to process quote. Please try again.",
      });
    }
  };

  const handleShowRegDetails = () => {
    if (!showRegDetails) {
      // Transitioning to dropdowns
      setIsTransitioning(true);
      // Wait for fade-out animation to complete before switching content
      setTimeout(() => {
        setShowRegDetails(true);
        setIsTransitioning(false);
      }, 500); // Match the fade-out duration + buffer
    } else {
      // Transitioning back to registration input
      setIsTransitioning(true);
      setTimeout(() => {
        setShowRegDetails(false);
        setIsTransitioning(false);
      }, 500);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.container}>
        {/* Display form errors */}
        {errors.root && (
          <div
            style={{
              color: "red",
              marginBottom: "1rem",
              padding: "0.5rem",
              backgroundColor: "#fee",
              borderRadius: "4px",
            }}
          >
            {errors.root.message}
          </div>
        )}

        <div className={styles.contentContainer}>
          {/* Registration Input */}
          {!showRegDetails && (
            <div
              className={`${styles.regInputContainer} ${
                isTransitioning ? styles.fadeOut : styles.fadeIn
              }`}
            >
              <FormTextInput
                label="Enter your Registration number"
                placeholder="Enter your Registration number"
                reg={true}
                {...register("vehicleIdentification.registrationNumber")}
                error={errors.vehicleIdentification?.registrationNumber}
              />
            </div>
          )}

          {/* Dropdown Rows */}
          {showRegDetails && (
            <div
              className={`${styles.rows} ${
                isTransitioning ? styles.fadeOut : styles.fadeIn
              }`}
            >
              <div className={styles.row}>
                <Dropdown
                  label="My Vehicle is a...."
                  options={["Car", "Motorcycle", "Truck", "Bus"]}
                  placeholder="Choose Vehicle"
                  value={watchedValues.vehicleIdentification?.vehicleType}
                  onChange={(value) =>
                    setValue("vehicleIdentification.vehicleType", value)
                  }
                  error={errors.vehicleIdentification?.vehicleType}
                />
                <Dropdown
                  label="Make"
                  options={[
                    "Toyota",
                    "Honda",
                    "Ford",
                    "Chevrolet",
                    "BMW",
                    "Mercedes",
                    "Audi",
                    "Volkswagen",
                  ]}
                  placeholder="Choose Make"
                  value={watchedValues.vehicleIdentification?.make}
                  onChange={(value) =>
                    setValue("vehicleIdentification.make", value)
                  }
                  error={errors.vehicleIdentification?.make}
                />
              </div>
              <div className={styles.row}>
                <Dropdown
                  label="Model"
                  options={[
                    "Camry",
                    "Accord",
                    "F-150",
                    "Silverado",
                    "3 Series",
                    "C-Class",
                    "A4",
                    "Golf",
                  ]}
                  placeholder="Choose Model"
                  value={watchedValues.vehicleIdentification?.model}
                  onChange={(value) =>
                    setValue("vehicleIdentification.model", value)
                  }
                  error={errors.vehicleIdentification?.model}
                />
                <Dropdown
                  label="Year"
                  options={[
                    "2024",
                    "2023",
                    "2022",
                    "2021",
                    "2020",
                    "2019",
                    "2018",
                    "2017",
                    "2016",
                    "2015",
                    "2014",
                    "2013",
                    "2012",
                    "2011",
                    "2010",
                  ]}
                  placeholder="Choose Year"
                  value={watchedValues.vehicleIdentification?.year}
                  onChange={(value) =>
                    setValue("vehicleIdentification.year", value)
                  }
                  error={errors.vehicleIdentification?.year}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.selection}>
          <p className={styles.label}>How long will you need it?</p>
          <Selection1
            items={["1 Day", "2 Days", "1 Week"]}
            selectedItem={watchedValues.duration?.quickSelection}
            setSelectedItem={(item) => {
              setValue("duration.quickSelection", item);
              // Clear custom duration when quick selection is made
              setValue("duration.customDuration.type", "");
              setValue("duration.customDuration.value", "");
            }}
            type="checkbox"
          />
          {errors.duration && (
            <div
              style={{
                color: "red",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.duration.message}
            </div>
          )}
        </div>

        <div className={styles.selection}>
          <p className={styles.label}>Need it specific? Choose your duration</p>
          <Selection1
            items={["Hours", "Days", "Weeks"]}
            selectedItem={watchedValues.duration?.customDuration?.type}
            setSelectedItem={(item) => {
              setValue("duration.customDuration.type", item);
              setValue("duration.customDuration.value", ""); // Reset value when type changes
              // Clear quick selection when custom duration is selected
              setValue("duration.quickSelection", "");
            }}
            type="checkbox"
          />
        </div>

        {["Hours", "Days", "Weeks"].includes(
          watchedValues.duration?.customDuration?.type
        ) && (
          <div className={styles.selection}>
            <p className={styles.label}>Select the duration of your cover</p>
            <Selection1
              items={
                watchedValues.duration?.customDuration?.type === "Days"
                  ? ["1", "2", "3", "4", "5", "6", "7"]
                  : watchedValues.duration?.customDuration?.type === "Hours"
                  ? [
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                      "11",
                      "12",
                    ]
                  : ["1", "2", "3", "4"]
              }
              selectedItem={watchedValues.duration?.customDuration?.value}
              setSelectedItem={(item) =>
                setValue("duration.customDuration.value", item)
              }
            />
          </div>
        )}

        <button type="submit" className={styles.button}>
          Continue{" "}
          <Image
            src="/svg/arrow-right.svg"
            alt="arrow-right"
            width={27}
            height={14}
          />
        </button>

        <button
          type="button"
          onClick={handleShowRegDetails}
          className={styles.notYet}
        >
          {showRegDetails
            ? "Back to registration number"
            : "I don't know my reg yet"}
        </button>
      </div>
    </form>
  );
};

export default GetQuote;
