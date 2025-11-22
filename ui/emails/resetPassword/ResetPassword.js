import React from "react";
import styles from "./resetPassword.module.css";
import Image from "next/image";

export default function ResetPassword({ resetLink = "#", expiryMinutes = 60 }) {
  return (
    <div className={styles.emailWrapper}>
      <div className={styles.background}>
        <div className={styles.emailCard}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerBorder}></div>
            <div className={styles.headerContent}>
              <div className={styles.logo}>
                <Image src="/svg/logo.svg" alt="Logo" width={48} height={48} />
              </div>
              <div className={styles.headerText}>
                <div className={styles.companyName}>Limitless Cover</div>
                <div className={styles.tagline}>
                  Specialized for Vehicle Insurance
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* Icon and Title */}
            <section className={styles.heroSection}>
              <div className={styles.iconCircle}>
                <Image src="/svg/lock.svg" alt="lock" width={32} height={32} />
                {/* <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.3333 14.668H6.66667C5.19391 14.668 4 15.8619 4 17.3346V26.668C4 28.1407 5.19391 29.3346 6.66667 29.3346H25.3333C26.8061 29.3346 28 28.1407 28 26.668V17.3346C28 15.8619 26.8061 14.668 25.3333 14.668Z"
                    stroke="#0090FF"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.33203 14.668V9.33464C9.33203 7.56653 10.0344 5.87083 11.2847 4.62059C12.5349 3.37035 14.2306 2.66797 15.9987 2.66797C17.7668 2.66797 19.4625 3.37035 20.7127 4.62059C21.963 5.87083 22.6654 7.56653 22.6654 9.33464V14.668"
                    stroke="#0090FF"
                    strokeWidth="2.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg> */}
              </div>
              <h1 className={styles.mainTitle}>Reset your password</h1>
              <p className={styles.description}>
                We received a request to reset the password for your account.
                Click the button below to choose a new password.
              </p>
            </section>

            {/* CTA Button */}
            <section className={styles.ctaSection}>
              <a href={resetLink} className={styles.resetButton}>
                RESET PASSWORD
              </a>
            </section>

            {/* Info Boxes */}
            <section className={styles.infoBoxes}>
              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <Image
                    src="/svg/clock.svg"
                    alt="clock"
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.infoContent}>
                  <h3>This link expires in 1 hour</h3>
                  <p>
                    For security reasons, this password reset link will expire
                    in {expiryMinutes} minutes. If you need a new link, you can
                    request another one.
                  </p>
                </div>
              </div>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <Image
                    src="/svg/trust.svg"
                    alt="trust"
                    width={20}
                    height={20}
                  />
                </div>
                <div className={styles.infoContent}>
                  <h3>Didn't request this?</h3>
                  <p>
                    If you didn't request a password reset, you can safely
                    ignore this email. Your password will remain unchanged.
                  </p>
                </div>
              </div>
            </section>

            {/* Security Tips */}
            <section className={styles.securitySection}>
              <h2 className={styles.sectionTitle}>Security tips</h2>
              <ul className={styles.tipsList}>
                <li>
                  <span className={styles.bullet}>•</span>
                  <span>
                    Use a unique password that you don't use for other accounts
                  </span>
                </li>
                <li>
                  <span className={styles.bullet}>•</span>
                  <span>
                    Make sure your password is at least 8 characters long
                  </span>
                </li>
                <li>
                  <span className={styles.bullet}>•</span>
                  <span>
                    Include a mix of letters, numbers, and special characters
                  </span>
                </li>
                <li>
                  <span className={styles.bullet}>•</span>
                  <span>Never share your password with anyone</span>
                </li>
              </ul>
            </section>

            {/* Help Section */}
            <section className={styles.helpSection}>
              <h3>Need help?</h3>
              <p>
                If you're having trouble resetting your password or didn't
                request this change, please contact our support team.
              </p>
              <a href="#" className={styles.supportLink}>
                Contact Support →
              </a>
            </section>
          </main>

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerMain}>
              <div className={styles.footerLogo}>
                <Image src="/svg/logo.svg" alt="Logo" width={40} height={40} />

                <span>Limitless Cover</span>
              </div>
              <button className={styles.chatButton}>Chat with us</button>
            </div>
          </footer>

          {/* Legal Footer */}
          <div className={styles.legalFooter}>
            <p>
              This is a service email from Limitless Cover. Please note that you
              may receive service emails in accordance with the Saga Privacy
              Policy. Your marketing preferences have not been affected.
            </p>
            <p>
              This is an automated email. Please do not reply as we may not be
              able to respond to your message.
            </p>
            <p>
              This email contains linking pixels and/or click-through email
              activity that we use to improve email communications. You can
              object to the use of linking pixels and/or click-through email
              activity tracking at any time by visiting your My Account section
              if you do not wish us to improve our email communications.
            </p>
            <p>
              To ensure you continue to receive these emails and they appear as
              intended, please add our email address to your address list and
              set any spam filters to accept our email.
            </p>
            <p>
              The information contained in this email and in any attachments is
              confidential. If you are not the intended recipient, you should
              immediately delete this email and notify the sender. The contents
              of this email and any attachments may contain viruses which could
              damage your computer. We cannot accept liability for any damage
              you sustain as a result of software viruses. You should carry out
              your own virus checks before opening the attachment.
            </p>
            <p>
              Limitless Cover is a trading name of Limitless Services Limited
              which is authorised and regulated by the Financial Conduct
              Authority – firm reference number 987654. Calls may be recorded
              for our mutual protection. All policies sold are underwritten by
              our insurance partners.
            </p>
            <p className={styles.copyright}>©2025 Limitless Cover</p>
          </div>
        </div>
      </div>
    </div>
  );
}
