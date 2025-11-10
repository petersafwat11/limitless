import React from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { serverFetch } from "@/utils/serverFetch";
import DocumentsClient from "./_components/DocumentsClient";

export const metadata = {
  title: "Your Documentation | Limitless Cover",
};

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    redirect("/login");
  }

  let insurances = [];
  try {
    const response = await serverFetch(
      `${NEXT_PUBLIC_API_URL}/api/insurance/user/my-insurances`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (response.ok) {
      const result = await response.json();
      const allInsurances = result.data?.data || [];

      // Filter for paid insurances only
      // insurances = allInsurances.filter(
      //   (insurance) => insurance.quote?.paid === true
      // );
      insurances = allInsurances;
    }
  } catch (error) {
    console.error("Error fetching insurance:", error);
  }

  return <DocumentsClient insurances={insurances} />;
};

export default page;
