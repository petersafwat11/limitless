import React from "react";
import Header from "@/ui/main-pages/header/Header";
import OurBenifits from "@/ui/main-pages/ourBenifits/OurBenifits";
import ServiceDescription from "@/ui/company-pages/mainPages/serviceDescription/ServiceDescription";
import { features, benifits, impoundCoverDetails } from "./data";
import ServiceCovered from "@/ui/company-pages/mainPages/serviceCovered/ServiceCovered";
import Eligability from "@/ui/company-pages/mainPages/eligability/Eligability";
import PaymentOptions from "@/ui/company-pages/mainPages/paymentsOptions/PaymentOptions";
import styles from "./page.module.css";
const page = () => {
  return (
    <div>
      <Header
        subTitle="specialized for vehicle insurance"
        title="Impound Insurance"
        description="Impound insurance is a specialized type of vehicle insurance required to release a car from a police impound. Most car insurance policies don’t meet the requirements for impounded vehicles, which is where impound insurance comes in."
        features={features}
      />
      <OurBenifits
        benifits={benifits}
        title="Why might your vehicle be impounded?"
      />
      <ServiceDescription
        services={[
          "The cover you need to release your car from the impound",
          "30 days cover (legal minimum length required for release)",
          "Immediate cover. Save on impound storage fees",
        ]}
        title="Impound Vehicle Insurance"
        description="Temporary compound insurance allows you to release your car quickly
          and easily."
        button="Get a Quote"
      />
      <ServiceCovered
        title="What does impound car insurance cover?"
        description="Tempcover works with a panel of insurers to provide you with compound car insurance cover. As such, full details of cover may differ depending on your insurer. Since our impound car insurance policies last for 30 days, you’ll have the freedom to do whatever you want with your car once it’s recovered – whether that’s selling it, declaring it SORN or taking it back on the road. Before buying, please double-check the policy wording."
        covered={impoundCoverDetails.covered}
        unCovered={impoundCoverDetails.unCovered}
      />
      <Eligability />
      <div className={styles.paymentOptions}>
        <PaymentOptions />
      </div>
      {/* <TermsAndConditions /> */}
    </div>
  );
};

export default page;
