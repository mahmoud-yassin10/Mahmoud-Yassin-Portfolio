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
                  Last updated: 02 February 2026
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
                          <li>Optional profile fields you choose to provide (e.g., name/username)</li>
                          <li>Financial information you enter</li>
                          <li>Income amounts and any details you add</li>
                          <li>Bills and recurring obligations</li>
                          <li>Budget categories and allocations</li>
                          <li>Expenses and transactions (amount, date, category, notes you add)</li>
                          <li>Goals and savings targets</li>
                          <li>Other budgeting or planning inputs you choose to enter in the app</li>
                          <li>Support communications</li>
                          <li>
                            If you contact us, we collect the content of your message and your
                            contact details to respond.
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
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold">C) Information we do not intentionally collect</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>Precise location data</li>
                          <li>Contacts</li>
                          <li>SMS, call logs, or the content of communications</li>
                          <li>Photos/media/files from your device</li>
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
                      <li>Show your dashboards, budgets, plans, history, and goals</li>
                      <li>Generate personalized planning features</li>
                      <li>Use your inputs to generate budgeting recommendations and plans</li>
                      <li>Provide AI-based planning when you choose to use it (see Section 5)</li>
                      <li>Improve and maintain the Services</li>
                      <li>Monitor performance and reliability</li>
                      <li>Fix bugs and improve features and user experience</li>
                      <li>Develop and test new functionality</li>
                      <li>Security and fraud prevention</li>
                      <li>Protect against unauthorized access and abuse</li>
                      <li>Support app integrity and security checks</li>
                      <li>Support and communications</li>
                      <li>Respond to your questions and support requests</li>
                    </ul>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Where your data is stored and processed</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy uses third-party service providers to operate core app functionality.
                      Your information may be stored and processed using cloud infrastructure and
                      services (for example, authentication, a cloud database, and analytics).
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Depending on service provider infrastructure, your information may be processed
                      in countries other than Egypt.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">AI-based planning</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy may offer AI-based planning features. When you request an AI-generated
                      plan, the app may process certain information needed to create it, such as:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>Income, bills, budget categories, allocations, goals, and transaction summaries you entered.</li>
                    </ul>
                    <div className="mt-3 space-y-1 text-muted-foreground">
                      <p>What is sent: Only information necessary to generate the plan you requested.</p>
                      <p>Purpose: To generate and return budgeting recommendations and personalized planning output.</p>
                      <p>Security: We aim to transmit data using encrypted connections (HTTPS).</p>
                      <p>Choice: You can choose not to use AI planning if it is optional in the app.</p>
                    </div>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">How we share your information</h2>
                    <p className="mt-2 text-muted-foreground">We do not sell your personal information.</p>
                    <p className="mt-2 text-muted-foreground">We may share information only in the following cases:</p>
                    <div className="mt-3 space-y-4">
                      <div>
                        <h3 className="font-semibold">A) Service providers</h3>
                        <p className="mt-2 text-muted-foreground">
                          We share information with service providers that help us run the Services
                          (for example, authentication, cloud database/storage, analytics, and AI
                          planning services). These providers are permitted to process data only as
                          needed to provide their services.
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
                      If you delete your account, we delete your account data as described in Section 10.
                      Some limited information may remain in backups for a short period for security and
                      disaster recovery.
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
                      If you prefer to avoid analytics, you may be able to limit tracking through
                      device-level settings (where available) or by not using the Services.
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
                      your account (such as budgets, transactions, goals, categories, and profile
                      information), subject to limited backup retention for security and disaster
                      recovery as described in Section 7.
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
                      personal information, contact us and we will take steps to delete it.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Third-party services</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy relies on third-party services for certain features (for example,
                      sign-in providers and cloud services). Their processing is governed by their own
                      privacy policies.
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
