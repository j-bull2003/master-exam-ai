import { ArrowRight, Users, Calendar, Clock, Target, Trophy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OneOnOneSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-primary/5">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-accent font-semibold">Premium Option: 1-on-1 SAT Program</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Accelerate Your SAT Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our exclusive 1-on-1 SAT program delivers personalized coaching with expert tutors. 
            Designed for students targeting top scores and elite universities.
          </p>
        </div>

        {/* Program Highlights */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Personalized Study Plans</h3>
                  <p className="text-muted-foreground">Custom curriculum designed around your specific strengths, weaknesses, and target score goals.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Flexible Scheduling</h3>
                  <p className="text-muted-foreground">Book sessions that fit your schedule with expert tutors available 7 days a week.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Intensive Focus</h3>
                  <p className="text-muted-foreground">Dedicated attention on your problem areas with real-time feedback and strategy adjustments.</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Elite Results</h3>
                  <p className="text-muted-foreground">Average score improvements of 250+ points with our 1-on-1 program graduates.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Expert Tutors</h3>
                  <p className="text-muted-foreground">Work with verified high scorers and experienced educators specializing in SAT preparation.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Complete Support</h3>
                  <p className="text-muted-foreground">Full access to platform resources plus weekly progress reviews and strategy sessions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-accent/10 to-accent/5 rounded-3xl p-12 border border-accent/20">
          <h3 className="text-3xl font-bold mb-4 text-foreground">
            Ready for Elite SAT Coaching?
          </h3>
          <p className="text-muted-foreground mb-8">
            Limited spots available. Our 1-on-1 program fills up quickly due to personalized attention requirements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/tutoring">
              <Button className="bg-gradient-to-r from-accent to-accent/80 hover:scale-105 transition-transform px-8">
                Learn More About 1-on-1
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="outline" className="px-8 border-accent/30 text-accent hover:bg-accent/10">
                Start with Platform Access
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneOnOneSection;