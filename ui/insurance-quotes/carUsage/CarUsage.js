import React from "react";
import styles from "./carUsage.module.css";
import Title from "../title/Title";
import Selection3 from "@/ui/inputs/selections/selection3/Selection3";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
import TextInput from "@/ui/inputs/textInput/TextInput";
import YesORNo from "@/ui/inputs/selections/yesORNo/YesORNo";
const CarUsage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstSection}>
        <Title title="What do you use the car for?" />
        <div className={styles.selections}>
          <Selection3
            options={[
              {
                title: "Social use only",
                description:
                  "Personal use such as shopping or visiting friends and family.",
              },
              {
                title: "Social and commuting",
                description:
                  "Personal use and driving to and from a single place of work or study.",
              },
              {
                title: "Social, commuting and business",
                description:
                  "You drive to various locations for work. You can also add other drivers who use this car for business.",
              },
            ]}
            selectedItem={null}
            setSelectedItem={() => {}}
          />
        </div>
      </div>
      <div className={styles.secondSection}>
        <div className={styles.row}>
          <Dropdown
            options={["Full UK", "Provisional UK", "International", "Other"]}
            selectedItem={null}
            setSelectedItem={() => {}}
            placeholder="Select a license type"
            label="License Type"
          />
          <Dropdown
            options={["Full UK", "Provisional UK", "International", "Other"]}
            selectedItem={null}
            setSelectedItem={() => {}}
            placeholder="Select a license held"
            label="License Held"
          />
          <TextInput
            placeholder="Enter license no."
            label="License No. (Optional)"
          />
        </div>
        <div className={styles.row}>
          <Dropdown
            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            selectedItem={null}
            setSelectedItem={() => {}}
            placeholder="Select a no claims bonus years"
            label="No Claims Bonus (NCB) Years"
          />
          {/* <Dropdown
            options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            selectedItem={null}
            setSelectedItem={() => {}}
            placeholder="Enter voluntary excess "
            label="Voluntary Excess"
          /> */}
          <TextInput
            placeholder="Enter voluntary excess "
            label="Voluntary Excess"
          />
        </div>
      </div>
      <div className={styles.thirdSection}>
        <div className={styles.yesNo}>
          <p className={styles.yesNoTitle}>
            Do you have any unspent or outstanding criminal convictions?
          </p>
          <YesORNo value={false} onChange={() => {}} />
        </div>
        <div className={styles.yesNo}>
          <p className={styles.yesNoTitle}>
            Do you have any medical conditions that are notifible to the DVLA?
          </p>
          <YesORNo value={false} onChange={() => {}} />
        </div>
        <div className={styles.yesNo}>
          <p className={styles.yesNoTitle}>
            Have you ever had insurance cancelled, a claim refused, a policy
            voided, or any special terms imposed? Unspent or outstanding
            criminal convictions?
          </p>
          <YesORNo value={false} onChange={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default CarUsage;
