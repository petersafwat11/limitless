import React from "react";
import styles from "./personalDetails.module.css";
import HeaderTitle from "../headerTitle/HeaderTitle";
import InputWithData from "@/ui/InputWithData/InputWithData";
import SelectedItem from "../selectedItem/SelectedItem";
import CarUsage from "../carUsage/CarUsage";
import ComponentWrapper from "@/ui/insurance-quotes/componentWrapper/ComponentWrapper";

const PersonalDetails = () => {
  return (
    <ComponentWrapper title="Personal Details" icon={{width: 62, height: 62}}>
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
        <SelectedItem
          item="Office or factory car park"
          title="Where do you keep your car during the day?"
          description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
          img="/svg/day.svg"
        />
        <SelectedItem
          item="Street outside home"
          title="Where do you keep your car during the day?"
          description="You can find the 'acquired vehicle on date in the V5C registration document, also known as the log book."
          img="/svg/night.svg"
        />
      </div>
      <CarUsage />
    </ComponentWrapper>
  );
};

export default PersonalDetails;
