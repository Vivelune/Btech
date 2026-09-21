import { Mail } from "lucide-react";
import ComposeForm from "./ComposeForm";

export default function ComposePage() {
  return (
    <div className="min-h-screen bg-[#071a13] px-4 py-6 text-[#F5F1E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2 text-sm text-emerald-300">
            <Mail size={17} />
            Sales / Compose
          </div>

          <h1 className="text-3xl font-bold">
            Compose Email
          </h1>

          <p className="mt-2 text-sm text-emerald-100/50">
            Create personalized emails for your sales leads.
          </p>
        </div>

        <ComposeForm />
      </div>
    </div>
  );
}