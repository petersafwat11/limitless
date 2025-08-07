import React from "react";
import styles from "./carUsage.module.css";
import HeaderTitle from "../headerTitle/HeaderTitle";
import InputWithData from "@/ui/InputWithData/InputWithData";
import SelectedItem2 from "../selectedItem2/SelectedItem2";
const CarUsage = () => {
  return (
    <div className={styles.container}>
      <HeaderTitle title="Car Usage" />
      <div className={styles.content}>
        <SelectedItem2
          option={{
            title: "Social use only",
            description:
              "Personal use such as shopping or visiting friends and family.",
          }}
        />
        <div className={styles.data}>
          <div className={styles.row}>
            <InputWithData
              item={{
                label: "License Type",
                value: "Lorem Ipsum",
              }}
            />
            <InputWithData
              item={{
                label: "License Held",
                value: "Lorem Ipsum",
              }}
            />
            <InputWithData
              item={{
                label: "License No. (Optional)",
                value: "Lorem Ipsum",
              }}
            />
          </div>
          <div className={styles.row}>
            <InputWithData
              item={{
                label: "No Claims Bonus (NCB) Years",
                value: "Lorem Ipsum",
              }}
            />
            <InputWithData
              item={{
                label: "Voluntary Excess",
                value: "Lorem Ipsum",
              }}
            />
          </div>
          <InputWithData
            item={{
              label:
                "Do you have any unspent or outstanding criminal convictions?",
              value: "No",
            }}
          />
          <InputWithData
            item={{
              label:
                "Do you have any medical conditions that are notifible to the DVLA?",
              value: "No",
            }}
          />
          <InputWithData
            item={{
              label:
                "Have you ever had insurance cancelled, a claim refused, a policy voided, or any special terms imposed? Unspent or outstanding criminal convictions?",
              value: "No",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CarUsage;
