import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-border">
              <div className="space-y-4 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Privacy Policy for Flousy
                </h1>
                <p className="text-sm text-muted-foreground">
                  Effective date: 02 February 2026
                </p>
                <p className="text-sm text-muted-foreground">
                  Last updated: 10 August 2026
                </p>
              </div>

              <div className="space-y-6 text-base text-foreground">
                <p>
                  This Privacy Policy explains how Flousy ("the App," "we," "us," "our") collects,
                  uses, discloses, and protects information when you use our mobile application and
                  related services (collectively, the "Services"). By using the Services, you agree
                  to the practices described in this Privacy Policy.
                </p>
                <p>If you do not agree, do not use the Services.</p>
                <p className="text-muted-foreground">
                  Our Terms and Conditions are available at:{" "}
                  https://mahmoud-yassin.com/flousy/terms-and-conditions
                </p>

                <ol className="list-decimal pl-5 space-y-6">
                  <li>
                    <h2 className="text-xl font-semibold">Who we are and how to contact us</h2>
                    <div className="mt-2 space-y-1 text-muted-foreground">
                      <p>App name: Flousy</p>
                      <p>Publisher: Mahmoud Yassin</p>
                      <p>Website: https://mahmoud-yassin.com</p>
                      <p>Support email: mahmoudyassin.dev@gmail.com</p>
                      <p>Country: Egypt</p>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      If you have questions, requests, or concerns about privacy, contact us using
                      the details above.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Information we collect</h2>
                    <div className="mt-3 space-y-4">
                      <div>
                        <h3 className="font-semibold">A) Information you provide directly</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>Account information</li>
                          <li>Email address</li>
                          <li>
                            Password (we do not store plaintext passwords; authentication is handled
                            securely through our sign-in provider)
                          </li>
                          <li>
                            Optional Google Sign-In details if you choose to sign in with Google
                          </li>
                          <li>Optional profile fields you choose to provide (e.g., name/username)</li>
                          <li>Financial information you enter</li>
                          <li>Income amounts, sources, and any details you add</li>
                          <li>Bills, subscriptions, installments, and other recurring obligations</li>
                          <li>Debt instruments and repayment preferences you enter</li>
                          <li>Budget categories, allocations, and planner preferences</li>
                          <li>Expenses and transactions (amount, date, category, notes you add)</li>
                          <li>Accounts and balances you choose to track</li>
                          <li>Goals, savings targets, sinking funds, and emergency-fund settings</li>
                          <li>Household or life-stage preferences you choose to provide</li>
                          <li>Other budgeting or planning inputs you choose to enter in the app</li>
                          <li>Support communications</li>
                          <li>
                            If you contact us or submit feedback, we collect the content of your
                            message and your contact details to respond.
                          </li>
                          <li>
                            Optional student verification materials you submit if you apply for a
                            student offer (for example, proof documents you choose to upload)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold">B) Information collected automatically</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>App usage and analytics</li>
                          <li>App interactions and events (e.g., which screens you use, feature usage)</li>
                          <li>
                            Performance and usage information to help us understand what works and
                            what needs improvement
                          </li>
                          <li>Device and technical information</li>
                          <li>Device model, operating system version, and app version</li>
                          <li>Language and region settings</li>
                          <li>
                            Network information such as IP address and timestamps (commonly used for
                            service delivery, security, and fraud prevention)
                          </li>
                          <li>
                            Purchase and subscription status signals needed to unlock paid features
                            (processed through the app store / RevenueCat; we do not receive your full
                            payment card details)
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold">C) Optional device permissions and related data</h3>
                        <p className="mt-2 text-muted-foreground">
                          Some features ask for device permissions. These are optional unless you choose
                          to use the related feature.
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>
                            SMS access (Android): if you enable SMS tracking, Flousy may read bank or
                            wallet SMS messages to detect transactions. See Section 6.
                          </li>
                          <li>
                            Microphone: if you use voice entry features, audio may be processed on-device
                            or through the speech recognition provider needed to convert speech to text.
                          </li>
                          <li>
                            Camera / media: only if you choose a feature that needs them (for example,
                            uploading a document for student verification).
                          </li>
                          <li>
                            Notifications: used for reminders, spending alerts, and optional SMS-tracked
                            transaction alerts.
                          </li>
                          <li>
                            Biometric unlock (where available): used only to unlock the app on your
                            device; biometric templates stay on your device.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold">D) Information we do not intentionally collect</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>Precise location data</li>
                          <li>Your contacts list</li>
                          <li>Call logs</li>
                          <li>
                            The content of personal SMS messages that are not processed for the optional
                            financial SMS tracking feature
                          </li>
                          <li>
                            Photos, media, or files from your device except what you choose to upload
                            for a specific feature
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">How we use your information</h2>
                    <p className="mt-2 text-muted-foreground">We use information to:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>Provide and operate the Services</li>
                      <li>Create and authenticate your account</li>
                      <li>Save and sync your budgeting and planning information</li>
                      <li>Show your dashboards, budgets, plans, history, accounts, and goals</li>
                      <li>Generate personalized planning features and cash-flow insights</li>
                      <li>Use your inputs to generate budgeting recommendations and plans</li>
                      <li>
                        Provide AI-based planning, coaching, and related features when you choose to
                        use them (see Section 5)
                      </li>
                      <li>
                        Detect and log transactions from bank/wallet SMS when you enable that feature
                        (see Section 6)
                      </li>
                      <li>Send reminders and optional notifications you enable</li>
                      <li>Manage free quotas, subscriptions, and entitlement status</li>
                      <li>Improve and maintain the Services</li>
                      <li>Monitor performance and reliability</li>
                      <li>Fix bugs and improve features and user experience</li>
                      <li>Develop and test new functionality</li>
                      <li>Security and fraud prevention</li>
                      <li>Protect against unauthorized access and abuse</li>
                      <li>Support app integrity and security checks</li>
                      <li>Support and communications</li>
                      <li>Respond to your questions, feedback, and support requests</li>
                    </ul>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Where your data is stored and processed</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy uses third-party service providers to operate core app functionality.
                      Your information may be stored and processed using cloud infrastructure and
                      services (for example, authentication, a cloud database, analytics, AI providers,
                      and subscription management).
                    </p>
                    <div className="mt-3">
                      <h3 className="font-semibold">Key service providers used by Flousy</h3>
                      <div className="mt-2 space-y-1 text-muted-foreground">
                        <p>- Google Firebase Authentication (sign-in and account authentication)</p>
                        <p>
                          - Google Firebase Firestore (cloud database to store and sync your budgets,
                          transactions, goals, accounts, preferences, and plans)
                        </p>
                        <p>- Google Firebase Analytics (usage analytics to improve the app)</p>
                        <p>
                          - Firebase App Check / Google Play Integrity (security/integrity checks to
                          reduce abuse)
                        </p>
                        <p>
                          - Google / Gemini AI services (optional AI planning and coaching features)
                        </p>
                        <p>
                          - RevenueCat and Google Play Billing (subscription and purchase entitlement
                          management)
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Depending on service provider infrastructure, your information may be processed
                      in countries other than Egypt.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">AI-based planning and coaching</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy may offer AI-based planning, coaching, and related features (for example,
                      generating a monthly plan, answering questions about your budget, or helping you
                      evaluate a purchase). When you use these features, the app may process certain
                      information needed to create a response, such as:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>
                        Income, bills, budget categories, allocations, goals, account summaries, and
                        transaction summaries you entered or imported.
                      </li>
                      <li>The question or request you submit to the AI feature.</li>
                    </ul>
                    <div className="mt-3 space-y-1 text-muted-foreground">
                      <p>
                        What is sent: Only information necessary to generate the plan or response you
                        requested.
                      </p>
                      <p>
                        Purpose: To generate and return budgeting recommendations, personalized
                        planning output, or coaching answers.
                      </p>
                      <p>
                        AI results are generated by a remote service and returned to the app. Results
                        can be incomplete or incorrect and are not financial advice.
                      </p>
                      <p>Security: We aim to transmit data using encrypted connections (HTTPS).</p>
                      <p>
                        Choice: You can choose not to use optional AI features. Some AI features may
                        also be subject to free quotas or a paid subscription.
                      </p>
                    </div>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">SMS transaction tracking (optional)</h2>
                    <p className="mt-2 text-muted-foreground">
                      On Android, Flousy may offer optional SMS-based transaction detection. This
                      feature only works if you grant SMS permission and enable the feature in the app.
                    </p>
                    <div className="mt-3 space-y-4">
                      <div>
                        <h3 className="font-semibold">A) What we process</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>
                            Bank, wallet, or payment SMS messages that appear to contain financial
                            transaction details
                          </li>
                          <li>
                            Derived fields such as amount, merchant or sender label, date/time,
                            currency, and whether the message looks like income or expense
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold">B) How we use it</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>To suggest or auto-log transactions into your ledger</li>
                          <li>To help match transactions to accounts or categories when possible</li>
                          <li>To show optional notifications so you can review or correct the result</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold">C) What we try not to do</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>
                            We do not use SMS access to read your personal conversations for marketing
                          </li>
                          <li>We do not sell SMS content</li>
                          <li>
                            We aim to process messages only for financial transaction detection and
                            related app features you enabled
                          </li>
                          <li>
                            Where practicable, the app avoids storing raw SMS body text long-term and
                            focuses on derived transaction fields
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold">D) Your control</h3>
                        <p className="mt-2 text-muted-foreground">
                          You can deny or revoke SMS permission in your device settings, and you can
                          turn off SMS tracking features in the app. If you revoke permission, Flousy
                          will stop reading new SMS messages for this feature.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">How we share your information</h2>
                    <p className="mt-2 text-muted-foreground">We do not sell your personal information.</p>
                    <p className="mt-2 text-muted-foreground">
                      Flousy does not include public profiles, social feeds, or sharing your financial data with
                      other users.
                    </p>
                    <p className="mt-2 text-muted-foreground">We may share information only in the following cases:</p>
                    <div className="mt-3 space-y-4">
                      <div>
                        <h3 className="font-semibold">A) Service providers</h3>
                        <p className="mt-2 text-muted-foreground">
                          We share information with service providers that help us run the Services
                          (for example, authentication, cloud database/storage, analytics, AI
                          planning/coaching services, and subscription/billing providers). These
                          providers are permitted to process data only as needed to provide their
                          services.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">B) Legal and safety</h3>
                        <p className="mt-2 text-muted-foreground">
                          We may disclose information if required to comply with law, regulation,
                          legal process, or a valid governmental request, or to protect the rights,
                          safety, and security of users, the public, or the Services.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">C) Business transfers</h3>
                        <p className="mt-2 text-muted-foreground">
                          If Flousy is involved in a merger, acquisition, financing, reorganization,
                          or sale of assets, user information may be transferred as part of that
                          transaction, subject to appropriate safeguards.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Data retention</h2>
                    <p className="mt-2 text-muted-foreground">
                      We retain information only as long as necessary to:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>Provide the Services</li>
                      <li>Maintain security and prevent abuse</li>
                      <li>Comply with legal obligations where applicable</li>
                      <li>Resolve disputes and enforce agreements</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground">
                      If you delete your account, we delete your account and associated data as described
                      below. Some limited information may remain in backups for a short period for security
                      and disaster recovery. Purchase records held by Google Play or RevenueCat may also
                      be retained under their own policies.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Security</h2>
                    <p className="mt-2 text-muted-foreground">
                      We use reasonable technical and organizational measures to protect information,
                      including encryption in transit where available and access controls.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      No method of transmission or storage is completely secure. You use the Services at
                      your own risk.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Analytics</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy may use analytics to understand app usage and improve reliability and
                      performance. Analytics may collect information about how you use the app and basic
                      device/app signals.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      You may be able to limit some tracking through device-level settings where available.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Your rights and choices (access, correction, deletion)</h2>
                    <p className="mt-2 text-muted-foreground">
                      Depending on your location and applicable law, you may have rights to:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Delete your account and associated data</li>
                      <li>Object to or restrict certain processing in certain cases</li>
                      <li>Revoke optional permissions such as SMS, microphone, camera, or notifications</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground">Delete your account and data (in-app)</p>
                    <p className="mt-2 text-muted-foreground">
                      You can delete your account and associated data from within the app:
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Settings - Account - Delete account
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      When you delete your account, we delete the account and associated data stored for
                      your account (such as budgets, transactions, goals, categories, accounts,
                      preferences, and profile information), subject to limited backup retention for
                      security and disaster recovery as described in the Data retention section. This
                      deletes your authentication account and associated Firestore data.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      More details are also available at:
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      https://mahmoud-yassin.com/flousy/delete-account
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      If you have trouble deleting your account in-app, email us at
                      mahmoudyassin.dev@gmail.com from the email address associated with your Flousy
                      account.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Children's privacy</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy is not intended for children under 13. We do not knowingly collect
                      personal information from children under 13. If you believe a child has provided
                      personal information, contact us and we will take steps to delete it. The Services
                      are intended for adults.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Third-party services</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy relies on third-party services for certain features (for example,
                      sign-in providers, cloud services, analytics, AI providers, app stores, and
                      subscription platforms). Their processing is governed by their own privacy
                      policies.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Changes to this Privacy Policy</h2>
                    <p className="mt-2 text-muted-foreground">
                      We may update this Privacy Policy from time to time. We will post the updated
                      policy on this page and update the "Last updated" date. If changes are
                      significant, we may provide additional notice in-app.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Contact</h2>
                    <div className="mt-2 space-y-1 text-muted-foreground">
                      <p>Publisher: Mahmoud Yassin</p>
                      <p>Website: https://mahmoud-yassin.com</p>
                      <p>Email: mahmoudyassin.dev@gmail.com</p>
                      <p>Country: Egypt</p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
