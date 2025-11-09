import React from "react";
import styles from "./resetPassword.module.css";

const ResetPassword = ({
  email = "johnsmith@outlook.com",
  resetLink = "https://limitless-nu.vercel.app/reset-password",
}) => {
  return (
    <div className={styles.container}>
      {/* Logo Icon */}
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
            d="M25.8792 22.9077L13.4195 28.5199V36.0028L12.1787 34.7576L8.27754 30.8425L6.12503 28.6823L13.4198 25.3927L18.5792 23.0701L29.2154 18.2747C31.9164 17.0527 32.5684 13.4965 30.4736 11.3942L20.997 1.8835C18.2037 -0.919767 13.4195 1.06675 13.4195 5.02849V11.0171L0.318939 16.9247V22.5948L5.47833 20.2722L17.1592 15.0133L18.6135 14.359V8.67731L18.5789 8.69453V6.77749L25.8792 14.1039L22.6416 15.5635L22.6475 15.575L8.83726 21.8128L8.82572 21.7896L2.78918 24.5118C2.68534 24.5581 2.58712 24.6044 2.49482 24.6567C1.23662 25.3401 0.480762 26.5565 0.319235 27.8536C0.163329 29.0932 0.53845 30.4019 1.52536 31.3923L11.0072 40.9024C13.8005 43.7057 18.5789 41.7192 18.5789 37.7518V31.8673L25.8792 28.5778L31.7137 25.9541V20.2725L25.8792 22.9077Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Title */}
        <h1 className={styles.title}>Reset your password</h1>

        {/* Description */}
        <div className={styles.descriptionSection}>
          <p className={styles.description}>
            {`We've received a password reset request for the following Limitless
            Cover Account:`}
          </p>

          <p className={styles.email}>{email}</p>

          <p className={styles.instructions}>
            Just click on the button below - it will only work for the next 3
            hours.
          </p>
        </div>

        {/* Reset Button and Link Section */}
        <div className={styles.actionSection}>
          <button className={styles.resetButton}>Reset your password</button>

          <div className={styles.linkSection}>
            <p className={styles.linkInstructions}>
              {`If clicking the button doesn't seem to work, you can copy and
              paste the following link into your browser:`}
            </p>

            <div className={styles.linkWrapper}>
              <a href={resetLink} className={styles.resetLink}>
                {resetLink}
              </a>

              <p className={styles.securityNotice}>
                {`If you didn't initiate this, you can safely ignore this email.
                Someone else might have typed in your email address by mistake.`}
              </p>
            </div>
          </div>

          <p className={styles.termsText}>
            Our Customer Terms of Business can be found here:
          </p>
        </div>

        {/* Confidentiality Notice */}
        <div className={styles.confidentialitySection}>
          <svg
            className={styles.backgroundPattern}
            width="525"
            height="455"
            viewBox="0 0 525 455"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.16"
              d="M88.3858 310.771L326.254 206.19L326.254 66.7493L349.941 89.9526L424.418 162.91L465.512 203.164L326.248 264.464L227.751 307.745L24.6956 397.106C-26.8687 419.878 -39.3164 486.146 0.675616 525.322L181.591 702.55C234.918 754.788 326.254 717.77 326.254 643.944L326.254 532.348L576.355 422.262L576.355 316.603L477.858 359.883L254.86 457.881L227.096 470.074L227.096 575.95L227.756 575.629L227.756 611.352L88.3858 474.827L150.195 447.629L150.082 447.413L413.733 331.175L413.953 331.607L529.196 280.879C531.178 280.016 533.053 279.153 534.816 278.179C558.836 265.444 573.266 242.777 576.349 218.605C579.326 195.507 572.164 171.12 553.323 152.664L372.306 -24.5535C318.98 -76.7914 227.756 -39.7735 227.756 34.1573L227.756 143.811L88.3858 205.112L-23 254.002L-23 359.878L88.3858 310.771Z"
              fill="url(#paint0_linear_20_35)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_20_35"
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

          <div className={styles.noticeContent}>
            <p className={styles.noticeTitle}>
              IMPORTANT CONFIDENTIALITY NOTICE:
            </p>
            <p className={styles.noticeText}>
              This e-mail and the information it contains may be confidential,
              legally privileged and protected by law. Access by the intended
              recipient only is authorised. Any liability (in negligence or
              otherwise) arising from any third party acting, or refraining from
              acting, on any information contained in this e-mail is hereby
              excluded. If you are not the intended recipient please notify the
              sender immediately and do not disclose the contents of this e-mail
              or any attachments to any other person, use it for any purpose, or
              store or copy the information in any medium. Copyright in this
              e-mail and attachments created by us belongs to Limitless Cover
              Ltd. Authorised users are permitted to print or save this e-mail
              for their own use.
            </p>
            <p className={styles.noticeText}>
              {`Limitless Cover is a trading name of Limitless Trading Services
              Limited which is authorised and regulated by the Financial Conduct
              Authority - firm reference number 987956. Calls may be recorded
              for our mutual protection. All policies sold are subject to
              English Law. Registered Office: Block C, Hillington, King's Lynn,
              PE31 6BZ. (registered in England and Wales no. 987956)`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
