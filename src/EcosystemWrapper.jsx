import { useMemo } from 'react';
import descriptionText from '../description.md?raw';
import { parseEcosystemFromDescription, priorityStyles } from './ecosystem/parseEcosystemFromDescription.js';

function PriorityBadge({ priority }) {
  const styles = priorityStyles(priority);
  return (
    <span
      className={[
        'inline-flex items-center rounded px-2 py-0.5 text-[10px] tracking-widest uppercase border',
        styles.badge,
      ].join(' ')}
    >
      {priority}
    </span>
  );
}

function ModuleCard({ module }) {
  const styles = priorityStyles(module.priority);

  return (
    <section
      className={[
        'rounded-lg bg-black/40 backdrop-blur px-5 py-4',
        'transition-transform duration-200 hover:-translate-y-0.5',
        styles.ring,
        styles.glow,
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={['text-sm sm:text-base font-semibold tracking-wide', styles.title].join(' ')}>
              {module.name}
            </h3>
            <PriorityBadge priority={module.priority} />
          </div>

          {module.repoUrl ? (
            <a
              href={module.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-widest text-gray-400 hover:text-[#00ff41] transition-colors"
            >
              {module.repoUrl.replace('https://', '')}
            </a>
          ) : (
            <p className="text-[11px] tracking-widest text-gray-600 select-none">repo: not linked in description.md</p>
          )}
        </div>
      </div>

      {module.purpose?.length ? (
        <div className="mt-3">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Purpose</p>
          <ul className="mt-1 space-y-1 text-sm text-gray-300">
            {module.purpose.map((item) => (
              <li key={item} className="leading-relaxed">
                <span className="text-gray-600">{'> '}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {module.governance?.length ? (
        <div className="mt-3">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Governance</p>
          <ul className="mt-1 space-y-1 text-sm text-gray-300">
            {module.governance.map((item) => (
              <li key={item} className="leading-relaxed">
                <span className="text-gray-600">{'- '}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export default function EcosystemWrapper() {
  const modules = useMemo(() => parseEcosystemFromDescription(descriptionText), []);

  return (
    <div className="relative min-h-screen bg-[#020804] text-white font-mono overflow-hidden">
      <div className="absolute inset-0 grid-bg scanlines pointer-events-none z-0" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 py-10">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <p className="text-[#00ff41]/60 text-xs tracking-widest">~/portfolio/ecosystem $</p>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
              Core Ecosystem (Governance-Synced)
            </h1>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl leading-relaxed">
              Rendered directly from <span className="text-gray-200">description.md</span>. Critical nodes get
              maximum interactive fidelity and neon-green weight.
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] tracking-widest text-gray-600 uppercase">Priority Model</p>
            <p className="mt-1 text-xs tracking-widest text-gray-400">
              <span className="text-[#00ff41]">CRITICAL</span> · <span className="text-cyan-200">MEDIUM</span> ·{' '}
              <span className="text-gray-300">LOW</span> · <span className="text-fuchsia-200">FUTURE</span>
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        <div className="mt-10 rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Source of truth</p>
          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            Update ecosystem priorities and rules in <span className="text-gray-200">description.md</span> and the UI
            will follow automatically.
          </p>
        </div>
      </div>
    </div>
  );
}

