import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ExternalLink } from "lucide-react";

export const AuthNotice = () => {
  return (
    <Alert className="mb-6 border-orange-200 bg-orange-50">
      <AlertCircle className="h-4 w-4 text-orange-600" />
      <AlertDescription className="text-orange-800">
        <strong>Account created but email confirmation required!</strong>
        <br />
        To login immediately without email verification, go to{" "}
        <a 
          href="https://supabase.com/dashboard/project/efqpwkciytxgutfjppap/auth/providers" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-orange-900 underline hover:text-orange-700 inline-flex items-center gap-1"
        >
          Supabase Auth Settings <ExternalLink className="h-3 w-3" />
        </a>
        {" "}and turn OFF "Confirm email" in the Email Auth section.
      </AlertDescription>
    </Alert>
  );
};