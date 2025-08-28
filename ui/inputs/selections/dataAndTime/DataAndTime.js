import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import styles from "./dataAndTime.module.css";
  const DataAndTime = ({ data, setData, dateLabel, timeLabel ,dateKey, timeKey}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    data.date ? new Date(data.date) : null
  );
  const timeInputRef = useRef(null);

  // Initialize flatpickr for time picker
  useEffect(() => {
    if (timeInputRef.current) {
      const fp = flatpickr(timeInputRef.current, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        defaultDate: data.time || "12:00",
        onChange: (selectedDates, dateStr) => {
          setData({ ...data, time: dateStr });
        },
      });

      return () => fp.destroy();
    }
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? date.toLocaleDateString("en-GB") : "";
    setData({ ...data, date: formattedDate });
    setShowDatePicker(false);
  };

  const handleDateIconClick = () => {
    setShowDatePicker(true);
  };

  return (
    <div className={styles.container}>
     {dateLabel && <div className={styles.inputGroup}>
        <label className={styles.label}>{dateLabel}</label>
        <div className={styles.inputContainer} onClick={handleDateIconClick}>
          <div className={styles.iconContainer}>
            <Image
              src="/svg/date.svg"
              alt="calendar"
              width={24}
              height={24}
              className={styles.icon}
            />
          </div>
          <input
            value={data.date || ""}
            type="text"
            placeholder="DD/MM/YYYY"
            className={styles.input}
            readOnly
          />
          <Image
            src="/svg/arrow-down.svg"
            alt="arrow-down"
            width={24}
            height={24}
            className={styles.arrowDown}
          />
        </div>
        {showDatePicker && (
          <div className={styles.datePickerWrapper}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              calendarClassName={styles.customCalendar}
              onClickOutside={() => setShowDatePicker(false)}
            />
          </div>
        )}
      </div>}
      {timeLabel && <div className={styles.inputGroup}>
        <label className={styles.label}>{timeLabel}</label>
        <div className={styles.inputContainer}>
          <div className={styles.iconContainer}>
            <Image
              src="/svg/time.svg"
              alt="time"
              width={24}
              height={24}
              className={styles.icon}
            />
          </div>
          <input
            ref={timeInputRef}
            value={data.time || ""}
            onChange={(e) => setData({ ...data, time: e.target.value })}
            type="text"
            placeholder="--:--"
            className={styles.input}
          />
          <Image
            src="/svg/arrow-down.svg"
            alt="arrow-down"
            width={24}
            height={24}
            className={styles.arrowDown}
          />
        </div>
      </div>}
    </div>
  );
};

export default DataAndTime;
