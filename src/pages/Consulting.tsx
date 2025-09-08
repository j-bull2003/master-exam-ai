import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { 
  Users, 
  Calendar, 
  Target, 
  Star,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Award
} from "lucide-react";

const SATPrograms = () => {
  const scrollToSuccessStories = () => {
    const element = document.getElementById('success-stories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const program = {
    title: "1:1 SAT Booster Program",
    description: "Complete SAT mastery with dedicated expert guidance and guaranteed results",
    icon: Target,
    features: [
      "20 personalized 1-on-1 sessions with SAT expert",
      "Customized study plan based on diagnostic assessment",
      "24/7 support for instant help",
      "Target score guarantee or 100% money back",
      "Detailed takeaway feedback after every session",
      "Weekly homework assignments & progress tracking",
      "Practice test analysis & strategy refinement"
    ],
    duration: "12-16 weeks",
    price: "$2,499",
    originalPrice: "$4,999",
    badge: "Limited Time Offer",
    guarantee: "Target Score Guarantee or Money Back"
  };

  const successStories = [
    {
      name: "Sarah Chen",
      before: "1240",
      after: "1580",
      improvement: "+340",
      college: "Stanford University",
      quote: "The personalized approach helped me identify my weak areas and turn them into strengths. I couldn't have achieved my dream score without this program.",
      program: "1:1 Tutoring"
    },
    {
      name: "Marcus Williams", 
      before: "1180",
      after: "1520",
      improvement: "+340",
      college: "MIT",
      quote: "The group program was perfect - I learned from my peers while getting expert guidance. The collaborative environment kept me motivated throughout.",
      program: "Group Program"
    },
    {
      name: "Priya Patel",
      before: "1300",
      after: "1560",
      improvement: "+260", 
      college: "Harvard University",
      quote: "Beyond just SAT prep, the admissions guidance helped me craft a compelling application that stood out. The comprehensive support made all the difference.",
      program: "Premium Package"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-32 relative overflow-hidden">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-slate-900/5"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-rose-100/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-8 relative">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-900/10 to-slate-700/10 backdrop-blur-sm rounded-full text-sm font-medium text-slate-700 mb-12 border border-slate-200/50">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-3 animate-pulse"></div>
              Exclusive SAT Mastery Program
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl font-bold mb-8 leading-[0.9] text-slate-900 tracking-tight">
              Elite SAT
              <br />
              <span className="bg-gradient-to-r from-slate-600 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                Coaching
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-600 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Transform your SAT performance with our 
              <em className="font-serif text-slate-800"> bespoke </em>
              1:1 coaching program. Where excellence meets personalization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
              <a href="https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-etonstone" target="_blank" rel="noopener noreferrer">
                <button className="group px-12 py-5 bg-slate-900 text-white rounded-xl text-lg font-semibold hover:bg-slate-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative">Reserve Your Consultation</span>
                </button>
              </a>
              <button 
                className="px-12 py-5 border-2 border-slate-300 text-slate-700 rounded-xl text-lg font-semibold hover:border-slate-900 hover:text-slate-900 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                onClick={scrollToSuccessStories}
              >
                Explore Success Stories
              </button>
            </div>

            {/* Prestigious metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-4xl mx-auto">
              {[
                { number: "500+", label: "Elite Students Coached" },
                { number: "1580", label: "Average Achievement" },
                { number: "98%", label: "Success Rate" },
                { number: "+340", label: "Average Improvement" }
              ].map((metric, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-4xl font-bold text-slate-900 mb-3 font-serif group-hover:scale-110 transition-transform duration-300">{metric.number}</div>
                  <div className="text-sm text-slate-600 font-medium tracking-wide uppercase">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 text-slate-900 leading-tight">
                The SAT Booster
                <br />
                <span className="text-slate-600">Experience</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                Our flagship program represents the pinnacle of personalized SAT preparation. 
                Meticulously crafted for the discerning student who accepts nothing less than excellence.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden relative">
              {/* Premium badge */}
              <div className="absolute top-8 right-8 z-10">
                <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg">
                  Limited Availability
                </div>
              </div>
              
              {/* Elegant divider */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              
              <div className="p-16 text-center border-b border-slate-100/50">
                <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Target className="w-12 h-12 text-slate-700" />
                </div>
                
                <h3 className="font-serif text-4xl font-bold mb-6 text-slate-900">{program.title}</h3>
                <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                  {program.description}
                </p>
                
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="text-center">
                    <span className="font-serif text-6xl font-bold text-slate-900">{program.price}</span>
                    <div className="text-slate-500 mt-2">Investment</div>
                  </div>
                  <div className="text-left">
                    <div className="text-2xl text-slate-400 line-through font-light">{program.originalPrice}</div>
                    <div className="text-sm text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full inline-block">
                      Limited Time: 50% Savings
                    </div>
                  </div>
                </div>
                
                <div className="text-slate-600 mb-6 font-medium">{program.duration} Intensive Program</div>
                <div className="inline-block bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-800 px-8 py-4 rounded-2xl font-semibold border border-emerald-200/50 shadow-sm">
                  {program.guarantee}
                </div>
              </div>

              <div className="p-16">
                <h4 className="font-serif text-2xl font-bold mb-12 text-center text-slate-900">
                  Your Exclusive Benefits
                </h4>
                
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                  {program.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-6 group">
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-slate-700 text-lg font-medium leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center space-y-6">
                  <a href="https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-etonstone" target="_blank" rel="noopener noreferrer" className="block">
                    <button className="group w-full max-w-lg mx-auto bg-gradient-to-r from-slate-900 to-slate-800 text-white py-6 px-10 rounded-2xl text-xl font-semibold hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative">Begin Your Transformation</span>
                    </button>
                  </a>
                  <p className="text-slate-600 font-light max-w-md mx-auto">
                    Start with a complimentary strategic consultation to design your personalized roadmap to SAT excellence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-32 bg-gradient-to-br from-slate-50 to-white relative">
        <div className="container mx-auto px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 text-slate-900">
                Extraordinary
                <br />
                <span className="text-slate-600">Achievements</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light">
                Witness the transformative journeys of our distinguished students who have 
                achieved their dreams through our elite coaching program.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">{story.name}</h3>
                      <p className="text-sm text-slate-600 font-medium">{story.college}</p>
                    </div>
                    <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase">
                      {story.program}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 py-8 bg-gradient-to-r from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100 mb-8 group-hover:from-slate-100 group-hover:to-slate-50 transition-all duration-500">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-500 font-serif">{story.before}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">Before</div>
                    </div>
                    <ArrowRight className="w-8 h-8 text-slate-400 group-hover:text-slate-600 transition-colors duration-300" />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 font-serif">{story.after}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide mt-1">After</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-700 font-serif">{story.improvement}</div>
                      <div className="text-xs text-emerald-600 uppercase tracking-wide mt-1">Growth</div>
                    </div>
                  </div>

                  <blockquote className="text-slate-700 italic leading-relaxed font-light text-lg">
                    "{story.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Elegant CTA Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>
        <div className="container mx-auto px-8 relative">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
              Your Excellence
              <br />
              <span className="text-slate-300">Awaits</span>
            </h2>
            <p className="text-2xl text-slate-300 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
              Reserve your place in our exclusive program and begin your journey toward SAT mastery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-16">
              <a href="https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-etonstone" target="_blank" rel="noopener noreferrer">
                <button className="group px-16 py-6 bg-white text-slate-900 rounded-2xl text-xl font-semibold hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span className="relative">Schedule Private Consultation</span>
                </button>
              </a>
              <Link to="/pricing">
                <button className="px-16 py-6 border-2 border-slate-400 text-slate-300 rounded-2xl text-xl font-semibold hover:border-white hover:text-white transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
                  Investment Details
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-12 text-slate-400">
              {[
                { icon: Award, text: "Elite Coaching" },
                { icon: Target, text: "Guaranteed Results" },
                { icon: CheckCircle, text: "Proven Excellence" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group hover:text-slate-300 transition-colors duration-300">
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium tracking-wide">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SATPrograms;