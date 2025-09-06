import Stepper from "./_components/stepper/Stepper";
import styles from "./page.module.css";
import ClaimFeature from "./_components/claimFeature/ClaimFeature";
import { Plus_Jakarta_Sans } from "next/font/google";
import Submitted from "./_components/submitted/Submitted";
import ClaimReason from "./_components/claimReason/ClaimReason";
import Guidelines from "./_components/guidelines/Guidelines";
import Form from "./_components/form/Form";
import { steps, firstClaim, secondClaim, guidelinesData } from "./data";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
});

const page = async ({ searchParams }) => {
  const { type, step, reason } = await searchParams;

  // Render different components based on search params
  const renderContent = () => {
    // If submitted successfully
    if (step === "submitted") {
      return <Submitted />;
    }

    // If optional cover claims selected - show guidelines only
    if (type === "optional-cover") {
      return <Guidelines data={guidelinesData} />;
    }

    // If car insurance claims selected
    if (type === "car-insurance") {
      // Show form if reason is selected
      if (step === "form" && reason) {
        return (
          <div>
            <Stepper steps={steps} currentStep={2} />
            <Form claimReason={reason} />
          </div>
        );
      }

      // Show claim reason selection
      if (step === "reason") {
        return (
          <div>
            <Stepper steps={steps} currentStep={1} />
            <ClaimReason />
          </div>
        );
      }
    }

    // Default view - show claim selection
    return (
      <div>
        <Stepper steps={steps} currentStep={0} />
        <div className={styles.claims}>
          <h2 className={`${styles.claimsTitle} ${plusJakartaSans.className}`}>
            Choose your Claim
          </h2>
          <div className={styles.claimsContainer}>
            <ClaimFeature
              img={firstClaim.img}
              title={firstClaim.title}
              description={firstClaim.description}
              features={firstClaim.features}
              btnText="Make a car insurance claims"
              claimType="car-insurance"
            />
            <ClaimFeature
              img={secondClaim.img}
              title={secondClaim.title}
              description={secondClaim.description}
              features={secondClaim.features}
              btnText="Optional Cover claims"
              claimType="optional-cover"
            />
          </div>
        </div>
      </div>
    );
  };

  return <div className={styles.page}>{renderContent()}</div>;
};

export default page;
