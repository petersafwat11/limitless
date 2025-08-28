"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import DataAndTime from "@/ui/inputs/selections/dataAndTime/DataAndTime";
import TextInput from "@/ui/inputs/textInput/TextInput";
import TextArea from "@/ui/inputs/textArea/TextArea";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
const Form = () => {
  const [data, setData] = useState({
    policyNumber: "",
    policyHolderFirstName: "",
    policyHolderLastName: "",
    yourNameIfNotPolicyHolder: "",
    policyHolderEmail: "",
    incidentDescription: "",
    incidentDate: "",
    incidentResponsibility: "",
    extraDetails: "",
    vehicleCurrentLocation: "",
    thirdPartyName: "",
    thirdPartyPhone: "",
    thirdPartyEmail: "",
    thirdPartyAddress: "",
    thirdPartyVehicleRegistrationNumber: "",
    thirdPartyVehicleMake: "",
    thirdPartyVehicleModel: "",
    thirdPartyDamage: "",
    isVehicleDrivable: "",
  });

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>Tell us your claim</h2>
      <div className={styles.formContainer}>
        <TextInput
          label="Enter your policy no.*"
          value={data.policyNumber}
          setValue={(e) => setData({ ...data, policyNumber: e.target.value })}
          placeholder="Enter Policy Number"
          type="text"
        />
        <div className={styles.row}>
          <TextInput
            label="Policyholder first name*"
            value={data.policyHolderFirstName}
            setValue={(e) =>
              setData({ ...data, policyHolderFirstName: e.target.value })
            }
            placeholder="Enter Policy Holder First Name"
            type="text"
          />
          <TextInput
            label="Policyholder first name*"
            value={data.policyHolderLastName}
            setValue={(e) =>
              setData({ ...data, policyHolderLastName: e.target.value })
            }
            placeholder="Enter Policy Holder Last Name"
            type="text"
          />
        </div>
        <div className={styles.row}>
          <TextInput
            label="Your name (if you are not the policyholder)"
            value={data.yourNameIfNotPolicyHolder}
            setValue={(e) =>
              setData({ ...data, yourNameIfNotPolicyHolder: e.target.value })
            }
            placeholder="Enter Your Name"
            type="text"
          />
          <TextInput
            label="Email address*"
            value={data.policyHolderEmail}
            setValue={(e) =>
              setData({ ...data, policyHolderEmail: e.target.value })
            }
            placeholder="Enter Policy Holder Email"
            type="email"
          />
        </div>
        <TextArea
          label="Incident description*"
          value={data.incidentDescription}
          setValue={(e) =>
            setData({ ...data, incidentDescription: e.target.value })
          }
          placeholder="Enter Incident Description"
          rows={6}
        />
        <div className={styles.row}>
          <DataAndTime
            data={data}
            setData={setData}
            dateKey="incidentDate"
            dateLabel="*Date of incident (Or estimate the date)"
          />
          <Dropdown
            label="*Do you take responsibility for the incident?*"
            selected={data.incidentResponsibility}
            options={["Policyholder", "Third party"]}
            setSelected={(e) =>
              setData({ ...data, incidentResponsibility: e.target.value })
            }
            placeholder="Select Incident Responsibility"
          />
        </div>
        <TextArea
          label="If not, please give details"
          value={data.extraDetails}
          setValue={(e) => setData({ ...data, extraDetails: e.target.value })}
          placeholder="Enter Extra Details"
          rows={3}
        />
        <div className={styles.row}>
          <TextInput
            label="Where is the vehicle currently?*"
            value={data.vehicleCurrentLocation}
            setValue={(e) =>
              setData({ ...data, vehicleCurrentLocation: e.target.value })
            }
            placeholder="Enter Vehicle Current Location"
            type="text"
          />
          <TextInput
            label="Third party name*"
            value={data.thirdPartyName}
            setValue={(e) =>
              setData({ ...data, thirdPartyName: e.target.value })
            }
            placeholder="Enter Third Party Name"
            type="text"
          />
        </div>

        <div className={styles.row}>
          <TextInput
            label="Third party phone number*"
            value={data.thirdPartyPhone}
            setValue={(e) =>
              setData({ ...data, thirdPartyPhone: e.target.value })
            }
            placeholder="Enter Third Party Phone"
            type="text"
          />
          <TextInput
            label="Third party email address*"
            value={data.thirdPartyEmail}
            setValue={(e) =>
              setData({ ...data, thirdPartyEmail: e.target.value })
            }
            placeholder="Enter Third Party Email"
            type="email"
          />
        </div>
        <div className={styles.row}>
          <TextInput
            label="Third party vehicle registration number*"
            value={data.thirdPartyVehicleRegistrationNumber}
            setValue={(e) =>
              setData({
                ...data,
                thirdPartyVehicleRegistrationNumber: e.target.value,
              })
            }
            placeholder="Enter Third Party Vehicle Registration Number"
            type="text"
          />

          <TextInput
            label="Third party address*"
            value={data.thirdPartyAddress}
            setValue={(e) =>
              setData({ ...data, thirdPartyAddress: e.target.value })
            }
            placeholder="Enter Third Party Address"
            type="text"
          />
        </div>
        <div className={styles.row}>
          <TextInput
            label="Third party vehicle make*"
            value={data.thirdPartyVehicleMake}
            setValue={(e) =>
              setData({ ...data, thirdPartyVehicleMake: e.target.value })
            }
            placeholder="Enter Third Party Vehicle Make"
            type="text"
          />
          <TextInput
            label="Third party vehicle model*"
            value={data.thirdPartyVehicleModel}
            setValue={(e) =>
              setData({ ...data, thirdPartyVehicleModel: e.target.value })
            }
            placeholder="Enter Third Party Vehicle Model"
            type="text"
          />
        </div>
        <TextInput
          label="Tell us about any damage to the third party vehicle*"
          value={data.thirdPartyDamage}
          setValue={(e) =>
            setData({ ...data, thirdPartyDamage: e.target.value })
          }
          placeholder="Enter Third Party Vehicle Damage"
          type="text"
        />
        <Dropdown
          label="Is the vehicle drivable?*"
          selected={data.isVehicleDrivable}
          options={["Yes", "No"]}
          setSelected={(e) =>
            setData({ ...data, isVehicleDrivable: e.target.value })
          }
          placeholder="Select Is Vehicle Drivable"
        />
      </div>
    </div>
  );
};

export default Form;
