import React from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import PaymentSummaryClient from "./_components/PaymentSummaryClient";

const page = async ({ searchParams }) => {
  const { id } = await searchParams;
  let insuranceData = null;
  let error = null;

  try {
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/insurance/${id}`);

    if (response.status === 200 && response.data.data) {
      insuranceData = response.data.data.data || response.data.data;
    } else {
      error = "Insurance not found";
    }
  } catch (err) {
    console.error("Error fetching insurance:", err);
    error =
      err.response?.status === 404
        ? "Insurance not found"
        : "Failed to load insurance details";
  }

  // Redirect if no insurance found or error
  if (!insuranceData || error) {
    redirect("/error");
  }

  return <PaymentSummaryClient insuranceData={insuranceData} id={id} />;
};

export default page;
