import React, { useState } from "react";
import styles from "./dropdown.module.css";
import Image from "next/image";
const Dropdown = ({ label, selected, options, setSelected, placeholder }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className={styles.container}>
      <p className={styles.label}>{label}</p>
      <div
        className={styles.dropdown}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <p className={styles.selected}>{selected || placeholder}</p>
        <Image
          src="/svg/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
        {showDropdown && (
          <div className={styles.dropdownOptions}>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.dropdownOption} ${
                  selected === option ? styles.selectedOption : ""
                }`}
                onClick={() => setSelected(option)}
              >
                <span
                  className={`${styles.selectionSpan} ${
                    selected === option ? styles.selectedSpan : ""
                  }`}
                ></span>

                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
