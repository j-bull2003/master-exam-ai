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
      "24/7 support via WhatsApp for instant help",
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
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700 mb-8">
              Premium SAT Preparation
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight text-slate-900">
              Elite SAT Program
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Achieve your target SAT score with our comprehensive 1:1 coaching program. 
              Personalized instruction, guaranteed results, and expert guidance every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a href="https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-etonstone" target="_blank" rel="noopener noreferrer">
                <button className="px-8 py-4 bg-slate-900 text-white rounded-lg text-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg">
                  Schedule Consultation
                </button>
              </a>
              <button 
                className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-lg text-lg font-semibold hover:bg-slate-900 hover:text-white transition-colors"
                onClick={scrollToSuccessStories}
              >
                View Success Stories
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">500+</div>
                <div className="text-sm text-slate-600">Students Coached</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">1580</div>
                <div className="text-sm text-slate-600">Average Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">98%</div>
                <div className="text-sm text-slate-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900 mb-2">+340</div>
                <div className="text-sm text-slate-600">Avg Improvement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                SAT Booster Program
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our flagship 1:1 coaching program designed to maximize your SAT performance with personalized instruction and guaranteed results.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="relative">
                <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Limited Time: 50% Off
                </div>
                
                <div className="p-12 text-center border-b border-slate-100">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-10 h-10 text-slate-700" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-slate-900">{program.title}</h3>
                  <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">{program.description}</p>
                  
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <span className="text-5xl font-bold text-slate-900">{program.price}</span>
                    <div className="text-left">
                      <div className="text-xl text-slate-400 line-through">{program.originalPrice}</div>
                      <div className="text-sm text-red-600 font-semibold">Save $2,500</div>
                    </div>
                  </div>
                  <div className="text-slate-600 mb-4">{program.duration}</div>
                  <div className="inline-block bg-green-50 text-green-700 px-6 py-3 rounded-full font-semibold border border-green-200">
                    {program.guarantee}
                  </div>
                </div>

                <div className="p-12">
                  <h4 className="text-xl font-bold mb-8 text-center text-slate-900">What's Included</h4>
                  <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <span className="text-slate-700 text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-center space-y-4">
                    <a href="https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-etonstone" target="_blank" rel="noopener noreferrer" className="block">
                      <button className="w-full max-w-md mx-auto bg-slate-900 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-slate-800 transition-colors shadow-lg">
                        Schedule Free Strategy Session
                      </button>
                    </a>
                    <p className="text-slate-600">
                      Start with a complimentary 30-minute consultation to assess your needs and create your personalized SAT roadmap
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                Student Success Stories
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Real students, real results. See how our SAT program has helped students achieve their dream scores and gain admission to top universities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{story.name}</h3>
                      <p className="text-sm text-slate-600">{story.college}</p>
                    </div>
                    <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">{story.program}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4 py-6 bg-slate-50 rounded-xl border border-slate-100 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-600">{story.before}</div>
                      <div className="text-xs text-slate-500">Before</div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-slate-400" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">{story.after}</div>
                      <div className="text-xs text-slate-500">After</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{story.improvement}</div>
                      <div className="text-xs text-slate-500">Improvement</div>
                    </div>
                  </div>

                  <blockquote className="text-slate-700 italic leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Achieve Your Target SAT Score?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your SAT goals and learn how our program can help you succeed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a href="https://calendly.com/admin-etonstone/elite-university-admissions-strategy-call-etonstone" target="_blank" rel="noopener noreferrer">
                <button className="px-12 py-4 bg-white text-slate-900 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-colors shadow-lg">
                  Schedule Consultation
                </button>
              </a>
              <Link to="/pricing">
                <button className="px-12 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors">
                  View Pricing
                </button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Expert SAT Coaches</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Score Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SATPrograms;