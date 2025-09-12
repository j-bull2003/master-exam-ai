import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Check, Users, BookOpen, Calculator, FileText, Clock, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function GroupClasses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              <Users className="w-4 h-4 mr-2" />
              Small Group Excellence
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              SAT Group
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Mastery
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Join an elite small group of motivated students and receive expert instruction in all SAT sections from our top-rated coaches.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Hero */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-slate-800 dark:via-slate-750 dark:to-slate-800 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="text-5xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                  $30
                  <span className="text-2xl font-normal text-slate-600 dark:text-slate-300">/week</span>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-300">
                  Comprehensive SAT preparation in a supportive group setting
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <BookOpen className="w-6 h-6 text-primary" />
                  <span className="font-medium text-slate-900 dark:text-white">Reading</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <FileText className="w-6 h-6 text-primary" />
                  <span className="font-medium text-slate-900 dark:text-white">Writing</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
                  <Calculator className="w-6 h-6 text-primary" />
                  <span className="font-medium text-slate-900 dark:text-white">Math</span>
                </div>
              </div>
              
              <Link to="/auth/register">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Join Group Classes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-slate-900 dark:text-white mb-16">
            Why Choose Group Mastery?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Expert Instruction
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Learn from top SAT coaches with proven track records of helping students achieve their target scores.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Small Groups
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Maximum 8 students per group ensures personalized attention and optimal learning environment.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Comprehensive Coverage
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Complete preparation across all SAT sections: Evidence-Based Reading, Writing, and Math.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Flexible Scheduling
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Multiple time slots available to fit your schedule. Evening and weekend options available.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Proven Materials
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Access to curated practice materials, real SAT questions, and exclusive study resources.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <Check className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  Progress Tracking
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Regular assessments and detailed progress reports to monitor your improvement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-6 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-slate-900 dark:text-white mb-12">
            What's Included
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">2.5 hours of live instruction per week</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Small group sessions (max 8 students)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Expert instruction in Reading, Writing & Math</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Weekly practice tests and assessments</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Homework assignments and review sessions</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Access to exclusive study materials</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Progress tracking and detailed feedback</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-700 dark:text-slate-300">Test-taking strategies and time management</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6">
            Ready to Master the SAT?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Join our next group cohort and take your SAT preparation to the next level with expert guidance and peer support.
          </p>
          <Link to="/auth/register">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Enroll Now - $30/week
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}