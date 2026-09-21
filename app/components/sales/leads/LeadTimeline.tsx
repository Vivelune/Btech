import {
  CheckCircle2,
  Mail,
  Phone,
  UserPlus,
} from "lucide-react";

const activities = [
  {
    title: "Lead created",
    description: "Lead was added to the sales pipeline.",
    date: "Today, 09:30",
    icon: UserPlus,
  },
  {
    title: "Email sent",
    description: "Introduction email was sent to the lead.",
    date: "Today, 10:15",
    icon: Mail,
  },
  {
    title: "Phone call",
    description: "Sales representative attempted a follow-up call.",
    date: "Today, 11:45",
    icon: Phone,
  },
  {
    title: "Lead qualified",
    description: "Lead moved to the Qualified stage.",
    date: "Today, 14:20",
    icon: CheckCircle2,
  },
];

export default function LeadTimeline() {
  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-6">
      <h2 className="text-lg font-bold text-[#F5F1E8]">
        Activity History
      </h2>

      <div className="mt-6 space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.title}
              className="relative flex gap-4"
            >
              {index !== activities.length - 1 && (
                <div className="absolute left-5 top-10 h-12 w-px bg-emerald-900/50" />
              )}

              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                <Icon size={17} />
              </div>

              <div>
                <p className="font-semibold text-[#F5F1E8]">
                  {activity.title}
                </p>

                <p className="mt-1 text-sm text-emerald-100/50">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-emerald-300/60">
                  {activity.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}