import React from "react";
import styles from "./insuranceCreation.module.css";

const InsuranceCreation = ({
  name = "John",
  policyNumber = "FPM6022435210FC",
  startDate = "15/09/24",
  voluntaryExcess = "£1000",
  type = "Impound",
  carReg = "SS17 ZKU",
  cover = "Comprehensive",
  compulsoryExcess = "£250",
}) => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <svg
          className={styles.backgroundPattern}
          width="600"
          height="776"
          viewBox="0 0 600 776"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.59"
            d="M111.386 359.771L349.254 255.19L349.254 115.749L372.941 138.953L447.418 211.91L488.512 252.164L349.248 313.464L250.751 356.745L47.6956 446.106C-3.86869 468.878 -16.3164 535.146 23.6756 574.322L204.591 751.55C257.918 803.788 349.254 766.77 349.254 692.944L349.254 581.348L599.355 471.262L599.355 365.603L500.858 408.883L277.86 506.881L250.096 519.074L250.096 624.95L250.756 624.629L250.756 660.352L111.386 523.827L173.195 496.629L173.082 496.413L436.733 380.175L436.953 380.607L552.196 329.879C554.178 329.016 556.053 328.153 557.816 327.179C581.836 314.444 596.266 291.777 599.349 267.605C602.326 244.507 595.164 220.12 576.323 201.664L395.306 24.4465C341.98 -27.7914 250.756 9.22647 250.756 83.1573L250.756 192.811L111.386 254.112L4.13508e-05 303.002L3.20948e-05 408.878L111.386 359.771Z"
            fill="url(#paint0_linear_header)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_header"
              x1="300"
              y1="776"
              x2="300"
              y2="-2.62268e-05"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0168FF" />
              <stop offset="1" stopColor="#05AFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className={styles.logoContainer}>
          <svg
            className={styles.logo}
            width="32"
            height="43"
            viewBox="0 0 32 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.8792 22.9076L13.4195 28.5197V36.0026L12.1787 34.7575L8.27754 30.8423L6.12503 28.6821L13.4198 25.3926L18.5792 23.07L29.2154 18.2745C31.9164 17.0525 32.5684 13.4963 30.4736 11.394L20.997 1.88336C18.2037 -0.919904 13.4195 1.06661 13.4195 5.02835V11.017L0.318939 16.9246V22.5946L5.47833 20.272L17.1592 15.0132L18.6135 14.3588V8.67717L18.5789 8.69439V6.77735L25.8792 14.1038L22.6416 15.5633L22.6475 15.5749L8.83726 21.8126L8.82572 21.7895L2.78918 24.5117C2.68534 24.558 2.58712 24.6043 2.49482 24.6566C1.23662 25.34 0.480762 26.5564 0.319235 27.8535C0.163329 29.093 0.53845 30.4017 1.52536 31.3922L11.0072 40.9023C13.8005 43.7055 18.5789 41.719 18.5789 37.7516V31.8672L25.8792 28.5776L31.7137 25.954V20.2723L25.8792 22.9076Z"
              fill="white"
            />
          </svg>
        </div>

        <h1 className={styles.title}>
          Welcome to <span className={styles.titleBlue}>Limitless Cover</span>
        </h1>

        <p className={styles.greeting}>
          Hello {name},<br />
          Thank you for insuring your vehicle with us!
          <br />
          There are just a few things we need to tell you.
        </p>

        <button className={styles.accountButton}>Set up your account</button>
      </header>

      {/* Key Details Section */}
      <section className={styles.keyDetailsSection}>
        <div className={styles.keyDetailsHeader}>
          <h2 className={styles.keyDetailsTitle}>Key details</h2>
        </div>

        <div className={styles.policyInfo}>
          <div className={styles.infoText}>
            Policy Number: <span className={styles.bold}>{policyNumber}</span>
            <br />
            Start date: <span className={styles.bold}>{startDate}</span>
            Voluntary excess: <br />
            <span className={styles.bold}>{voluntaryExcess}</span>
            Type: <span className={styles.bold}>{type}</span>
            <br />
          </div>

          <div className={styles.divider}></div>

          <p className={styles.infoText}>
            Your car: <span className={styles.bold}>{carReg}</span>
            <br />
            Cover: <span className={styles.bold}>{cover}</span>
            <br />
            Compulsory excess*:{" "}
            <span className={styles.bold}>{compulsoryExcess}</span>
          </p>
        </div>

        <p className={styles.disclaimer}>
          *All excesses that apply are shown on your Schedule. If you need to
          make a claim, you are responsible for paying all excesses applying to
          the cover, even if the incident is not your fault.
        </p>
      </section>

      {/* What's Next Section */}
      <section className={styles.whatsNextSection}>
        <h2 className={styles.whatsNextTitle}>So what next?</h2>

        <div className={styles.infoCard}>
          <svg
            className={styles.cardPattern}
            width="525"
            height="455"
            viewBox="0 0 525 455"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.16"
              d="M88.3858 310.771L326.254 206.19L326.254 66.7493L349.941 89.9526L424.418 162.91L465.512 203.164L326.248 264.464L227.751 307.745L24.6956 397.106C-26.8687 419.878 -39.3164 486.146 0.675616 525.322L181.591 702.55C234.918 754.788 326.254 717.77 326.254 643.944L326.254 532.348L576.355 422.262L576.355 316.603L477.858 359.883L254.86 457.881L227.096 470.074L227.096 575.95L227.756 575.629L227.756 611.352L88.3858 474.827L150.195 447.629L150.082 447.413L413.733 331.175L413.953 331.607L529.196 280.879C531.178 280.016 533.053 279.153 534.816 278.179C558.836 265.444 573.266 242.777 576.349 218.605C579.326 195.507 572.164 171.12 553.323 152.664L372.306 -24.5535C318.98 -76.7914 227.756 -39.7735 227.756 34.1573L227.756 143.811L88.3858 205.112L-23 254.002L-23 359.878L88.3858 310.771Z"
              fill="url(#paint0_linear_card)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_card"
                x1="277"
                y1="727"
                x2="277"
                y2="-49"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#0168FF" />
                <stop offset="1" stopColor="#05AFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}>
              <svg
                className={styles.arrow}
                width="16"
                height="6"
                viewBox="0 0 16 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3L11 0.113249V5.88675L16 3ZM0 3V3.5H11.5V3V2.5H0V3Z"
                  fill="black"
                />
              </svg>
              <p className={styles.bulletText}>
                Your Certificate of Motor Insurance is attached. All your other
                documents are kept safe and sound in
                <span className={styles.underlineBold}>Your Account</span>.{" "}
                {`Log
                in using your email address and password. If you haven't already
                set up a password, your password will be your policy number. If
                this is the first time logging in to`}
                <span className={styles.underlineBold}>Your Account</span>
                {`you'll be asked to change your password once you've logged in.`}
              </p>
            </li>

            <li className={styles.bulletItem}>
              <svg
                className={styles.arrow}
                width="16"
                height="6"
                viewBox="0 0 16 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3L11 0.113249V5.88675L16 3ZM0 3V3.5H11.5V3V2.5H0V3Z"
                  fill="black"
                />
              </svg>
              <p className={styles.bulletText}>
                You can easily check and manage your automatic renewal status
                through{" "}
                <span className={styles.underlineBold}>Your Account</span> or by
                speaking to our friendly support team, where you can choose if
                you want your policy to automatically renew next year or not.
              </p>
            </li>

            <li className={styles.bulletItem}>
              <svg
                className={styles.arrow}
                width="16"
                height="6"
                viewBox="0 0 16 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3L11 0.113249V5.88675L16 3ZM0 3V3.5H11.5V3V2.5H0V3Z"
                  fill="black"
                />
              </svg>
              <p className={styles.bulletText}>
                {`Please carefully check that all the details on your documents
                including your Statement of Fact and Certificate of Insurance
                are correct. We may make checks on the information you provide
                both after your purchase or if you need to make a claim
                therefore it's important that it's correct.`}
              </p>
            </li>

            <li className={styles.bulletItem}>
              <svg
                className={styles.arrow}
                width="16"
                height="6"
                viewBox="0 0 16 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3L11 0.113249V5.88675L16 3ZM0 3V3.5H11.5V3V2.5H0V3Z"
                  fill="black"
                />
              </svg>
              <p className={styles.bulletText}>
                Need to update your details? For a reduced fee you can easily
                make changes to your policy in{" "}
                <span className={styles.underlineBold}>Your Account</span>.
              </p>
            </li>

            <li className={styles.bulletItem}>
              <svg
                className={styles.arrow}
                width="16"
                height="6"
                viewBox="0 0 16 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3L11 0.113249V5.88675L16 3ZM0 3V3.5H11.5V3V2.5H0V3Z"
                  fill="black"
                />
              </svg>
              <p className={styles.bulletText}>
                If you, or someone in your household has another car to insure,{" "}
                <span className={styles.underlineBold}>click here</span> to find
                out how we can help you.
              </p>
            </li>

            <li className={styles.bulletItem}>
              <svg
                className={styles.arrow}
                width="16"
                height="6"
                viewBox="0 0 16 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3L11 0.113249V5.88675L16 3ZM0 3V3.5H11.5V3V2.5H0V3Z"
                  fill="black"
                />
              </svg>
              <p className={styles.bulletText}>
                {` Attached is a claim form, your glove box guide to making a
                claim. We hope you won't need it, but recommend you print a copy
                and keep it in your car just in case. Did you know you can
                [claim online now]? You can head to [Your Account] to register
                your claim. Our claims team are always here to help 24 hours a
                day now online and still over the phone.`}
              </p>
            </li>

            <li className={styles.bulletItem}>
              <svg
                className={styles.arrow}
                width="16"
                height="6"
                viewBox="0 0 16 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3L11 0.113249V5.88675L16 3ZM0 3V3.5H11.5V3V2.5H0V3Z"
                  fill="black"
                />
              </svg>
              <p className={styles.bulletText}>
                You can tax your vehicle online. It can take up to 7 days for
                your insurance to show on the database; you can check this at
                askmid.com.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Kind regards,
          <br />
          <span className={styles.footerBold}>LIMITLESS COVER</span>
        </p>
      </footer>
    </div>
  );
};

export default InsuranceCreation;
