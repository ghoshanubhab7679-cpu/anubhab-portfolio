import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] px-6 py-20 text-white lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm uppercase tracking-[0.4em] text-cyan-300">← Back Home</Link>
        <div className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">{project.category}</p>
              <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{project.title}</h1>
              <p className="mt-5 text-lg leading-8 text-white/70">{project.description}</p>
              <div className="mt-8 h-64 rounded-[1.6rem] bg-[radial-gradient(circle_at_top_left,rgba(94,231,255,0.23),transparent_35%),linear-gradient(120deg,#09101c,#252b4a)]" />
            </div>
            <div className="space-y-4 rounded-[1.6rem] border border-white/10 bg-[#060913]/85 p-6">
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Project Overview</div>
                <p className="mt-2 text-sm leading-7 text-white/70">{project.overview}</p>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Challenge</div>
                <p className="mt-2 text-sm leading-7 text-white/70">{project.challenge}</p>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Solution</div>
                <p className="mt-2 text-sm leading-7 text-white/70">{project.solution}</p>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Final Result</div>
                <p className="mt-2 text-sm leading-7 text-white/70">{project.result}</p>
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.3em] text-cyan-300">Tools Used</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
