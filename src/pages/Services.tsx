import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Star, Trophy, Users, Clock, Target, Sparkles } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Services = () => {
  const services = [
    {
      name: "SAT Platform Access",
      price: "$149",
      period: "/month",
      description: "Comprehensive AI-powered SAT preparation platform with personalized learning",
      popular: false,
      features: [
        "AI-powered personalized study plans",
        "8,500+ expert-crafted SAT questions", 
        "Real-time weakness detection",
        "Adaptive learning algorithms",
        "Full-length practice tests",
        "Detailed performance analytics",
        "Mobile and desktop access",
        "Progress tracking dashboard"
      ],
      cta: "Start 3-Day Free Trial",
      badge: "Most Popular"
    },
    {
      name: "Platform + Live Group Classes",
      price: "$269",
      period: "/month",
      description: "Complete SAT preparation with platform access plus weekly group classes",
      popular: true,
      features: [
        "Everything in Platform Access",
        "2 hours weekly live group classes",
        "1 hour Math + 1 hour English/Reading",
        "Expert SAT instructors",
        "Interactive group discussions",
        "Weekly homework assignments",
        "Group study sessions",
        "Peer learning community"
      ],
      cta: "Start Free Trial + Classes",
      badge: "Best Value"
    },
    {
      name: "Elite 1-on-1 SAT Program",
      price: "$3,000",
      period: "20 sessions",
      description: "Premium personalized coaching with dedicated SAT expert tutors",
      popular: false,
      features: [
        "Everything in Platform Access",
        "20 one-on-one tutoring sessions",
        "Dedicated SAT expert tutor",
        "Customized study strategy",
        "Flexible scheduling 7 days/week",
        "Real-time strategy adjustments",
        "Mock exam review sessions",
        "College application guidance",
        "Average 250+ point improvements",
        "Priority platform support"
      ],
      cta: "Schedule Consultation",
      badge: "Elite Results"
    }
  ];

  const successStories = [
    {
      name: "Jennifer Liu",
      score: "1590",
      improvement: "+290 points",
      university: "Harvard",
      service: "Elite 1-on-1",
      quote: "The personalized attention made all the difference. My tutor identified exactly what I needed to work on."
    },
    {
      name: "Marcus Johnson", 
      score: "1560",
      improvement: "+200 points",
      university: "Stanford",
      service: "Platform + Classes",
      quote: "The combination of platform AI and group classes was perfect. Never felt more confident on test day."
    },
    {
      name: "Elena Rodriguez",
      score: "1590",
      improvement: "+280 points",
      university: "Harvard",
      service: "Platform Access",
      quote: "The AI platform alone gave me incredible results. The personalized study plan was spot-on."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Header />
      <AnimatedBackground className="opacity-80" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-transparent to-slate-900/5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900/10 to-slate-700/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium mb-6 border border-slate-200/50">
              <Trophy className="w-4 h-4 text-slate-700" />
              <span className="text-slate-700 font-semibold">Premium SAT Services</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
              <span className="text-slate-900">Choose Your</span>{" "}
              <span className="bg-gradient-to-r from-slate-600 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                SAT Success Path
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto font-light">
              From AI-powered self-study to elite 1-on-1 coaching, we have the perfect solution 
              to help you achieve your target SAT score.
            </p>
          </div>
        </div>
      </section>

      {/* Services Pricing */}
      <section className="py-16 bg-gradient-to-r from-slate-50/50 via-white to-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 font-display">
              Our SAT Preparation Services
            </h2>
            <p className="text-slate-600 font-light">Choose the level of support that matches your goals</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`relative p-8 rounded-3xl border transition-all duration-300 hover:scale-105 ${
                  service.popular 
                    ? 'bg-white/90 backdrop-blur-sm border-slate-200/50 shadow-xl lg:scale-105'
                    : 'bg-white/80 backdrop-blur-sm border-slate-200/50 hover:border-slate-300/50 shadow-lg'
                }`}
              >
                {service.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {service.badge}
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 text-slate-900 font-display">{service.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-black text-slate-900 font-display">{service.price}</span>
                    <span className="text-slate-600">{service.period}</span>
                  </div>
                  <p className="text-sm text-slate-600 font-light">{service.description}</p>
                </div>

                <div className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth/register" className="block">
                  <Button 
                    className={`w-full ${
                      service.popular 
                        ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-700 hover:scale-105' 
                        : 'border-slate-300 text-slate-700 hover:border-slate-900 hover:text-slate-900'
                    }`}
                    variant={service.popular ? "default" : "outline"}
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories by Service */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 font-display">
              Success Stories from Each Service
            </h2>
            <p className="text-slate-600 font-light">Real students, real results across all our offerings</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {successStories.map((story, index) => (
              <div key={index} className="p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-slate-200/50 hover:border-slate-300/50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                      <span className="text-slate-700 font-bold">{story.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{story.name}</div>
                      <div className="text-sm text-slate-600">{story.university}</div>
                    </div>
                  </div>
                  <div className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
                    {story.service}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-3xl font-black text-slate-900 mb-1 font-display">{story.score}</div>
                  <div className="text-emerald-700 font-semibold">{story.improvement}</div>
                </div>
                
                <p className="text-slate-700 italic font-light">"{story.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 font-display">
                Why Students Choose Our SAT Services
              </h2>
              <p className="text-slate-600 font-light">Proven methodology, expert instruction, and guaranteed results</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Target className="w-8 h-8 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 font-display">Personalized Approach</h3>
                <p className="text-slate-600 font-light">Every service is tailored to your unique learning style and target score goals.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Users className="w-8 h-8 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 font-display">Expert Instructors</h3>
                <p className="text-slate-600 font-light">Learn from verified top SAT scorers and experienced educators.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-900 font-display">Proven Results</h3>
                <p className="text-slate-600 font-light">Average score improvements of 200+ points across all service levels.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)]"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-display">
              Ready to Achieve Your Target SAT Score?
            </h2>
            <p className="text-slate-300 mb-8 text-lg font-light">
              Join thousands of students who've achieved their dream scores with our proven SAT preparation services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button className="bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all duration-300 shadow-xl px-8">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="border-slate-300 text-slate-300 hover:bg-slate-300/10 px-8">
                Compare All Services
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;