import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, AlertTriangle, Edit } from "lucide-react";
import { differenceInDays, format, isPast } from "date-fns";

interface ExamCountdownProps {
  examDate?: Date | null;
  examType?: string;
  onUpdateDate?: () => void;
}

export const ExamCountdown = ({ examDate, examType = "exam", onUpdateDate }: ExamCountdownProps) => {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    if (!examDate) return;

    const calculateDaysLeft = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const examDateOnly = new Date(examDate);
      examDateOnly.setHours(0, 0, 0, 0);
      
      const days = differenceInDays(examDateOnly, today);
      setDaysLeft(days);
      setIsOverdue(isPast(examDateOnly));
    };

    calculateDaysLeft();
    
    // Update daily at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      calculateDaysLeft();
      // Set up daily interval
      const interval = setInterval(calculateDaysLeft, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, timeUntilMidnight);

    return () => clearTimeout(timeout);
  }, [examDate]);

  if (!examDate) {
    return (
      <Card className="border-dashed border-2 border-muted-foreground/30">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <Calendar className="w-8 h-8 text-muted-foreground mb-3" />
          <h3 className="font-medium text-muted-foreground mb-2">No exam date set</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Set your exam date to see a countdown and get a personalized study timeline
          </p>
          <Button onClick={onUpdateDate} variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Set Exam Date
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isOverdue) {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            Exam Date Passed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Your {examType} exam date ({format(examDate, "MMM dd, yyyy")}) has passed.
          </p>
          <Button onClick={onUpdateDate} size="sm" variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Update Date
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isWarning = daysLeft !== null && daysLeft <= 7;
  const isUrgent = daysLeft !== null && daysLeft <= 3;

  return (
    <Card className={`transition-colors ${
      isUrgent 
        ? "border-destructive bg-destructive/5" 
        : isWarning 
        ? "border-warning bg-warning/5" 
        : "border-primary/30 bg-primary/5"
    }`}>
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 ${
          isUrgent 
            ? "text-destructive" 
            : isWarning 
            ? "text-warning" 
            : "text-primary"
        }`}>
          <Calendar className="w-5 h-5" />
          {daysLeft === 0 
            ? "Exam Today!" 
            : daysLeft === 1 
            ? "Exam Tomorrow!" 
            : `${daysLeft} days until your ${examType} exam`
          }
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Exam date:</span>
            <span className="font-medium">{format(examDate, "MMM dd, yyyy")}</span>
          </div>
          
          {daysLeft !== null && daysLeft <= 7 && (
            <div className={`p-3 rounded-lg border ${
              isUrgent 
                ? "bg-destructive/10 border-destructive/20 text-destructive" 
                : "bg-warning/10 border-warning/20 text-warning"
            }`}>
              <p className="text-sm font-medium">
                {isUrgent 
                  ? "🚨 Final push! Focus on your weak areas." 
                  : "⚡ Exam week - time for final review!"
                }
              </p>
            </div>
          )}
          
          <div className="flex gap-2">
            <Button onClick={onUpdateDate} size="sm" variant="ghost" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Update Date
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};