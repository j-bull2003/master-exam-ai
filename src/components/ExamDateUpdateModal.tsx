import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ExamDateUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDate?: Date | null;
  onUpdateDate: (date: Date) => void;
  examType: string;
}

export const ExamDateUpdateModal = ({ 
  isOpen, 
  onClose, 
  currentDate, 
  onUpdateDate, 
  examType 
}: ExamDateUpdateModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(currentDate || undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSave = () => {
    if (selectedDate) {
      onUpdateDate(selectedDate);
      onClose();
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Exam Date</DialogTitle>
          <DialogDescription>
            Set your {examType} exam date to get personalized study recommendations and countdown.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select your exam date:</label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50 bg-background border shadow-lg" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const twoYearsFromNow = new Date();
                    twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);
                    return date < today || date > twoYearsFromNow;
                  }}
                  initialFocus
                  className="p-3 bg-background border-none pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-muted-foreground">
              Date must be between today and 2 years from now
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!selectedDate}>
            Update Date
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};