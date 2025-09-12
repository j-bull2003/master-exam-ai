import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Check, Users, BookOpen, Calculator, FileText, Clock, Award, Target, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function GroupClasses() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-slate-900/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-rose-100/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-900/10 to-slate-700/10 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 mb-8 border border-slate-200/50">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3 animate-pulse"></div>
              Small Group Excellence
            </div>
            
            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl font-bold mb-6 leading-[0.9] text-slate-900 tracking-tight">
              SAT Group
              <br />
              <span className="bg-gradient-to-r from-slate-600 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                Mastery
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light px-4">
              Join an elite small group of motivated students for expert instruction in 
              <em className="font-serif text-slate-800"> Reading & Writing </em> and 
              <em className="font-serif text-slate-800"> Mathematics</em>
            </p>
            
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 rounded-full text-sm font-medium mb-8 border border-emerald-200/50">
              <Calendar className="w-4 h-4 mr-2" />
              Next Cohort Starts: October 13th, 2024
            </div>
            
            {/* Prestigious metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto px-4 mb-12">
              {[
                { number: "2", label: "Sessions Per Week" },
                { number: "$30", label: "Per Week Total" },
                { number: "8", label: "Max Students" }
              ].map((metric, idx) => (
                <div key={idx} className="text-center group flex flex-col items-center">
                  <div className="text-xl sm:text-3xl font-bold text-slate-900 mb-2 font-serif group-hover:scale-110 transition-transform duration-300 h-8 sm:h-12 flex items-center justify-center">{metric.number}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium tracking-wide uppercase min-h-[2rem] flex items-center text-center">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Session Structure Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              Weekly Session
              <br />
              <span className="text-slate-600">Structure</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Two focused sessions per week, each targeting specific SAT sections with expert guidance and interactive learning. Next cohort begins October 13th.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Reading & Writing Session */}
            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      Reading & Writing
                    </h3>
                    <p className="text-slate-600 text-sm">Session 1 • 60 minutes</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Evidence-Based Reading comprehension strategies</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Writing & Language grammar mastery</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Passage analysis and critical thinking</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Interactive practice with real SAT passages</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Time management techniques</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mathematics Session */}
            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center shadow-lg">
                    <Calculator className="w-6 h-6 text-slate-700" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-slate-900">
                      Mathematics
                    </h3>
                    <p className="text-slate-600 text-sm">Session 2 • 60 minutes</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Algebra & Advanced Math concepts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Problem-solving strategies & shortcuts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Geometry, trigonometry, and data analysis</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Calculator and no-calculator sections</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-emerald-600 mt-1 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">Practice with official SAT math problems</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/50 overflow-hidden relative">
            {/* Premium badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                Small Groups Only
              </div>
            </div>
            
            <div className="p-8 sm:p-12 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-6 h-6 text-slate-700" />
              </div>
              
              <h3 className="font-serif text-2xl sm:text-4xl font-bold mb-4 text-slate-900">SAT Group Mastery</h3>
              <p className="text-base text-slate-600 mb-6 max-w-xl mx-auto font-light">
                Comprehensive SAT preparation with expert instruction in small group setting
              </p>
              
              <div className="mb-6">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 mb-2">
                  $30
                  <span className="text-xl font-normal text-slate-600">/week</span>
                </div>
              <p className="text-slate-600 font-light">
                Two 60-minute sessions • Reading & Writing + Mathematics
              </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-slate-50">
                  <Calendar className="w-5 h-5 text-slate-700" />
                  <span className="font-medium text-slate-900 text-sm">Starts Oct 13th</span>
                </div>
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-slate-50">
                  <Users className="w-5 h-5 text-slate-700" />
                  <span className="font-medium text-slate-900 text-sm">Max 8 Students</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <Link to="/auth/register">
                  <button className="group w-full max-w-sm mx-auto bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-6 rounded-lg text-base font-semibold hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative">Join Group Classes</span>
                  </button>
                </Link>
                
                <button className="group w-full max-w-sm mx-auto border border-slate-300 text-slate-700 py-3 px-6 rounded-lg text-base font-semibold hover:border-slate-900 hover:text-slate-900 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                  <span className="relative">Watch Demo Session</span>
                </button>
              </div>
              
              <p className="text-slate-600 font-light text-sm max-w-sm mx-auto">
                Join our free demo session to experience our teaching methodology
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center text-slate-900 mb-6 leading-tight">
            Why Choose
            <br />
            <span className="text-slate-600">Group Mastery?</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed px-4 text-center mb-16">
            Experience the perfect balance of personalized attention and collaborative learning in our expertly designed small group environment.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <Award className="w-12 h-12 text-slate-700 mb-4" />
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">
                  Expert Instruction
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Learn from top SAT coaches with proven track records of helping students achieve their target scores.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-slate-700 mb-4" />
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">
                  Intimate Groups
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Maximum 8 students per group ensures personalized attention and optimal learning environment for each student.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-slate-700 mb-4" />
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">
                  Comprehensive Coverage
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Complete preparation across all SAT sections with dedicated sessions for optimal focus and mastery.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-slate-700 mb-4" />
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">
                  Flexible Scheduling
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Multiple time slots available to fit your schedule. Evening and weekend options for maximum convenience.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <BookOpen className="w-12 h-12 text-slate-700 mb-4" />
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">
                  Proven Materials
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Access to curated practice materials, real SAT questions, and exclusive study resources.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <Check className="w-12 h-12 text-slate-700 mb-4" />
                <h3 className="text-xl font-serif font-semibold text-slate-900 mb-3">
                  Progress Tracking
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Regular assessments and detailed progress reports to monitor your improvement and adjust strategies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white relative">
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-center text-slate-900 mb-6">
            Complete Program
            <br />
            <span className="text-slate-600">Inclusions</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light px-4 text-center mb-12 leading-relaxed">
            Every aspect of your SAT preparation is meticulously planned and executed to ensure optimal results.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 mb-1">Weekly Session Structure</h4>
                  <span className="text-slate-700 font-light">Two 60-minute sessions per week with expert instructors</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 mb-1">Small Group Environment</h4>
                  <span className="text-slate-700 font-light">Maximum 8 students for personalized attention and interaction</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 mb-1">Comprehensive Coverage</h4>
                  <span className="text-slate-700 font-light">Dedicated sessions for Reading & Writing and Mathematics</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 mb-1">Weekly Assessments</h4>
                  <span className="text-slate-700 font-light">Regular practice tests and performance evaluations</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 mb-1">Strategic Homework</h4>
                  <span className="text-slate-700 font-light">Targeted assignments and comprehensive review sessions</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 mb-1">Exclusive Resources</h4>
                  <span className="text-slate-700 font-light">Access to curated study materials and practice tests</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 mb-1">Progress Analytics</h4>
                  <span className="text-slate-700 font-light">Detailed tracking and personalized feedback reports</span>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-slate-900 mb-1">Test Strategies</h4>
                  <span className="text-slate-700 font-light">Advanced techniques for time management and problem-solving</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-white leading-tight">
              Master the SAT
              <br />
              <span className="text-slate-300">Together</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 sm:mb-16 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Join our next group cohort and experience the power of collaborative learning with expert guidance.
            </p>
            
            <div className="flex justify-center mb-12 sm:mb-16 px-4">
              <Link to="/auth/register" className="w-full max-w-sm">
                <button className="group w-full px-8 sm:px-16 py-4 sm:py-6 bg-white text-slate-900 rounded-2xl text-lg sm:text-xl font-semibold hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative">Enroll Now - $30/week</span>
                </button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-slate-400 px-4">
              {[
                { icon: Users, text: "Small Groups" },
                { icon: Target, text: "Expert Coaching" },
                { icon: Check, text: "Proven Results" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3 group hover:text-slate-300 transition-colors duration-300">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium tracking-wide text-sm sm:text-base">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}