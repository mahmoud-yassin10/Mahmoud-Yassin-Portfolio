import { Trophy, Medal, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const awards = [
  {
    title: "1st Place - NASA Space Apps Challenge",
    location: "Port Said",
    description: "Global Nominee for Flood Lens project",
    icon: Trophy,
    year: "2024"
  },
  {
    title: "Best Idea Award",
    location: "Ignited Hackathon",
    description: "Solar Share - P2P renewable energy platform",
    icon: Medal,
    year: "2024"
  },
  {
    title: "Top 50 - Egypt U17 Squash",
    location: "National Rankings",
    description: "Competitive sports achievement",
    icon: Target,
    year: "2023"
  },
  {
    title: "1st Place - NIS Speech Competition",
    location: "Special Category",
    description: "Public speaking excellence",
    icon: Trophy,
    year: "2023"
  },
  {
    title: "National Percussion Duet Winner",
    location: "Music Competition",
    description: "Artistic achievement in music",
    icon: Medal,
    year: "2022"
  }
];

const Awards = () => {
  return (
    <section id="awards" className="py-20 relative bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Awards & Recognition
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {awards.map((award, index) => {
            const Icon = award.icon;
            return (
              <div
                key={index}
                className="group bg-card/50 backdrop-blur-sm rounded-xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {award.year}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {award.title}
                </h3>
                
                <p className="text-sm text-accent font-semibold mb-2">
                  {award.location}
                </p>
                
                <p className="text-sm text-muted-foreground">
                  {award.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Awards;
