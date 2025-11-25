"use client";

import { useState, useEffect, useRef } from "react";
import Header from "./header/Header";
import PersonalDetails from "./personalDetails/PersonalDetails";
import CoverDetails from "./coverDetails/CoverDetails";
import VehicleDetails from "./vehicleDetails/VehicleDetails";
import CoverLevel from "./coverLevel/CoverLevel";
import Actions from "./actions/Actions";
import PaymentIframe from "./PaymentIframe";
import toast from "@/utils/toast";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function PaymentSummaryClient({ insuranceData, id }) {
  const [showIframe, setShowIframe] = useState(false);
  const [paymentProvider, setPaymentProvider] = useState(null);
  const [isLoadingProvider, setIsLoadingProvider] = useState(false);
  const popupRef = useRef(null);
  const pollIntervalRef = useRef(null);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Fetch payment provider on mount
  useEffect(() => {
    const fetchPaymentProvider = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/customization`);
        if (response.ok) {
          const data = await response.json();
          setPaymentProvider(data?.data?.settings?.paymentProvider || "sumup");
        }
      } catch (error) {
        console.error("Error fetching payment provider:", error);
        setPaymentProvider("sumup"); // Default to sumup on error
      }
    };
    fetchPaymentProvider();
  }, [apiUrl]);

  // Poll for payment status when popup is open (for Stripe)
  const startPaymentPolling = () => {
    pollIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/insurance/check-payment-status/${id}`,
          { method: "GET", credentials: "include" }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.data.paid === true) {
            clearInterval(pollIntervalRef.current);
            if (popupRef.current && !popupRef.current.closed) {
              popupRef.current.close();
            }
            toast.success("Payment successful! Redirecting...");
            setTimeout(() => {
              router.push(`/payment?id=${id}`);
            }, 2000);
          }
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    }, 3000);
  };

  const handlePayClick = async () => {
    if (paymentProvider === "stripe") {
      // Open popup for Stripe (doesn't work in iframe)
      setIsLoadingProvider(true);

      const popupWidth = 500;
      const popupHeight = 700;
      const left = window.screenX + (window.outerWidth - popupWidth) / 2;
      const top = window.screenY + (window.outerHeight - popupHeight) / 2;

      popupRef.current = window.open(
        `https://www.polartradingservices.com/payment?id=${id}`,
        "StripePayment",
        `width=${popupWidth},height=${popupHeight},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );

      setIsLoadingProvider(false);

      // Start polling for payment status
      startPaymentPolling();

      // Check if popup was closed manually
      const checkPopupClosed = setInterval(() => {
        if (popupRef.current && popupRef.current.closed) {
          clearInterval(checkPopupClosed);
          clearInterval(pollIntervalRef.current);
        }
      }, 1000);
    } else {
      // Use iframe for SumUp
      setShowIframe(true);
    }
  };

  const handleCloseIframe = () => {
    setShowIframe(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <Header
        title="Here's Your Insurance Quote"
        subtitle="Review your quote and confirm your cover"
      />
      <div className={"centeredContent"}>
        <div className={styles.container}>
          <div className={styles.first}>
            <VehicleDetails
              data={insuranceData.vehicleDetails}
              carUsage={insuranceData.carUsage}
              insuranceType={insuranceData.type}
            />
            <CoverDetails
              data={insuranceData.coverDetails}
              insuranceType={insuranceData.type}
            />
            <PersonalDetails
              data={insuranceData.userDetails}
              carUsage={insuranceData.carUsage}
              insuranceType={insuranceData.type}
              optionalExtras={insuranceData.optionalExtras}
            />
          </div>
          <div className={styles.second}>
            <CoverLevel
              data={insuranceData.quote}
              insuranceType={insuranceData.type}
              referenceNumber={insuranceData.referenceNumber}
            />
            <Actions
              insuranceId={id}
              insuranceType={insuranceData.type}
              onPayClick={handlePayClick}
            />
          </div>
        </div>
      </div>

      {/* Payment iframe - shown when Pay button is clicked */}
      <PaymentIframe
        insuranceId={id}
        show={showIframe}
        onClose={handleCloseIframe}
      />
    </div>
  );
}
