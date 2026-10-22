"use client";

import { useMemo, useState } from "react";
import {
CalendarClock,
FileText,
Pencil,
Trash2,
Search,
X,
Clock3,
Inbox,
} from "lucide-react";

export type SocialDraft = {
id: string;
platform: "x" | "facebook";
caption: string;
account: string;
createdAt: string;
scheduledAt?: string;
mediaName?: string;
};

type SavedDraftsProps = {
platform: "x" | "facebook";
drafts: SocialDraft[];
onLoadDraft: (draft: SocialDraft) => void;
onDeleteDraft: (draftId: string) => void;
};

export default function SavedDrafts({
platform,
drafts,
onLoadDraft,
onDeleteDraft,
}: SavedDraftsProps) {
const [searchTerm, setSearchTerm] = useState("");
const [dateFilter, setDateFilter] = useState<
"all" | "scheduled" | "unscheduled"

> ("all");

const platformName = platform === "x" ? "X" : "Facebook";

const platformDrafts = useMemo(
() =>
drafts
.filter((draft) => draft.platform === platform)
.sort((a, b) => {
const first = new Date(a.createdAt).getTime();
const second = new Date(b.createdAt).getTime();

      return (
        (Number.isNaN(second) ? 0 : second) -
        (Number.isNaN(first) ? 0 : first)
      );
    }),
[drafts, platform]
);

const filteredDrafts = useMemo(() => {
const query = searchTerm.trim().toLowerCase();

return platformDrafts.filter((draft) => {
  const matchesSearch =
    !query ||
    draft.caption.toLowerCase().includes(query) ||
    draft.account.toLowerCase().includes(query) ||
    (draft.mediaName ?? "").toLowerCase().includes(query);

  const matchesFilter =
    dateFilter === "all" ||
    (dateFilter === "scheduled" && Boolean(draft.scheduledAt)) ||
    (dateFilter === "unscheduled" && !draft.scheduledAt);

  return matchesSearch && matchesFilter;
});

}, [platformDrafts, searchTerm, dateFilter]);

const scheduledCount = platformDrafts.filter(
(draft) => Boolean(draft.scheduledAt)
).length;

const unscheduledCount = platformDrafts.length - scheduledCount;

function formatDate(value?: string) {
if (!value) return "Date unavailable";

const date = new Date(value);

if (Number.isNaN(date.getTime())) {
  return "Date unavailable";
}

return date.toLocaleString(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

}

function handleDelete(draft: SocialDraft) {
const confirmed = window.confirm(
`Delete this ${platformName} draft? This action cannot be undone.`
);

if (confirmed) {
  onDeleteDraft(draft.id);
}

}

return (
  <section className="mt-8 rounded-3xl border border-white/10 bg-[#081C15] p-4 sm:p-6">
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <FileText size={21} className="text-[#65FFAD]" />
          <h2 className="text-xl font-bold text-[#F5F1E8]">
Saved Drafts </h2> </div>

      <p className="mt-2 text-sm text-white/45">
        Search and manage content saved for {platformName}.
      </p>
    </div>

    <span className="w-fit rounded-full border border-[#65FFAD]/20 bg-[#65FFAD]/10 px-3 py-1.5 text-sm font-semibold text-[#65FFAD]">
      {platformDrafts.length}{" "}
      {platformDrafts.length === 1 ? "draft" : "drafts"}
    </span>
  </div>

  <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
    <div className="rounded-2xl border border-white/10 bg-[#0A2119] p-4">
      <div className="flex items-center gap-2 text-white/45">
        <FileText size={17} />
        <span className="text-xs">Total drafts</span>
      </div>
      <p className="mt-3 text-2xl font-bold text-[#F5F1E8]">
        {platformDrafts.length}
      </p>
      <p className="mt-1 text-xs text-white/35">
        Saved on this device
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-[#0A2119] p-4">
      <div className="flex items-center gap-2 text-white/45">
        <CalendarClock size={17} />
        <span className="text-xs">With planned times</span>
      </div>
      <p className="mt-3 text-2xl font-bold text-[#65FFAD]">
        {scheduledCount}
      </p>
      <p className="mt-1 text-xs text-white/35">
        Have a saved publishing time
      </p>
    </div>

    <div className="rounded-2xl border border-white/10 bg-[#0A2119] p-4">
      <div className="flex items-center gap-2 text-white/45">
        <Clock3 size={17} />
        <span className="text-xs">Without planned times</span>
      </div>
      <p className="mt-3 text-2xl font-bold text-[#F5F1E8]">
        {unscheduledCount}
      </p>
      <p className="mt-1 text-xs text-white/35">
        No saved publishing time
      </p>
    </div>
  </div>

  {platformDrafts.length > 0 && (
    <div className="mb-6 space-y-3">
      <div className="relative">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
        />

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search captions, accounts, or media..."
          aria-label="Search saved drafts"
          className="w-full rounded-xl border border-white/10 bg-[#0A2119] py-3 pl-11 pr-11 text-sm text-[#F5F1E8] outline-none placeholder:text-white/30 focus:border-[#65FFAD]/50 focus:ring-2 focus:ring-[#65FFAD]/10"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/45 hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {(
            [
              { value: "all", label: "All drafts" },
              { value: "scheduled", label: "With planned times" },
              { value: "unscheduled", label: "Without planned times" },
            ] as const
          ).map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setDateFilter(filter.value)}
              aria-pressed={dateFilter === filter.value}
              className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                dateFilter === filter.value
                  ? "border-[#65FFAD]/30 bg-[#65FFAD]/10 text-[#65FFAD]"
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/80"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-white/35">
          Showing {filteredDrafts.length} of {platformDrafts.length}
        </p>
      </div>
    </div>
  )}

  {platformDrafts.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
      <Inbox size={32} className="mx-auto text-white/25" />
      <h3 className="mt-4 font-semibold text-[#F5F1E8]">
        No saved drafts yet
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/40">
        Write a post in the composer and select Save Draft. Your saved
        drafts will appear here.
      </p>
    </div>
  ) : filteredDrafts.length === 0 ? (
    <div className="rounded-2xl border border-dashed border-white/10 px-5 py-10 text-center">
      <Search size={30} className="mx-auto text-white/25" />
      <h3 className="mt-4 font-semibold text-[#F5F1E8]">
        No matching drafts
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/40">
        Try another search term or change your filter.
      </p>

      <button
        type="button"
        onClick={() => {
          setSearchTerm("");
          setDateFilter("all");
        }}
        className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[#F5F1E8] hover:border-[#65FFAD]/30 hover:text-[#65FFAD]"
      >
        <X size={15} />
        Clear filters
      </button>
    </div>
  ) : (
    <div className="space-y-4">
      {filteredDrafts.map((draft) => (
        <article
          key={draft.id}
          className="rounded-2xl border border-white/10 bg-[#0A2119] p-4 transition hover:border-[#65FFAD]/20 sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#65FFAD]/10 px-2.5 py-1 text-xs font-semibold text-[#65FFAD]">
                  {platformName}
                </span>
                <span className="text-xs text-white/35">
                  Saved {formatDate(draft.createdAt)}
                </span>
              </div>

              <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-[#F5F1E8]/85">
                {draft.caption.trim() || "This draft has no caption yet."}
              </p>

              {draft.account && (
                <p className="mt-3 break-words text-xs text-white/40">
                  Destination: {draft.account}
                </p>
              )}

              {draft.mediaName && (
                <p className="mt-2 break-words text-xs text-white/40">
                  Attached media: {draft.mediaName}
                </p>
              )}

              {draft.scheduledAt && (
                <div className="mt-3 flex items-start gap-2 text-xs text-white/45">
                  <CalendarClock
                    size={14}
                    className="mt-0.5 shrink-0"
                  />
                  <span>
                    Planned time: {formatDate(draft.scheduledAt)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex shrink-0 gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => onLoadDraft(draft)}
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#65FFAD] px-4 py-2.5 text-sm font-semibold text-[#061A13] transition hover:bg-[#8AFFBE] sm:flex-none"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(draft)}
                aria-label={`Delete ${platformName} draft`}
                title="Delete draft"
                className="inline-flex min-h-10 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/5 px-3 text-red-300 transition hover:bg-red-400/15"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )}

  <p className="mt-5 text-xs leading-5 text-white/30">
    Drafts are stored in this browser on this device. They are not yet
    synchronized with a database or other devices. A saved publishing
    time is only a plan; it does not automatically publish the post.
  </p>
</section>
)}
