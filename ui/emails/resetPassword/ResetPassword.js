import React from 'react';
import styles from './resetPassword.module.css';

export default function ResetPassword({ 
  resetLink = '#',
  expiryMinutes = 60
}) {
  return (
    <div className={styles.emailWrapper}>
      <div className={styles.background}>
        <div className={styles.emailCard}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerBorder}></div>
            <div className={styles.headerContent}>
              <div className={styles.logo}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40.8358 0H7.16418C3.20751 0 0 3.20751 0 7.16418V40.8358C0 44.7925 3.20751 48 7.16418 48H40.8358C44.7925 48 48 44.7925 48 40.8358V7.16418C48 3.20751 44.7925 0 40.8358 0Z" fill="#0388FF"/>
                  <path d="M31.1842 25.3891L22.1226 29.4707V34.9128L21.2202 34.0073L18.3829 31.1598L16.8175 29.5888L22.1228 27.1964L25.8751 25.5073L33.6105 22.0196C35.5749 21.1309 36.049 18.5446 34.5256 17.0156L27.6335 10.0988C25.602 8.06002 22.1226 9.50475 22.1226 12.3861V16.7414L12.5949 21.0379V25.1615L16.3472 23.4723L24.8424 19.6478L25.9 19.1718V15.0398L25.8749 15.0523V13.6581L31.1842 18.9864L28.8296 20.0478L28.8338 20.0563L18.7901 24.5928L18.7816 24.576L14.3914 26.5558C14.3159 26.5894 14.2445 26.6231 14.1773 26.6611C13.2623 27.1582 12.7126 28.0428 12.5951 28.9862C12.4817 29.8876 12.7545 30.8394 13.4723 31.5598L20.3682 38.4762C22.3997 40.5149 25.8749 39.0702 25.8749 36.1848V31.9052L31.1842 29.5128L35.4274 27.6047V23.4726L31.1842 25.3891Z" fill="white"/>
                </svg>
              </div>
              <div className={styles.headerText}>
                <div className={styles.companyName}>Limitless Cover</div>
                <div className={styles.tagline}>Specialized for Vehicle Insurance</div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className={styles.mainContent}>
            {/* Icon and Title */}
            <section className={styles.heroSection}>
              <div className={styles.iconCircle}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.3333 14.668H6.66667C5.19391 14.668 4 15.8619 4 17.3346V26.668C4 28.1407 5.19391 29.3346 6.66667 29.3346H25.3333C26.8061 29.3346 28 28.1407 28 26.668V17.3346C28 15.8619 26.8061 14.668 25.3333 14.668Z" stroke="#0090FF" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.33203 14.668V9.33464C9.33203 7.56653 10.0344 5.87083 11.2847 4.62059C12.5349 3.37035 14.2306 2.66797 15.9987 2.66797C17.7668 2.66797 19.4625 3.37035 20.7127 4.62059C21.963 5.87083 22.6654 7.56653 22.6654 9.33464V14.668" stroke="#0090FF" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className={styles.mainTitle}>Reset your password</h1>
              <p className={styles.description}>
                We received a request to reset the password for your account. Click the button below to choose a new password.
              </p>
            </section>

            {/* CTA Button */}
            <section className={styles.ctaSection}>
              <a href={resetLink} className={styles.resetButton}>RESET PASSWORD</a>
            </section>

            {/* Info Boxes */}
            <section className={styles.infoBoxes}>
              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 5V10L13.3333 11.6667" stroke="#0090FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.0013 18.3346C14.6037 18.3346 18.3346 14.6037 18.3346 10.0013C18.3346 5.39893 14.6037 1.66797 10.0013 1.66797C5.39893 1.66797 1.66797 5.39893 1.66797 10.0013C1.66797 14.6037 5.39893 18.3346 10.0013 18.3346Z" stroke="#0090FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h3>This link expires in 1 hour</h3>
                  <p>For security reasons, this password reset link will expire in {expiryMinutes} minutes. If you need a new link, you can request another one.</p>
                </div>
              </div>

              <div className={styles.infoBox}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6654 10.835C16.6654 15.0017 13.7487 17.085 10.282 18.2933C10.1005 18.3549 9.90331 18.3519 9.7237 18.285C6.2487 17.085 3.33203 15.0017 3.33203 10.835V5.00168C3.33203 4.78066 3.41983 4.5687 3.57611 4.41242C3.73239 4.25614 3.94435 4.16834 4.16536 4.16834C5.83203 4.16834 7.91536 3.16834 9.36536 1.90168C9.54191 1.75084 9.76649 1.66797 9.9987 1.66797C10.2309 1.66797 10.4555 1.75084 10.632 1.90168C12.0904 3.17668 14.1654 4.16834 15.832 4.16834C16.053 4.16834 16.265 4.25614 16.4213 4.41242C16.5776 4.5687 16.6654 4.78066 16.6654 5.00168V10.835Z" stroke="#0090FF" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <h3>Didn't request this?</h3>
                  <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
                </div>
              </div>
            </section>

            {/* Security Tips */}
            <section className={styles.securitySection}>
              <h2 className={styles.sectionTitle}>Security tips</h2>
              <ul className={styles.tipsList}>
                <li>
                  <span className={styles.bullet}>•</span>
                  <span>Use a unique password that you don't use for other accounts</span>
                </li>
                <li>
                  <span className={styles.bullet}>•</span>
                  <span>Make sure your password is at least 8 characters long</span>
                </li>
                <li>
                  <span className={styles.bullet}>•</span>
                  <span>Include a mix of letters, numbers, and special characters</span>
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
              <p>If you're having trouble resetting your password or didn't request this change, please contact our support team.</p>
              <a href="#" className={styles.supportLink}>Contact Support →</a>
            </section>
          </main>

          {/* Footer */}
          <footer className={styles.footer}>
            <div className={styles.footerMain}>
              <div className={styles.footerLogo}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M34.0299 0H5.97015C2.67293 0 0 2.67293 0 5.97015V34.0299C0 37.3271 2.67293 40 5.97015 40H34.0299C37.3271 40 40 37.3271 40 34.0299V5.97015C40 2.67293 37.3271 0 34.0299 0Z" fill="#0388FF"/>
                  <path d="M25.9881 21.1543L18.4368 24.5556V29.0907L17.6848 28.3361L15.3204 25.9632L14.0159 24.654L18.4369 22.6604L21.5639 21.2527L28.01 18.3464C29.647 17.6058 30.0422 15.4505 28.7726 14.1764L23.0292 8.4124C21.3363 6.71343 18.4368 7.91737 18.4368 10.3184V13.9479L10.497 17.5283V20.9646L13.6239 19.557L20.7032 16.3698L21.5846 15.9732V12.5298L21.5637 12.5403V11.3784L25.9881 15.8187L24.0259 16.7032L24.0295 16.7103L15.6597 20.4907L15.6526 20.4767L11.9942 22.1265C11.9312 22.1546 11.8717 22.1826 11.8157 22.2143C11.0532 22.6285 10.5951 23.3657 10.4972 24.1518C10.4027 24.903 10.63 25.6962 11.2282 26.2965L16.9748 32.0602C18.6677 33.7591 21.5637 32.5552 21.5637 30.1507V26.5844L25.9881 24.5907L29.5242 23.0006V19.5572L25.9881 21.1543Z" fill="white"/>
                </svg>
                <span>Limitless Cover</span>
              </div>
              <button className={styles.chatButton}>Chat with us</button>
            </div>
          </footer>

          {/* Legal Footer */}
          <div className={styles.legalFooter}>
            <p>This is a service email from Limitless Cover. Please note that you may receive service emails in accordance with the Saga Privacy Policy. Your marketing preferences have not been affected.</p>
            <p>This is an automated email. Please do not reply as we may not be able to respond to your message.</p>
            <p>This email contains linking pixels and/or click-through email activity that we use to improve email communications. You can object to the use of linking pixels and/or click-through email activity tracking at any time by visiting your My Account section if you do not wish us to improve our email communications.</p>
            <p>To ensure you continue to receive these emails and they appear as intended, please add our email address to your address list and set any spam filters to accept our email.</p>
            <p>The information contained in this email and in any attachments is confidential. If you are not the intended recipient, you should immediately delete this email and notify the sender. The contents of this email and any attachments may contain viruses which could damage your computer. We cannot accept liability for any damage you sustain as a result of software viruses. You should carry out your own virus checks before opening the attachment.</p>
            <p>Limitless Cover is a trading name of Limitless Services Limited which is authorised and regulated by the Financial Conduct Authority – firm reference number 987654. Calls may be recorded for our mutual protection. All policies sold are underwritten by our insurance partners.</p>
            <p className={styles.copyright}>©2025 Limitless Cover</p>
          </div>
        </div>
      </div>
    </div>
  );
}
