import React from "react";
import Image from "next/image";
import styles from "./coverDetails.module.css";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";
import { Plus_Jakarta_Sans } from "next/font/google";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CoverDetails = ({ data }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <ComponentWrapper title="Cover Details" icon={{ width: 62, height: 62 }}>
      <div className={styles.content}>
        <div className={styles.first}>
          <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
            What type of vehicle is it?
          </h3>
          <div className={styles.duration}>
            <p className={styles.durationQuestion}>
              How long will you need it?
            </p>
            <div className={styles.period}>
              <Image
                src="/svg/included.svg"
                alt="included"
                width={18}
                height={18}
              />
              <p className={styles.periodAnswer}>
                {" "}{data?.period || 0} {data?.type || "Days"}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.second}>
          <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
            When would you like the cover to start?
          </h3>
          <div className={styles.row}>
            <InputWithData2
              item={{
                label: "Date",
                type: "date",
                value: formatDate(data?.startDate) || "N/A",
              }}
            />
            <InputWithData2 
              item={{
                label: "Start Time",
                type: "time",
                value: data?.startTime || "N/A",
              }}
            />
          </div>
        </div>
      </div>
    </ComponentWrapper>
  );
};

export default CoverDetails;
