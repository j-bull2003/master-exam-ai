import { ArrowRight, BookOpen, Users, Trophy, Target, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const StudentSuccessPipeline = () => {
  const pipelineSteps = [
    {
      step: 1,
      title: "Diagnostic Assessment",
      description: "AI analyzes your strengths and weaknesses",
      icon: Target,
      color: "primary",
      stats: "Personalized in 5 minutes"
    },
    {
      step: 2,
      title: "Platform Learning",
      description: "Targeted practice with 8,500+ questions",
      icon: BookOpen,
      color: "primary",
      stats: "Average 150+ point gain"
    },
    {
      step: 3,
      title: "Live Group Classes",
      description: "Weekly sessions with elite SAT coaches",
      icon: Users,
      color: "accent",
      stats: "2x per week, 60 mins each"
    },
    {
      step: 4,
      title: "SAT Success",
      description: "Achieve your dream score",
      icon: Trophy,
      color: "success",
      stats: "1580+ scores achieved"
    }
  ];

  const successMetrics = [
    { label: "Average Score Increase", value: "200+", subtitle: "points" },
    { label: "Students Scoring 1500+", value: "89%", subtitle: "success rate" },
    { label: "Dream Universities", value: "1,200+", subtitle: "acceptances" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold">Your Path to SAT Success</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            From <span className="text-muted-foreground">Average Scores</span> to{" "}
            <span className="bg-gradient-to-r from-primary to-primary-variant bg-clip-text text-transparent">
              Elite Results
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our proven system combines AI-powered learning with live expert instruction to guarantee your SAT success
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-4 gap-8">
            {pipelineSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector Line */}
                {index < pipelineSteps.length - 1 && (
                  <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/40 to-primary/20 z-10">
                    <ArrowRight className="w-4 h-4 text-primary/60 absolute -top-2 right-0" />
                  </div>
                )}

                <Card className="relative p-6 text-center border-2 hover:border-primary/30 transition-all duration-300 hover:scale-105 bg-gradient-to-br from-card to-card/50">
                  {/* Step Number */}
                  <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                    step.color === 'success' 
                      ? 'bg-success text-white border-success'
                      : step.color === 'accent'
                      ? 'bg-accent text-white border-accent'
                      : 'bg-primary text-white border-primary'
                  }`}>
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    step.color === 'success'
                      ? 'bg-success/10'
                      : step.color === 'accent'
                      ? 'bg-accent/10'
                      : 'bg-primary/10'
                  }`}>
                    <step.icon className={`w-8 h-8 ${
                      step.color === 'success'
                        ? 'text-success'
                        : step.color === 'accent'
                        ? 'text-accent'
                        : 'text-primary'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                  <div className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    step.color === 'success'
                      ? 'bg-success/10 text-success'
                      : step.color === 'accent'
                      ? 'bg-accent/10 text-accent'
                      : 'bg-primary/10 text-primary'
                  }`}>
                    {step.stats}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {successMetrics.map((metric, index) => (
            <Card key={index} className="p-8 text-center border-2 hover:border-primary/30 transition-all bg-gradient-to-br from-card to-primary/5">
              <div className="text-4xl font-black text-primary mb-2">{metric.value}</div>
              <div className="text-sm font-semibold text-foreground mb-1">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.subtitle}</div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl p-8 border border-primary/20 max-w-2xl mx-auto">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Start Your Journey?</h3>
            <p className="text-muted-foreground mb-4">
              Join thousands of students who've transformed their SAT scores with UniHack
            </p>
            <div className="text-sm text-primary font-semibold">
              ✨ 7-Day Free Trial • No Credit Card Required ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentSuccessPipeline;