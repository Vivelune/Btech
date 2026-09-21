const activities = [
  {
    title: "Lead created",
    description: "Lead was added to the sales pipeline.",
    date: "Today, 9:30 AM",
  },
  {
    title: "Email sent",
    description: "Initial introduction email was sent.",
    date: "Today, 10:15 AM",
  },
  {
    title: "Follow-up scheduled",
    description: "Sales follow-up scheduled.",
    date: "Tomorrow",
  },
];

export default function LeadTimeline() {
  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={activity.title} className="relative pl-8">
          {index !== activities.length - 1 && (
            <div className="absolute left-[6px] top-5 h-full w-px bg-white/10" />
          )}

          <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#65FFAD] bg-[#061A13]" />

          <p className="font-medium text-[#F5F1E8]">
            {activity.title}
          </p>

          <p className="mt-1 text-sm text-white/45">
            {activity.description}
          </p>

          <p className="mt-2 text-xs text-white/30">
            {activity.date}
          </p>
        </div>
      ))}
    </div>
  );
}