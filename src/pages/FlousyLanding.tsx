import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  Globe2,
  LineChart,
  Lock,
  Sparkles,
  Target,
  Wallet
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type FeatureItem = {
  title: string;
  description: string;
  icon: typeof Wallet;
};

const featureItems: FeatureItem[] = [
  {
    title: "Expense Tracking That Stays Simple",
    description:
      "Log transactions quickly and see exactly where your money goes across all categories.",
    icon: Wallet
  },
  {
    title: "AI-Powered Planning",
    description:
      "Generate practical budget plans based on your income, bills, goals, and current spending.",
    icon: BrainCircuit
  },
  {
    title: "Bills and Recurring Payments",
    description:
      "Keep monthly obligations visible so you can plan ahead and avoid late surprises.",
    icon: BellRing
  },
  {
    title: "Goal-Based Saving",
    description:
      "Set clear savings targets and track progress with milestones that keep you moving.",
    icon: Target
  },
  {
    title: "Actionable Insights",
    description:
      "Use trends and summaries to improve monthly decisions, not just record history.",
    icon: LineChart
  },
  {
    title: "Bilingual Experience",
    description:
      "Built with Arabic and English support so every flow feels natural and accessible.",
    icon: Globe2
  }
];

const steps = [
  {
    title: "Add your financial basics",
    description: "Enter income, regular bills, goals, and your spending categories."
  },
  {
    title: "Track and organize daily spending",
    description: "Capture transactions as you go and keep your monthly view up to date."
  },
  {
    title: "Use AI to generate a realistic plan",
    description: "Get a personalized plan, adjust it, and follow progress with confidence."
  }
];

const trustPoints = [
  "Authentication and secure account access via Firebase",
  "Cloud sync for your budgets, goals, and transaction history",
  "Integrity and abuse protection using app security checks",
  "In-app controls for account and data deletion"
];

const audiencePoints = [
  "Students managing tight monthly budgets",
  "Families balancing bills, groceries, and long-term goals",
  "Early-career professionals who want stronger financial habits",
  "Anyone who wants a clear plan instead of scattered notes"
];

const FlousyLanding = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <section className="pt-28 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background" />
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div
            className="absolute -bottom-20 -right-16 h-80 w-80 rounded-full bg-accent/20 blur-3xl animate-float"
            style={{ animationDelay: "1.2s" }}
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto text-center space-y-6 animate-fade-in-up">
              <Badge className="bg-primary/10 text-primary border border-primary/30 px-3 py-1">
                AI Financial Planner
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Flousy helps you take control of your money, one smart plan at a time.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Track spending, organize budgets, and generate AI-powered plans designed for real
                life. Flousy brings your financial picture into one clear, focused app.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <a href="https://flousy.mahmoud-yassin.com" target="_blank" rel="noreferrer">
                    Open Flousy
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/40 hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <a href="/flousy/privacy-policy">Privacy Policy</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {featureItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={item.title}
                    className="bg-card/50 backdrop-blur-sm border-border hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <CardHeader className="space-y-3">
                      <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  How Flousy works
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fast setup, clear tracking, and plan guidance you can act on.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, index) => (
                  <Card
                    key={step.title}
                    className="bg-card/50 backdrop-blur-sm border-border animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary text-sm font-semibold">
                          {index + 1}
                        </span>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/60 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Privacy and control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    {trustPoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-1 text-accent shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/60 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Built for real people
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    {audiencePoints.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <BadgeCheck className="h-4 w-4 mt-1 text-accent shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-primary/20 backdrop-blur-sm">
              <CardContent className="py-12 px-6 md:px-10 text-center space-y-5">
                <div className="inline-flex items-center gap-2 text-sm text-primary font-medium">
                  <CalendarClock className="h-4 w-4" />
                  Start building better money habits today
                </div>
                <h2 className="text-3xl md:text-5xl font-bold">
                  Make your next month more predictable with Flousy.
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Keep your account active, track your data with clarity, and use AI planning when
                  you need a practical next step.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="https://flousy.mahmoud-yassin.com" target="_blank" rel="noreferrer">
                      Open Flousy
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary/40 hover:bg-primary hover:text-primary-foreground"
                    asChild
                  >
                    <a href="/flousy/delete-account">Delete account options</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FlousyLanding;
