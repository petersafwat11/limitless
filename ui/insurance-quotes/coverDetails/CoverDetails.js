"use client";
import React, { useState } from "react";
import styles from "./coverDetails.module.css";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import DataAndTime from "@/ui/inputs/selections/dataAndTime/DataAndTime";
import Title from "../title/Title";
import ComponentWrapper from "../componentWrapper/ComponentWrapper";
const CoverDetails = () => {
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
          <Title title="How long will you need it?" />
          <div className={styles.selectionContainer}>
            <p className={styles.label}>Please select</p>
            <div className={styles.selectionOptions}>
              <Selection1
                noDotMobile
                items={["Days", "Weeks", "Months"]}
                selectedItem={data.type}
                setSelectedItem={(item) => setData({ ...data, type: item })}
                type="checkbox"
              />
              <Selection1
                noDotMobile
                items={["1", "2", "3", "4", "5", "6", "7"]}
                selectedItem={data.value}
                setSelectedItem={(item) => setData({ ...data, value: item })}
                // type="radio"
              />
            </div>
          </div>
        </div>
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
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetails;
