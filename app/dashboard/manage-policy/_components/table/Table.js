import React from "react";
import styles from "./table.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Table = ({ title, columns, data, tableType }) => {
  return (
    <>
      <div className={styles.container}>
        <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
          {title}
        </h3>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr className={styles.tableHeaderRow}>
              {columns.map((column, index) => (
                <th className={styles.tableHeaderCell} key={index}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.map((row, index) => (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>
                  <span className={styles.claimant}>{row.policyNumber}</span>
                </td>

                <td className={styles.tableCell}>
                  <span
                    className={`${styles.statusBadge} ${
                      tableType === "active" ? styles.active : styles.inactive
                    }`}
                  >
                    {row.remaining}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <span className={styles.claimant}>{row.name}</span>
                </td>
                <td className={styles.tableCell}>
                  <span className={`${styles.claimant} ${styles.vehicleReg}`}>
                    {row.vehicleReg}
                  </span>
                </td>
                <td className={styles.tableCell}>
                  <button className={styles.view}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.mobile}>
        <h1 className={styles.mobileTitle}>{title}</h1>
        {data.map((row, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.first}>
              <div className={styles.data}>
                <p className={styles.label}>Policy Number</p>
                <div className={styles.claimant}>{row.policyNumber}</div>
              </div>
              <div className={styles.data}>
                <p className={styles.label}>Policy Holder</p>
                <div className={styles.claimant}>{row.name}</div>
              </div>
              <div className={styles.data}>
                <p className={styles.label}>Vehicle Reg</p>
                <div className={styles.claimant}>{row.vehicleReg}</div>
              </div>
            </div>
            <div className={styles.second}>
              <div
                className={`${styles.statusBadge} ${
                  tableType === "active" ? styles.active : styles.inactive
                }`}
              >
                {row.remaining}
              </div>

              <div className={styles.actions}>
                <button className={styles.view}>Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Table;
