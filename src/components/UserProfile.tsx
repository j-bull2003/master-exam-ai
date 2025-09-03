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
import { useAuth } from "@/contexts/AuthContext";
import { 
  User, 
  Mail, 
  Target, 
  GraduationCap, 
  Edit3, 
  Save, 
  X,
  Calendar,
  MapPin,
  Trophy,
  BookOpen
} from "lucide-react";

interface ProfileData {
  full_name: string;
  email: string;
  exam_type: string;
  exam_date: string | null;
}

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<ProfileData>({
    full_name: "",
    email: "",
    exam_type: "",
    exam_date: null
  });

  // Exam configurations
  const examConfig = {
    SAT: {
      university: "Harvard University",
      color: "#C8102E",
      studyGoal: "Achieve 1500+ for Ivy League admission",
      preferredUnis: ["Harvard", "Stanford", "MIT", "Yale"],
      scoringSystem: "1600 Point Scale",
      sections: ["Reading", "Writing & Language", "Math (No Calculator)", "Math (Calculator)"]
    },
    ACT: {
      university: "Stanford University", 
      color: "#8C1515",
      studyGoal: "Score 32+ for top-tier universities",
      preferredUnis: ["Stanford", "Northwestern", "University of Chicago", "Duke"],
      scoringSystem: "36 Point Scale",
      sections: ["English", "Math", "Reading", "Science"]
    },
    STEP: {
      university: "University of Cambridge",
      color: "#A3C1DA",
      studyGoal: "Achieve Grade S for Cambridge entry",
      preferredUnis: ["Cambridge", "Oxford"],
      scoringSystem: "Grades 1-S Scale",
      sections: ["STEP 2", "STEP 3", "Mathematics"]
    },
    UCAT: {
      university: "University of Oxford",
      color: "#002147",
      studyGoal: "Score 2700+ for medical school",
      preferredUnis: ["Oxford Medical", "Cambridge Medical", "Imperial"],
      scoringSystem: "3600 Point Scale", 
      sections: ["Verbal Reasoning", "Decision Making", "Quantitative Reasoning", "Abstract Reasoning"]
    }
  };

  useEffect(() => {
    if (user) {
      // Use Supabase user data
      const userMetadata = (user as any).user_metadata || {};
      const profileData: ProfileData = {
        full_name: userMetadata.full_name || userMetadata.first_name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        exam_type: 'SAT', // Default for now - you might want to store this in user profile
        exam_date: null // Default for now - you might want to store this in user profile
      };
      setProfile(profileData);
      setEditForm(profileData);
      setIsLoading(false);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      if (!user) return;

      // For now, we'll just update the local state
      // In a full implementation, you'd want to update the Django user model
      // or create a separate profile model in Django
      
      setProfile(editForm);
      setIsEditing(false);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditForm(profile);
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded" />
        <div className="h-48 bg-muted animate-pulse rounded" />
      </div>
    );
  }

  if (!profile) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Failed to load profile data</p>
        </CardContent>
      </Card>
    );
  }

  const currentExam = profile.exam_type as keyof typeof examConfig;
  const config = examConfig[currentExam] || examConfig.SAT;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account and exam preferences</p>
        </div>
        <Button
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="" alt={profile.full_name} />
              <AvatarFallback className="text-lg font-semibold">
                {profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <CardTitle className="text-2xl">{profile.full_name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {profile.email}
              </CardDescription>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="secondary" 
                  className="font-medium"
                  style={{ backgroundColor: `${config.color}20`, color: config.color }}
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  {profile.exam_type} Student
                </Badge>
                <Badge variant="outline" className="font-medium">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {config.university}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                <p className="font-medium">{profile.full_name}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                <p className="font-medium">{profile.email}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Exam Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Exam Information
          </CardTitle>
          <CardDescription>
            Your exam type and target goals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="examType">Exam Type</Label>
                <Select
                  value={editForm.exam_type}
                  onValueChange={(value) => setEditForm(prev => ({ ...prev, exam_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAT">SAT - Scholastic Assessment Test</SelectItem>
                    <SelectItem value="ACT">ACT - American College Testing</SelectItem>
                    <SelectItem value="STEP">STEP - Sixth Term Examination Paper</SelectItem>
                    <SelectItem value="UCAT">UCAT - University Clinical Aptitude Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examDate">Exam Date</Label>
                <Input
                  id="examDate"
                  type="date"
                  value={editForm.exam_date || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, exam_date: e.target.value }))}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Exam Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Current Exam</Label>
                  <div className="flex items-center gap-2">
                    <Badge 
                      style={{ backgroundColor: config.color, color: 'white' }}
                      className="font-medium"
                    >
                      {profile.exam_type}
                    </Badge>
                    <span className="font-medium">{config.scoringSystem}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Target University</Label>
                  <p className="font-medium">{config.university}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">Exam Date</Label>
                  <p className="font-medium">
                    {profile.exam_date ? new Date(profile.exam_date).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Study Goals */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Study Goals</Label>
                <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span className="font-medium">{config.studyGoal}</span>
                </div>
              </div>

              {/* Preferred Universities */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Preferred Universities</Label>
                <div className="flex flex-wrap gap-2">
                  {config.preferredUnis.map((uni) => (
                    <Badge key={uni} variant="outline" className="font-medium">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      {uni}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Exam Sections */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-muted-foreground">Exam Sections</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {config.sections.map((section) => (
                    <div key={section} className="p-2 bg-muted/50 rounded text-sm font-medium text-center">
                      {section}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isEditing && (
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;