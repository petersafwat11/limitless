import React from 'react';
import styles from './getInsuredToday.module.css';

export default function GetInsuredToday({ 
  quoteData = {
    customerName: 'Mr J Llorenk',
    quoteNumber: '102931798',
    registration: 'GL17 LLC',
    policyStartDate: '14/11/2025',
    coverLevel: 'Comprehensive',
    annualPremium: '£100.00'
  }
}) {
  return (
    <div className={styles.emailWrapper}>
      <div className={styles.background}>
        <div className={styles.emailCard}>
          <div className={styles.cardShadow}>
            <div className={styles.container}>
              <svg className={styles.decorTop} width="192" height="255" viewBox="0 0 128 215" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.12">
                  <path d="M156.351 96.6004L80.2381 130.922V176.685L72.6586 169.07L48.8271 145.126L35.678 131.915L80.2397 111.798L111.757 97.5934L176.731 68.2665C193.23 60.793 197.214 39.0448 184.417 26.1878L126.527 -31.9759C109.464 -49.1196 80.2381 -36.9708 80.2381 -12.7423V23.882L0.210275 60.0106V94.6864L31.7276 80.4825L103.082 48.321L111.967 44.3194V9.57244L111.755 9.67779V-2.04599L156.351 42.7595L136.573 51.6855L136.61 51.7564L52.2465 89.9041L52.1759 89.7623L15.3003 106.41C14.666 106.694 14.066 106.977 13.5021 107.297C5.81617 111.476 1.19881 118.915 0.212082 126.848C-0.740304 134.428 1.55121 142.432 7.57997 148.489L65.5022 206.649C82.5655 223.793 111.755 211.644 111.755 187.381V151.394L156.351 131.276L191.992 115.231V80.4842L156.351 96.6004Z" fill="url(#paint0_linear_top)"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_top" x1="95.9982" y1="-40" x2="95.9982" y2="214.672" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0168FF"/>
                    <stop offset="1" stopColor="#05AFFF" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
              <svg className={styles.decorBottom} width="145" height="193" viewBox="0 0 145 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.18">
                  <path d="M120.891 94.0191L76.0155 126.95L82.3585 156.792L76.3605 152.877L57.5012 140.566L47.0957 133.774L73.3657 114.479L91.9493 100.848L130.254 72.7178C139.977 65.5575 139.56 50.8234 129.433 44.2132L83.6215 14.3088C70.1182 5.49449 52.7442 17.4676 56.1025 33.2669L61.1789 57.1495L14.0007 91.8013L18.807 114.413L37.3906 100.782L79.463 69.9197L84.7018 66.0788L79.8856 43.4204L79.7624 43.5184L78.1374 35.8734L113.429 58.9096L101.769 67.4716L101.802 67.5128L52.0768 104.082L52.0111 103.999L30.2722 119.967C29.8978 120.24 29.5458 120.507 29.2225 120.794C24.7898 124.585 22.8099 130.076 23.266 135.385C23.6957 140.461 26.2993 145.362 31.0702 148.476L76.9026 178.374C90.4058 187.188 107.756 175.22 104.393 159.398L99.4053 135.931L125.698 116.631L146.715 101.228L141.899 78.5696L120.891 94.0191Z" fill="url(#paint0_linear_bottom)"/>
                </g>
                <defs>
                  <linearGradient id="paint0_linear_bottom" x1="62.6015" y1="13.3078" x2="97.901" y2="179.379" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0168FF"/>
                    <stop offset="1" stopColor="#05AFFF" stopOpacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <header className={styles.header}>
              <div className={styles.headerContainer}>
                <div className={styles.logo}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_logo" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
                      <path d="M40 0H0V40H40V0Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_logo)">
                      <path d="M34.0299 0H5.97015C2.67293 0 0 2.67293 0 5.97015V34.0299C0 37.3271 2.67293 40 5.97015 40H34.0299C37.3271 40 40 37.3271 40 34.0299V5.97015C40 2.67293 37.3271 0 34.0299 0Z" fill="#0388FF"/>
                      <path d="M25.9881 21.1543L18.4368 24.5556V29.0907L17.6848 28.3361L15.3204 25.9632L14.0159 24.654L18.437 22.6604L21.5639 21.2528L28.0101 18.3464C29.647 17.6058 30.0422 15.4505 28.7726 14.1764L23.0292 8.4124C21.3363 6.71343 18.4368 7.91737 18.4368 10.3185V13.9479L10.497 17.5283V20.9646L13.6239 19.557L20.7033 16.3699L21.5847 15.9732V12.5299L21.5637 12.5403V11.3785L25.9881 15.8187L24.0259 16.7032L24.0295 16.7103L15.6597 20.4907L15.6527 20.4767L11.9942 22.1265C11.9312 22.1546 11.8717 22.1826 11.8158 22.2143C11.0532 22.6285 10.5952 23.3657 10.4972 24.1519C10.4027 24.9031 10.6301 25.6962 11.2282 26.2965L16.9748 32.0602C18.6677 33.7591 21.5637 32.5552 21.5637 30.1507V26.5844L25.9881 24.5907L29.5242 23.0006V19.5572L25.9881 21.1543Z" fill="white"/>
                    </g>
                  </svg>
                </div>
                <div className={styles.headerText}>
                  <div className={styles.companyName}>Limitless Cover</div>
                  <div className={styles.tagline}>Specialized for Vehicle Insurance</div>
                </div>
              </div>
            </header>

            <main className={styles.mainContent}>
              <section className={styles.heroSection}>
                <h1 className={styles.mainTitle}>GET INSURED WITH US TODAY FOR</h1>
                <div className={styles.priceContainer}>
                  <div className={styles.divider}></div>
                  <div className={styles.price}>{quoteData.annualPremium}</div>
                  <div className={styles.divider}></div>
                </div>
              </section>

              <section className={styles.descriptionSection}>
                <p className={styles.description}>
                  {quoteData.customerName}, thank you for getting a quote for Limitless Cover Insurance. Your quote has been saved and the details are shown below.
                </p>
              </section>

              <section className={styles.ctaSection}>
                <button className={styles.ctaButton}>Retrieve Quote</button>
              </section>

              <section className={styles.quoteDetails}>
                <div className={styles.detailsTable}>
                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>Quote number</div>
                    <div className={styles.detailValue}>{quoteData.quoteNumber}</div>
                  </div>
                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>Registration</div>
                    <div className={styles.detailValue}>{quoteData.registration}</div>
                  </div>
                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>Policy start date</div>
                    <div className={styles.detailValue}>{quoteData.policyStartDate}</div>
                  </div>
                  <div className={styles.detailRow}>
                    <div className={styles.detailLabel}>Cover level</div>
                    <div className={styles.detailValue}>{quoteData.coverLevel}</div>
                  </div>
                </div>
              </section>

              <section className={styles.coverSection}>
                <h2 className={styles.sectionTitle}>YOUR COVER</h2>
                <p className={styles.coverIntro}>Your annual premium of {quoteData.annualPremium} is made up of:</p>
                
                <div className={styles.coverDetails}>
                  <h3 className={styles.coverSubtitle}>Comprehensive cover for {quoteData.annualPremium}</h3>
                  <ul className={styles.coverList}>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#22C55E" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Cover for damage to your car</span>
                    </li>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#22C55E" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Guaranteed Hire Car</span>
                    </li>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#22C55E" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Uninsured Driver Promise</span>
                    </li>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#22C55E" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Fair Claim Commitment</span>
                    </li>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#22C55E" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Guaranteed repairs for 5 years when you use our approved repairer</span>
                    </li>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#22C55E" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>24 hour emergency helpline</span>
                    </li>
                  </ul>
                </div>

                <div className={styles.optionalExtras}>
                  <h3 className={styles.coverSubtitle}>Your optional extras</h3>
                  <ul className={styles.coverList}>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9" stroke="#EF4444" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 3L9 9" stroke="#EF4444" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Motor Legal Cover</span>
                    </li>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9" stroke="#EF4444" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 3L9 9" stroke="#EF4444" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Protected No Claim Discount</span>
                    </li>
                    <li className={styles.coverItem}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 3L3 9" stroke="#EF4444" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 3L9 9" stroke="#EF4444" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Green Flag breakdown</span>
                    </li>
                  </ul>
                  <a href="#" className={styles.coverLink}>Find out more about our cover &gt;</a>
                </div>
              </section>

              <section className={styles.excessSection}>
                <h2 className={styles.sectionTitle}>YOUR EXCESS</h2>
                <div className={styles.excessTable}>
                  <div className={styles.excessRow}>
                    <div className={styles.excessLabel}>Accidental damage</div>
                    <div className={styles.excessValue}>£400 (approved) / £650<br />(other)</div>
                  </div>
                  <div className={styles.excessRow}>
                    <div className={styles.excessLabel}>Fire and theft</div>
                    <div className={styles.excessValue}>£400 (approved) / £650<br />(other)</div>
                  </div>
                  <div className={styles.excessRow}>
                    <div className={styles.excessLabel}>Windscreen replacement</div>
                    <div className={styles.excessValue}>£180</div>
                  </div>
                  <div className={styles.excessRow}>
                    <div className={styles.excessLabel}>Windscreen repair</div>
                    <div className={styles.excessValue}>£25</div>
                  </div>
                </div>
              </section>

              <section className={styles.setupSection}>
                <h2 className={styles.setupTitle}>READY TO SET UP YOUR POLICY?</h2>
                <p className={styles.setupDescription}>
                  It's easy to buy your policy online or make changes to your quote. You can get back to your quote in seconds.
                </p>
                <button className={styles.ctaButton}>Retrieve Quote</button>
                <p className={styles.contactText}>
                  Or, if you'd like to talk to us, give our team a call on <a href="tel:08001234567" className={styles.phoneLink}>0800 123 4567</a>
                </p>
                <p className={styles.hoursText}>
                  Monday to Friday, 8.30am-6pm<br />
                  Saturday & Sunday<br />
                  Sunday, 9am-5pm
                </p>
              </section>

              <section className={styles.trustBadges}>
                <div className={styles.badge}>
                  <div className={styles.badgeIcon}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" fill="#0388FF"/>
                      <path d="M4.5 6L5.5 7L7.5 5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={styles.badgeText}>
                    <div className={styles.badgeValue}>1M+</div>
                    <div className={styles.badgeLabel}>UK Drivers</div>
                  </div>
                </div>
                <div className={styles.badge}>
                  <div className={styles.badgeIcon}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 1L7.045 4.13L10 4.635L8 6.57L8.59 9.51L6 7.885L3.41 9.51L4 6.57L2 4.635L4.955 4.13L6 1Z" fill="#0388FF"/>
                    </svg>
                  </div>
                  <div className={styles.badgeText}>
                    <div className={styles.badgeValue}>Award</div>
                    <div className={styles.badgeLabel}>Winning Service</div>
                  </div>
                </div>
                <div className={styles.badge}>
                  <div className={styles.badgeIcon}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" fill="#0388FF"/>
                      <path d="M4.25 5.75C4.66421 5.75 5 5.41421 5 5C5 4.58579 4.66421 4.25 4.25 4.25C3.83579 4.25 3.5 4.58579 3.5 5C3.5 5.41421 3.83579 5.75 4.25 5.75Z" fill="white"/>
                      <path d="M7.75 5.75C8.16421 5.75 8.5 5.41421 8.5 5C8.5 4.58579 8.16421 4.25 7.75 4.25C7.33579 4.25 7 4.58579 7 5C7 5.41421 7.33579 5.75 7.75 5.75Z" fill="white"/>
                      <path d="M4 7.25C4.25 7.75 5 8.25 6 8.25C7 8.25 7.75 7.75 8 7.25" stroke="white" strokeWidth="0.75" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className={styles.badgeText}>
                    <div className={styles.badgeValue}>24/7</div>
                    <div className={styles.badgeLabel}>Customer Support</div>
                  </div>
                </div>
              </section>
            </main>

            <footer className={styles.footer}>
              <div className={styles.footerMain}>
                <div className={styles.footerLogo}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_footer" style={{maskType: 'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
                      <path d="M32 0H0V32H32V0Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_footer)">
                      <path d="M27.2239 0H4.77612C2.13834 0 0 2.13834 0 4.77612V27.2239C0 29.8617 2.13834 32 4.77612 32H27.2239C29.8617 32 32 29.8617 32 27.2239V4.77612C32 2.13834 29.8617 0 27.2239 0Z" fill="#0388FF"/>
                      <path d="M20.7882 16.9235L14.7471 19.6445V23.2726L14.1455 22.6689L12.254 20.7706L11.2104 19.7232L14.7472 18.1283L17.2488 17.0022L22.4057 14.6771C23.7153 14.0846 24.0314 12.3604 23.0157 11.3411L18.421 6.72992C17.0667 5.37074 14.7471 6.33389 14.7471 8.25477V11.1583L8.39528 14.0226V16.7717L10.8968 15.6456L16.5603 13.0959L17.2654 12.7786V10.0239L17.2486 10.0322V9.10277L20.7882 12.655L19.2184 13.3626L19.2213 13.3682L12.5254 16.3926L12.5198 16.3814L9.593 17.7012C9.54263 17.7237 9.49502 17.7461 9.45026 17.7715C8.84023 18.1028 8.47378 18.6926 8.39543 19.3215C8.31984 19.9225 8.50171 20.557 8.98025 21.0372L13.5775 25.6482C14.9318 27.0073 17.2486 26.0441 17.2486 24.1206V21.2675L20.7882 19.6726L23.617 18.4005V15.6457L20.7882 16.9235Z" fill="white"/>
                    </g>
                  </svg>
                  <span className={styles.footerBrand}>Limitless Cover</span>
                </div>
                <button className={styles.chatButton}>Chat with us</button>
              </div>
            </footer>

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
    </div>
  );
}
