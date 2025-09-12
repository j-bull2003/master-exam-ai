import { useState, useEffect } from "react";
import { Users, Mic, MicOff, Video, VideoOff, MessageSquare, Hand, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const LiveZoomDemo = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  // Simulated participants data
  const participants = [
    { id: 1, name: "Ms. Sarah", role: "teacher", avatar: "S", isTeacher: true, speaking: false },
    { id: 2, name: "Alex", role: "student", avatar: "A", isTeacher: false, speaking: false },
    { id: 3, name: "Jamie", role: "student", avatar: "J", isTeacher: false, speaking: true },
    { id: 4, name: "Sam", role: "student", avatar: "S", isTeacher: false, speaking: false },
    { id: 5, name: "Casey", role: "student", avatar: "C", isTeacher: false, speaking: false },
    { id: 6, name: "You", role: "student", avatar: "Y", isTeacher: false, speaking: false, isYou: true }
  ];

  // Animation cycle for demo effect
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStage((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card rounded-2xl border border-border/50 shadow-lg">
      {/* Mock Zoom Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/30">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <span className="font-semibold text-foreground">SAT Math Group Class</span>
          <span className="text-sm text-muted-foreground">• Live</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>6 participants</span>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {participants.map((participant, index) => (
          <div 
            key={participant.id}
            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              participant.speaking ? 'border-primary/60 shadow-lg shadow-primary/20' : 'border-border/30'
            } ${participant.isTeacher ? 'md:col-span-2' : ''}`}
          >
            {/* Mock video background */}
            <div className={`w-full h-full bg-gradient-to-br ${
              participant.isTeacher 
                ? 'from-primary/20 to-primary/10' 
                : 'from-accent/20 to-muted/20'
            } flex items-center justify-center relative`}>
              
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                participant.isTeacher ? 'bg-primary' : 'bg-accent'
              } ${participant.speaking ? 'animate-pulse' : ''}`}>
                {participant.avatar}
              </div>

              {/* Speaking indicator */}
              {participant.speaking && (
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center gap-1 bg-primary/80 text-white px-2 py-1 rounded text-xs">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Speaking
                  </div>
                </div>
              )}

              {/* Hand raised indicator */}
              {(participant.id === 2 && animationStage >= 2) && (
                <div className="absolute top-2 right-2">
                  <Hand className="w-5 h-5 text-primary animate-bounce" />
                </div>
              )}

              {/* Name overlay */}
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {participant.name}
                {participant.isTeacher && " (Teacher)"}
                {participant.isYou && " (You)"}
              </div>

              {/* Mute/Video indicators */}
              <div className="absolute top-2 left-2 flex gap-1">
                {isMuted && participant.isYou && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <MicOff className="w-3 h-3 text-white" />
                  </div>
                )}
                {isVideoOff && participant.isYou && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <VideoOff className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mock Chat Messages */}
      <div className="bg-muted/30 rounded-lg p-3 mb-4 max-h-24 overflow-hidden">
        <div className="space-y-1 text-sm">
          <div className="flex items-start gap-2">
            <span className="font-medium text-primary">Ms. Sarah:</span>
            <span className="text-muted-foreground">Let's work through this quadratic equation together</span>
          </div>
          {animationStage >= 1 && (
            <div className="flex items-start gap-2 animate-fade-in">
              <span className="font-medium text-foreground">Jamie:</span>
              <span className="text-muted-foreground">I think we need to factor first?</span>
            </div>
          )}
          {animationStage >= 3 && (
            <div className="flex items-start gap-2 animate-fade-in">
              <span className="font-medium text-foreground">Alex:</span>
              <span className="text-muted-foreground">Great explanation! 🎯</span>
            </div>
          )}
        </div>
      </div>

      {/* Mock Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant={isMuted ? "destructive" : "secondary"}
          size="sm"
          onClick={() => setIsMuted(!isMuted)}
          className="gap-2"
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isMuted ? "Unmute" : "Mute"}
        </Button>
        
        <Button
          variant={isVideoOff ? "destructive" : "secondary"}
          size="sm"
          onClick={() => setIsVideoOff(!isVideoOff)}
          className="gap-2"
        >
          {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          {isVideoOff ? "Start Video" : "Stop Video"}
        </Button>

        <Button
          variant={handRaised ? "default" : "secondary"}
          size="sm"
          onClick={() => setHandRaised(!handRaised)}
          className="gap-2"
        >
          <Hand className="w-4 h-4" />
          {handRaised ? "Lower Hand" : "Raise Hand"}
        </Button>

        <Button variant="secondary" size="sm" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Chat
        </Button>
      </div>

      {/* Interactive Demo Badge */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          Interactive Demo - Join live group classes like this
        </span>
      </div>
    </div>
  );
};

export default LiveZoomDemo;