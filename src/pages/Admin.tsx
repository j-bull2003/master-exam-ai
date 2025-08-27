import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
const uniHackLogo = "/lovable-uploads/b9dbc3d9-034b-4089-a5b2-b96c23476bcf.png";

import { 
  GraduationCap, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Shield,
  Settings,
  Eye,
  UserCheck,
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();

  // Mock data for pending approvals
  const pendingApprovals = [
    {
      id: "approval-1",
      packName: "Advanced UCAT Mathematics",
      tutor: "Dr. Sarah Wilson",
      questions: 89,
      submittedAt: "2024-01-20",
      status: "pending"
    },
    {
      id: "approval-2",
      packName: "Verbal Reasoning Essentials",
      tutor: "Prof. Michael Chen",
      questions: 156,
      submittedAt: "2024-01-19",
      status: "review"
    },
    {
      id: "approval-3",
      packName: "Decision Making Practice",
      tutor: "Dr. Emily Rodriguez",
      questions: 67,
      submittedAt: "2024-01-18",
      status: "pending"
    }
  ];

  // Mock user data
  const users = [
    {
      id: "user-1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "student",
      joinedAt: "2024-01-15",
      status: "active"
    },
    {
      id: "user-2",
      name: "Dr. Sarah Wilson",
      email: "s.wilson@university.edu",
      role: "tutor",
      joinedAt: "2024-01-10",
      status: "active"
    },
    {
      id: "user-3",
      name: "Prof. Michael Chen",
      email: "m.chen@college.edu",
      role: "tutor",
      joinedAt: "2024-01-08",
      status: "pending"
    }
  ];

  // Mock exam catalog
  const examCatalog = [
    {
      id: "ucat",
      name: "UCAT",
      fullName: "University Clinical Aptitude Test",
      region: "UK",
      sections: ["Verbal Reasoning", "Decision Making", "Quantitative Reasoning", "Abstract Reasoning"],
      status: "active"
    },
    {
      id: "sat",
      name: "SAT",
      fullName: "Scholastic Assessment Test",
      region: "US",
      sections: ["Reading and Writing", "Math"],
      status: "active"
    }
  ];

  const handleApproveContent = (approvalId: string) => {
    toast({
      title: "Content approved",
      description: "Content pack has been published and is now available to students",
    });
  };

  const handleRejectContent = (approvalId: string) => {
    toast({
      title: "Content rejected",
      description: "Tutor has been notified with feedback",
      variant: "destructive",
    });
  };

  const handleUserRoleChange = (userId: string, newRole: string) => {
    toast({
      title: "User role updated",
      description: `User role has been changed to ${newRole}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
            to="/admin"
            className="flex items-center hover:opacity-80 transition-opacity group"
          >
            <img
              src={uniHackLogo}
              alt="UniHack.ai Logo"
              className="h-36 md:h-44 max-h-[144px] md:max-h-[176px] w-auto object-contain mix-blend-multiply dark:mix-blend-screen group-hover:scale-105 transition-transform duration-200"
              style={{ backgroundColor: "transparent" }}
            />
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/admin" className="text-primary font-medium">Admin</Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, content, and platform settings
          </p>
        </div>

        <Tabs defaultValue="approvals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="approvals">Content Approvals</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="exams">Exam Catalog</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Content Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold">Pending Content Approvals</h2>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{pendingApprovals.length} pending</span>
              </Badge>
            </div>

            <div className="space-y-4">
              {pendingApprovals.map((approval) => (
                <Card key={approval.id} className="question-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{approval.packName}</h3>
                          <Badge 
                            variant={approval.status === 'review' ? 'default' : 'secondary'}
                            className="flex items-center space-x-1"
                          >
                            <Clock className="h-3 w-3" />
                            <span className="capitalize">{approval.status}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-4">
                          <div>
                            By <span className="font-medium">{approval.tutor}</span>
                          </div>
                          <div>
                            <span className="font-medium">{approval.questions}</span> questions
                          </div>
                          <div>
                            Submitted {new Date(approval.submittedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleApproveContent(approval.id)}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleRejectContent(approval.id)}
                        >
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold">User Management</h2>
              <div className="flex items-center space-x-4">
                <Input placeholder="Search users..." className="w-64" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="tutor">Tutors</SelectItem>
                    <SelectItem value="admin">Admins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card className="question-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          user.role === 'admin' ? 'destructive' :
                          user.role === 'tutor' ? 'default' : 'secondary'
                        }>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.joinedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Select 
                            defaultValue={user.role}
                            onValueChange={(value) => handleUserRoleChange(user.id, value)}
                          >
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="tutor">Tutor</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm">
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Exam Catalog Tab */}
          <TabsContent value="exams" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-semibold">Exam Catalog</h2>
              <Button>
                <Package className="h-4 w-4 mr-2" />
                Add New Exam
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examCatalog.map((exam) => (
                <Card key={exam.id} className="question-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{exam.name}</CardTitle>
                      <Badge variant={exam.status === 'active' ? 'default' : 'secondary'}>
                        {exam.status}
                      </Badge>
                    </div>
                    <CardDescription>{exam.fullName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <span className="font-medium">Region:</span> {exam.region}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Sections:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {exam.sections.map((section) => (
                            <Badge key={section} variant="outline" className="text-xs">
                              {section}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-display font-semibold">Platform Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Configure platform security options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input id="session-timeout" defaultValue="60" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Max Login Attempts</Label>
                    <Input id="max-attempts" defaultValue="5" />
                  </div>
                  <Button>Save Security Settings</Button>
                </CardContent>
              </Card>

              <Card className="question-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    User Settings
                  </CardTitle>
                  <CardDescription>Configure default user settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-role">Default User Role</Label>
                    <Select defaultValue="student">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="tutor">Tutor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-verification">Require Email Verification</Label>
                    <Select defaultValue="true">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Save User Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;