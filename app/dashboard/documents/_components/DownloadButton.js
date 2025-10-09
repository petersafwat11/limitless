"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function DownloadButton({ insuranceId, insuranceType }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      
      // Get token from cookies
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        toast.error("Please login to download documents");
        setIsDownloading(false);
        return;
      }

      // Determine certificate type based on insurance type
      const certificateType = insuranceType?.toLowerCase() === "impound" ? "impound" : "standard";

      const response = await fetch(
        `${apiUrl}/api/pdf/certificate/${insuranceId}?certificateType=${certificateType}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download certificate");
      }

      // Get the blob from response
      const blob = await response.blob();
      
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Certificate_${insuranceId}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download certificate");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: isDownloading ? "#9ca3af" : "#3b82f6",
        color: "white",
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        cursor: isDownloading ? "not-allowed" : "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (!isDownloading) {
          e.target.style.background = "#2563eb";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDownloading) {
          e.target.style.background = "#3b82f6";
        }
      }}
    >
      <Image
        src="/svg/pdf.svg"
        alt="pdf"
        width={18}
        height={18}
      />
      <span>{isDownloading ? "Downloading..." : "Download PDF"}</span>
    </button>
  );
}
