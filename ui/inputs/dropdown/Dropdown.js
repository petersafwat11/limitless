import React, { useState, useRef, useEffect } from "react";
import styles from "./dropdown.module.css";
import Image from "next/image";
import { useDropdownManager } from "./useDropdownManager";

const Dropdown = ({ label, selected, options, setSelected, placeholder }) => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdownManager();
  const dropdownRef = useRef(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, closeDropdown]);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <p className={styles.label}>{label}</p>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <p className={styles.selected}>{selected || placeholder}</p>
        <Image
          src="/svg/arrow-down.svg"
          alt="arrow-down"
          width={24}
          height={24}
        />
        {isOpen && (
          <div className={styles.dropdownOptions}>
            {options.map((option) => (
              <div
                key={option}
                className={`${styles.dropdownOption} ${
                  selected === option ? styles.selectedOption : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(option);
                  closeDropdown();
                }}
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
