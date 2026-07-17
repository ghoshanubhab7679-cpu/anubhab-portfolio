import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center backdrop-blur-2xl">
        <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">404</p>
        <h1 className="mt-4 text-4xl font-semibold">This page is not available.</h1>
        <p className="mt-4 text-white/70">The route you requested does not exist, but the portfolio is still ready to impress.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black">Return Home</Link>
      </div>
    </main>
  );
}
