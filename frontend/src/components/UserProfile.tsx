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
    exam_type: "UCAT",
    target_score: "",
    study_goal: "",
    university_preferences: [] as string[]
  });
  const { toast } = useToast();

  // Mock data for demo (replace with actual Supabase data)
  const mockProfile = {
    id: "1",
    user_id: "1",
    full_name: "Alex Johnson", 
    email: "alex.johnson@example.com",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    exam_type: "UCAT",
    target_score: 2800,
    study_goal: "Get into medical school at University of Oxford",
    university_preferences: ["University of Oxford", "University of Cambridge", "Imperial College London"]
  };

  useEffect(() => {
    // TODO: Replace with actual Supabase query
    // fetchProfile();
    
    // For now, use mock data
    setTimeout(() => {
      setProfile(mockProfile);
      setEditForm({
        full_name: mockProfile.full_name,
        exam_type: mockProfile.exam_type,
        target_score: mockProfile.target_score.toString(),
        study_goal: mockProfile.study_goal,
        university_preferences: mockProfile.university_preferences
      });
      setIsLoading(false);
    }, 500);
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
      setProfile(data);
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
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error", 
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (isLoading) {
    return (
      <Card className={`card-layered ${className}`}>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              <div className="h-4 w-48 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className={`card-layered ${className}`}>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <User className="w-8 h-8 mx-auto mb-2" />
            <p>No profile data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`card-layered ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Profile
          </CardTitle>
          {!isEditing ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
              className="gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16 border-2 border-primary/20">
            <AvatarImage src="" alt={profile.full_name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
              {getInitials(profile.full_name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-1">
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={editForm.full_name}
                  onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                  className="max-w-xs"
                />
              </div>
            ) : (
              <>
                <h3 className="text-xl font-semibold">{profile.full_name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{profile.email}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <Separator />

        {/* Study Information */}
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            Study Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Exam Type</Label>
              {isEditing ? (
                <Select value={editForm.exam_type} onValueChange={(value) => setEditForm({ ...editForm, exam_type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UCAT">UCAT</SelectItem>
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                    <SelectItem value="STEP">STEP</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge variant="secondary" className="w-fit">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {editForm.exam_type}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label>Target Score</Label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editForm.target_score}
                  onChange={(e) => setEditForm({ ...editForm, target_score: e.target.value })}
                  placeholder="e.g., 2800"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-success" />
                  <span className="font-medium">{editForm.target_score || "Not set"}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Study Goal</Label>
            {isEditing ? (
              <Textarea
                value={editForm.study_goal}
                onChange={(e) => setEditForm({ ...editForm, study_goal: e.target.value })}
                placeholder="Describe your study goals..."
                rows={3}
              />
            ) : (
              <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg">
                {editForm.study_goal || "No study goal set"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <University className="w-4 h-4" />
              University Preferences
            </Label>
            <div className="flex flex-wrap gap-2">
              {editForm.university_preferences.map((uni, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {uni}
                </Badge>
              ))}
              {editForm.university_preferences.length === 0 && (
                <span className="text-sm text-muted-foreground">No preferences set</span>
              )}
            </div>
          </div>
        </div>

        <Separator />

        {/* Account Information */}
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Account Information
          </h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Member since: {new Date(profile.created_at).toLocaleDateString()}</p>
            <p>Last updated: {new Date(profile.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};