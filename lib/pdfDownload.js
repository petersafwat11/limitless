import { toast } from "react-toastify";

/**
 * Download a static PDF file
 * @param {string} filename - The filename of the PDF in the backend/public/pdf folder
 */
export const downloadStaticPDF = async (filename) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
      `${apiUrl}/api/pdf/download/${encodeURIComponent(filename)}`,
      {
        method: "GET",

        credentials: "include",
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download PDF");
    }

    const blob = await response.blob();
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
    return { success: true };
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download PDF");
    return { success: false, error: error.message };
  }
};

/**
 * Download a dynamic Certificate of Motor Insurance with user data
 * @param {string} insuranceId - The insurance record ID
 * @param {string} certificateType - 'standard' or 'impound'
 */
export const downloadCertificate = async (
  insuranceId,
  certificateType = "standard"
) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
      `${apiUrl}/api/pdf/certificate/${insuranceId}?certificateType=${certificateType}`,
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate certificate");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Certificate_${insuranceId}.pdf`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    // Cleanup after a short delay to ensure download starts
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

    toast.success("Certificate downloaded successfully!");
    return { success: true };
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download certificate");
    return { success: false, error: error.message };
  }
};

/**
 * Download Statement of Fact with user data
 * @param {string} insuranceId - The insurance record ID
 */
export const downloadStatementOfFact = async (insuranceId) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(
      `${apiUrl}/api/pdf/statement-of-fact/${insuranceId}`,
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate statement of fact");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Statement_of_Fact_${insuranceId}.pdf`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    // Cleanup after a short delay to ensure download starts
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

    toast.success("Statement of Fact downloaded successfully!");
    return { success: true };
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download statement");
    return { success: false, error: error.message };
  }
};

/**
 * Download Insurance Product Information Document (IPID)
 * @param {string} insuranceId - The insurance record ID
 */
export const downloadIPID = async (insuranceId) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}/api/pdf/ipid/${insuranceId}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error("Failed to generate IPID");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `IPID_${insuranceId}.pdf`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();

    // Cleanup after a short delay to ensure download starts
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

    toast.success("IPID downloaded successfully!");
    return { success: true };
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download IPID");
    return { success: false, error: error.message };
  }
};
