import { useState, useEffect } from "react";
import { Users, Mic, MicOff, Video, VideoOff, MessageSquare, Hand, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import realistic AI avatars
import drMartinezAvatar from "@/assets/avatar-dr-martinez.jpg";
import alexAvatar from "@/assets/avatar-alex.jpg";
import mayaAvatar from "@/assets/avatar-maya.jpg";
import samAvatar from "@/assets/avatar-sam.jpg";
import emmaAvatar from "@/assets/avatar-emma.jpg";
import youAvatar from "@/assets/avatar-you.jpg";

const LiveZoomDemo = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  // Enhanced AI character data with realistic profiles and avatar images
  const participants = [
    { id: 1, name: "Dr. Martinez", role: "teacher", avatar: drMartinezAvatar, isTeacher: true, speaking: false, bg: "from-primary/30 to-primary/20" },
    { id: 2, name: "Alex Chen", role: "student", avatar: alexAvatar, isTeacher: false, speaking: false, bg: "from-blue-200/40 to-blue-100/30" },
    { id: 3, name: "Maya Patel", role: "student", avatar: mayaAvatar, isTeacher: false, speaking: true, bg: "from-green-200/40 to-green-100/30" },
    { id: 4, name: "Sam Johnson", role: "student", avatar: samAvatar, isTeacher: false, speaking: false, bg: "from-purple-200/40 to-purple-100/30" },
    { id: 5, name: "Emma Rodriguez", role: "student", avatar: emmaAvatar, isTeacher: false, speaking: false, bg: "from-pink-200/40 to-pink-100/30" },
    { id: 6, name: "You", role: "student", avatar: youAvatar, isTeacher: false, speaking: false, isYou: true, bg: "from-orange-200/40 to-orange-100/30" }
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
          <span className="font-semibold text-foreground">SAT Complete Mastery • Session 2/8</span>
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
            {/* Realistic AI avatar background with photo */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900/20 to-gray-800/20 flex items-center justify-center relative overflow-hidden">
              
              {/* Professional AI avatar photo */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                <img 
                  src={participant.avatar} 
                  alt={participant.name}
                  className={`w-full h-full object-cover ${participant.speaking ? 'animate-pulse scale-110' : ''} transition-all duration-300`}
                />
                {/* Realistic lighting overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
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
            <span className="font-medium text-primary">Dr. Martinez:</span>
            <span className="text-muted-foreground">Let's tackle this quadratic equation step by step. Who can identify the coefficients?</span>
          </div>
          {animationStage >= 1 && (
            <div className="flex items-start gap-2 animate-fade-in">
              <span className="font-medium text-foreground">Maya:</span>
              <span className="text-muted-foreground">I see a=2, b=-5, c=-3. Should we use the quadratic formula?</span>
            </div>
          )}
          {animationStage >= 3 && (
            <div className="flex items-start gap-2 animate-fade-in">
              <span className="font-medium text-foreground">Alex:</span>
              <span className="text-muted-foreground">Great catch Maya! That's exactly right 🎯</span>
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