type Props = {
  subject: string;
  body: string;
  recipient: string;
};

export default function EmailPreview({
  subject,
  body,
  recipient,
}: Props) {
  return (
    <div className="rounded-2xl border border-emerald-900/40 bg-[#102D22] p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
        Email Preview
      </p>

      <div className="mt-5 rounded-xl bg-[#F5F1E8] p-6 text-[#102D22]">
        <p className="text-xs text-gray-500">
          To: {recipient || "No recipient selected"}
        </p>

        <h3 className="mt-4 text-lg font-bold">
          {subject || "No subject"}
        </h3>

        <div className="mt-5 whitespace-pre-wrap text-sm leading-7">
          {body || "Your email content will appear here."}
        </div>
      </div>
    </div>
  );
}