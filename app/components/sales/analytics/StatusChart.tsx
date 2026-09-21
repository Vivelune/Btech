const statuses = [
  { name: "New", value: 32 },
  { name: "Contacted", value: 22 },
  { name: "Replied", value: 16 },
  { name: "Interested", value: 12 },
  { name: "Meeting Booked", value: 8 },
  { name: "Qualified", value: 6 },
  { name: "Converted", value: 4 },
];

export default function StatusChart() {
  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-6">
      <h2 className="text-lg font-bold">
        Status Breakdown
      </h2>

      <p className="mt-1 text-xs text-emerald-100/50">
        Current distribution of leads.
      </p>

      <div className="mt-7 space-y-4">
        {statuses.map((status) => (
          <div key={status.name}>
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-emerald-100/70">
                {status.name}
              </span>

              <span className="font-semibold text-emerald-300">
                {status.value}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#0b241b]">
              <div
                className="h-full rounded-full bg-emerald-400"
                style={{ width: `${status.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}