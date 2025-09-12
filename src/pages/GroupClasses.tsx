import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlatformDemo } from "@/components/PlatformDemo";
import { Check, Users, BookOpen, Calculator, FileText, Clock, Award, Target, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import satReadingPassage from "@/assets/sat-reading-passage.png";
import satReadingRationale from "@/assets/sat-reading-rationale.png";

export default function GroupClasses() {
  const [showRationale, setShowRationale] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEnrollment = async () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Email Required",
        description: "Please enter a valid email address to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsEnrolling(true);

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { email }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      toast({
        title: "Enrollment Error",
        description: "There was an issue starting your enrollment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnrolling(false);
    }
  };
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
              Next Cohort Starts: October 13th, 2025
            </div>
            
            {/* Prestigious metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto px-4 mb-12">
              {[
                { number: "2", label: "Sessions Per Week" },
                { number: "$50", label: "Per Week Total" },
                { number: "Oct 13, 2025", label: "Cohort Starts" }
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
              Two focused sessions per week, each targeting specific SAT sections with expert guidance and interactive learning. Next cohort begins October 13th, 2025.
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
                  $50
                  <span className="text-xl font-normal text-slate-600">/week</span>
                </div>
              <p className="text-slate-600 font-light">
                Two 60-minute sessions • Reading & Writing + Mathematics
              </p>
              </div>
              
              <div className="grid md:grid-cols-1 gap-4 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-slate-50">
                  <Calendar className="w-5 h-5 text-slate-700" />
                  <span className="font-medium text-slate-900 text-sm">Starts October 13th, 2025</span>
                </div>
              </div>
              
              <div className="space-y-3 mb-8">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <button 
                      className="group w-full max-w-sm mx-auto bg-gradient-to-r from-slate-900 to-slate-800 text-white py-3 px-6 rounded-lg text-base font-semibold hover:from-slate-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative">
                        Enroll Now - $50/week
                      </span>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Enroll in SAT Group Classes</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-slate-600">
                        Enter your email to proceed to checkout for the weekly $50 subscription.
                      </p>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                      />
                      <Button 
                        onClick={handleEnrollment}
                        disabled={isEnrolling}
                        className="w-full"
                      >
                        {isEnrolling ? "Processing..." : "Continue to Checkout"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <button 
                  className="group w-full max-w-sm mx-auto border border-slate-300 text-slate-700 py-3 px-6 rounded-lg text-base font-semibold hover:border-slate-900 hover:text-slate-900 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                  onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="relative">See Live Demo Session</span>
                </button>
              </div>
              
              <p className="text-slate-600 font-light text-sm max-w-sm mx-auto">
                Experience our interactive teaching methodology firsthand
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Session Section */}
      <section id="demo-section" className="py-20 bg-gradient-to-br from-slate-100 to-slate-50 relative">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
              Experience Our
              <br />
              <span className="text-slate-600">Live Sessions</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
              Get a preview of our interactive group learning environment and expert instruction methodology.
            </p>
          </div>
          
          {/* Mock Zoom Interface */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-900 rounded-t-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-white text-sm font-medium">SAT Group Mastery - Reading & Writing Session</div>
                <div className="flex items-center gap-2 text-white text-xs">
                  <span className="bg-red-600 px-2 py-1 rounded">REC</span>
                  <span>45:23</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800 p-6 rounded-b-xl">
              {/* Video Grid - Loom Style */}
              <div className="relative">
                {/* Main Screen Share */}
                <div className="w-full relative">
                  <div className="aspect-video bg-white rounded-lg relative overflow-hidden border-2 border-slate-300">
                    {/* SAT Passage Display */}
                    <div className="absolute inset-0">
                      <img 
                        src={showRationale ? satReadingRationale : satReadingPassage}
                        alt="SAT Reading Passage"
                        className="w-full h-full object-contain bg-white"
                      />
                    </div>
                    
                    {/* Instructor Video Overlay - Bottom Right (Loom Style) */}
                    <div className="absolute bottom-4 right-4 w-32 h-24 bg-gradient-to-br from-blue-900 to-slate-800 rounded-lg border-2 border-white shadow-lg overflow-hidden">
                      {/* Instructor Avatar/Video */}
                      <div className="relative w-full h-full bg-gradient-to-br from-purple-600 to-blue-700 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span className="text-slate-700 font-bold text-sm">SJ</span>
                          </div>
                        </div>
                        {/* Speaking indicator */}
                        <div className="absolute bottom-1 left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-1 right-1 text-white text-xs font-medium">Sarah</div>
                      </div>
                    </div>
                    
                    {/* Screen share indicator */}
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      SHARING SCREEN
                    </div>
                    
                    {/* Interactive overlay for demo */}
                    <div className="absolute top-4 left-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setShowRationale(false)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            !showRationale 
                              ? "bg-blue-600 text-white" 
                              : "bg-white/80 text-slate-700 hover:bg-white"
                          }`}
                        >
                          Question
                        </button>
                        <button 
                          onClick={() => setShowRationale(true)}
                          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                            showRationale 
                              ? "bg-blue-600 text-white" 
                              : "bg-white/80 text-slate-700 hover:bg-white"
                          }`}
                        >
                          Explanation
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Student Avatar Strip */}
                <div className="mt-4 flex justify-center gap-3">
                  {[
                    { name: "Alex M.", color: "from-green-500 to-emerald-600", active: true },
                    { name: "Maria S.", color: "from-pink-500 to-rose-600", active: false },
                    { name: "David L.", color: "from-orange-500 to-amber-600", active: true },
                    { name: "Emma R.", color: "from-purple-500 to-violet-600", active: true },
                    { name: "Jake T.", color: "from-blue-500 to-cyan-600", active: false },
                    { name: "Zara K.", color: "from-indigo-500 to-blue-600", active: true }
                  ].map((student, idx) => (
                    <div key={idx} className="text-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${student.color} rounded-full flex items-center justify-center border-2 ${student.active ? 'border-green-400' : 'border-slate-300'} relative`}>
                        <span className="text-white font-bold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                        {student.active && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">{student.name.split(' ')[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Interactive Chat */}
              <div className="bg-slate-700 rounded-lg p-4 mb-4">
                <div className="text-white text-sm font-medium mb-3 border-b border-slate-600 pb-2 flex items-center justify-between">
                  <span>Live Discussion (Private to Group)</span>
                  <span className="text-xs text-slate-400">8 participants</span>
                </div>
                <div className="space-y-3 text-sm max-h-40 overflow-y-auto">
                  <div className="text-slate-300">
                    <span className="text-blue-400 font-medium">Sarah Johnson:</span> Let&apos;s analyze this passage about Mediterranean Sea biodiversity. What&apos;s the main focus here?
                  </div>
                  <div className="text-slate-300">
                    <span className="text-green-400 font-medium">Alex M:</span> It&apos;s comparing two different censuses and their results
                  </div>
                  <div className="text-slate-300">
                    <span className="text-blue-400 font-medium">Sarah Johnson:</span> Excellent! Now, what key difference do you notice between Coll&apos;s and Bianchi&apos;s studies?
                  </div>
                  <div className="text-slate-300">
                    <span className="text-purple-400 font-medium">Emma R:</span> Coll found almost double the species - around 17,000 vs the earlier count
                  </div>
                  <div className="text-slate-300">
                    <span className="text-blue-400 font-medium">Sarah Johnson:</span> Perfect! So what could explain this huge difference? Think about the blank we need to fill...
                  </div>
                  <div className="text-slate-300">
                    <span className="text-orange-400 font-medium">David L:</span> Maybe they counted differently? Like what they considered separate species?
                  </div>
                  <div className="text-slate-300 bg-slate-600 p-2 rounded">
                    <span className="text-blue-400 font-medium">Sarah Johnson:</span> 🎯 Brilliant thinking, David! That&apos;s exactly the key insight. Let me show you the explanation now...
                  </div>
                </div>
                
                {/* Answer choices from uploaded image */}
                {!showRationale && (
                  <div className="mt-4 p-3 bg-slate-600 rounded-lg">
                    <div className="text-white text-xs font-medium mb-2">Quick Poll: Which choice most logically completes the text?</div>
                    <div className="space-y-2">
                      {[
                        "A. Coll and colleagues reported a much higher number of species than Bianchi and Morri did largely due to the inclusion of invertebrate species that had not been described at the time of Bianchi and Morri's census.",
                        "B. some differences observed in microorganisms may have been treated as variations within species by Bianchi and Morri but treated as indicative of distinct species by Coll and colleagues.",
                        "C. Bianchi and Morri may have been less sensitive to the degree of morphological variation displayed within a typical species of microorganism than Coll and colleagues were.",
                        "D. the absence of clarity regarding how to differentiate among species of microorganisms may have resulted in Coll and colleagues underestimating the number of microorganism species."
                      ].map((choice, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedAnswer(choice.charAt(0))}
                          className={`w-full text-xs p-2 rounded transition-colors text-left ${
                            selectedAnswer === choice.charAt(0)
                              ? "bg-blue-600 text-white"
                              : "bg-slate-500 text-slate-200 hover:bg-slate-400"
                          }`}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                    
                    {/* Show poll results */}
                    {selectedAnswer && (
                      <div className="mt-3 text-xs text-slate-300">
                        <div className="flex justify-between items-center mb-1">
                          <span>Live Poll Results:</span>
                          <span>6/8 voted</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span>A: 1 vote (17%)</span>
                            <div className="w-16 bg-slate-700 rounded h-2">
                              <div className="w-1/6 bg-red-400 rounded h-2"></div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>B: 4 votes (67%)</span>
                            <div className="w-16 bg-slate-700 rounded h-2">
                              <div className="w-2/3 bg-green-400 rounded h-2"></div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>C: 1 vote (17%)</span>
                            <div className="w-16 bg-slate-700 rounded h-2">
                              <div className="w-1/6 bg-yellow-400 rounded h-2"></div>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span>D: 0 votes (0%)</span>
                            <div className="w-16 bg-slate-700 rounded h-2"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Control Bar */}
              <div className="flex items-center justify-center gap-4">
                <button className="w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                </button>
                <button className="w-12 h-12 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 6.707 6.293a1 1 0 00-1.414 1.414L8.586 11l-3.293 3.293a1 1 0 001.414 1.414L10 12.414l3.293 3.293a1 1 0 001.414-1.414L11.414 11l3.293-3.293z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Demo Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <h3 className="font-serif font-semibold text-slate-900 mb-2">Interactive Learning</h3>
                <p className="text-sm text-slate-600 font-light">Real-time engagement with instructor and peers</p>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <h3 className="font-serif font-semibold text-slate-900 mb-2">Screen Sharing</h3>
                <p className="text-sm text-slate-600 font-light">Live walkthrough of SAT problems and strategies</p>
              </CardContent>
            </Card>
            
            <Card className="border border-slate-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <h3 className="font-serif font-semibold text-slate-900 mb-2">Small Groups</h3>
                <p className="text-sm text-slate-600 font-light">Maximum 8 students for personalized attention</p>
              </CardContent>
            </Card>
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
                  <span className="relative">Enroll Now - $50/week</span>
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