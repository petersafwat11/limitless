"use client";
import React, { useState } from "react";
import styles from "./coverDetails.module.css";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import DataAndTime from "@/ui/inputs/selections/dataAndTime/DataAndTime";
import Title from "../title/Title";
import ComponentWrapper from "../componentWrapper/ComponentWrapper";
import Selection4 from "@/ui/inputs/selections/selection4/Selection4";
const ImpoundCoverDetails = () => {
  const [data, setData] = useState({
    type: "days",
    period: 1,
    startDate: "2025-01-01",
    startTime: "10:00",
  });
  return (
    <ComponentWrapper title="Cover Details">
      <div className={styles.content}>
        <div className={styles.inputGroup}>
          <Title title="When would you like the cover to start?" />
          <DataAndTime
            data={data}
            setData={setData}
            // type="date"
            dateKey="startDate"
            dateLabel="Start Date"
            timeLabel="Start Time"
            timeKey="startTime"
          />
        </div>

        <div className={styles.inputGroup}>
          <Title title="Which type of impound insurance?" />
          <div className={styles.selectionContainer}>
            <p className={styles.label}>Please select</p>
            <Selection4
              options={[
                "Impound Insurance ",
                "Under 21 Impound Insurance ",
                "Impounded Van Insurance ",
                "Banned driver impoundinsurance",
                "Provisional Impound Insurance ",
                "Named Driver Impound Insurance ",
              ]}
              selectedItem={data.type}
              setSelectedItem={(item) => setData({ ...data, type: item })}
            />
            {/* <div className={styles.selectionOptions}>
              <Selection1
                items={["Days", "Weeks", "Months"]}
                selectedItem={data.type}
                setSelectedItem={(item) => setData({ ...data, type: item })}
                type="checkbox"
              />
              <Selection1
                items={["1", "2", "3", "4", "5", "6", "7"]}
                selectedItem={data.value}
                setSelectedItem={(item) => setData({ ...data, value: item })}
                // type="radio"
              />
            </div> */}
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default ImpoundCoverDetails;
