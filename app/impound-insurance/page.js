import React from "react";
import TermsAndConditions from "@/ui/insurance-quotes/termsAndConditions/TermsAndConditions";
import styles from "./page.module.css";
import CoverDetails from "@/ui/insurance-quotes/coverDetails/CoverDetails";
import PersonalDetails from "@/ui/insurance-quotes/personalDetails/PersonalDetails";
import VehicleDetails from "@/ui/insurance-quotes/vehicleDetails/VehicleDetails";
import Header from "@/ui/insurance-quotes/header/Header";
import ImpoundCoverDetails from "@/ui/insurance-quotes/impoundCoverDetails/ImpoundCoverDetails";
const page = () => {
  return (
    <div>
      <Header title="Impound Insurance" />
      <div className={"centeredContent"}>
        <div className="insuranceQuotesContainer">
          <VehicleDetails />
          {/* <CoverDetails /> */}
          <ImpoundCoverDetails />
          <PersonalDetails />
          <TermsAndConditions />
        </div>
      </div>
    </div>
  );
};

export default page;
