import { Users, Award, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initiatives = [
  {
    title: "Peer Tutoring Program",
    role: "Founder",
    description: "Created and scaled a peer-to-peer tutoring initiative across 7 campuses, recognized by the Ministry of Education for impact.",
    impact: "500+ students helped",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Computer Science Club",
    role: "President",
    description: "Led workshops, coding events, and hackathons to foster programming skills and tech entrepreneurship among students.",
    impact: "300+ participants",
    icon: Award,
    color: "text-accent"
  },
  {
    title: "Launchpad Incubator",
    role: "Financial Head",
    description: "Managed finances and supported student entrepreneurs in developing and launching their startup ideas.",
    impact: "15+ startups supported",
    icon: TrendingUp,
    color: "text-primary"
  },
  {
    title: "AI Lab",
    role: "Creator",
    description: "Short-form AI education content on Instagram and TikTok, making complex concepts accessible to young learners.",
    impact: "10K+ reach",
    icon: Zap,
    color: "text-accent"
  }
];

const Initiatives = () => {
  return (
    <section id="initiatives" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Initiatives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4 mb-2">
                    <div className={`p-3 bg-primary/10 rounded-xl ${initiative.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {initiative.title}
                      </CardTitle>
                      <p className="text-sm text-accent font-semibold">{initiative.role}</p>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {initiative.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <span className="text-sm font-semibold text-primary">
                      {initiative.impact}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Initiatives;
