import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Monitor, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

type DensityMode = "comfortable" | "compact";

interface DensityToggleProps {
  onDensityChange?: (density: DensityMode) => void;
}

export const DensityToggle = ({ onDensityChange }: DensityToggleProps) => {
  const [density, setDensity] = useLocalStorage<DensityMode>("table-density", "comfortable");

  const handleToggle = () => {
    const newDensity = density === "comfortable" ? "compact" : "comfortable";
    setDensity(newDensity);
    onDensityChange?.(newDensity);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className="h-8 px-2 text-xs"
      title={`Switch to ${density === "comfortable" ? "compact" : "comfortable"} view`}
    >
      {density === "comfortable" ? (
        <LayoutGrid className="w-4 h-4" />
      ) : (
        <Monitor className="w-4 h-4" />
      )}
      <span className="sr-only">
        {density === "comfortable" ? "Switch to compact view" : "Switch to comfortable view"}
      </span>
    </Button>
  );
};