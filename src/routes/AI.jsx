import NeuralShell from '../layout/NeuralShell.jsx';

function TagPill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-1 text-[10px] tracking-widest ring-1 ring-inset ring-white/10 bg-white/5 text-gray-200 select-none">
      {label}
    </span>
  );
}

function TagRow({ tags }) {
  if (!Array.isArray(tags) || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <TagPill key={tag} label={tag} />
      ))}
    </div>
  );
}

function TimelineRow({ label, title, body, tags }) {
  return (
    <article className="relative pl-8">
      <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-black ring-2 ring-white/10" />
      <div className="rounded-xl bg-black/50 ring-1 ring-white/10 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] tracking-widest text-gray-500 uppercase">{label}</p>
            <h3 className="mt-1 text-sm sm:text-base tracking-wide text-white">{title}</h3>
          </div>
          <TagRow tags={tags} />
        </div>
        <p className="mt-3 text-sm text-gray-300 leading-relaxed">{body}</p>
      </div>
    </article>
  );
}

export default function AI() {
  return (
    <NeuralShell
      prompt="~/portfolio/ai $"
      title="AI Mastering Learning Curve"
      subtitle="Chronological learning and engineering narrative."
    >
      <section className="rounded-xl bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-5">
        <div className="relative">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-5">
            <TimelineRow
              label="Row 1"
              title="Local LLM fundamentals and open-source experimentation"
              tags={['Linux', 'Ollama', 'Local LLMs', 'Open-source']}
              body="Started locally on Linux (Mint), installing Ollama to compare open-source local models with cloud LLMs. Focused on understanding model behavior, constraints, and where automation can replace repetitive manual scripting."
            />
            <TimelineRow
              label="Row 2"
              title="Prompt engineering + component generation workflows"
              tags={['Prompting', 'OpenAI', 'Claude', 'Components', 'UI automation']}
              body="Moved from experiments to structured prompting: generating UI components, shaping layouts, and iterating faster. Adopted OpenAI + Claude as production companions for rapid interface assembly and automation-driven polish."
            />
            <TimelineRow
              label="Row 3"
              title="CLI-driven orchestration with JSON payloads"
              tags={['Claude CLI', 'JSON payloads', 'AI-assisted dev', 'Orchestration']}
              body="Integrated Claude CLI and JSON payload workflows to drive repeatable changes across folders and components. This shifted the workflow from hand-written patches to AI-assisted system orchestration with predictable inputs and outputs."
            />
            <TimelineRow
              label="Row 4"
              title="Cloud fundamentals + workflow scaling"
              tags={['Azure', 'GitHub automation', 'Cloud fundamentals', 'Scaling']}
              body="Expanded into Azure learning for cloud fundamentals and operational discipline, while scaling development through GitHub automation and agentic workflows. Goal: reduce friction from idea → shipped system with stable release patterns."
            />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-black/40 ring-1 ring-cyan-400/20 px-5 py-5">
        <p className="text-[10px] tracking-widest text-cyan-200 uppercase">Roadmap</p>
        <h2 className="mt-2 text-base tracking-wide text-white">Next engineering targets</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg bg-black/50 ring-1 ring-white/10 px-4 py-4">
            <p className="text-[10px] tracking-widest text-gray-500 uppercase">Architecture</p>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              MCP architecture, multi-agent patterns, and orchestration layers that make tools interoperable across local
              scripts, CLIs, and web UIs.
            </p>
          </div>
          <div className="rounded-lg bg-black/50 ring-1 ring-white/10 px-4 py-4">
            <p className="text-[10px] tracking-widest text-gray-500 uppercase">Operations</p>
            <p className="mt-2 text-sm text-gray-300 leading-relaxed">
              Cloud certifications + production automation: pipeline engineering, governance-friendly deployments, and
              reliable release workflows that scale across multiple projects.
            </p>
          </div>
        </div>
      </section>
    </NeuralShell>
  );
}
