import { useState } from "react";
import { MessageCircle, Star, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const FeedbackButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [feedbackText, setFeedbackText] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!feedbackText.trim()) {
      toast({
        title: "Please enter your feedback",
        description: "Feedback text is required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('feedback')
        .insert({
          user_id: user?.id || null,
          feedback_text: feedbackText,
          rating: rating || null,
          category: category || null,
          page_url: window.location.href,
          user_agent: navigator.userAgent,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Thank you for your feedback!",
        description: "Your feedback has been submitted successfully. We appreciate your input!",
      });

      // Reset form
      setFeedbackText("");
      setRating(0);
      setCategory("");
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Failed to submit feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-6 right-6 z-50 px-4 py-2 h-auto rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <span className="text-sm font-medium">Feedback</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            Share Your Feedback
          </DialogTitle>
          <DialogDescription>
            Help us improve UniHack.ai by sharing your thoughts, suggestions, or reporting issues.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rate your experience (optional)</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground hover:text-yellow-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category (optional)</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="feature_request">Feature Request</SelectItem>
                <SelectItem value="ui_ux">UI/UX Improvement</SelectItem>
                <SelectItem value="content">Content Quality</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Feedback Text */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Your feedback *</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you think! Share your experience, suggestions for improvement, or report any issues you've encountered..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !feedbackText.trim()}
              className="flex-1"
            >
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackButton;