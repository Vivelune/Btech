import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#061A13] px-4 py-10"
      style={{
        fontFamily: "var(--font-dm-sans, ui-sans-serif)",
      }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-[#3a9e5f]/20 blur-[120px]" />

        <div className="absolute bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-[#4ade80]/10 blur-[150px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 flex w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0A241B]/80 shadow-2xl backdrop-blur-xl lg:min-h-[650px]">

        {/* Left BTech section */}
        <div className="hidden w-1/2 flex-col justify-between border-r border-white/10 bg-[#0a1f14] p-12 lg:flex">

          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold text-white"
            style={{
              fontFamily: "var(--font-syne, ui-sans-serif)",
            }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3a9e5f] text-lg font-bold text-[#04140b]">
              B
            </span>

            BTech
          </Link>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#65FFAD]">
              Join BTech
            </p>

            <h1
              className="max-w-md text-5xl font-bold leading-tight text-[#F5F1E8]"
              style={{
                fontFamily: "var(--font-syne, ui-sans-serif)",
              }}
            >
              Build your digital future with us.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-white/60">
              Create your BTech account and connect with our digital
              solutions, services, projects and team.
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm text-white/40">
            <span className="h-2 w-2 rounded-full bg-[#65FFAD]" />
            BTech Digital Solutions
          </div>
        </div>

        {/* Clerk Sign Up */}
        <div className="flex w-full items-center justify-center p-6 sm:p-10 lg:w-1/2">
          <SignUp
            forceRedirectUrl="/account"
            appearance={{
              variables: {
                colorPrimary: "#3a9e5f",
                colorBackground: "#0A241B",

                colorForeground: "#F5F1E8",

                colorMutedForeground: "#B8C4BD",

                colorInput: "#FFFFFF",

                colorInputForeground: "#102D22",

                colorPrimaryForeground: "#04140b",

                colorNeutral: "#FFFFFF",

                colorBorder: "#52665D",

                colorRing: "#65FFAD",

                borderRadius: "0.75rem",

                fontFamily: "var(--font-dm-sans, ui-sans-serif)",
              },

              elements: {
                rootBox: "w-full",

                card: "w-full bg-transparent shadow-none",

                headerTitle:
                  "text-[#F5F1E8] text-3xl font-bold",

                headerSubtitle:
                  "text-[#B8C4BD]",

                /* Google / social buttons */
                socialButtonsBlockButton:
                  "border border-[#52665D] bg-white hover:bg-[#F1F5F2] shadow-sm",

                socialButtonsBlockButtonText:
                  "text-[#102D22] font-semibold",

                socialButtonsProviderIcon:
                  "opacity-100",

                /* Divider */
                dividerLine:
                  "bg-[#365247]",

                dividerText:
                  "text-[#B8C4BD]",

                /* Normal form fields */
                formFieldLabel:
                  "text-[#E8EEE9] font-semibold",

                formFieldInput:
                  "border border-[#52665D] bg-white text-[#102D22] placeholder:text-[#5E7067] focus:border-[#65FFAD] focus:ring-[#65FFAD]",

                /* Verification code inputs */
                otpCodeFieldInput:
                  "!bg-white !text-[#102D22] !border-[#52665D] !font-bold !text-xl focus:!border-[#65FFAD] focus:!ring-[#65FFAD]",

                /* Primary button */
                formButtonPrimary:
                  "bg-[#3a9e5f] text-[#04140b] hover:bg-[#65FFAD] font-bold shadow-md",

                /* Footer */
                footerActionText:
                  "text-[#B8C4BD]",

                footerActionLink:
                  "text-[#65FFAD] hover:text-[#4ade80] font-semibold",

                /* Identity preview */
                identityPreviewText:
                  "text-[#F5F1E8]",

                identityPreviewEditButton:
                  "text-[#65FFAD]",

                /* Resend verification code */
                formResendCodeLink:
                  "text-[#65FFAD] hover:text-[#4ade80] font-semibold",

                /* Errors */
                alertText:
                  "text-red-300",

                /* Form actions */
                formFieldAction:
                  "text-[#65FFAD] hover:text-[#4ade80]",
              },
            }}
          />
        </div>
      </div>
    </main>
  );
}