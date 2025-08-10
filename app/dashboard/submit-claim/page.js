import Stepper from "./_components/stepper/Stepper";
import styles from "./page.module.css";
import ClaimFeature from "./_components/claimFeature/ClaimFeature";
import { Plus_Jakarta_Sans, Manrope } from "next/font/google";
import Submitted from "./_components/submitted/Submitted";
import ClaimReason from "./_components/claimReason/ClaimReason";
import Guidelines from "./_components/guidelines/Guidelines";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});
const page = () => {
  const steps = [
    {
      title: "Claim",
      img: {
        src: "/svg/claims-step-1.svg",
        width: 82,
        height: 82,
      },
    },
    {
      title: "Situation",
      img: {
        src: "/svg/claims-step-2.svg",
        width: 68,
        height: 68,
      },
    },
    {
      title: "Details",
      img: {
        src: "/svg/claims-step-2.svg",
        width: 68,
        height: 68,
      },
    },
    {
      title: "Submitted",
      img: {
        src: "/svg/claims-step-3.svg",
        width: 68,
        height: 68,
      },
    },
  ];
  const firstClaim = {
    title: "Vehicle Insurance Claims",
    description:
      "Have you been in a incident with your vehicle? Let us know what happened, we’ll do everything we can to help.",
    features: [
      "Accidental damage to your car",
      "Loss or theft of your car",
      "Fire damage",
      "Third party damage or injury",
    ],
    img: {
      src: "/svg/claims-card-1.svg",
      width: 97,
      height: 93,
    },
  };

  const secondClaim = {
    title: "Optional Cover Claims",
    description: "Explore the",
    features: ["Glass repair or replacement", "Key cover", "Breakdown cover"],
    img: {
      src: "/svg/claims-card-2.svg",
      width: 97,
      height: 93,
    },
  };

  return (
    <div className={styles.page}>
      <Stepper steps={steps} />

      <div className={styles.claims}>
        <h2 className={`${styles.claimsTitle} ${plusJakartaSans.className}`}>
          Choose your Claim
        </h2>
        <Submitted />
        <ClaimReason />
        <div className={styles.claimsContainer}>
          <ClaimFeature
            img={firstClaim.img}
            title={firstClaim.title}
            description={firstClaim.description}
            features={firstClaim.features}
            btnText="Make a car insurance claims"
          />
          <ClaimFeature
            img={secondClaim.img}
            title={secondClaim.title}
            description={secondClaim.description}
            features={secondClaim.features}
            btnText="Optional Cover claims"
          />
        </div>
        <Guidelines
          data={[
            {
              title: "Breakdown Cover",
              content: [
                "For RAC breakdown cover claims, please call 0345 168 5586.",
                "Lines are open 24 hours a day.",
                "You can also report a breakdown 24/7 on the MyRAC app - download.",
              ],
            },
            {
              title: "Windscreen Protection",
              content: [
                "If your policy is provided by AXA Assistance (UK) Limited you can make a claim 24/7 using the Online Claims Portal or if you prefer to speak to someone please call 0345 164 0894.",
                "Lines are open 9am-5pm, Mon-Fri.",
              ],
            },
            {
              title: "Key Protection",
              content: [
                "If your policy is provided by AXA Assistance (UK) Limited, please call 0345 164 0893. ",
                "Lines are open 24 hours a day.",
                "If your policy is provided by Ageas Insurance Limited, please call 0345 165 0571.",
                "Lines are open 24 hours a day.",
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default page;
