const About = () => {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-border animate-fade-in">
            <div className="space-y-6 text-lg text-card-foreground leading-relaxed">
              <p>
                I'm a <span className="text-primary font-semibold">predicted valedictorian</span> with a 4.0 GPA from Port Said, Egypt, 
                passionate about using technology to solve real-world problems. As a software engineer and student founder, 
                I've built AI-powered applications and led initiatives that have impacted thousands of students across Egypt.
              </p>
              
              <p>
                With expertise in <span className="text-accent font-semibold">Flutter/Dart, Python, JavaScript, and Firebase</span>, 
                I've created solutions ranging from Flousy (an AI financial planner helping Egyptian families navigate inflation) 
                to an AI VAR system for Squash using computer vision. My technical foundation is strengthened by Harvard's CS50 series, 
                MIT's Machine Learning course, and hands-on project experience with real users.
              </p>
              
              <p>
                I'm a <span className="text-primary font-semibold">Junior Presidential Leadership Program graduate</span> — selected from 
                7,315 applicants (top 1.37%) for intensive leadership training by Egypt's National Training Academy. This experience, 
                combined with my role as Computer Science Club President and Financial Head of Launchpad, has taught me how to 
                lead teams, manage resources, and turn ideas into reality.
              </p>
              
              <p>
                Beyond tech, I'm a Top-50 U17 Squash player in Egypt, Karate Black Belt (First Dan), and award-winning percussionist. 
                These experiences taught me resilience, discipline, and the importance of continuous improvement — values I bring to 
                every project I build. I believe technology should empower communities, and I'm committed to creating impactful solutions 
                that make a difference.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
