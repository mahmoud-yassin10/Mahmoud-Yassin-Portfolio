import { Users, Award, TrendingUp, Zap, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const initiatives = [
  {
    title: "Peer Tutoring Program",
    role: "Co-Founder",
    period: "Jun 2025 – Present",
    description: "Built a peer-to-peer tutoring model scaled across seven campuses of NIS, recognized by Egypt's Minister of Education for educational impact.",
    impact: "7 campuses reached",
    icon: Users,
    color: "text-primary"
  },
  {
    title: "Computer Science Club",
    role: "President",
    period: "2024 – Present",
    description: "Led workshops, hackathons, AI coding sessions, and collaborative learning initiatives. Organized 8-week digital entrepreneurship workshop for 15 students.",
    impact: "300+ students engaged",
    icon: Award,
    color: "text-accent"
  },
  {
    title: "Launchpad Incubator",
    role: "Financial Head & Workshop Leader",
    period: "2024 – Present",
    description: "Co-led schoolwide entrepreneurship initiative, managing finances and teaching coding fundamentals, entrepreneurship, and project review across grade levels.",
    impact: "15+ startups supported",
    icon: TrendingUp,
    color: "text-primary"
  },
  {
    title: "AI Lab Initiative",
    role: "Founder & Creator",
    period: "2025 – Present",
    description: "Educational media platform on Instagram & TikTok simplifying AI concepts for Arab teens through short-form explainers on real-world applications.",
    impact: "Launching soon",
    icon: Zap,
    color: "text-accent"
  },
  {
    title: "Childhood Cancer Day",
    role: "Co-Organizer",
    period: "Feb 2025",
    description: "Co-organized event at El-Nasr Hospital for ~50 patients and families (~100 attendees), securing donations and coordinating special guest Rami Radwan.",
    impact: "100+ attendees",
    icon: Heart,
    color: "text-primary"
  }
];

const Initiatives = () => {
  return (
    <section id="initiatives" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Leadership & Initiatives
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
                      <p className="text-xs text-muted-foreground">{initiative.period}</p>
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
