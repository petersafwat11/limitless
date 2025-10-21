"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

export default function DownloadButton({
  insuranceId,
  pdfType,
  label = "Download PDF",
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      // Make request with credentials to include cookies
      const response = await fetch(
        `${apiUrl}/api/insurance/download-pdf/${insuranceId}/${pdfType}`,
        {
          method: "GET",
          credentials: "include", // This sends cookies cross-origin
          // mode: "cors",
          headers: {
            "Accept": "application/pdf",
          },
          // Important: Don't set Content-Type for GET requests
        }
      );

      // if (!response.ok) {
      //   // Handle authentication errors
      //   if (response.status === 401) {
      //     toast.error("Authentication failed. Please refresh the page and try again.");
      //     return;
      //   }
      //   throw new Error("Failed to download PDF");
      // }

      // Get the blob from response
      const blob = await response.blob();

      // Get filename from content-disposition header or use default
      const contentDisposition = response.headers.get("content-disposition");
      let filename = `Document_${insuranceId}.pdf`;
      if (contentDisposition) {
        // Match filename with or without quotes, but don't include quotes in capture
        const filenameMatch = contentDisposition.match(
          /filename="([^"]+)"|filename=([^;\s]+)/
        );
        if (filenameMatch) {
          // Use the first non-null capture group
          filename = filenameMatch[1] || filenameMatch[2];
        }
      }

      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      // Cleanup after a short delay to ensure download starts
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download PDF");
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
        color: "#0388FF",
        fontSize: "14px",
        fontWeight: "400",
        lineHeight: "124%",
        letterSpacing: "0.56px",
        background: "transparent",
        border: "none",
        cursor: isDownloading ? "not-allowed" : "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (!isDownloading) {
          e.target.style.color = "#2563eb";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDownloading) {
          e.target.style.color = "#3b82f6";
        }
      }}
    >
      <Image src="/svg/pdf.svg" alt="pdf" width={18} height={18} />
      <span>{isDownloading ? "Downloading..." : label}</span>
    </button>
  );
}
