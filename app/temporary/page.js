import React from "react";
import TermsAndConditions from "@/ui/insurance-quotes/termsAndConditions/TermsAndConditions";
import Header from "@/ui/main-pages/header/Header";
const page = () => {
  const features = [
    {
      img: {
        src: "/svg/about-feature-1.svg",
        alt: "feature1",
        width: 68,
        height: 60,
      },
      title: "Impound specialist insurance",
      description:
        "Leading impound specialist. We quote online and over the phone.",
    },
    {
      img: {
        src: "/svg/about-feature-2.svg",
        alt: "feature1",
        width: 55,
        height: 55,
      },
      title: "Flexible polices",
      description:
        "We cover most scenarios, licences and allow named drivers if suitable",
    },
    {
      img: {
        src: "/svg/about-feature-3.svg",
        alt: "feature3",
        width: 50,
        height: 50,
      },
      title: "Instant documents",
      description:
        "Fast and secure documents, ernailed or accessed through your portal",
    },
  ];
  return (
    <div>
      <Header
        subTitle="specialized for vehicle insurance"
        title="Impound Insurance"
        description="Impound insurance is a specialized type of vehicle insurance required to release a car from a police impound. Most car insurance policies don’t meet the requirements for impounded vehicles, which is where impound insurance comes in."
        features={features} 
      />

      <TermsAndConditions />
    </div>
  );
};

export default page;
