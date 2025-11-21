"use client";

import React from "react";
import { useWatch } from "react-hook-form";
import styles from "./reviewQuote.module.css";

const ReviewQuote = ({ form, insuranceType = "Temp" }) => {
  const vehicleDetails = useWatch({
    control: form.control,
    name: "vehicleDetails",
  });
  const coverDetails = useWatch({
    control: form.control,
    name: "coverDetails",
  });
  const userDetails = useWatch({
    control: form.control,
    name: "userDetails",
  });
  const carUsage = useWatch({
    control: form.control,
    name: "carUsage",
  });
  const optionalExtras = useWatch({
    control: form.control,
    name: "optionalExtras",
  });

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (Array.isArray(value))
      return value.length > 0 ? value.join(", ") : "N/A";
    return value;
  };

  const calculateEndDateTime = () => {
    if (!coverDetails?.startDate || !coverDetails?.startTime) return "N/A";

    try {
      const [year, month, day] = coverDetails.startDate.split("-");
      const [hours, minutes] = coverDetails.startTime.split(":");
      const startDateTime = new Date(year, month - 1, day, hours, minutes);

      let endDateTime = new Date(startDateTime);

      if (insuranceType === "Impound") {
        // Impound: 30 days from start
        endDateTime.setDate(endDateTime.getDate() + 30);
      } else if (insuranceType === "Annual") {
        // Annual: 1 year from start
        endDateTime.setFullYear(endDateTime.getFullYear() + 1);
      } else if (insuranceType === "Temp") {
        // Temporary: based on period and type
        if (coverDetails.type === "Hours") {
          endDateTime.setHours(
            endDateTime.getHours() + (coverDetails.period || 0)
          );
        } else if (coverDetails.type === "Days") {
          endDateTime.setDate(
            endDateTime.getDate() + (coverDetails.period || 0)
          );
        } else if (coverDetails.type === "Weeks") {
          endDateTime.setDate(
            endDateTime.getDate() + (coverDetails.period || 0) * 7
          );
        } else if (coverDetails.type === "Months") {
          endDateTime.setMonth(
            endDateTime.getMonth() + (coverDetails.period || 0)
          );
        }
      }

      const endDate = endDateTime.toLocaleDateString("en-GB");
      const endTime = endDateTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${endDate} ${endTime}`;
    } catch (error) {
      console.error("Error calculating end date/time:", error);
      return "N/A";
    }
  };

  const renderField = (label, value) => (
    <div className={styles.field}>
      <label>{label}</label>
      <p>{formatValue(value)}</p>
    </div>
  );

  return (
    <div className={styles.reviewContainer}>
      <h2 className={styles.reviewTitle}>Review Your Quote</h2>

      <div className={styles.reviewSections}>
        {/* VEHICLE DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Vehicle Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("Registration", vehicleDetails?.registrationNumber)}
              {renderField("Make", vehicleDetails?.make)}
              {renderField("Model", vehicleDetails?.model)}
            </div>
            <div className={styles.row}>
              {renderField(
                "Year",
                vehicleDetails?.year ||
                  vehicleDetails?.apiData?.yearOfManufacture
              )}
              {renderField("Type", vehicleDetails?.type)}
              {renderField("Colour", vehicleDetails?.colour)}
            </div>
            <div className={styles.row}>
              {renderField(
                "Fuel Type",
                vehicleDetails?.fuel || vehicleDetails?.apiData?.fuelType
              )}
              {renderField("Transmission", vehicleDetails?.transmission)}
              {renderField("Doors", vehicleDetails?.doors)}
            </div>
            {vehicleDetails?.worth && (
              <div className={styles.row}>
                {renderField("Value", vehicleDetails?.worth)}
              </div>
            )}

            {/* ANNUAL-SPECIFIC VEHICLE FIELDS */}
            {insuranceType === "Annual" && (
              <>
                <div className={styles.row}>
                  {renderField(
                    "Tracking Device",
                    vehicleDetails?.trackingDevice
                  )}
                  {renderField(
                    "Alarm/Immobiliser",
                    vehicleDetails?.alarmImmobiliser
                  )}
                  {renderField(
                    "Imported Vehicle",
                    vehicleDetails?.importedVehicle
                  )}
                </div>
                <div className={styles.row}>
                  {renderField(
                    "Vehicle Modified",
                    vehicleDetails?.vehicleModified
                  )}
                  {vehicleDetails?.vehicleModifications &&
                    vehicleDetails.vehicleModifications.length > 0 &&
                    renderField(
                      "Modifications",
                      vehicleDetails.vehicleModifications.join(", ")
                    )}
                  {renderField("Purchase Date", vehicleDetails?.purchaseDate)}
                </div>
                <div className={styles.row}>
                  {renderField("Legal Owner", vehicleDetails?.legalOwner)}
                  {renderField("Owner", vehicleDetails?.owner)}
                  {renderField(
                    "Registered Keeper",
                    vehicleDetails?.registeredKeeper
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* COVER DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Cover Details</h3>
          <div className={styles.sectionContent}>
            {insuranceType === "Annual" ? (
              <>
                <div className={styles.row}>
                  {renderField("Cover Level", coverDetails?.level)}
                  {renderField("Start Date", coverDetails?.startDate)}
                </div>
                <div className={styles.row}>
                  {renderField("End Date & Time", calculateEndDateTime())}
                </div>
              </>
            ) : (
              <>
                <div className={styles.row}>
                  {renderField(
                    "Duration",
                    `${coverDetails?.period || "N/A"} ${
                      coverDetails?.type || ""
                    }`
                  )}
                  {renderField("Start Date", coverDetails?.startDate)}
                  {renderField("Start Time", coverDetails?.startTime)}
                </div>
                <div className={styles.row}>
                  {renderField("End Date & Time", calculateEndDateTime())}
                </div>
              </>
            )}
          </div>
        </div>

        {/* PERSONAL DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Personal Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("First Name", userDetails?.firstName)}
              {renderField("Surname", userDetails?.surname)}
              {renderField("Date of Birth", userDetails?.dateOfBirth)}
            </div>
            <div className={styles.row}>
              {renderField("Email", userDetails?.email)}
              {renderField("Phone", userDetails?.phone)}
              {renderField("Postcode", userDetails?.postCode)}
            </div>
            <div className={styles.row}>
              {renderField("Address", userDetails?.address)}
            </div>
          </div>
        </div>

        {/* EMPLOYMENT DETAILS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Employment Details</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("Employment Status", userDetails?.employmentStatus)}
              {renderField("Industry", userDetails?.industry)}
              {renderField("Occupation", userDetails?.occupation)}
            </div>
          </div>
        </div>

        {/* CAR PARKING & USAGE SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Car Parking & Usage</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField(
                "Keeping Car During Day",
                carUsage?.keepingCarDuringDay
              )}
              {renderField(
                "Keeping Car During Night",
                carUsage?.keepingCarDuringNight
              )}
              {renderField("What Do You Use Car For", carUsage?.usageType)}
            </div>

            {/* ANNUAL-SPECIFIC CAR USAGE */}
            {insuranceType === "Annual" && (
              <>
                <div className={styles.row}>
                  {renderField("Own Other Vehicles", carUsage?.otherVehicles)}
                  {carUsage?.otherVehicles === "Yes" &&
                    renderField(
                      "Other Vehicles Type",
                      carUsage?.otherVehiclesType
                    )}
                  {renderField(
                    "Additional Qualifications",
                    carUsage?.hasAdditionalQualifications
                  )}
                </div>
                {carUsage?.hasAdditionalQualifications === "Yes" && (
                  <div className={styles.row}>
                    {renderField(
                      "Qualification Type",
                      carUsage?.additionalQualificationType
                    )}
                    {renderField(
                      "Month/Year",
                      `${carUsage?.qualificationMonth || "N/A"} ${
                        carUsage?.qualificationYear || ""
                      }`
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* LICENSE & CLAIMS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>License & Claims</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField("License Type", carUsage?.licenseType)}
              {renderField("License Held Since", carUsage?.licenseHeld)}
              {renderField("License Number", carUsage?.licenseNumber)}
            </div>
            <div className={styles.row}>
              {renderField("No Claims Bonus", carUsage?.NCB)}
              {renderField("Voluntary Excess", carUsage?.voluntaryExcess)}
            </div>
          </div>
        </div>

        {/* DECLARATIONS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Declarations</h3>
          <div className={styles.sectionContent}>
            <div className={styles.row}>
              {renderField(
                "Criminal Convictions",
                carUsage?.criminalConvictions
              )}
              {renderField("Medical Conditions", carUsage?.medicalConditions)}
              {renderField(
                "Insurance Cancelled or Claim Refused",
                carUsage?.insuranceCancelledOrClaimRefusedOrPolicyVoided
              )}
            </div>
          </div>
        </div>

        {/* ANNUAL-SPECIFIC ADDITIONAL INFO */}
        {insuranceType === "Annual" && (
          <>
            {(carUsage?.ownsHome !== undefined ||
              carUsage?.childrenUnder16 !== undefined ||
              carUsage?.livedInUKSinceBirth !== undefined ||
              carUsage?.hasAdditionalDrivers === true) && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Additional Information</h3>
                <div className={styles.sectionContent}>
                  {(carUsage?.ownsHome !== undefined ||
                    carUsage?.childrenUnder16 !== undefined ||
                    carUsage?.livedInUKSinceBirth !== undefined) && (
                    <div className={styles.row}>
                      {carUsage?.ownsHome !== undefined &&
                        renderField("Own Home", carUsage?.ownsHome)}
                      {carUsage?.childrenUnder16 !== undefined &&
                        renderField(
                          "Children Under 16",
                          carUsage?.childrenUnder16
                        )}
                      {carUsage?.livedInUKSinceBirth !== undefined &&
                        renderField(
                          "Lived in UK Since Birth",
                          carUsage?.livedInUKSinceBirth
                        )}
                    </div>
                  )}

                  {/* ADDITIONAL DRIVERS - NESTED UNDER ADDITIONAL INFO */}
                  {carUsage?.hasAdditionalDrivers === true &&
                    carUsage?.additionalDrivers?.length > 0 && (
                      <div className={styles.driversContainer}>
                        <h4 className={styles.additionalInfoSubtitle}>
                          Additional Drivers
                        </h4>
                        {carUsage.additionalDrivers.map((driver, index) => (
                          <div key={index} className={styles.driverCard}>
                            <h5 className={styles.driverTitle}>
                              Driver {index + 2}
                            </h5>
                            <div className={styles.row}>
                              {renderField("First Name", driver?.firstName)}
                              {renderField("Last Name", driver?.lastName)}
                              {renderField(
                                "Date of Birth",
                                driver?.dateOfBirth
                              )}
                            </div>
                            <div className={styles.row}>
                              {renderField("License Type", driver?.licenseType)}
                              {renderField("License Held", driver?.licenseHeld)}
                              {renderField(
                                "Employment Status",
                                driver?.employmentStatus
                              )}
                            </div>
                            <div className={styles.row}>
                              {renderField("Occupation", driver?.occupation)}
                              {renderField("Industry", driver?.industry)}
                            </div>
                            {(driver?.criminalConvictions !== undefined ||
                              driver?.medicalConditions !== undefined ||
                              driver?.insuranceCancelledOrClaimRefusedOrPolicyVoided !==
                                undefined) && (
                              <div className={styles.row}>
                                {driver?.criminalConvictions !== undefined &&
                                  renderField(
                                    "Criminal Convictions",
                                    driver?.criminalConvictions
                                  )}
                                {driver?.medicalConditions !== undefined &&
                                  renderField(
                                    "Medical Conditions",
                                    driver?.medicalConditions
                                  )}
                                {driver?.insuranceCancelledOrClaimRefusedOrPolicyVoided !==
                                  undefined &&
                                  renderField(
                                    "Insurance Cancelled/Refused",
                                    driver?.insuranceCancelledOrClaimRefusedOrPolicyVoided
                                  )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
            )}

            {/* OPTIONAL EXTRAS SECTION */}
            {(optionalExtras?.courtesyCar === true ||
              optionalExtras?.breakdownCover === true ||
              optionalExtras?.foreignUseCover === true) && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Optional Extras</h3>
                <div className={styles.sectionContent}>
                  <div className={styles.row}>
                    {renderField("Courtesy Car", optionalExtras?.courtesyCar)}
                    {renderField(
                      "Breakdown Cover",
                      optionalExtras?.breakdownCover
                    )}
                    {renderField(
                      "Foreign Use Cover",
                      optionalExtras?.foreignUseCover
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* TERMS AND CONDITIONS SECTION */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Terms & Conditions</h3>
          <div className={styles.sectionContent}>
            <div className={styles.termsContainer}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  {...form.register("terms.acceptTerms")}
                  className={styles.checkbox}
                />
                <span>
                  I accept the{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer">
                    terms and conditions
                  </a>
                </span>
              </label>
              {form.formState.errors.terms?.acceptTerms && (
                <p className={styles.error}>
                  {form.formState.errors.terms.acceptTerms.message}
                </p>
              )}

              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  {...form.register("terms.acceptMarketing")}
                  className={styles.checkbox}
                />
                <span>
                  I would like to receive marketing communications (optional)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewQuote;
