"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  ImagePlus,
  LoaderCircle,
  Send,
  Trash2,
  X,
} from "lucide-react";

import SavedDrafts, {
  type SocialDraft,
} from "@/app/components/social-media/SaveDraft";

type Platform = "x" | "facebook";

type SocialPostComposerProps = {
  platform: Platform;
};

type MediaPreview = {
  file: File;
  url: string;
};

type MessageType = "success" | "error" | "info";

const CONFIG: Record<
  Platform,
  {
    name: string;
    maxCharacters: number;
    placeholder: string;
    buttonLabel: string;
  }
> = {
  x: {
    name: "X",
    maxCharacters: 280,
    placeholder: "What would you like to share on X?",
    buttonLabel: "Prepare X Post",
  },
  facebook: {
    name: "Facebook",
    maxCharacters: 63206,
    placeholder: "Write a caption for your Facebook Page...",
    buttonLabel: "Prepare Facebook Post",
  },
};

const MAX_MEDIA_SIZE = 20 * 1024 * 1024;

const ALLOWED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
];

function getDraftStorageKey(platform: Platform) {
  return `btech-social-drafts-${platform}`;
}

function readDrafts(platform: Platform): SocialDraft[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(getDraftStorageKey(platform));

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is SocialDraft =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        item.platform === platform &&
        typeof item.caption === "string" &&
        typeof item.account === "string" &&
        typeof item.createdAt === "string"
    );
  } catch {
    return [];
  }
}

function saveDraftsToStorage(
  platform: Platform,
  drafts: SocialDraft[]
) {
  localStorage.setItem(
    getDraftStorageKey(platform),
    JSON.stringify(drafts)
  );
}

function toDateTimeLocalValue(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60_000
  );

  return localDate.toISOString().slice(0, 16);
}

export default function SocialPostComposer({
  platform,
}: SocialPostComposerProps) {
  const config = CONFIG[platform];

  const [caption, setCaption] = useState("");
  const [account, setAccount] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [media, setMedia] = useState<MediaPreview | null>(null);

  const [drafts, setDrafts] = useState<SocialDraft[]>([]);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(
    null
  );

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<MessageType>("info");

  const [isPreparing, setIsPreparing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setDrafts(readDrafts(platform));
    setIsReady(true);
  }, [platform]);

  useEffect(() => {
    return () => {
      if (media?.url) {
        URL.revokeObjectURL(media.url);
      }
    };
  }, [media]);

  function showMessage(
    text: string,
    type: MessageType = "info"
  ) {
    setMessage(text);
    setMessageType(type);
  }

  /**
   * Save to localStorage before updating the displayed draft list.
   * This prevents the interface from claiming that a draft was saved
   * when the browser could not persist it.
   */
  function updateDrafts(nextDrafts: SocialDraft[]): boolean {
    try {
      saveDraftsToStorage(platform, nextDrafts);
      setDrafts(nextDrafts);
      return true;
    } catch {
      showMessage(
        "The browser could not save your drafts. Check your browser storage and available space, then try again.",
        "error"
      );

      return false;
    }
  }

  function hasComposerContent() {
    return Boolean(
      caption.trim() ||
        account ||
        scheduledAt ||
        media ||
        editingDraftId
    );
  }

  function handleMediaChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!ALLOWED_MEDIA_TYPES.includes(file.type)) {
      showMessage(
        "Unsupported file type. Choose a JPG, PNG, WebP, GIF, MP4, or WebM file.",
        "error"
      );

      event.target.value = "";
      return;
    }

    if (file.size > MAX_MEDIA_SIZE) {
      showMessage(
        "The selected media file must be 20 MB or smaller.",
        "error"
      );

      event.target.value = "";
      return;
    }

    setMedia({
      file,
      url: URL.createObjectURL(file),
    });

    showMessage(
      "Media added successfully. It is available in the local preview.",
      "success"
    );
  }

  function clearMedia() {
    setMedia(null);
    showMessage("Media removed from the current post.", "info");
  }

  function resetComposer(force = false) {
    if (!force && hasComposerContent()) {
      const confirmed = window.confirm(
        "Clear the current composer? Any unsaved caption, selected account, schedule time, or attached media will be lost."
      );

      if (!confirmed) {
        return;
      }
    }

    setCaption("");
    setAccount("");
    setScheduledAt("");
    setMedia(null);
    setEditingDraftId(null);
    setMessage("");
  }

  function validatePost() {
    if (!caption.trim()) {
      showMessage(
        "Please write a caption before continuing.",
        "error"
      );

      return false;
    }

    if (caption.length > config.maxCharacters) {
      showMessage(
        `Your caption exceeds the ${config.maxCharacters.toLocaleString()} character limit.`,
        "error"
      );

      return false;
    }

    if (!account) {
      showMessage(
        "Please select a destination account.",
        "error"
      );

      return false;
    }

    return true;
  }

  function validateScheduledDate(
    value: string,
    required: boolean
  ): boolean {
    if (!value) {
      if (required) {
        showMessage(
          "Choose a date and time for your planned post.",
          "error"
        );

        return false;
      }

      return true;
    }

    const scheduledDate = new Date(value);

    if (
      Number.isNaN(scheduledDate.getTime()) ||
      scheduledDate.getTime() <= Date.now()
    ) {
      showMessage(
        "Choose a valid future date and time. Past times cannot be used.",
        "error"
      );

      return false;
    }

    return true;
  }

  function handleSaveDraft() {
    if (!caption.trim() && !media) {
      showMessage(
        "Write a caption or add media before saving a draft.",
        "error"
      );

      return;
    }

    if (!validateScheduledDate(scheduledAt, false)) {
      return;
    }

    const existingDraft = editingDraftId
      ? drafts.find((draft) => draft.id === editingDraftId)
      : undefined;

    const now = new Date().toISOString();

    const draft: SocialDraft = {
      id: editingDraftId ?? crypto.randomUUID(),
      platform,
      caption,
      account,
      createdAt: existingDraft?.createdAt ?? now,
      scheduledAt: scheduledAt
        ? new Date(scheduledAt).toISOString()
        : undefined,
      mediaName: media?.file.name ?? existingDraft?.mediaName,
    };

    const nextDrafts = editingDraftId
      ? drafts.map((item) =>
          item.id === editingDraftId ? draft : item
        )
      : [draft, ...drafts];

    const saved = updateDrafts(nextDrafts);

    if (!saved) {
      return;
    }

    setEditingDraftId(draft.id);

    showMessage(
      editingDraftId
        ? "Your draft has been updated successfully in this browser."
        : "Your draft has been saved successfully in this browser.",
      "success"
    );
  }

  function handleLoadDraft(draft: SocialDraft) {
    if (hasComposerContent()) {
      const confirmed = window.confirm(
        "Load this saved draft? Any unsaved changes in the current composer will be lost."
      );

      if (!confirmed) {
        return;
      }
    }

    setCaption(draft.caption);
    setAccount(draft.account);

    setScheduledAt(
      draft.scheduledAt
        ? toDateTimeLocalValue(draft.scheduledAt)
        : ""
    );

    setEditingDraftId(draft.id);
    setMedia(null);

    showMessage(
      draft.mediaName
        ? `Draft loaded. Re-upload "${draft.mediaName}" if you still need that media.`
        : "Draft loaded. You can now edit it.",
      "info"
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleDeleteDraft(draftId: string) {
    const confirmed = window.confirm(
      "Delete this saved draft? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    const nextDrafts = drafts.filter(
      (draft) => draft.id !== draftId
    );

    const saved = updateDrafts(nextDrafts);

    if (!saved) {
      return;
    }

    if (editingDraftId === draftId) {
      setEditingDraftId(null);
    }

    showMessage(
      "Draft deleted from this browser.",
      "success"
    );
  }

  function handlePreparePost() {
    if (!validatePost()) {
      return;
    }

    setIsPreparing(true);
    setMessage("");

    window.setTimeout(() => {
      setIsPreparing(false);

      showMessage(
        "Your post is prepared in this prototype. It has not been published. Connect the platform API before real publishing can work.",
        "info"
      );
    }, 600);
  }

  function handleSchedulePost() {
    if (!validatePost()) {
      return;
    }

    if (!validateScheduledDate(scheduledAt, true)) {
      return;
    }

    showMessage(
      "Your planned date and time are valid. Automatic scheduling is not connected yet. Save this post as a draft to keep the details in this browser.",
      "info"
    );
  }

  const remainingCharacters =
    config.maxCharacters - caption.length;

  const isNearCharacterLimit =
    remainingCharacters >= 0 &&
    remainingCharacters <=
      (platform === "x" ? 30 : 100);

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <section className="min-w-0 space-y-6">
          {/* Caption */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <label
                htmlFor={`${platform}-caption`}
                className="text-sm font-semibold text-[#F5F1E8]"
              >
                Post caption
              </label>

              <span
                aria-live="polite"
                className={`text-xs ${
                  remainingCharacters < 0
                    ? "text-red-300"
                    : isNearCharacterLimit
                      ? "text-amber-200"
                      : "text-white/40"
                }`}
              >
                {remainingCharacters.toLocaleString()} characters left
              </span>
            </div>

            <textarea
              id={`${platform}-caption`}
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              maxLength={config.maxCharacters}
              placeholder={config.placeholder}
              rows={7}
              className="w-full resize-y rounded-2xl border border-white/10 bg-[#061A13] p-4 text-sm leading-7 text-[#F5F1E8] outline-none transition placeholder:text-white/25 focus:border-[#65FFAD]/50 focus:ring-2 focus:ring-[#65FFAD]/10"
            />

            {isNearCharacterLimit && (
              <p className="mt-2 text-xs text-amber-200">
                You are getting close to the character limit for{" "}
                {config.name}.
              </p>
            )}

            {remainingCharacters < 0 && (
              <p className="mt-2 text-xs text-red-300">
                Your caption is over the character limit. Shorten it
                before continuing.
              </p>
            )}
          </div>

          {/* Destination account */}
          <div>
            <label
              htmlFor={`${platform}-account`}
              className="mb-3 block text-sm font-semibold text-[#F5F1E8]"
            >
              Destination account
            </label>

            <select
              id={`${platform}-account`}
              value={account}
              onChange={(event) => setAccount(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/50"
            >
              <option value="">Select an account</option>

              <option value="BTech Main Account">
                BTech Main Account (Demo)
              </option>

              <option value="BTech Marketing">
                BTech Marketing (Demo)
              </option>

              <option value="Personal Test Account">
                Personal Test Account (Demo)
              </option>
            </select>

            <p className="mt-2 text-xs text-white/35">
              These are demonstration options, not connected social
              accounts.
            </p>
          </div>

          {/* Media attachment */}
          <div>
            <label
              htmlFor={`${platform}-media`}
              className="mb-3 block text-sm font-semibold text-[#F5F1E8]"
            >
              Media attachment
            </label>

            <label
              htmlFor={`${platform}-media`}
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#061A13]/70 px-5 py-8 text-center transition hover:border-[#65FFAD]/40 hover:bg-[#65FFAD]/5"
            >
              <ImagePlus
                size={28}
                className="text-[#65FFAD]"
              />

              <span className="mt-3 text-sm font-semibold text-[#F5F1E8]">
                Choose an image or video
              </span>

              <span className="mt-2 text-xs text-white/40">
                JPG, PNG, WebP, GIF, MP4, or WebM · Maximum 20 MB
              </span>

              <input
                id={`${platform}-media`}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm"
                onChange={handleMediaChange}
                className="sr-only"
              />
            </label>

            {media && (
              <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#061A13] p-3">
                <div className="flex min-w-0 items-center gap-3">
                  <ImagePlus
                    size={18}
                    className="shrink-0 text-[#65FFAD]"
                  />

                  <span className="truncate text-sm text-white/70">
                    {media.file.name}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={clearMedia}
                  aria-label="Remove attached media"
                  className="rounded-lg p-2 text-white/40 transition hover:bg-white/5 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <p className="mt-2 text-xs leading-5 text-white/35">
              Selected media is previewed locally. Media uploads to X
              or Facebook are not connected.
            </p>
          </div>

          {/* Planned schedule */}
          <div>
            <label
              htmlFor={`${platform}-schedule`}
              className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#F5F1E8]"
            >
              <CalendarClock
                size={17}
                className="text-[#65FFAD]"
              />

              Planned publishing date and time
            </label>

            <input
              id={`${platform}-schedule`}
              type="datetime-local"
              value={scheduledAt}
              onChange={(event) =>
                setScheduledAt(event.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-[#061A13] px-4 py-3 text-sm text-[#F5F1E8] outline-none focus:border-[#65FFAD]/50"
            />

            <p className="mt-2 text-xs text-white/35">
              Choose a future time. This prototype will validate the
              time but will not publish automatically.
            </p>
          </div>

          {/* Feedback */}
          {message && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl border p-4 text-sm leading-6 ${
                messageType === "success"
                  ? "border-[#65FFAD]/20 bg-[#65FFAD]/5 text-[#65FFAD]"
                  : messageType === "error"
                    ? "border-red-400/20 bg-red-400/5 text-red-200"
                    : "border-sky-300/20 bg-sky-300/5 text-sky-200"
              }`}
            >
              {message}
            </div>
          )}

          {/* Editing indicator */}
          {editingDraftId && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#65FFAD]/15 bg-[#65FFAD]/5 p-3">
              <p className="text-sm text-[#65FFAD]">
                Editing a saved draft
              </p>

              <button
                type="button"
                onClick={() => resetComposer()}
                className="text-xs text-white/50 underline underline-offset-4 transition hover:text-white"
              >
                Stop editing
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-[#F5F1E8] transition hover:border-[#65FFAD]/30 hover:bg-white/10"
            >
              <CheckCircle2 size={17} />

              {editingDraftId ? "Update Draft" : "Save Draft"}
            </button>

            <button
              type="button"
              onClick={handlePreparePost}
              disabled={isPreparing}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#65FFAD] px-5 py-3 text-sm font-semibold text-[#061A13] transition hover:bg-[#8AFFBE] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPreparing ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Send size={17} />
              )}

              {isPreparing
                ? "Preparing..."
                : config.buttonLabel}
            </button>

            <button
              type="button"
              onClick={handleSchedulePost}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/65 transition hover:border-[#65FFAD]/30 hover:text-[#65FFAD]"
            >
              <Clock size={17} />
              Check Schedule
            </button>
          </div>

          {/* Prototype notice */}
          <div className="rounded-xl border border-amber-300/15 bg-amber-300/5 p-4">
            <p className="text-sm font-semibold text-amber-200">
              Prototype only
            </p>

            <p className="mt-2 text-xs leading-6 text-white/45">
              Posts are not sent to X or Facebook. Real publishing,
              account authorization, media uploads, and automatic
              scheduling require approved platform integrations and
              backend work.
            </p>
          </div>
        </section>

        {/* Preview column */}
        <aside className="min-w-0">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#061A13]">
            <div className="border-b border-white/10 p-4">
              <p className="text-sm font-semibold text-[#F5F1E8]">
                Live Preview
              </p>

              <p className="mt-1 text-xs text-white/40">
                Preview of your {config.name} post
              </p>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#65FFAD]/10 text-sm font-bold text-[#65FFAD]">
                  BT
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#F5F1E8]">
                    BTech Digital Solutions
                  </p>

                  <p className="text-xs text-white/40">
                    {platform === "x"
                      ? "@btech_demo"
                      : "BTech Demo Page"}
                  </p>
                </div>
              </div>

              <p className="mt-4 min-h-24 whitespace-pre-wrap break-words text-sm leading-7 text-white/75">
                {caption || "Your post caption will appear here..."}
              </p>

              {media && (
                <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                  {media.file.type.startsWith("video/") ? (
                    <video
                      src={media.url}
                      controls
                      className="max-h-80 w-full object-contain"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={media.url}
                      alt="Selected post media preview"
                      className="max-h-80 w-full object-contain"
                    />
                  )}
                </div>
              )}

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-white/35">
                <span>{config.name} preview</span>

                <span>
                  {caption.length.toLocaleString()}/
                  {config.maxCharacters.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Draft status */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-[#061A13] p-4">
            <p className="text-sm font-semibold text-[#F5F1E8]">
              Draft Status
            </p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-sm text-white/45">
                Saved in this browser
              </span>

              <span className="rounded-full bg-[#65FFAD]/10 px-3 py-1 text-xs font-semibold text-[#65FFAD]">
                {isReady
                  ? drafts.filter(
                      (draft) => draft.platform === platform
                    ).length
                  : "…"}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-white/35">
              Drafts are stored in this browser on this device.
              They are not yet stored in a shared database.
            </p>
          </div>
        </aside>
      </div>

      {/* Saved drafts */}
      <SavedDrafts
        platform={platform}
        drafts={drafts}
        onLoadDraft={handleLoadDraft}
        onDeleteDraft={handleDeleteDraft}
      />

      {/* Footer actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
        <p className="text-xs text-white/30">
          BTech Digital Solutions · Social Media Workspace
        </p>

        <button
          type="button"
          onClick={() => resetComposer()}
          className="inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-red-300"
        >
          <Trash2 size={14} />
          Clear composer
        </button>
      </div>
    </div>
  );
}