"use client";

export default function WebDevPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-8">
      <div className="max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4">Web Development</h1>
        <p className="text-lg text-slate-300 mb-8">
          This page is under construction. Here you can add web development services, portfolio projects, and feature highlights.
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          <li className="rounded-2xl bg-slate-900/80 border border-white/10 p-5">
            <h2 className="font-semibold text-white">Modern UI</h2>
            <p className="mt-2 text-slate-300">Responsive interfaces built with React and Tailwind CSS.</p>
          </li>
          <li className="rounded-2xl bg-slate-900/80 border border-white/10 p-5">
            <h2 className="font-semibold text-white">E-commerce</h2>
            <p className="mt-2 text-slate-300">Scalable stores and digital experiences for online sales.</p>
          </li>
          <li className="rounded-2xl bg-slate-900/80 border border-white/10 p-5">
            <h2 className="font-semibold text-white">Web Apps</h2>
            <p className="mt-2 text-slate-300">Fast, accessible apps optimized for performance and SEO.</p>
          </li>
          <li className="rounded-2xl bg-slate-900/80 border border-white/10 p-5">
            <h2 className="font-semibold text-white">SEO Friendly</h2>
            <p className="mt-2 text-slate-300">Built to rank with semantic HTML and best practices.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
