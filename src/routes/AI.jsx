import { useMemo, useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import NeuralShell from '../layout/NeuralShell.jsx';

function formatTelemetryLabel(token) {
  if (token === 'prospector') return 'PROSPECTOR';
  return token;
}

function TagPill({ label }) {
  return (
    <span className="inline-flex items-center rounded-full px-2 py-1 text-[10px] tracking-widest ring-1 ring-inset ring-white/10 bg-white/5 text-gray-200 select-none">
      {label}
    </span>
  );
}

function TagChip({ label, count, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] tracking-widest ring-1 ring-inset transition-colors',
        active
          ? 'ring-[#00ff41]/40 bg-[#00ff41]/10 text-[#00ff41]'
          : 'ring-white/10 bg-white/5 text-gray-200 hover:bg-white/10',
      ].join(' ')}
    >
      <span>{label}</span>
      <span className={['rounded px-1.5 py-0.5 text-[10px]', active ? 'bg-black/40' : 'bg-black/30'].join(' ')}>
        {count}
      </span>
    </button>
  );
}

function TagRow({ tags }) {
  if (!Array.isArray(tags) || tags.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => (
        <TagPill key={tag} label={formatTelemetryLabel(tag)} />
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
        <p className="mt-3 text-sm text-gray-300 leading-relaxed whitespace-pre-line">{body}</p>
      </div>
    </article>
  );
}

export default function AI() {
  const timelineRows = useMemo(
    () => [
      {
        id: 'foundational-prospector',
        label: 'Foundational Era',
        title: '📡 Strategic Prospecting & Domain Quickscanning',
        tags: ['prospector'],
        body: [
          'Context & Methodology: Initiated my professional trajectory by executing high-density prospecting operations during early career roles, specializing in competitive tender contests and domain bid scouting. Built a rigorous framework for performing a “Quickscan” across every technical + operational signal available inside a target domain.',
          'Architectural Forecasting Support: Every structural layer, dependency, and domain anomaly was audited and documented. This high-fidelity intelligence became a baseline diagnostic layer for senior developers and architects, empowering them to forecast architectural possibilities with precision.',
          'Strategic Outcomes: By mapping hidden system opportunities and engineering roadblocks early in the bidding phase, these quickscans provided the blueprint required to arrange, price, and capture major domain opportunities.',
        ].join('\n\n'),
      },
      {
        id: 'local-llm',
        label: 'Row 1',
        title: 'Local LLM fundamentals and open-source experimentation',
        tags: ['Linux', 'Ollama', 'Local LLMs', 'Open-source'],
        body: 'Started locally on Linux (Mint), installing Ollama to compare open-source local models with cloud LLMs. Focused on understanding model behavior, constraints, and where automation can replace repetitive manual scripting.',
      },
      {
        id: 'prompting-components',
        label: 'Row 2',
        title: 'Prompt engineering + component generation workflows',
        tags: ['Prompting', 'OpenAI', 'Claude', 'Components', 'UI automation'],
        body: 'Moved from experiments to structured prompting: generating UI components, shaping layouts, and iterating faster. Adopted OpenAI + Claude as production companions for rapid interface assembly and automation-driven polish.',
      },
      {
        id: 'json-orchestration',
        label: 'Row 3',
        title: 'CLI-driven orchestration with JSON payloads',
        tags: ['Claude CLI', 'JSON payloads', 'AI-assisted dev', 'Orchestration'],
        body: 'Integrated Claude CLI and JSON payload workflows to drive repeatable changes across folders and components. This shifted the workflow from hand-written patches to AI-assisted system orchestration with predictable inputs and outputs.',
      },
      {
        id: 'cloud-scaling',
        label: 'Row 4',
        title: 'Cloud fundamentals + workflow scaling',
        tags: ['Azure', 'GitHub automation', 'Cloud fundamentals', 'Scaling'],
        body: 'Expanded into Azure learning for cloud fundamentals and operational discipline, while scaling development through GitHub automation and agentic workflows. Goal: reduce friction from idea → shipped system with stable release patterns.',
      },
    ],
    [],
  );

  const [tagFilter, setTagFilter] = useState(null);

  const tagIndex = useMemo(() => {
    const map = new Map();
    for (const row of timelineRows) {
      for (const tag of row.tags ?? []) {
        map.set(tag, (map.get(tag) ?? 0) + 1);
      }
    }
    return map;
  }, [timelineRows]);

  const allTags = useMemo(() => {
    const list = [...tagIndex.entries()].map(([value, count]) => ({ value, label: formatTelemetryLabel(value), count }));
    list.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
    return list;
  }, [tagIndex]);

  const filteredRows = useMemo(() => {
    if (!tagFilter) return timelineRows;
    return timelineRows.filter((row) => (row.tags ?? []).includes(tagFilter));
  }, [tagFilter, timelineRows]);

  return (
    <NeuralShell
      prompt="~/portfolio/knowledgebase $"
      title="KnowledgeBase"
      subtitle="Chronological AI learning and engineering narrative."
    >
      <nav className="flex flex-wrap items-center gap-2">
        <a
          href="#ai-timeline"
          className="rounded border border-gray-700 bg-black/40 px-3 py-1.5 text-[11px] tracking-widest uppercase text-gray-400 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-colors"
        >
          Timeline
        </a>
        <a
          href="#ai-roadmap"
          className="rounded border border-gray-700 bg-black/40 px-3 py-1.5 text-[11px] tracking-widest uppercase text-gray-400 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-colors"
        >
          Roadmap
        </a>
        <a
          href="#ai-workflow"
          className="rounded border border-gray-700 bg-black/40 px-3 py-1.5 text-[11px] tracking-widest uppercase text-gray-400 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-colors"
        >
          Workflow
        </a>
      </nav>

      <Reveal>
        <section id="ai-timeline" className="mt-4 rounded-xl bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 items-start">
            <aside className="rounded-lg bg-black/50 ring-1 ring-white/10 px-4 py-4">
              <p className="text-[10px] tracking-widest text-gray-500 uppercase">Tag Box Summary</p>
              <h2 className="mt-2 text-sm tracking-widest text-[#00ff41] uppercase">Signals · Categories</h2>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                Filter the timeline by technical tag clusters. Mirrors the Home timeline filter language.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <TagChip
                  label="ALL"
                  count={timelineRows.length}
                  active={!tagFilter}
                  onClick={() => setTagFilter(null)}
                />
                {allTags.map((tag) => (
                  <TagChip
                    key={tag.value}
                    label={tag.label}
                    count={tag.count}
                    active={tagFilter === tag.value}
                    onClick={() => setTagFilter((current) => (current === tag.value ? null : tag.value))}
                  />
                ))}
              </div>
            </aside>

            <div className="relative">
              <div className="absolute left-2 top-0 bottom-0 w-px bg-white/10" />
              <div className="space-y-5">
                {filteredRows.map((row) => (
                  <TimelineRow
                    key={row.id}
                    label={row.label}
                    title={row.title}
                    tags={row.tags}
                    body={row.body}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="ai-roadmap" className="mt-6 rounded-xl bg-black/40 ring-1 ring-cyan-400/20 px-5 py-5">
          <p className="text-[10px] tracking-widest text-cyan-200 uppercase">Roadmap</p>
          <h2 className="mt-2 text-base tracking-wide text-white">Next engineering targets</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg bg-black/50 ring-1 ring-white/10 px-4 py-4">
              <p className="text-[10px] tracking-widest text-gray-500 uppercase">Architecture</p>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                Build a durable orchestration layer that connects CLIs, scripts, and web surfaces with predictable inputs,
                observable outputs, and safe execution boundaries.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-gray-400 leading-relaxed">
                <li>Define typed JSON payload schemas + versioning for every automated action (inputs, outputs, failures).</li>
                <li>Implement tool registry conventions (capabilities, auth needs, rate limits, retry semantics, fallbacks).</li>
                <li>Introduce deterministic run logs: trace id, step graph, artifacts, and reversible change sets.</li>
                <li>Design a “human-in-the-loop” gating path for destructive ops (diff preview, approvals, rollback plan).</li>
                <li>Unify local + cloud execution with the same contract (dev sandbox, CI runners, production workers).</li>
              </ul>
            </div>
            <div className="rounded-lg bg-black/50 ring-1 ring-white/10 px-4 py-4">
              <p className="text-[10px] tracking-widest text-gray-500 uppercase">Operations</p>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed">
                Tighten production discipline: governance-friendly cloud fundamentals, reproducible pipelines, and reliable
                releases across multiple projects.
              </p>
              <ul className="mt-3 space-y-1 text-xs text-gray-400 leading-relaxed">
                <li>Azure baseline: subscriptions, RBAC, resource groups, policy guardrails, and cost visibility.</li>
                <li>CI hardening: build caching, dependency integrity, and environment parity (dev → preview → prod).</li>
                <li>Observability defaults: structured logs, health checks, and performance budgets per surface.</li>
                <li>Security hygiene: secret scanning, least-privilege tokens, and safe-by-default deployment configs.</li>
                <li>Release loop: changelog discipline, rollback-ready artifacts, and automated smoke checks.</li>
              </ul>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section id="ai-workflow" className="mt-6 rounded-xl bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-5">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Design</p>
          <h2 className="mt-2 text-base tracking-wide text-white">Design Approach &amp; Engineering Workflow</h2>
          <ol className="mt-4 space-y-3 text-sm text-gray-300 leading-relaxed list-decimal pl-5">
            <li>
              <strong>Handcrafted Foundations:</strong> Every layout begins completely by hand, moving deliberately from initial conceptual sketch designs straight to preliminary layout architectures.
            </li>
            <li>
              <strong>Technical Layout Foundations:</strong> Embracing traditional structural underlayer methodologies, concepts are translated into precise technical structural blueprints across all header, body, and footer frameworks.
            </li>
            <li>
              <strong>Architectural Analogy (Structural Page Leveling):</strong> Mimicking multi-level building construction, application pages serve as structural boundaries. We position our digital walls on exact layout grids to maintain absolute structural integrity throughout the platform.
            </li>
            <li>
              <strong>Scalable Routing Architecture:</strong> Page rootings are systematically scaled across web and mobile web apps by determining highly predictable, logical, and user-friendly hierarchies for navigational buttons and deep-linking structures.
            </li>
            <li>
              <strong>Early Concept Publishing:</strong> Concept development pages are built and published in early deployment phases with contextual data sets and native UI components embedded from day one.
            </li>
            <li>
              <strong>API Integration Realism:</strong> As layouts mature into complex, high-performance platform systems, theoretical ideas turn into robust realities through deep, seamless API ecosystem integrations.
            </li>
            <li>
              <strong>Component Automation Logic:</strong> Every UI element relies on decoupled JavaScript operational logic and clean JSON schemas, deploying autonomous functions onsite while staying fully synchronized with overall project build parameters and global design token tokens.
            </li>
            <li>
              <strong>Infrastructure-Driven Frontend:</strong> Frontend application health and status rely entirely on a properly configured web framework, optimized end-to-end through meticulous DNS routing and deterministic server-side deployments.
            </li>
            <li>
              <strong>State Maintenance &amp; Continuous DevOps:</strong> Like physical engineering structures, state maintenance is a perpetual process. We actively embrace change by adapting continuous task automation to maximize system health.
            </li>
            <li>
              <strong>Refinement Dedication:</strong> Crafting highly tailored solutions demands extensive time and focus. Even when utilizing cutting-edge AI utility tools, deep manual refinement remains essential to produce flawless, production-grade results.
            </li>
          </ol>
        </section>
      </Reveal>
    </NeuralShell>
  );
}
