import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const DeleteAccount = () => {
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
                  Delete Your Flousy Account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Developer/Publisher: Mahmoud Yassin
                </p>
              </div>

              <div className="space-y-6 text-base text-foreground">
                <p className="text-muted-foreground">
                  You can delete your Flousy account directly in the app. Follow these steps:
                </p>
                <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
                  <li>Open Flousy</li>
                  <li>Go to Settings</li>
                  <li>Tap Account</li>
                  <li>Select Delete account and confirm</li>
                </ol>

                <div>
                  <h2 className="text-xl font-semibold">What is deleted</h2>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                    <li>Authentication account</li>
                    <li>
                      Firestore data: budgets, transactions, goals, categories, profile data
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">If you can't access the app</h2>
                  <p className="mt-2 text-muted-foreground">
                    Email: mahmoudyassin.dev@gmail.com
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Subject line: Flousy Account Deletion Request
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Please send the request from the same email you used in Flousy and
                    include that email address in the message.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">Retention note</h2>
                  <p className="mt-2 text-muted-foreground">
                    Some limited data may remain in backups for a short period for security
                    and disaster recovery, then is removed.
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  Last updated: 02 February 2026
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DeleteAccount;
