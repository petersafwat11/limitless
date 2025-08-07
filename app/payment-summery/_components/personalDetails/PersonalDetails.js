import React from "react";
import styles from "./personalDetails.module.css";
import HeaderTitle from "../headerTitle/HeaderTitle";
import InputWithData from "@/ui/InputWithData/InputWithData";

const PersonalDetails = () => {
  return (
    <div className={styles.container}>
      <HeaderTitle title="Personal Details" />

      <div className={styles.content}>
        <div className={styles.row}>
          <InputWithData
            item={{
              label: "First Name",
              value: "Roland Maguire",
            }}
          />
          <InputWithData
            item={{
              label: "Surname",
              value: "Maguire",
            }}
          />{" "}
          <InputWithData
            item={{
              label: "Date of Birth",
              value: "12/02/1990",
            }}
          />
        </div>
        <div className={styles.row}>
          <InputWithData
            item={{
              label: "Email Address",
              value: "roland@gmail.com",
            }}
          />
          <InputWithData
            item={{
              label: "Contact Number",
              value: "0987654321",
            }}
          />
        </div>
        <InputWithData
          item={{
            label: "Post Code",
            value: "SW1A 1AA",
          }}
        />
        <InputWithData
          item={{
            label: "Selected Address",
            value: "123 Main St, Anytown, USA",
          }}
        />
        <InputWithData
          item={{
            label: "Employment Status",
            value: "Self-Employed",
          }}
        />
        <InputWithData
          item={{
            label: "Occupation",
            value: "Self-Employed",
          }}
        />
        <InputWithData
          item={{
            label: "Industry",
            value: "Self-Employed",
          }}
        />
      </div>
      <div className={styles.selections}>
        
      </div>
    </div>
  );
};

export default PersonalDetails;
