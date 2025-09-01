import React from "react";
import Header from "@/ui/main-pages/header/Header";
import OurBenifits from "@/ui/main-pages/ourBenifits/OurBenifits";
import ServiceDescription from "@/ui/company-pages/mainPages/serviceDescription/ServiceDescription";
import {
  features,
  benifits,
  temporaryCoverDetails,
  temporaryEligibility,
} from "./data";
import ServiceCovered from "@/ui/company-pages/mainPages/serviceCovered/ServiceCovered";
import Eligability from "@/ui/company-pages/mainPages/eligability/Eligability";
import PaymentOptions from "@/ui/company-pages/mainPages/paymentsOptions/PaymentOptions";
import styles from "./page.module.css";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { questions } from "./data";
import { Plus_Jakarta_Sans } from "next/font/google";
import TemporaryCover from "./_components/temporaryCover/TemporaryCover";
import Explaining from "./_components/explaining/Explaining";
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const page = () => {
  return (
    <div>
      <Header
        subTitle="specialized for vehicle insurance"
        title="Impound Insurance"
        description="Impound insurance is a specialized type of vehicle insurance required to release a car from a police impound. Most car insurance policies don’t meet the requirements for impounded vehicles, which is where impound insurance comes in."
        features={features}
      />
      <ServiceDescription
        img={{
          src: "/svg/temporary-vehiclee.svg",
          alt: "temporary vehicle insurance",
          width: 641,
          height: 565,
        }}
        services={[
          "Get flexible cover that's right for you with policies from just 1 hour up to 28 days",
          "Only pay for cover as and when you need it",
          "No impact on your No Claims Discount plus fully comprehensive cover as standard",
        ]}
        title="Temporary vehicle insurance"
        description="Temporary insurance allows you to drive on the go quickly and conveniently"
        button="Get a Quote"
      />
      <OurBenifits
        benifits={benifits}
        title="Am I eligible for temporary insurance?"
      />
      <Explaining />
      <ServiceCovered
        title="What does temporary vehicle insurance cover?"
        description={temporaryCoverDetails.description}
        covered={temporaryCoverDetails.covered}
        unCovered={temporaryCoverDetails.unCovered}
      />
      <TemporaryCover />
      <Eligability data={temporaryEligibility} />
      <div className={styles.paymentOptions}>
        <PaymentOptions />
      </div>
      <div className={styles.questions}>
        <h2 className={`${styles.questionsTitle} ${plusJakartaSans.className}`}>
          Frequently asked<span> questions</span>
        </h2>
        <QuestionsGroup questions={questions} />
      </div>
    </div>
  );
};

export default page;
