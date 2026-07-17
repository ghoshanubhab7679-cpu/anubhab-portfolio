"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, ArrowRight, Play, Sparkles, Mail, Phone, Camera, Send, Menu, X } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles as DreiSparkles, OrbitControls } from "@react-three/drei";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createRef, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  "AI Video Production",
  "AI Commercial Ads",
  "AI Short Films",
  "AI Cartoon Videos",
  "Graphic Design",
  "Branding",
  "Motion Graphics",
  "Photoshop",
  "Illustrator",
  "Premiere Pro",
  "After Effects",
];

const services = [
  { title: "AI Commercial Videos", desc: "High-converting cinematic campaigns crafted for modern brands." },
  { title: "AI Product Ads", desc: "Fast, stylish product storytelling with striking visual polish." },
  { title: "AI Short Films", desc: "Emotion-led short-form narratives with a premium cinematic finish." },
  { title: "Motion Graphics", desc: "Bold kinetic design systems that turn ideas into motion." },
  { title: "Graphic Design", desc: "Visual identities and layouts with crisp detail and luxury taste." },
  { title: "Brand Identity", desc: "Memorable design systems that feel elevated and timeless." },
];

const projects = [
  { slug: "neon-commerce-launch", title: "Neon Commerce Launch", category: "AI Ads", tag: "Brand Film" },
  { slug: "lumen-short-story", title: "Lumen Short Story", category: "AI Short Films", tag: "Narrative" },
  { slug: "pulse-motion-reel", title: "Pulse Motion Reel", category: "Motion Graphics", tag: "Reel" },
  { slug: "drift-cartoon-series", title: "Drift Cartoon Series", category: "AI Cartoons", tag: "Animation" },
];

const testimonials = [
  { quote: "Anubhab brought cinematic energy and precision to our launch. The work looked like it belonged on a global stage.", author: "Mina K., Brand Director" },
  { quote: "Every frame felt intentional, premium, and instantly marketable. The process was smooth and incredibly fast.", author: "Rafael L., Founder" },
  { quote: "He transformed our concept into something sharp, emotional, and unforgettable.", author: "Talia S., Creative Lead" },
];

function NeonOrb() {
  const meshRef = useMemo(() => createRef<THREE.Mesh>(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.8;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <icosahedronGeometry args={[1, 4]} />
      <meshPhysicalMaterial color="#5ee7ff" emissive="#2b7fff" emissiveIntensity={1.1} roughness={0.15} metalness={0.2} transparent opacity={0.8} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#03060a"]} />
      <fog attach="fog" args={["#03060a", 2, 12]} />
      <ambientLight intensity={0.65} />
      <pointLight position={[0, 3, 4]} intensity={5} color="#62d7ff" />
      <pointLight position={[4, -2, 2]} intensity={4} color="#8f5dff" />
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <NeonOrb />
      </Float>
      <DreiSparkles count={120} scale={4} size={2.2} speed={0.4} opacity={0.45} color="#7defff" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
    </>
  );
}

function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

  useLenis();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    const onMove = (event: MouseEvent) => setCursorPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    const ctx = gsap.context(() => {
      gsap.from(".reveal", { opacity: 0, y: 40, duration: 1.1, stagger: 0.14, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
        gsap.fromTo(panel, { opacity: 0.35, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: panel, start: "top 80%" } });
      });
    });
    return () => { clearTimeout(timer); window.removeEventListener("mousemove", onMove); ctx.revert(); };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === "light" ? "bg-[#f5f7ff] text-[#050505]" : "bg-[#050505] text-white"}`}>
      <motion.div className="pointer-events-none fixed inset-0 z-[70]"
        animate={{ x: cursorPosition.x - 16, y: cursorPosition.y - 16 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        <div className="h-8 w-8 rounded-full border border-cyan-300/70 bg-cyan-300/10 backdrop-blur-sm" />
      </motion.div>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#03060a]">
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-full border border-cyan-400/30 bg-white/5 px-8 py-5 backdrop-blur-2xl">
              <div className="text-center text-sm uppercase tracking-[0.5em] text-cyan-300">Anubhab Ghosh</div>
              <div className="mt-3 h-1 w-40 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl ${theme === "light" ? "border-black/10 bg-[#f5f7ff]/80" : "border-white/10 bg-[#050505]/70"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="text-lg font-semibold tracking-[0.3em] text-cyan-400">ANUBHAB</div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <a href="#about" className={`transition ${theme === "light" ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"}`}>About</a>
            <a href="#portfolio" className={`transition ${theme === "light" ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"}`}>Portfolio</a>
            <a href="#services" className={`transition ${theme === "light" ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"}`}>Services</a>
            <a href="#contact" className={`transition ${theme === "light" ? "text-black/70 hover:text-black" : "text-white/70 hover:text-white"}`}>Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`rounded-full border px-3 py-2 text-sm ${theme === "light" ? "border-black/10 bg-white/80" : "border-white/20 bg-white/10"}`}>{theme === "dark" ? "☀︎" : "☾"}</button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`rounded-full border p-2 md:hidden ${theme === "light" ? "border-black/10 bg-white/80" : "border-white/20 bg-white/10"}`}>
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && <div className={`border-t px-6 py-4 text-sm md:hidden ${theme === "light" ? "border-black/10 bg-[#f5f7ff]/95" : "border-white/10 bg-[#050505]/95"}`}>
          <div className="flex flex-col gap-3">
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a><a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </div>
        </div>}
      </header>

      <main>
        <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-24 lg:px-10">
          <div className="absolute inset-0">
            <Canvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 42 }}>
              <Scene />
            </Canvas>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(94,231,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(143,93,255,0.22),transparent_32%)]" />
          <div className="relative z-10 mx-auto grid max-w-7xl flex-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="reveal">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                <Sparkles size={16} /> AI Creator • Graphic Designer • Motion Graphics Artist
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
                Anubhab <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">Ghosh</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
                I build cinematic AI-driven stories, premium ads, motion systems, and visual identities that feel luxurious, fast, and unforgettable.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#portfolio" className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:scale-[1.02]">View Portfolio</a>
                <a href="#contact" className="rounded-full border border-white/20 bg-white/10 px-6 py-3 font-medium backdrop-blur-xl transition hover:scale-[1.02]">Contact Me</a>
                <a href="mailto:anubhabghosh@email.com" className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 font-medium text-cyan-200 transition hover:scale-[1.02]">Book a Call</a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }} className="panel rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_0_120px_rgba(95,255,242,0.12)] backdrop-blur-2xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-[#04070d]/80 p-6">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Selected Focus</span><span>2026</span>
                </div>
                <div className="mt-6 grid gap-4">
                  {[
                    ["AI Video Creator", "Cinematic storytelling"],
                    ["AI Ads Creator", "Launch-ready campaigns"],
                    ["Motion Graphics", "Elevated motion systems"],
                  ].map(([title, desc]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-lg font-semibold">{title}</div>
                      <div className="mt-1 text-sm text-white/60">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="panel grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">About Me</p>
              <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">A multidisciplinary creative shaping ideas into striking digital reality.</h2>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur-2xl">
              <p className="text-lg leading-8 text-white/70">
                I blend AI-powered video creation, graphic design, and motion systems into premium work for brands that want impact. My process is rooted in storytelling, speed, and meticulous craft—making every project feel cinematic and conversion-ready.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  ["8+", "Years crafting visuals"],
                  ["100+", "Launch-ready projects"],
                  ["24/7", "Creative support"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-[#060913] p-4 text-center">
                    <div className="text-2xl font-semibold text-cyan-300">{value}</div>
                    <div className="mt-1 text-sm text-white/60">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="panel rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 backdrop-blur-2xl">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Skills</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">A premium toolkit built for modern storytelling.</h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {skills.map((skill, index) => (
                <motion.div key={skill} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="rounded-[1.4rem] border border-white/10 bg-[#060913]/80 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{skill}</h3>
                    <BadgeCheck className="text-cyan-300" size={18} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="portfolio" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Featured Projects</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Select work built to impress ambitious brands.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {["All", "AI Ads", "AI Short Films", "AI Cartoons", "Motion Graphics"].map((filter) => (
                <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full border px-4 py-2 text-sm transition ${activeFilter === filter ? "border-cyan-400 bg-cyan-400/15 text-cyan-200" : "border-white/10 bg-white/5 text-white/70"}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project, index) => (
              <motion.article key={project.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group panel cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl" onClick={() => setSelectedProject(project)}>
                <div className="h-64 bg-[radial-gradient(circle_at_top_left,rgba(94,231,255,0.22),transparent_35%),linear-gradient(120deg,#09101c,#252b4a)]" />
                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-200">{project.category}</span>
                    <span className="text-sm text-white/60">{project.tag}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-white/70">A polished creative execution blending cinematic storytelling, premium UI rhythm, and elevated motion language.</p>
                  <div className="mt-6 flex items-center gap-3 text-sm text-cyan-200">
                    <Link href={`/projects/${project.slug}`} className="flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
                      <span>Explore Case Study</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Services</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Crafted services for modern creatives, founders, and agencies.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="rounded-[1.7rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl">
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 p-3 text-cyan-200"><Play size={16} /></div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/70">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="panel rounded-[2rem] border border-white/10 bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 p-8 backdrop-blur-2xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Why Hire Me</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Creative intelligence, fast execution, and detail that elevates every frame.</h2>
              </div>
              <div className="grid gap-4">
                {[
                  ["Creativity", "Concepts that feel fresh, cinematic, and strategically sharp."],
                  ["Problem Solving", "Clear thinking and visual solutions under pressure."],
                  ["Communication", "Seamless collaboration from brief to final delivery."],
                  ["Speed", "Fast turnarounds without sacrificing visual quality."],
                ].map(([title, text]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-[#05070d]/80 p-4">
                    <div className="font-semibold">{title}</div>
                    <div className="mt-1 text-sm text-white/70">{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Testimonials</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Trusted by founders, marketers, and dreamers.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <motion.div key={item.author} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07 }} className="rounded-[1.7rem] border border-white/10 bg-white/5 p-7 backdrop-blur-2xl">
                <div className="text-lg leading-8 text-white/75">“{item.quote}”</div>
                <div className="mt-6 text-sm text-cyan-200">{item.author}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">FAQ</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Questions clients ask before hiring me.</h2>
              </div>
              <div className="space-y-4">
                {[
                  ["How fast can you deliver?", "Usually within a few days for short-form concepts and within a week for larger campaigns."],
                  ["Do you work with AI and traditional design?", "Yes. I blend AI-driven creation with refined graphic and motion design to deliver premium output."],
                  ["Can you adapt to brand tone?", "Absolutely. I tailor visual language to feel aligned with your brand identity and audience."],
                ].map(([question, answer]) => (
                  <div key={question} className="rounded-2xl border border-white/10 bg-[#060913]/80 p-4">
                    <div className="font-semibold">{question}</div>
                    <div className="mt-2 text-sm leading-7 text-white/70">{answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
          <div className="rounded-[2.2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/5 to-purple-400/10 p-8 backdrop-blur-2xl">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Contact</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Let’s create something beautiful, sharp, and impossible to ignore.</h2>
                <div className="mt-8 space-y-4 text-white/70">
                  <a href="mailto:anubhabghosh@email.com" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#060913]/80 p-4"><Mail size={18} /> anubhabghosh@email.com</a>
                  <a href="tel:+919999999999" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#060913]/80 p-4"><Phone size={18} /> +91 99999 99999</a>
                  <div className="flex gap-3">
                    <a href="#" className="rounded-full border border-white/10 bg-[#060913]/80 p-3"><Send size={18} /></a>
                    <a href="#" className="rounded-full border border-white/10 bg-[#060913]/80 p-3"><Camera size={18} /></a>
                    <a href="#" className="rounded-full border border-white/10 bg-[#060913]/80 p-3"><Mail size={18} /></a>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.8rem] border border-white/10 bg-[#060913]/85 p-6">
                <div className="text-2xl font-semibold">Let’s work together</div>
                <p className="mt-3 text-sm leading-7 text-white/70">Whether it is a campaign, a product launch, or a cinematic short, I’m ready to build something memorable and high-impact.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#contact" className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black">Start a Project</a>
                  <a href="mailto:anubhabghosh@email.com" className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium">Book a Call</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/55 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Anubhab Ghosh. Crafted for brands and visionaries.</span>
          <span>AI Creator • Visual Designer • Motion Storyteller</span>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] flex items-center justify-center bg-[#03060a]/90 px-4 py-8 backdrop-blur-xl" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.25 }} className="w-full max-w-3xl rounded-[2rem] border border-white/10 bg-[#080b14] p-6 shadow-[0_0_80px_rgba(94,231,255,0.15)]" onClick={(event) => event.stopPropagation()}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Case Study</p>
                  <h3 className="mt-2 text-3xl font-semibold">{selectedProject.title}</h3>
                </div>
                <button onClick={() => setSelectedProject(null)} className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm">Close</button>
              </div>
              <div className="mt-6 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10 p-5">
                  <div className="h-40 rounded-[1.2rem] bg-[radial-gradient(circle_at_top_left,rgba(94,231,255,0.23),transparent_30%),linear-gradient(120deg,#08111f,#242b4e)]" />
                  <p className="mt-4 text-sm leading-7 text-white/70">A premium visual concept blending cinematic atmosphere, strategic messaging, and polished motion design to create launch-ready storytelling.</p>
                </div>
                <div className="space-y-3 text-sm text-white/70">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-cyan-300">Tools Used</span><div className="mt-2">Midjourney, Runway, Premiere Pro, After Effects</div></div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-cyan-300">Challenge</span><div className="mt-2">Translate a bold brand concept into a high-impact, AI-enhanced visual narrative without losing authenticity.</div></div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><span className="text-cyan-300">Result</span><div className="mt-2">A cinematic, conversion-focused experience that feels premium, memorable, and ready for launch.</div></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
