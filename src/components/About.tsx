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
                I'm a <span className="text-primary font-semibold">4.0 GPA valedictorian</span> and passionate software engineer 
                who thrives at the intersection of technology and social impact. My journey spans from developing 
                AI-powered applications to founding student-led initiatives that have reached thousands.
              </p>
              
              <p>
                With expertise in <span className="text-accent font-semibold">Flutter, Firebase, Python, and AI/ML</span>, 
                I've built solutions ranging from financial literacy apps to computer vision systems for sports officiating. 
                My technical foundation is strengthened by completing Harvard's CS50 and MIT's Machine Learning courses, 
                demonstrating my commitment to continuous learning.
              </p>
              
              <p>
                Beyond coding, I'm a <span className="text-primary font-semibold">Junior Presidential Leadership Program graduate</span> (top 
                1.37% of 7,000+ applicants) and have led transformative initiatives including a peer tutoring program spanning 
                7 campuses and a Computer Science Club that has empowered hundreds of students through workshops and hackathons.
              </p>
              
              <p>
                I believe technology should democratize access to opportunities. Whether it's helping families manage finances 
                through Flousy or enabling communities to share renewable energy via Solar Share, I'm driven by creating 
                solutions that make a real difference in people's lives.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
