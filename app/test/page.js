import PolicyUpdated from "@/ui/emails/policyUpdated/PolicyUpdated";
import PolicyConfirmation from "@/ui/emails/policyConfirmation/PolicyConfirmation";
import GetInsuredToday from "@/ui/emails/getInsuredToday/GetInsuredToday";
import React from "react";
const page = () => {
  return (
    <div>
      <PolicyUpdated />
      <PolicyConfirmation />
      <GetInsuredToday />
    </div>
  );
};

export default page;
