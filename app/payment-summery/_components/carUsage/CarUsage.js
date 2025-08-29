import React from "react";
import styles from "./carUsage.module.css";
import SelectedItem2 from "../selectedItem2/SelectedItem2";
import { Plus_Jakarta_Sans } from "next/font/google";
import InputWithData2 from "@/ui/inputs/InputWithData2/InputWithData2";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CarUsage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          What do you use the car for?
        </h3>
        <SelectedItem2
          option={{
            title: "Social use only",
            description:
              "Personal use such as shopping or visiting friends and family.",
          }}
        />
      </div>
      <div className={styles.second}>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "License Type",
              value: "Lorem Ipsum",
            }}
          />
          <InputWithData2
            item={{
              label: "License Held",
              value: "Lorem Ipsum",
            }}
          />
          <InputWithData2
            item={{
              label: "License No. (Optional)",
              value: "Lorem Ipsum",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData2
            item={{
              label: "No Claims Bonus (NCB) Years",
              value: "Lorem Ipsum",
            }}
          />
          <InputWithData2
            item={{
              label: "Voluntary Excess",
              value: "Lorem Ipsum",
            }}
          />
        </div>
      </div>
      <div className={styles.third}>
        <InputWithData2
          item={{
            label:
              "Do you have any unspent or outstanding criminal convictions?",
            value: "No",
          }}
        />
        <InputWithData2
          item={{
            label:
              "Do you have any medical conditions that are notifible to the DVLA?",
            value: "No",
          }}
        />
        <InputWithData2
          item={{
            label:
              "Have you ever had insurance cancelled, a claim refused, a policy voided, or any special terms imposed? Unspent or outstanding criminal convictions?",
            value: "No",
          }}
        />
      </div>
    </div>
  );
};

export default CarUsage;
