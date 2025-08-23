import { Progress } from "@/components/ui/progress";
import { usePageProgress } from "@/hooks/usePageProgress";

export const PageProgressBar = () => {
  const { progress, isLoading } = usePageProgress();

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-0.5">
      <Progress 
        value={progress} 
        className="h-full rounded-none bg-transparent"
      />
    </div>
  );
};