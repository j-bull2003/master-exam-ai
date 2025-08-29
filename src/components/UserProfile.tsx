import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Mail, 
  Target, 
  GraduationCap, 
  Edit3, 
  Save, 
  X,
  Calendar,
  BookOpen,
  Award,
  University
} from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  exam_type?: string;
  exam_date?: string;
  created_at: string;
  updated_at: string;
}

interface UserProfileProps {
  className?: string;
}

export const UserProfile = ({ className = "" }: UserProfileProps) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    exam_type: "STEP",
    exam_date: "",
    target_score: "",
    study_goal: "",
    university_preferences: [] as string[]
  });
  const { toast } = useToast();

  // Exam configurations with proper university targets and scoring
  const examConfigs: { [key: string]: any } = {
    STEP: {
      fullName: "Sixth Term Examination Paper",
      universities: ["University of Cambridge", "University of Oxford", "Imperial College London"],
      targetUniversity: "University of Cambridge",
      maxScore: 100,
      targetScore: 85,
      studyGoal: "Get into Cambridge for Mathematics",
      scoringSystem: "Grade 1-3 (3 being highest)"
    },
    UCAT: {
      fullName: "University Clinical Aptitude Test", 
      universities: ["University of Oxford", "University of Cambridge", "Imperial College London", "King's College London"],
      targetUniversity: "University of Oxford",
      maxScore: 3600,
      targetScore: 2800,
      studyGoal: "Get into medical school at University of Oxford",
      scoringSystem: "Scale 1200-3600"
    },
    SAT: {
      fullName: "Scholastic Assessment Test",
      universities: ["Harvard University", "Stanford University", "MIT", "Yale University"],
      targetUniversity: "Harvard University", 
      maxScore: 1600,
      targetScore: 1520,
      studyGoal: "Get into Harvard University",
      scoringSystem: "Scale 400-1600"
    },
    ACT: {
      fullName: "American College Testing",
      universities: ["Harvard University", "Stanford University", "MIT", "Princeton University"],
      targetUniversity: "Stanford University",
      maxScore: 36,
      targetScore: 34,
      studyGoal: "Get into Stanford University",
      scoringSystem: "Scale 1-36"
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      console.log('Loaded profile data:', data);
      setProfile(data);
      
      // Get exam config for the user's exam type
      const examConfig = examConfigs[data.exam_type] || examConfigs.STEP;
      
      setEditForm({
        full_name: data.full_name || "",
        exam_type: data.exam_type || "STEP",
        exam_date: data.exam_date || "",
        target_score: examConfig.targetScore.toString(),
        study_goal: examConfig.studyGoal,
        university_preferences: examConfig.universities
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.full_name,
          exam_type: editForm.exam_type,
          exam_date: editForm.exam_date,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      // Refresh profile data
      await fetchProfile();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-muted rounded w-3/4"></div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <p>No profile data available</p>
        </CardContent>
      </Card>
    );
  }

  // Get current exam configuration
  const currentExamConfig = examConfigs[profile.exam_type || editForm.exam_type] || examConfigs.STEP;

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="card-layered">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                  {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{profile?.full_name || 'User'}</CardTitle>
                <CardDescription className="flex items-center space-x-2 mt-1">
                  <Mail className="h-4 w-4" />
                  <span>{profile?.email}</span>
                </CardDescription>
                <div className="flex items-center space-x-2 mt-1">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="font-medium">{profile?.exam_type || 'STEP'}</span>
                  <span className="text-muted-foreground">• {currentExamConfig.fullName}</span>
                </div>
              </div>
            </div>
            {!isEditing ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {!isEditing ? (
            <div className="space-y-6">
              {/* Exam Information */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Exam & Target University</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Exam Type</Label>
                    <p className="text-lg font-semibold">{profile?.exam_type || 'STEP'}</p>
                    <p className="text-sm text-muted-foreground">{currentExamConfig.fullName}</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Target University</Label>
                    <p className="text-lg font-semibold">{currentExamConfig.targetUniversity}</p>
                    <p className="text-sm text-muted-foreground">Primary goal institution</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Exam Date</Label>
                    <p className="text-lg font-semibold">
                      {profile?.exam_date 
                        ? new Date(profile.exam_date).toLocaleDateString('en-US', { 
                            month: 'long', day: 'numeric', year: 'numeric' 
                          })
                        : 'Not set'
                      }
                    </p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <Label className="text-sm font-medium text-muted-foreground">Target Score</Label>
                    <p className="text-lg font-semibold">{currentExamConfig.targetScore}</p>
                    <p className="text-sm text-muted-foreground">{currentExamConfig.scoringSystem}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* University Preferences */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <University className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">University Preferences</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentExamConfig.universities.map((uni: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant={index === 0 ? "default" : "secondary"}
                      className="text-sm py-1 px-3"
                    >
                      {uni}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Study goal: {currentExamConfig.studyGoal}
                </p>
              </div>

              <Separator />

              {/* Account Info */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Account Information</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Member since: {new Date(profile.created_at).toLocaleDateString()}</p>
                  <p>Last updated: {new Date(profile.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={editForm.full_name}
                    onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exam_type">Exam Type</Label>
                  <Select value={editForm.exam_type} onValueChange={(value) => setEditForm({...editForm, exam_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STEP">STEP - Cambridge Mathematics</SelectItem>
                      <SelectItem value="UCAT">UCAT - UK Medical Schools</SelectItem>
                      <SelectItem value="SAT">SAT - US Universities</SelectItem>
                      <SelectItem value="ACT">ACT - US Universities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exam_date">Exam Date</Label>
                  <Input
                    id="exam_date"
                    type="date"
                    value={editForm.exam_date}
                    onChange={(e) => setEditForm({...editForm, exam_date: e.target.value})}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};