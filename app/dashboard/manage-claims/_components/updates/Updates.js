import React from "react";
import styles from "./updates.module.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const Updates = ({ columns, data }) => {
  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        Updates
      </h3>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableHeaderRow}>
            <th className={styles.tableHeaderCell}></th>
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
                {index + 1 !== data.length ? (
                  <Image
                    src="/svg/blue-head.svg"
                    alt="admin"
                    width={20}
                    height={20}
                    className={styles.admin}
                  />
                ) : (
                  <Image
                    src="/svg/gray-head.svg"
                    alt="admin"
                    width={20}
                    height={20}
                    className={styles.admin}
                  />
                )}
              </td>
              <td className={styles.tableCell}>
              <span className={styles.claimant}>{row.description}</span>
              <span className={styles.dateMobile}>{row.date}</span>
              </td>
              <td className={styles.tableCell}>
                <span className={styles.claimant}>{row.date}</span>
              </td>
              <td className={styles.tableCell}>
                <span className={styles.claimant}>{row.time}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Updates;
