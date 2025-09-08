import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
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
  Settings
} from "lucide-react";

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { profileData, isLoading, updateProfile } = useUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    email: "",
    exam_type: "",
    exam_date: null as string | null,
    target_university: ""
  });

  useEffect(() => {
    if (profileData) {
      setEditForm({
        full_name: profileData.full_name,
        email: profileData.email,
        exam_type: profileData.exam_type,
        exam_date: profileData.exam_date,
        target_university: profileData.target_university
      });
    }
  }, [profileData]);

  const handleSave = async () => {
    try {
      if (!user) return;
      
      updateProfile(editForm);
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
    if (profileData) {
      setEditForm({
        full_name: profileData.full_name,
        email: profileData.email,
        exam_type: profileData.exam_type,
        exam_date: profileData.exam_date,
        target_university: profileData.target_university
      });
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

  if (!profileData) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Failed to load profile data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Overview Card */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200 hover:shadow-lg transition-all">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={profileData.full_name} />
                <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                  {profileData.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle className="text-2xl">{profileData.full_name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {profileData.email}
                </CardDescription>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-medium bg-blue-100 text-blue-700 border-blue-300">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {profileData.exam_type} Student
                  </Badge>
                  <Badge variant="outline" className="font-medium">
                    <GraduationCap className="w-3 h-3 mr-1" />
                    {profileData.target_university}
                  </Badge>
                </div>
              </div>
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
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
          <CardDescription>Your basic account details</CardDescription>
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
                <p className="font-medium">{profileData.full_name}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                <p className="font-medium">{profileData.email}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Study Preferences */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Target className="w-5 h-5" />
            Study Preferences
          </CardTitle>
          <CardDescription>Your exam type and study goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <SelectItem value="SAT">SAT</SelectItem>
                    <SelectItem value="ACT">ACT</SelectItem>
                    <SelectItem value="STEP">STEP</SelectItem>
                    <SelectItem value="UCAT">UCAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetUniversity">Target University</Label>
                <Input
                  id="targetUniversity"
                  value={editForm.target_university}
                  onChange={(e) => setEditForm(prev => ({ ...prev, target_university: e.target.value }))}
                  placeholder="Enter target university"
                />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Exam Type</Label>
                <div className="flex items-center gap-2">
                  <Badge className="font-medium bg-blue-600 text-white">
                    {profileData.exam_type}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Target University</Label>
                <p className="font-medium">{profileData.target_university}</p>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Exam Date</Label>
                <p className="font-medium flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {profileData.exam_date ? new Date(profileData.exam_date).toLocaleDateString() : 'Not set'}
                </p>
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

      {/* Account Settings */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Settings className="w-5 h-5" />
            Account Settings
          </CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white/50">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive updates about your progress and new features</p>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white/50">
              <div>
                <h4 className="font-medium">Study Reminders</h4>
                <p className="text-sm text-muted-foreground">Get reminded about your daily study goals</p>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-white/50">
              <div>
                <h4 className="font-medium">Performance Analytics</h4>
                <p className="text-sm text-muted-foreground">Track your progress and improvement over time</p>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;