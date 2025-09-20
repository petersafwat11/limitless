"use client";
import React from "react";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import FormDataAndTime from "@/ui/inputs/FormDataAndTime";
import Title from "@/ui/insurance-quotes/title/Title";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import styles from "./components.module.css";

const CoverDetailsForm = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;
  const coverType = watch("coverDetails.type");
  const period = watch("coverDetails.period");

  const handleTypeChange = (type) => {
    setValue("coverDetails.type", type);
    setValue("coverDetails.period", 1); // Reset period when type changes
  };

  const handlePeriodChange = (periodValue) => {
    setValue("coverDetails.period", parseInt(periodValue));
  };

  const getPeriodOptions = () => {
    switch (coverType) {
      case "Hours":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      case "Days":
        return ["1", "2", "3", "4", "5", "6", "7"];
      case "Weeks":
        return ["1", "2", "3", "4"];
      case "Months":
        return ["1", "2", "3", "6", "12"];
      default:
        return ["1", "2", "3", "4", "5", "6", "7"];
    }
  };

  return (
    <ComponentWrapper title="Cover Details">
      <div className={`${styles.content} ${styles.coverDetailsContainer}`}>
        <div className={styles.inputGroup}>
          <Title title="How long will you need it?" />
          <div className={styles.selectionContainer}>
            <p className={styles.label}>Please select</p>
            <div className={styles.selectionOptions}>
              <Selection1
                noDotMobile
                items={["Hours", "Days", "Weeks"]}
                selectedItem={coverType}
                setSelectedItem={handleTypeChange}
                type="checkbox"
              />
              <Selection1
                noDotMobile
                items={getPeriodOptions()}
                selectedItem={period?.toString()}
                setSelectedItem={handlePeriodChange}
              />
            </div>
          </div>
          {errors.coverDetails?.type && (
            <span className={styles.error}>
              {errors.coverDetails.type.message}
            </span>
          )}
          {errors.coverDetails?.period && (
            <span className={styles.error}>
              {errors.coverDetails.period.message}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <Title title="When would you like the cover to start?" />
          <div className={styles.dateTimeContainer}>
            <FormDataAndTime
              dateLabel="Start Date"
              type="date"
              {...register("coverDetails.startDate")}
              value={watch("coverDetails.startDate")}
              error={errors.coverDetails?.startDate}
            />
            <FormDataAndTime
              timeLabel="Start Time"
              type="time"
              {...register("coverDetails.startTime")}
              value={watch("coverDetails.startTime")}
              error={errors.coverDetails?.startTime}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetailsForm;
