import React from "react";
import styles from "./table.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Table = ({ title, columns, data }) => {
  return (
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
                <div className={styles.dateAndRef}>
                  <p className={styles.date}>{row.date}</p>
                  <p className={styles.ref}>{row.ref}</p>
                </div>
              </td>
              <td className={styles.tableCell}>
                <span
                  className={`${styles.statusBadge} ${
                    row.status === "Pending"
                      ? styles.pending
                      : row.status === "Cancelled"
                      ? styles.cancelled
                      : row.status === "Completed"
                      ? styles.completed
                      : ""
                  }`}
                >
                  {row.status}
                </span>
              </td>
              <td className={styles.tableCell}>
                <span className={styles.claimant}>{row.claimant}</span>
              </td>
              <td className={styles.tableCell}>
                <div className={styles.pendingActionsCell}>
                  <p className={styles.pendingActions}>
                    Estimated resolution Date:
                  </p>
                  <p className={styles.pendingActions}>{row.pendingActions}</p>
                </div>
              </td>
              <td className={styles.tableCell}>
                <button className={styles.view}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
