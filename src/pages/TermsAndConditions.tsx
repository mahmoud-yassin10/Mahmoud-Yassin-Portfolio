import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const TermsAndConditions = () => {
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
                  Terms and Conditions for Flousy
                </h1>
                <p className="text-sm text-muted-foreground">
                  Effective date: 10 August 2026
                </p>
                <p className="text-sm text-muted-foreground">
                  Last updated: 10 August 2026
                </p>
              </div>

              <div className="space-y-6 text-base text-foreground">
                <p>
                  These Terms and Conditions ("Terms") govern your access to and use of Flousy
                  ("the App," "we," "us," "our"), including our mobile application and related
                  services (collectively, the "Services"). By downloading, accessing, or using the
                  Services, you agree to these Terms.
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
                      If you have questions about these Terms, contact us using the details above.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Eligibility and accounts</h2>
                    <div className="mt-3 space-y-4">
                      <div>
                        <h3 className="font-semibold">A) Who may use Flousy</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>You must be at least 13 years old to use the Services.</li>
                          <li>
                            If you are under the age of majority where you live, you may only use the
                            Services with permission from a parent or legal guardian.
                          </li>
                          <li>
                            You are responsible for making sure your use of the Services complies with
                            applicable laws.
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold">B) Your account</h3>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                          <li>
                            You may need an account to use certain features (for example, syncing budgets,
                            transactions, goals, and plans).
                          </li>
                          <li>
                            You are responsible for keeping your login credentials secure and for all
                            activity under your account.
                          </li>
                          <li>
                            You agree to provide accurate information and to update it when it changes.
                          </li>
                          <li>
                            Notify us promptly if you believe your account has been accessed without
                            authorization.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">What Flousy provides</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy is a personal budgeting and financial planning tool. Features may include:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>Tracking income, bills, expenses, categories, and goals</li>
                      <li>Creating and reviewing monthly budgets and plans</li>
                      <li>Optional AI-based planning and coaching features</li>
                      <li>Optional SMS-based transaction tracking where available and permitted</li>
                      <li>Reminders, insights, and related productivity tools</li>
                    </ul>
                    <p className="mt-2 text-muted-foreground">
                      We may add, change, suspend, or remove features over time as we improve the
                      Services.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Not financial, legal, or tax advice</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy provides informational tools and recommendations based on the data you
                      enter. The Services are not a bank, broker, insurer, accountant, or licensed
                      financial advisor.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>
                        Plans, budgets, insights, and AI output are for personal organization and
                        education only.
                      </li>
                      <li>
                        They are not financial, investment, legal, accounting, or tax advice.
                      </li>
                      <li>
                        You remain solely responsible for your financial decisions and for verifying
                        any numbers, recommendations, or plan outputs before acting on them.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Your responsibilities</h2>
                    <p className="mt-2 text-muted-foreground">When using the Services, you agree that you will:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>Use the Services only for lawful personal purposes</li>
                      <li>
                        Enter information carefully and understand that inaccurate inputs can produce
                        inaccurate plans or insights
                      </li>
                      <li>Not attempt to disrupt, reverse engineer, or abuse the Services</li>
                      <li>
                        Not use automated systems to scrape, overload, or interfere with the Services
                      </li>
                      <li>
                        Not upload or submit content that is illegal, harmful, or infringes someone
                        else's rights
                      </li>
                      <li>
                        Not attempt to bypass security, quotas, paywalls, or access controls
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Subscriptions, purchases, and free features</h2>
                    <div className="mt-3 space-y-4">
                      <div>
                        <h3 className="font-semibold">A) Free and paid features</h3>
                        <p className="mt-2 text-muted-foreground">
                          Some features may be free. Others may require a paid subscription or one-time
                          purchase, including through Google Play or other store platforms.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">B) Billing</h3>
                        <p className="mt-2 text-muted-foreground">
                          If you buy a subscription or in-app purchase, payment is handled by the
                          applicable app store or payment provider. Their terms, refund policies, and
                          billing practices apply to those transactions.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">C) Changes to pricing</h3>
                        <p className="mt-2 text-muted-foreground">
                          We may change prices, quotas, or which features are free or paid. Where
                          required, we will provide notice through the store listing, the app, or other
                          reasonable means.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">AI-based planning and other automated features</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy may offer AI-based planning and related features. When you use them:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>
                        The app may process information you entered (such as income, bills, categories,
                        goals, and transaction summaries) to generate output.
                      </li>
                      <li>
                        AI results can be incomplete, outdated, or incorrect. Treat them as suggestions,
                        not guarantees.
                      </li>
                      <li>
                        Availability may depend on network connectivity, quotas, third-party providers,
                        and your subscription status.
                      </li>
                      <li>
                        You can choose not to use optional AI features where the app allows that choice.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Your content and data</h2>
                    <div className="mt-3 space-y-4">
                      <div>
                        <h3 className="font-semibold">A) Ownership</h3>
                        <p className="mt-2 text-muted-foreground">
                          You retain ownership of the financial and personal information you enter into
                          Flousy.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">B) License to operate the Services</h3>
                        <p className="mt-2 text-muted-foreground">
                          You grant us a limited license to host, process, transmit, and display your
                          content as needed to provide, secure, and improve the Services, consistent
                          with our Privacy Policy.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold">C) Backups and accuracy</h3>
                        <p className="mt-2 text-muted-foreground">
                          You are responsible for keeping copies of important records outside the App
                          if needed. We do not guarantee that every piece of data will always be
                          available without interruption.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Privacy</h2>
                    <p className="mt-2 text-muted-foreground">
                      Your use of the Services is also governed by our Privacy Policy, available at:
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      https://mahmoud-yassin.com/flousy/privacy-policy
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      By using the Services, you acknowledge that we process information as described
                      in the Privacy Policy.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Intellectual property</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy, including its name, branding, design, software, text, graphics, and
                      other materials (excluding your own user content), is owned by Mahmoud Yassin
                      or our licensors and is protected by applicable intellectual property laws.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      You may not copy, modify, distribute, sell, or create derivative works from the
                      Services except as expressly allowed by these Terms or by law.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Third-party services</h2>
                    <p className="mt-2 text-muted-foreground">
                      Flousy relies on third-party services for certain features (for example,
                      authentication, cloud storage, analytics, app stores, and AI providers). Your
                      use of those services may also be subject to their own terms and policies.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      We are not responsible for third-party websites, stores, or services that we do
                      not control.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Disclaimer of warranties</h2>
                    <p className="mt-2 text-muted-foreground">
                      The Services are provided on an "as is" and "as available" basis to the fullest
                      extent permitted by law.
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                      <li>
                        We do not warrant that the Services will be uninterrupted, error-free, or free
                        of harmful components.
                      </li>
                      <li>
                        We do not warrant that budgets, plans, forecasts, insights, or AI output will
                        meet your expectations or produce any particular financial result.
                      </li>
                      <li>
                        Any reliance you place on the Services is at your own risk.
                      </li>
                    </ul>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Limitation of liability</h2>
                    <p className="mt-2 text-muted-foreground">
                      To the fullest extent permitted by applicable law, Mahmoud Yassin and Flousy
                      will not be liable for any indirect, incidental, special, consequential, or
                      punitive damages, or for any loss of profits, data, goodwill, or other intangible
                      losses, arising out of or related to your use of (or inability to use) the
                      Services.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      To the fullest extent permitted by law, our total liability for any claim
                      relating to the Services will not exceed the greater of: (a) the amount you paid
                      us for the Services in the 12 months before the claim, or (b) USD 50 (or the
                      equivalent in local currency).
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Some jurisdictions do not allow certain limitations. In those cases, the
                      limitation applies only to the maximum extent allowed.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Termination</h2>
                    <p className="mt-2 text-muted-foreground">
                      You may stop using the Services at any time and may delete your account from
                      within the app where that option is available (Settings - Account - Delete
                      account), or by contacting us.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      We may suspend or terminate access to the Services if you violate these Terms,
                      if required by law, or if we discontinue the Services. Provisions that by their
                      nature should survive termination will continue to apply.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Changes to these Terms</h2>
                    <p className="mt-2 text-muted-foreground">
                      We may update these Terms from time to time. We will post the updated Terms on
                      this page and update the "Last updated" date. If changes are significant, we may
                      provide additional notice in-app.
                    </p>
                    <p className="mt-2 text-muted-foreground">
                      Continued use of the Services after the updated Terms become effective means you
                      accept the changes.
                    </p>
                  </li>

                  <li>
                    <h2 className="text-xl font-semibold">Governing law</h2>
                    <p className="mt-2 text-muted-foreground">
                      These Terms are governed by the laws of Egypt, without regard to conflict-of-law
                      principles, except where mandatory consumer protections in your country require
                      otherwise.
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

export default TermsAndConditions;
