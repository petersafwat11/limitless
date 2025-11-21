import PolicyUpdated from "@/ui/emails/policyUpdated/PolicyUpdated";
import ResetPassword from "@/ui/emails/resetPassword/ResetPassword";
import PolicyConfirmation from "@/ui/emails/policyConfirmation/PolicyConfirmation";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <PolicyUpdated />
      <ResetPassword /> */}
      <PolicyConfirmation />
    </div>
  );
};

export default page;
