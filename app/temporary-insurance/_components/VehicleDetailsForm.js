"use client";
import React, { useState } from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormTextInput from "@/ui/inputs/FormTextInput";
import FormDropdown from "@/ui/inputs/FormDropdown";
import Title from "@/ui/insurance-quotes/title/Title";
import styles from "./components.module.css";
import ConfirmBtn from "@/ui/buttons/confirmBtn/ConfirmBtn";

const VehicleDetailsForm = ({ form }) => {
  const [showVehicleDetails, setShowVehicleDetails] = useState(false);
  const {
    register,
    formState: { errors },
    watch,
  } = form;

  const toggleVehicleDetails = () => {
    setShowVehicleDetails(!showVehicleDetails);
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
                title={false ? "Loading..." : "Find Vehicle"}
                onClick={() => {}}
                disabled={false}
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
                {...register("vehicleDetails.make")}
                error={errors.vehicleDetails?.make}
              />
            </div>
            <div className={styles.row}>
              <FormDropdown
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
                {...register("vehicleDetails.model")}
                error={errors.vehicleDetails?.model}
              />
              <FormDropdown
                label="Variant"
                options={[
                  "Base",
                  "Sport",
                  "Luxury",
                  "Premium",
                  "Standard",
                  "Deluxe",
                ]}
                placeholder="Choose Variant"
                {...register("vehicleDetails.variant")}
                error={errors.vehicleDetails?.variant}
              />
              <FormDropdown
                label="How much is your vehicle worth?"
                options={[
                  "Under £5,000",
                  "£5,000 - £10,000",
                  "£10,000 - £20,000",
                  "£20,000 - £30,000",
                  "£30,000 - £50,000",
                  "Over £50,000",
                ]}
                placeholder="Choose Price Range"
                {...register("vehicleDetails.price")}
                error={errors.vehicleDetails?.price}
              />
            </div>
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default VehicleDetailsForm;
