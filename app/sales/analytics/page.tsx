import { BarChart3 } from "lucide-react";

import AnalyticsStats from "@/app/components/sales/analytics/Analyticstatics";
import EmailChart from "@/app/components/sales/analytics/EmailChart";
import StatusChart from "@/app/components/sales/analytics/StatusChart";
import AnalyticsFilters from "@/app/components/sales/analytics/AnalyticsFillter";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#071a13] px-4 py-6 text-[#F5F1E8] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-emerald-300">
              <BarChart3 size={17} />
              Sales / Analytics
            </div>

            <h1 className="text-3xl font-bold">
              Sales Analytics
            </h1>

            <p className="mt-2 text-sm text-emerald-100/50">
              Monitor email performance and sales pipeline activity.
            </p>
          </div>

          <AnalyticsFilters />
        </div>

        <AnalyticsStats />

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <EmailChart />
          <StatusChart />
        </div>

      </div>
    </div>
  );
}