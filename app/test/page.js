import React from "react";
import ReminderEmail from "@/ui/emails/remiderEmail/reminderEmail";

const page = () => {
  return (
    <div>
      <ReminderEmail
        price="100.00"
        fixedDate="15/01/2025"
        policyHolder="John Smith"
        vehicleType="JAGUAR XE Lalala"
        registration="GL17 LLC"
        insurance="Impound"
        duration="30 days"
        viewQuoteLink="https://your-link.com"
      />
    </div>
  );
};

export default page;
