"use client";
import React from "react";
import styles from "./table.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter } from "next/navigation";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const Table = ({ title, columns, data }) => {
  const router = useRouter();
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
                    <p className={styles.pendingActions}>
                      {row.pendingActions}
                    </p>
                  </div>
                </td>
                 <td className={styles.tableCell}>
                  <button onClick={() => router.push(`/dashboard/manage-claims/${row.id}`)} className={styles.view}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.mobile}>
        <h1 className={styles.mobileTitle}>Pending Claims</h1>
        {data.map((row, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.first}>
              <div className={styles.data}>
                <p className={styles.label}>Date of Claim</p>
                <div className={styles.dateAndRef}>
                  <p className={styles.date}>{row.date}</p>
                  <p className={styles.ref}>{row.ref}</p>
                </div>
              </div>
              <div className={styles.claimant}>{row.claimant}</div>
              <div className={styles.pendingActionsCell}>
                <p className={styles.pendingActions}>
                  Estimated resolution Date:
                </p>
                <p className={styles.pendingActions}>{row.pendingActions}</p>
              </div>
            </div>
            <div className={styles.second}>
              <div
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
              </div>

              <div
                onClick={() =>
                  router.push(`/dashboard/manage-claims/${row.id}`)
                }
                className={styles.actions}
              >
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
