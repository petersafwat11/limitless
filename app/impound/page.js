import React from "react";
import Header from "@/ui/main-pages/header/Header";
import OurBenifits from "@/ui/main-pages/ourBenifits/OurBenifits";
import ServiceDescription from "@/ui/main-pages/serviceDescription/ServiceDescription";
import {
  features,
  benifits,
  impoundCoverDetails,
  impoundEligibility,
} from "./data";
import ServiceCovered from "@/ui/main-pages/serviceCovered/ServiceCovered";
import Eligability from "@/ui/main-pages/eligability/Eligability";
import PaymentOptions from "@/ui/main-pages/paymentsOptions/PaymentOptions";
import styles from "./page.module.css";
import WhenImpound from "./_components/whenImpound/WhenImpound";
import QuestionsGroup from "./_components/questionsGroup/QuestionsGroup";
import { questions } from "./data";
import { Plus_Jakarta_Sans } from "next/font/google";
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
        services={[
          "The cover you need to release your car from the impound",
          "30 days cover (legal minimum length required for release)",
          "Immediate cover. Save on impound storage fees",
        ]}
        title="Impound Vehicle Insurance"
        description="Temporary compound insurance allows you to release your car quickly
                  and easily."
        img={{
          src: "/svg/get-quote.svg",
          alt: "impound vehicle insurance",
          width: 610,
          height: 393,
        }}
        button="Get a Quote"
      />
      <OurBenifits
        benifits={benifits}
        title="Why might your vehicle be impounded?"
      />
      <WhenImpound />

      <ServiceCovered
        title="What does impound vehicle insurance cover?"
        description="Tempcover works with a panel of insurers to provide you with compound car insurance cover. As such, full details of cover may differ depending on your insurer. Since our impound car insurance policies last for 30 days, you’ll have the freedom to do whatever you want with your car once it’s recovered – whether that’s selling it, declaring it SORN or taking it back on the road. Before buying, please double-check the policy wording."
        covered={impoundCoverDetails.covered}
        unCovered={impoundCoverDetails.unCovered}
      />
      <Eligability data={impoundEligibility} />
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
