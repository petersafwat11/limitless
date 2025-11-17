import React from "react";
import styles from "./coverLevel.module.css";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaCheck, FaReceipt } from "react-icons/fa6";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const CoverLevel = ({ data, insuranceType }) => {
  const getInsuranceTypeName = () => {
    if (!insuranceType) return "N/A";
    if (insuranceType === "Temp") return "Temporary Insurance";
    if (insuranceType === "Impound") return "Impound Insurance";
    return insuranceType;
  };

  // Check if user filled Additional Information (for Annual insurance)
  const hasAdditionalInfo =
    data?.carUsage?.ownsHome !== null && data?.carUsage?.ownsHome !== undefined;

  const features =
    insuranceType === "Temp"
      ? [
          "Instant documents",
          "Uninsured driver promise",
          "European cover",
          "Protected no claims",
          "Loss, theft, fire or vandalism cover",
          "Legal liability cover",
        ]
      : insuranceType === "Impound"
      ? [
          "Instant documents",
          "Uninsured driver promise",
          "Protected no claims",
          "Loss, theft, fire or vandalism cover",
          "Legal liability cover",
          "Impound Release",
        ]
      : [
          "Instant documents",
          "Uninsured driver promise",
          "Loss, theft, fire or vandalism cover",
          "Legal liability cover",
          "Accidental damage",
          "European coverage",
          ...(hasAdditionalInfo ? ["Protected no claims"] : []),
        ];
  return (
    <div className={styles.container}>
      <h3 className={`${styles.title} ${plusJakartaSans.className}`}>
        Current level of cover
      </h3>
      <div className={styles.coverType}>
        <p className={styles.coverTypeTitle}>Type</p>
        <p className={`${styles.coverTypeValue} ${plusJakartaSans.className}`}>
          {getInsuranceTypeName(insuranceType)}
        </p>
      </div>

      <div className={styles.summery}>
        <div className={styles.content}>
          <div className={styles.total}>
            <Image
              src="/svg/total-price.svg"
              alt="total"
              width={22}
              height={22}
            />
            <p className={`${styles.totalTitle} ${plusJakartaSans.className}`}>
              Total Price
            </p>
          </div>
          <p className={styles.totalPrice}>{`£${data?.priceAmount}`} </p>
          <p className={styles.totalPriceDescription}>
            Including all additional fees
          </p>
        </div>

        <Image
          src="/svg/cover-level-2.svg"
          alt="vehicle-covered"
          width={153}
          height={81}
          className={styles.vehicleCovered}
        />
      </div>
      <div className={styles.header}>
        <div className={styles.headerItem}>
          <FaReceipt className={styles.headerItemIcon} />
          <p className={styles.headerItemTitle}>Quote Reference</p>
        </div>
        <p className={styles.headerItemValue}>
          #{data?.referenceNumber || "N/A"}
        </p>
      </div>
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div className={styles.featureItem} key={index}>
            <div className={styles.iconWrapper}>
              <FaCheck className={styles.checkIcon} />
            </div>
            <p className={styles.featureItemTitle}>{feature}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverLevel;
