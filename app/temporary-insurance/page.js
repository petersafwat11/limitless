import React from "react";
import TermsAndConditions from "@/ui/insurance-quotes/termsAndConditions/TermsAndConditions";
import styles from "./page.module.css";
import CoverDetails from "@/ui/insurance-quotes/coverDetails/CoverDetails";
import PersonalDetails from "@/ui/insurance-quotes/personalDetails/PersonalDetails";
import VehicleDetails from "@/ui/insurance-quotes/vehicleDetails/VehicleDetails";
import Header from "@/ui/insurance-quotes/header/Header";
const page = () => {
  return (
    <div>
      <Header title="Temporary Insurance" />

      <div className="insuranceQuotesContainer">
        <VehicleDetails />
        <CoverDetails />
        <PersonalDetails />
        <TermsAndConditions />
      </div>
    </div>
  );
};

export default page;
