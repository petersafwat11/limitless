import React from 'react';
import styles from './policyConfirmation.module.css';

export default function PolicyConfirmation({ 
  policyData = {
    policyNumber: 'LC-2025-456789',
    policyholder: 'Mr. James Anderson',
    vehicleReg: 'AB12 CDE',
    coverType: 'Comprehensive',
    startDate: '08/11/2025',
    endDate: '07/11/2026',
    vehicleMake: 'BMW 3 Series 320d M Sport',
    annualPremium: '£847.50',
    compulsoryExcess: '£250',
    voluntaryExcess: '£100',
    totalExcess: '£350'
  }
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
            {/* Hero Section */}
            <section className={styles.heroSection}>
              <h1 className={styles.mainTitle}>Your policy confirmation</h1>
              <p className={styles.description}>
                Thank you for choosing Limitless Cover. Your vehicle insurance policy has been confirmed. Below are the details of your cover.
              </p>
            </section>

            {/* MyAccount CTA */}
            <section className={styles.myAccountSection}>
              <h2>What MyAccount can do for you</h2>
              <p>Your online account lets you:</p>
              <ul className={styles.featureList}>
                <li>Read and download all your policy documents</li>
                <li>Find copies of all the correspondence we send you</li>
                <li>Make changes to your details such as replacing your car</li>
                <li>Make payments</li>
              </ul>
              <a href="#" className={styles.registerButton}>Register for MyAccount</a>
            </section>

            {/* Key Details */}
            <section className={styles.detailsSection}>
              <h2 className={styles.sectionTitle}>Key details</h2>
              <div className={styles.detailsGrid}>
                <div className={`${styles.detailCard} ${styles.highlighted}`}>
                  <div className={styles.label}>Policy number</div>
                  <div className={styles.value}>{policyData.policyNumber}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.label}>Policyholder</div>
                  <div className={styles.value}>{policyData.policyholder}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.label}>Vehicle registration</div>
                  <div className={styles.value}>{policyData.vehicleReg}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.label}>Cover type</div>
                  <div className={styles.value}>{policyData.coverType}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.label}>Policy start date</div>
                  <div className={styles.value}>{policyData.startDate}</div>
                </div>
                <div className={styles.detailCard}>
                  <div className={styles.label}>Policy end date</div>
                  <div className={styles.value}>{policyData.endDate}</div>
                </div>
              </div>
              <div className={styles.detailCard}>
                <div className={styles.label}>Vehicle make and model</div>
                <div className={styles.value}>{policyData.vehicleMake}</div>
              </div>
            </section>

            {/* Premium */}
            <section className={styles.premiumSection}>
              <div className={styles.premiumCard}>
                <span>Annual premium</span>
                <span className={styles.premiumAmount}>{policyData.annualPremium}</span>
              </div>
            </section>

            {/* Coverage Summary */}
            <section className={styles.coverageSection}>
              <h2 className={styles.sectionTitle}>Summary of what's covered</h2>
              <div className={styles.coverageCard}>
                <h3>Standard cover</h3>
                <ul className={styles.coverageList}>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="#00D084" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Loss or damage to your vehicle</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="#00D084" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Fire and theft</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="#00D084" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Windscreen cover (repair £75 excess, replacement £150 excess)</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="#00D084" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Courtesy car while yours is being repaired</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="#00D084" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Personal accident cover (driver only - £5,000)</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="#00D084" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Legal expenses cover up to £100,000</span>
                  </li>
                  <li>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="#00D084" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>EU cover for up to 90 days</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Excess Amounts */}
            <section className={styles.excessSection}>
              <h2 className={styles.sectionTitle}>Excess amounts</h2>
              <p className={styles.excessDescription}>The excess is the amount you'll need to pay towards any claim you make.</p>
              <div className={styles.excessGrid}>
                <div className={styles.excessCard}>
                  <div className={styles.label}>Compulsory excess</div>
                  <div className={styles.value}>{policyData.compulsoryExcess}</div>
                </div>
                <div className={styles.excessCard}>
                  <div className={styles.label}>Voluntary excess</div>
                  <div className={styles.value}>{policyData.voluntaryExcess}</div>
                </div>
              </div>
              <div className={styles.totalExcessCard}>
                <span>Total excess for claims</span>
                <span className={styles.totalExcessValue}>{policyData.totalExcess}</span>
              </div>
            </section>

            {/* Policy Documents */}
            <section className={styles.documentsSection}>
              <h2 className={styles.sectionTitle}>Your policy documents</h2>
              <div className={styles.documentsCard}>
                <p>Your policy documents have been sent to your registered email address. You can also access them anytime by logging into your account.</p>
                <ul className={styles.documentsList}>
                  <li>
                    <span className={styles.docBullet}></span>
                    <span>Statement of Fact</span>
                  </li>
                  <li>
                    <span className={styles.docBullet}></span>
                    <span>Insurance Product Information Document (IPID)</span>
                  </li>
                  <li>
                    <span className={styles.docBullet}></span>
                    <span>Certificate of motor insurance</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Important Information */}
            <section className={styles.importantSection}>
              <h2 className={styles.sectionTitle}>Important information</h2>
              <div className={styles.infoCard}>
                <div className={styles.infoBlock}>
                  <h3>What happens next?</h3>
                  <p>Your policy will start on {policyData.startDate}. You don't need to do anything else - you're covered. Your certificate of motor insurance will arrive by post within 5 working days.</p>
                </div>
                <div className={styles.infoBlock}>
                  <h3>Making changes to your policy</h3>
                  <p>If you need to make any changes to your policy, you can do this online through your account or by emailing us at support@limitlesscover.co.uk. Please note that changes may affect your premium.</p>
                </div>
                <div className={styles.infoBlock}>
                  <h3>Making a claim</h3>
                  <p>Did you know you can claim online? You can head to <a href="#">Your Account</a> to register your claim. Our claims team are always here to help 24 hours a day online. If any problems arise, feel free to email us at support@limitlesscover.co.uk</p>
                </div>
                <div className={styles.infoBlock}>
                  <h3>Cooling off period</h3>
                  <p>You have 14 days from the date you receive your policy documents to cancel your policy and receive a full refund, provided you haven't made a claim.</p>
                </div>
              </div>
            </section>

            {/* Payment Schedule */}
            <section className={styles.paymentSection}>
              <h2 className={styles.sectionTitle}>Payment schedule</h2>
              <div className={styles.paymentCard}>
                <p>You've chosen to pay annually. Your payment has been taken in full.</p>
                <div className={styles.paymentBreakdown}>
                  <div className={styles.paymentRow}>
                    <span>Annual payment (paid today)</span>
                    <span>{policyData.annualPremium}</span>
                  </div>
                  <div className={styles.paymentTotal}>
                    <span>Total amount payable</span>
                    <span className={styles.totalAmount}>{policyData.annualPremium}</span>
                  </div>
                  <p className={styles.paymentNote}>No interest charges apply for annual payment</p>
                </div>
              </div>
            </section>

            {/* Help Section */}
            <section className={styles.helpSection}>
              <h3>Need help?</h3>
              <p>If you have any questions about your policy, our customer service team is here to help.</p>
              <div className={styles.contactInfo}>
                <p className={styles.contactPhone}>Call us: 020 8058 6743</p>
                <p className={styles.contactHours}>Monday to Friday, 8.30am-6pm | Saturday & Sunday, 9am-5pm</p>
                <p className={styles.contactEmail}>Email: support@limitlesscover.com</p>
              </div>
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
