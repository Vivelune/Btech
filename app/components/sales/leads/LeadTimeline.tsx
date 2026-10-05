type Activity = {
  id: string;
  type: string;
  detail: string | null;
  createdAt: string;
  user?: {
    name: string | null;
    email: string;
  } | null;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

export default function LeadTimeline({
  activities,
}: {
  activities: Activity[];
}) {
  if (activities.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <p className="text-sm text-white/40">
          No activity recorded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className="relative pl-8"
        >
          {index !== activities.length - 1 && (
            <div className="absolute left-[6px] top-5 h-full w-px bg-white/10" />
          )}

          <span className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#65FFAD] bg-[#061A13]" />

          <p className="font-medium text-[#F5F1E8]">
            {activity.type}
          </p>

          {activity.detail && (
            <p className="mt-1 text-sm text-white/45">
              {activity.detail}
            </p>
          )}

          <p className="mt-2 text-xs text-white/30">
            {formatDate(activity.createdAt)}
          </p>

          {activity.user && (
            <p className="mt-1 text-xs text-[#65FFAD]/60">
              {activity.user.name ||
                activity.user.email}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}