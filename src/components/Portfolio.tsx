import { motion } from "framer-motion";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ArrowRight,
  Brain, Sparkles, Code2, Cpu, Database, Bot, Network, Zap,
  GraduationCap, Award, Trophy, Briefcase, ExternalLink, ChevronUp, Send,
  MessageSquare, FileSearch, HeartHandshake, BookOpen, PenSquare,
  ScanText, ClipboardCheck, Layers3, Workflow, BrainCircuit,
  Car, BarChart3, Film, Leaf, Keyboard, Route as RouteIcon, Compass,
  Archive, SearchCode,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { sendContactMessage } from "@/lib/contact.functions";

/* ---------- Typing effect ---------- */
function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, text.length + 1));
        if (text.length + 1 === w.length) setTimeout(() => setDel(true), 1400);
      } else {
        setText(w.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDel(false);
          setI(i + 1);
        }
      }
    }, del ? 40 : 80);
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className="gradient-text">
      {text}
      <span className="animate-blink text-primary">|</span>
    </span>
  );
}

/* ---------- Counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{n}{suffix}</span>;
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onS);
    return () => window.removeEventListener("scroll", onS);
  }, []);
  const links = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 shadow-lg ring-1 ring-white/10 glow">
            <img
              src="/profile.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </span>
          Faizan khan <span className="text-primary">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm gradient-primary text-white font-medium hover:opacity-90 transition"
        >
          Hire Me <ArrowRight className="w-4 h-4" />
        </a>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-foreground" />
            <span className="block w-6 h-0.5 bg-foreground" />
          </div>
        </button>
      </div>
      {open && (
        <div className="md:hidden glass-strong mt-2 mx-4 rounded-xl p-4 space-y-2">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-muted-foreground hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const floats = [
    { Icon: Brain, x: "10%", y: "20%", d: 0 },
    { Icon: Bot, x: "85%", y: "25%", d: 1 },
    { Icon: Network, x: "15%", y: "75%", d: 2 },
    { Icon: Cpu, x: "82%", y: "70%", d: 1.5 },
    { Icon: Database, x: "50%", y: "12%", d: 0.5 },
    { Icon: Zap, x: "92%", y: "50%", d: 2.5 },
  ];
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute inset-0 pointer-events-none">
        {floats.map(({ Icon, x, y, d }, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{ left: x, top: y, animationDelay: `${d}s` }}
          >
            <Icon className="w-8 h-8 text-primary" />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-glow-pulse" />
            Available for AI projects worldwide
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
            <span className="gradient-text">AI Engineer</span>
            <br />
            <span className="text-foreground">& </span>
            <Typewriter
              words={[
                "Generative AI Specialist",
                "LLM Application Builder",
                "RAG Pipeline Architect",
                "Python ML Engineer",
              ]}
            />
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Building intelligent AI systems, LLM applications, RAG pipelines, chatbots, automation
            tools, and scalable machine learning solutions.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-primary text-white font-medium glow hover:opacity-90 transition"
            >
              Contact Me <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-foreground font-medium hover:border-primary/50 transition"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
            <a
              href="https://github.com/faizankhanfreelancer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:border-primary/50 transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/faizankhan-cs/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass hover:border-primary/50 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto group"
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] animate-float">
            {/* Animated background glow */}
            <div className="absolute -inset-10 rounded-full gradient-primary opacity-30 blur-3xl animate-glow-pulse" />
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-primary via-accent to-primary opacity-60 blur-2xl animate-glow-pulse" />

            {/* Rotating gradient ring */}
            <div className="absolute -inset-1 rounded-full animate-spin-slow opacity-80" style={{ background: "conic-gradient(from 0deg, var(--primary), var(--accent), var(--primary))" }} />

            {/* Glassmorphism profile frame */}
            <div className="absolute inset-0 rounded-full gradient-primary p-[3px] glow">
              <div className="relative w-full h-full rounded-full overflow-hidden glass-strong">
                <img
                  src="/profile.png"
                  alt="Faizan Khan — AI Engineer"
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full ring-1 ring-white/10 pointer-events-none" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-background/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating AI icons */}
            {[Brain, Sparkles, Code2, Bot, Cpu].map((I, idx) => (
              <div
                key={idx}
                className="absolute glass rounded-2xl p-3 animate-float shadow-lg"
                style={{
                  top: ["-8%", "38%", "88%", "10%", "70%"][idx],
                  left: ["82%", "-14%", "68%", "-10%", "92%"][idx],
                  animationDelay: `${idx * 0.6}s`,
                }}
              >
                <I className="w-5 h-5 text-primary" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Section header ---------- */
function SectionTitle({ tag, title, desc }: { tag: string; title: string; desc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-14"
    >
      <div className="inline-block glass px-3 py-1 rounded-full text-xs text-primary mb-4">{tag}</div>
      <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">{title}</h2>
      {desc && <p className="text-muted-foreground">{desc}</p>}
    </motion.div>
  );
}

/* ---------- About ---------- */
function About() {
  const stats = [
    { n: 3, s: "+", label: "Years Experience" },
    { n: 25, s: "+", label: "Projects Completed" },
    { n: 5, s: "+", label: "Certifications" },
    { n: 10, s: "+", label: "AI Models Deployed" },
  ];
  return (
    <section id="about" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle tag="About" title="Engineering intelligence into products" />
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div className="glass-strong rounded-3xl p-8 md:p-10 card-glow">
            <p className="text-lg leading-relaxed text-muted-foreground">
              AI engineer and computer science graduate specializing in artificial intelligence from{" "}
              <span className="text-foreground font-medium">UET Mardan</span> with{" "}
              <span className="text-primary font-medium">3+ years</span> of hands-on experience in
              Python, machine learning, deep learning, NLP, generative AI, RAG systems, AI agents,
              and scalable AI applications.
            </p>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Passionate about solving real-world problems using intelligent systems, automation,
              and modern AI technologies — delivering production-grade solutions for startups and
              international clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Python", "LangChain", "RAG", "LLMs", "FastAPI", "PyTorch"].map((t) => (
                <span key={t} className="text-xs px-3 py-1 rounded-full glass text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 card-glow"
              >
                <div className="text-4xl font-bold gradient-text">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const groups = [
    {
      icon: Code2,
      title: "Programming & Frameworks",
      items: ["Python", "C++", "FastAPI", "LangChain", "LangGraph", "Hugging Face", "TensorFlow", "PyTorch", "Scikit-Learn"],
    },
    {
      icon: Brain,
      title: "AI & Machine Learning",
      items: ["Machine Learning", "Deep Learning", "NLP", "Generative AI", "LLMs", "RAG Pipelines", "AI Agents", "Prompt Engineering", "Fine-Tuning", "Neural Networks"],
    },
    {
      icon: Database,
      title: "Tools & Platforms",
      items: ["GitHub", "VS Code", "Jupyter", "OpenAI API", "Gemini API", "Groq API", "FAISS", "Vector DBs"],
    },
    {
      icon: Network,
      title: "DSA & Algorithms",
      items: ["A* Algorithm", "Dijkstra", "Trees", "Linked Lists", "Huffman Coding", "Greedy", "Optimization"],
    },
  ];
  return (
    <section id="skills" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle tag="Skills" title="A modern AI toolbox" desc="Stack I use to build production AI systems." />
        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong rounded-2xl p-7 card-glow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-xl gradient-primary grid place-items-center glow">
                  <g.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="text-sm px-3 py-1.5 rounded-lg glass border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Experience ---------- */
function Experience() {
  const xp = [
    {
      role: "Junior AI Engineer",
      company: "AlgoHub",
      time: "Oct 2025 – Present",
      icon: Brain,
      status: "Current",
      bullets: ["AI automation systems", "Multi-agent workflows", "RAG pipelines", "LangChain & FastAPI systems", "LLM microservices", "Scalable AI backend systems"],
      stack: ["LangChain", "FastAPI", "RAG", "LLMs", "Python"],
    },
    {
      role: "AI Developer",
      company: "Arch Technology",
      time: "Jul 2025 – Aug 2025",
      icon: Bot,
      bullets: ["Generative AI apps", "LangGraph workflows", "AI chatbots", "Recommendation systems", "Prompt engineering"],
      stack: ["LangGraph", "GenAI", "OpenAI", "Prompting"],
    },
    {
      role: "Developer Intern",
      company: "Developer Hub",
      time: "Jun 2025 – Jul 2025",
      icon: Cpu,
      bullets: ["ML pipelines", "AI automation", "Real-time ML solutions"],
      stack: ["Python", "ML", "Automation"],
    },
    {
      role: "Freelance AI Developer",
      company: "Self-employed",
      time: "3+ Years",
      icon: Sparkles,
      bullets: ["AI systems", "NLP projects", "Dashboards", "ML optimization", "End-to-end deployment"],
      stack: ["NLP", "ML", "Deployment", "Dashboards"],
    },
  ];
  return (
    <section id="experience" className="relative py-28">
      <div className="absolute inset-0 -z-10 opacity-40 [background:radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--primary)_15%,transparent),transparent_70%)]" />
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle tag="Experience" title="Where I've shipped AI" />
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">
          {xp.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative h-full"
              >
                {/* Gradient glow border */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/60 via-accent/30 to-transparent opacity-60 group-hover:opacity-100 blur-[1px] transition-opacity" />
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                <div className="relative h-full glass-strong rounded-2xl p-7 flex flex-col overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                  {/* Decorative gradient corner */}
                  <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-accent/0 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

                  <div className="relative flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-xl gradient-primary blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
                        <div className="relative w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg lg:text-xl font-bold leading-tight">{e.role}</h3>
                        <div className="text-sm text-primary/90 font-medium">{e.company}</div>
                      </div>
                    </div>
                    {e.status && (
                      <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {e.status}
                      </span>
                    )}
                  </div>

                  <div className="relative inline-flex items-center gap-2 text-xs text-muted-foreground mb-5">
                    <Briefcase className="w-3.5 h-3.5 text-primary" />
                    <span>{e.time}</span>
                  </div>

                  <ul className="relative space-y-2 text-sm text-muted-foreground flex-1">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 items-start">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full gradient-primary shrink-0" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
                    {e.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-foreground/80 hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
type Project = {
  title: string;
  cat: string;
  tags: string[];
  icon: LucideIcon;
  gradient: string; // tailwind from-... via-... to-...
};
const PROJECTS: Project[] = [
  { title: "AI Chatbots using LLMs", cat: "AI", tags: ["OpenAI", "LangChain"], icon: MessageSquare, gradient: "from-violet-500 via-fuchsia-500 to-pink-500" },
  { title: "AI Resume Screening System", cat: "AI", tags: ["NLP", "Python"], icon: FileSearch, gradient: "from-sky-500 via-blue-500 to-indigo-600" },
  { title: "Mental Health Chatbot", cat: "AI", tags: ["LLM", "Therapy"], icon: HeartHandshake, gradient: "from-rose-500 via-pink-500 to-fuchsia-500" },
  { title: "AI Study Assistant", cat: "AI", tags: ["RAG", "FastAPI"], icon: BookOpen, gradient: "from-amber-500 via-orange-500 to-red-500" },
  { title: "LinkedIn Reply Agent", cat: "AI", tags: ["Agents", "Automation"], icon: Linkedin, gradient: "from-sky-600 via-blue-600 to-cyan-500" },
  { title: "Twitter/X Post Generator", cat: "AI", tags: ["GenAI", "LLM"], icon: PenSquare, gradient: "from-slate-400 via-zinc-500 to-slate-700" },
  { title: "OCR Text Extraction", cat: "NLP", tags: ["Vision", "OCR"], icon: ScanText, gradient: "from-emerald-500 via-teal-500 to-cyan-500" },
  { title: "UPSC Essay Evaluation System", cat: "NLP", tags: ["LLM", "Eval"], icon: ClipboardCheck, gradient: "from-indigo-500 via-purple-500 to-pink-500" },
  { title: "PDF Conversational RAG Chatbot", cat: "RAG", tags: ["FAISS", "LangChain"], icon: Database, gradient: "from-blue-500 via-indigo-500 to-violet-600" },
  { title: "Groq-based High-Speed RAG", cat: "RAG", tags: ["Groq", "RAG"], icon: Zap, gradient: "from-yellow-400 via-amber-500 to-orange-500" },
  { title: "Semantic Search Engine", cat: "RAG", tags: ["Vectors", "Embeddings"], icon: Layers3, gradient: "from-cyan-500 via-sky-500 to-blue-600" },
  { title: "LangGraph Multi-Agent Chatbot", cat: "AI", tags: ["LangGraph", "Agents"], icon: Workflow, gradient: "from-fuchsia-500 via-purple-500 to-indigo-600" },
  { title: "Medical LLM Fine-Tuning (QLoRA)", cat: "RAG", tags: ["QLoRA", "PyTorch"], icon: BrainCircuit, gradient: "from-red-500 via-rose-500 to-pink-600" },
  { title: "Car Price Prediction", cat: "ML", tags: ["Regression", "Sklearn"], icon: Car, gradient: "from-orange-500 via-red-500 to-rose-600" },
  { title: "Customer Churn Prediction", cat: "ML", tags: ["Classification"], icon: BarChart3, gradient: "from-emerald-500 via-green-500 to-teal-600" },
  { title: "Movie Recommendation System", cat: "ML", tags: ["RecSys"], icon: Film, gradient: "from-purple-500 via-violet-500 to-indigo-600" },
  { title: "Crop Disease Detection", cat: "ML", tags: ["CNN", "Vision"], icon: Leaf, gradient: "from-lime-500 via-green-500 to-emerald-600" },
  { title: "Next Word Prediction", cat: "NLP", tags: ["LSTM", "NLP"], icon: Keyboard, gradient: "from-teal-500 via-cyan-500 to-sky-600" },
  { title: "Route Optimization", cat: "DSA", tags: ["Dijkstra"], icon: RouteIcon, gradient: "from-blue-500 via-cyan-500 to-emerald-500" },
  { title: "Robot Path Planning", cat: "DSA", tags: ["A*"], icon: Compass, gradient: "from-indigo-500 via-blue-500 to-sky-500" },
  { title: "Huffman Compression", cat: "DSA", tags: ["Greedy"], icon: Archive, gradient: "from-zinc-500 via-slate-500 to-stone-600" },
  { title: "Smart Search Engine", cat: "DSA", tags: ["Trie"], icon: SearchCode, gradient: "from-pink-500 via-rose-500 to-red-500" },
];
const CATS = ["All", "AI", "ML", "NLP", "RAG", "DSA"];

function Projects() {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === cat);
  return (
    <section id="projects" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle tag="Projects" title="Selected work" desc="Production AI systems and shipped experiments." />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 text-sm rounded-full transition ${
                cat === c
                  ? "gradient-primary text-white glow"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 9) * 0.04 }}
                whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
                style={{ transformPerspective: 1000 }}
                className="group relative rounded-2xl"
              >
                {/* Animated glowing border */}
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-500`} />
                <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${p.gradient} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative glass-strong rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Visual header */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br opacity-30 blur-3xl group-hover:opacity-60 transition-opacity duration-500"
                         style={{ backgroundImage: `linear-gradient(135deg, var(--primary), var(--accent))` }} />

                    {/* Floating glowing icon */}
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${p.gradient} blur-xl opacity-60 group-hover:opacity-100 animate-pulse`} />
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${p.gradient} grid place-items-center shadow-xl shadow-black/40 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                          <Icon className="w-8 h-8 text-white drop-shadow-lg" strokeWidth={1.8} />
                        </div>
                      </div>
                    </div>

                    <span className="absolute top-3 right-3 text-[10px] tracking-widest px-2 py-1 rounded-full glass text-primary border border-primary/30">
                      {p.cat}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold mb-3 group-hover:text-primary transition leading-snug">
                      {p.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className={`text-[11px] px-2 py-0.5 rounded-md bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent border border-white/10 bg-white/5 transition-all duration-300 hover:border-primary/50`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <a
                        href="https://github.com/faizankhanfreelancer"
                        target="_blank" rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg glass hover:border-primary/50 transition"
                      >
                        <Github className="w-3.5 h-3.5" /> Code
                      </a>
                      <a
                        href="#"
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-gradient-to-r ${p.gradient} text-white shadow-lg shadow-black/30 hover:shadow-xl hover:scale-[1.02] transition`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Education ---------- */
function Education() {
  const courses = ["Data Structures", "OOP", "Probability & Statistics", "Linear Algebra", "Differential Equations"];
  return (
    <section id="education" className="relative py-28">
      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle tag="Education" title="Academic foundation" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-8 md:p-10 card-glow"
        >
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl gradient-primary grid place-items-center glow shrink-0">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">UET Mardan</h3>
              <p className="text-muted-foreground">Bachelor of Science in Computer Science</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-xs px-3 py-1 rounded-full glass text-primary">Specialization: Artificial Intelligence</span>
                <span className="text-xs px-3 py-1 rounded-full glass text-accent">CGPA: 2.9</span>
              </div>
              <div className="mt-6">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Relevant Coursework</div>
                <div className="flex flex-wrap gap-2">
                  {courses.map((c) => (
                    <span key={c} className="text-sm px-3 py-1.5 rounded-lg bg-secondary text-foreground">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Certifications ---------- */
function Certifications() {
  const certs = [
    { title: "Machine Learning Internship", year: "2024–2025" },
    { title: "Generative AI Certification", year: "2024–2025" },
    { title: "FastAPI Course", year: "2024–2025" },
    { title: "AI Agent Course", year: "2024–2025" },
    { title: "Developer Hub ML Certification", year: "2024–2025" },
    { title: "IBM Machine Learning with Python", year: "2025–2026" },
    { title: "Generative AI for All — Physics Wallah & Microsoft", year: "2025–2026" },
    { title: "Machine Learning Fundamentals — NeuroFive Solutions", year: "2025–2026" },
    { title: "Generative AI Internship — Decode Labs", year: "2025–2026" },
    { title: "AI Agents & Automation — AlgoHub", year: "2025–2026" },
    { title: "Top-Performing Intern — AlgoHub", year: "2025–2026" },
  ];
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle tag="Certifications" title="Verified credentials" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-strong rounded-2xl p-6 card-glow flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary grid place-items-center glow shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-xs text-muted-foreground mt-1">Verified · {c.year}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Achievements ---------- */
function Achievements() {
  const items = [
    { icon: Trophy, label: "Class Head", value: 2, suffix: " Yrs" },
    { icon: Sparkles, label: "Photographer – Southern Society", value: 1, suffix: "" },
    { icon: Briefcase, label: "AI Internships", value: 3, suffix: "+" },
    { icon: Zap, label: "Years Freelancing", value: 3, suffix: "+" },
  ];
  return (
    <section className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle tag="Achievements" title="Milestones along the way" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-strong rounded-2xl p-6 text-center card-glow"
            >
              <div className="w-12 h-12 rounded-xl gradient-primary grid place-items-center glow mx-auto mb-4">
                <it.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold gradient-text">
                <Counter to={it.value} suffix={it.suffix} />
              </div>
              <div className="text-xs text-muted-foreground mt-2">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting") return;

    const data = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    const problem = !data.name
      ? "Please enter your name."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
        ? "Please enter a valid email address."
        : !data.message
          ? "Please enter a message."
          : data.message.length > 5000
            ? "Your message is too long (5000 characters maximum)."
            : "";
    if (problem) {
      setStatus("error");
      setFeedback(problem);
      return;
    }

    setStatus("submitting");
    setFeedback("");
    try {
      const result = await sendContactMessage({ data });
      if (result.ok) {
        setStatus("success");
        setFeedback("Message sent. Thanks for reaching out, I'll get back to you soon.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setFeedback(result.error);
      }
    } catch {
      setStatus("error");
      setFeedback(
        "Your message couldn't be sent. Check your connection and try again, or email iamfaizankhanca@gmail.com directly.",
      );
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle tag="Contact" title="Let's build something intelligent" desc="Open to AI engineering roles, freelance projects, and collaborations." />
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass-strong rounded-3xl p-8 card-glow space-y-5">
            {[
              { Icon: Mail, label: "Email", value: "iamfaizankhanca@gmail.com", href: "mailto:iamfaizankhanca@gmail.com" },
              { Icon: Phone, label: "Phone", value: "+92 315 1258331", href: "tel:+923151258331" },
              { Icon: MapPin, label: "Location", value: "Mardan, Pakistan" },
              { Icon: Github, label: "GitHub", value: "github.com/faizankhanfreelancer", href: "https://github.com/faizankhanfreelancer" },
              { Icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/faizankhan-cs", href: "https://linkedin.com/in/faizankhan-cs/" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 p-3 -mx-3 rounded-xl hover:bg-secondary/50 transition group"
              >
                <div className="w-11 h-11 rounded-xl glass grid place-items-center group-hover:gradient-primary transition">
                  <c.Icon className="w-5 h-5 text-primary group-hover:text-white" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</div>
                  <div className="text-sm font-medium">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass-strong rounded-3xl p-8 card-glow space-y-4"
          >
            {[
              { name: "name", label: "Your Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-xs text-muted-foreground uppercase tracking-wider">{f.label}</label>
                <input
                  required
                  name={f.name}
                  value={form[f.name as "name" | "email"]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  type={f.type}
                  className="mt-1 w-full bg-input/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
                />
              </div>
            ))}
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Message</label>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="mt-1 w-full bg-input/50 border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl gradient-primary text-white font-medium glow hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending…" : "Send Message"} <Send className="w-4 h-4" />
            </button>
            {feedback && (
              <p
                role={status === "error" ? "alert" : "status"}
                className={`text-sm ${status === "success" ? "text-primary" : "text-destructive"}`}
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-border/60 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="w-7 h-7 rounded-lg gradient-primary grid place-items-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </span>
          Faizan Khan
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Faizan Khan. Crafted with AI & care.
        </div>
        <div className="flex gap-3">
          <a href="https://github.com/faizankhanfreelancer" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg glass grid place-items-center hover:border-primary/50">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/faizankhan-cs/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg glass grid place-items-center hover:border-primary/50">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:iamfaizankhanca@gmail.com" className="w-9 h-9 rounded-lg glass grid place-items-center hover:border-primary/50">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Scroll-to-top + cursor glow ---------- */
function FloatingUI() {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onS = () => setShow(window.scrollY > 600);
    const onM = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onS);
    window.addEventListener("mousemove", onM);
    return () => {
      window.removeEventListener("scroll", onS);
      window.removeEventListener("mousemove", onM);
    };
  }, []);
  return (
    <>
      <div
        className="pointer-events-none fixed z-0 w-[400px] h-[400px] rounded-full opacity-40 blur-3xl transition-transform duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.25 295 / 30%), transparent 70%)",
          transform: `translate(${pos.x - 200}px, ${pos.y - 200}px)`,
        }}
      />
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full gradient-primary glow grid place-items-center text-white hover:scale-110 transition"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}

export default function Portfolio() {
  return (
    <div className="dark relative bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <FloatingUI />
    </div>
  );
}
