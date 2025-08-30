import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageCircle, Clock, User, ExternalLink, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Feedback {
  id: string;
  user_id: string | null;
  feedback_text: string;
  rating: number | null;
  category: string | null;
  page_url: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

const FeedbackManager = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast({
        title: "Error loading feedback",
        description: "Failed to load feedback data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFeedbackStatus = async (id: string, status: string, adminNotes?: string) => {
    try {
      const { error } = await supabase
        .from('feedback')
        .update({ 
          status,
          admin_notes: adminNotes || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) throw error;
      
      await fetchFeedbacks();
      toast({
        title: "Status updated",
        description: "Feedback status has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating feedback:', error);
      toast({
        title: "Update failed",
        description: "Failed to update feedback status.",
        variant: "destructive",
      });
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => 
    selectedStatus === "all" || feedback.status === selectedStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'dismissed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string | null) => {
    switch (category) {
      case 'bug': return 'Bug Report';
      case 'feature_request': return 'Feature Request';
      case 'ui_ux': return 'UI/UX';
      case 'content': return 'Content';
      case 'general': return 'General';
      default: return 'Uncategorized';
    }
  };

  const statusCounts = {
    all: feedbacks.length,
    new: feedbacks.filter(f => f.status === 'new').length,
    reviewed: feedbacks.filter(f => f.status === 'reviewed').length,
    in_progress: feedbacks.filter(f => f.status === 'in_progress').length,
    resolved: feedbacks.filter(f => f.status === 'resolved').length,
    dismissed: feedbacks.filter(f => f.status === 'dismissed').length,
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Feedback Manager</h1>
        <p className="text-muted-foreground">Manage and respond to user feedback</p>
      </div>

      <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="new">New ({statusCounts.new})</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed ({statusCounts.reviewed})</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress ({statusCounts.in_progress})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({statusCounts.resolved})</TabsTrigger>
          <TabsTrigger value="dismissed">Dismissed ({statusCounts.dismissed})</TabsTrigger>
        </TabsList>

        <div className="space-y-4">
          {filteredFeedbacks.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No feedback found for this status.</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <Card key={feedback.id} className="border-l-4 border-l-primary">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(feedback.status)}>
                          {feedback.status.replace('_', ' ')}
                        </Badge>
                        {feedback.category && (
                          <Badge variant="outline">
                            {getCategoryLabel(feedback.category)}
                          </Badge>
                        )}
                        {feedback.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{feedback.rating}/5</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {format(new Date(feedback.created_at), 'MMM d, yyyy HH:mm')}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {feedback.user_id ? 'Authenticated User' : 'Anonymous'}
                        </div>
                        {feedback.page_url && (
                          <div className="flex items-center gap-1">
                            <ExternalLink className="h-4 w-4" />
                            <a 
                              href={feedback.page_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              Page URL
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <Select
                      value={feedback.status}
                      onValueChange={(status) => updateFeedbackStatus(feedback.id, status)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="dismissed">Dismissed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Feedback
                    </h4>
                    <p className="text-sm bg-muted/50 p-3 rounded-lg">
                      {feedback.feedback_text}
                    </p>
                  </div>
                  
                  {feedback.admin_notes && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Admin Notes
                      </h4>
                      <p className="text-sm bg-blue-50 p-3 rounded-lg">
                        {feedback.admin_notes}
                      </p>
                    </div>
                  )}

                  <div>
                    <Textarea
                      placeholder="Add admin notes..."
                      className="mb-2"
                      onBlur={(e) => {
                        if (e.target.value && e.target.value !== feedback.admin_notes) {
                          updateFeedbackStatus(feedback.id, feedback.status, e.target.value);
                        }
                      }}
                      defaultValue={feedback.admin_notes || ''}
                    />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default FeedbackManager;