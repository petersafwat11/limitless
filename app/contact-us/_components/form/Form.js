"use client";
import React, { useState } from "react";
import styles from "./form.module.css";
import Image from "next/image";
import TextInput from "@/ui/inputs/textInput/TextInput";
import TextArea from "@/ui/inputs/textArea/TextArea";
import Selection1 from "@/ui/inputs/selections/selection1/Selection1";
import Dropdown from "@/ui/inputs/dropdown/Dropdown";
const Form = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    message: "",
  });
  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Select the Appropriate Option</label>
        <Selection1
          items={["Question", "Complaint", "other"]}
          selectedItem={data.type}
          setSelectedItem={(item) => setData({ ...data, type: item })}
          type="checkbox"
        />
      </div>
      <div className={styles.dropdown}>
        <Dropdown
          label="Select the Appropriate Option"
          selected={data.type}
          options={["Question", "Complaint", "other"]}
          setSelected={(item) => setData({ ...data, type: item })}
        />
      </div>
      <div className={styles.row}>
        <TextInput
          label="Full Name"
          value={data.fullName}
          setValue={(e) => setData({ ...data, fullName: e.target.value })}
          placeholder="Enter your Full Name"
          type="text"
        />
        <TextInput
          label="Email Address"
          value={data.email}
          setValue={(e) => setData({ ...data, email: e.target.value })}
          placeholder="Enter your Email Address"
          type="text"
        />
      </div>
      <TextArea
        label="Your Message"
        value={data.message}
        setValue={(e) => setData({ ...data, message: e.target.value })}
        placeholder="Enter your Message"
        rows={3}
      />

      <button className={styles.button}>
        Continue{" "}
        <Image
          src="/svg/arrow-right.svg"
          alt="arrow-right"
          width={27}
          height={14}
        />
      </button>
    </div>
  );
};

export default Form;
