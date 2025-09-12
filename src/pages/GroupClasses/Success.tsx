import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Calendar, Users, Clock } from "lucide-react";
import { Header } from "@/components/Header";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const GroupClassesSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <AnimatedBackground />
      <Header />
      
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
              Welcome to SAT Group Mastery!
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Your enrollment is confirmed! Get ready for an incredible SAT preparation journey 
              with expert instruction and personalized attention.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Program Starts</h3>
                <p className="text-muted-foreground">October 13th, 2024</p>
                <p className="text-sm text-muted-foreground mt-1">Check your email for session times</p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Your Group</h3>
                <p className="text-muted-foreground">Maximum 6 students</p>
                <p className="text-sm text-muted-foreground mt-1">Personalized attention guaranteed</p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center shadow-lg">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Weekly Sessions</h3>
                <p className="text-muted-foreground">4 sessions per week</p>
                <p className="text-sm text-muted-foreground mt-1">2 Reading/Writing + 2 Math</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-12 border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold">Check Your Email</h3>
                    <p className="text-muted-foreground">You'll receive detailed information about your session schedule, Zoom links, and preparation materials within 24 hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold">Initial Assessment</h3>
                    <p className="text-muted-foreground">Complete a diagnostic test before your first session to help us personalize your learning experience.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold">Join Your First Session</h3>
                    <p className="text-muted-foreground">Meet your instructor and fellow students in your first interactive group session on October 13th.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Questions? Contact us at <a href="mailto:support@satprep.com" className="text-blue-600 hover:text-blue-700 underline">support@satprep.com</a>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/dashboard" 
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Go to Dashboard
                </Link>
                <Link 
                  to="/" 
                  className="px-8 py-3 border border-border rounded-lg font-semibold hover:bg-muted transition-colors"
                >
                  Return Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GroupClassesSuccess;