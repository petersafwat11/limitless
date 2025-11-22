import PolicyUpdated from "@/ui/emails/policyUpdated/PolicyUpdated";
import ResetPassword from "@/ui/emails/resetPassword/ResetPassword";
import PolicyConfirmation from "@/ui/emails/policyConfirmation/PolicyConfirmation";
import GetInsuredToday from "@/ui/emails/getInsuredToday/GetInsuredToday";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <PolicyUpdated />
      <ResetPassword /> */}
      {/* <PolicyConfirmation /> */}
      <GetInsuredToday />
    </div>
  );
};

export default page;
