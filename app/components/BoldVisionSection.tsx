export default function BoldVisionSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap');
      `}</style>

      <section
        className="relative flex w-full min-h-[65vh] items-center justify-center overflow-hidden px-4 py-14 sm:px-6 sm:py-16 animate-pop-in"
        style={{ background: "linear-gradient(180deg, #eef8ef 0%, #d9f0dc 52%, #edfbef 100%)", fontFamily: "'geometric', sans-serif" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(34,87,60,.06) 1px,transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
        </div>

        <div
          className="relative z-10 flex w-full flex-col items-center gap-7 text-center"
          style={{ maxWidth: "min(720px,100%)" }}
        >
          <div
            className="flex items-center justify-center rounded-2xl sm:rounded-[28px]"
            style={{
              width: "clamp(80px,16vw,110px)",
              height: "clamp(80px,16vw,110px)",
              fontSize: "clamp(36px,8vw,52px)",
              background: "linear-gradient(145deg,#3a9e5f,#2d7d4a)",
              boxShadow: "0 16px 48px rgba(58,158,95,.3)",
            }}
          >
            🚀
          </div>

          <h2
            className="m-0 font-extrabold"
            style={{
              fontFamily: "'geometric', sans-serif",
              fontSize: "clamp(32px,7.5vw,64px)",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "#10241a",
            }}
          >
            Every Great Brand Started with a{" "}
            <span style={{ color: "#3a9e5f" }}>Bold Vision</span>
          </h2>

          <p
            className="m-0"
            style={{
              fontSize: "clamp(15px,2.6vw,20px)",
              lineHeight: 1.75,
              fontWeight: 400,
              color: "#3f5a4d",
              maxWidth: "min(620px,100%)",
            }}
          >
            In a world where <strong style={{ fontWeight: 700, color: "#2d7a52" }}>attention is the new currency</strong>, your
            digital presence isn&apos;t just nice to have—it&apos;s your most
            powerful business asset. The companies winning today aren&apos;t
            just selling products, they&apos;re building experiences that
            captivate and convert.
          </p>
        </div>
      </section>
    </>
  );
}