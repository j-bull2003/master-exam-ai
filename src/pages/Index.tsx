import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Brain, Target, TrendingUp, Users, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-display font-bold">UniHack.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 academic-gradient bg-clip-text text-transparent">
            Universal University<br />Admissions Test Prep
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Master any entrance exam with personalized study plans, adaptive practice, and expert-curated content. 
            From UCAT to SAT, BMAT to STEP - we've got you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="px-8">Start Your Journey</Button>
            </Link>
            <Link to="/exam-picker">
              <Button variant="outline" size="lg" className="px-8">Explore Exams</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Why Choose UniHack.ai?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="question-card">
              <CardHeader>
                <Brain className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Adaptive Learning</CardTitle>
                <CardDescription>
                  Our AI-powered system adapts to your learning style and progress
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="question-card">
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Personalized Study Plans</CardTitle>
                <CardDescription>
                  Get custom study schedules based on your diagnostic results
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="question-card">
              <CardHeader>
                <TrendingUp className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Track your progress with detailed performance insights
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="question-card">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Expert Content</CardTitle>
                <CardDescription>
                  All questions created by experienced tutors and educators
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="question-card">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  GDPR compliant with top-tier data protection standards
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="question-card">
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Comprehensive Coverage</CardTitle>
                <CardDescription>
                  Support for all major university entrance examinations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-display font-bold">UniHack.ai</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 UniHack.ai. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;