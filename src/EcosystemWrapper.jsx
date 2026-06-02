import { useMemo } from 'react';

const KNOWLEDGEBASE_MODULES = [
  {
    id: 'powerframe',
    name: 'Powerframe',
    tag: 'SYSTEM',
    repoUrl: 'https://github.com/Maxi-flores/Powerframe-V1',
    purpose: [
      'Domain-agnostic external system/dashboard foundations.',
      'CRM template direction for customer relationship management.',
    ],
    direction: [
      'Portfolio relevance: business-oriented digital systems and technical project documentation.',
      'Technical direction: UI implementation plus cloud/data fundamentals.',
    ],
  },
  {
    id: 'powerstarter',
    name: 'PowerStarter',
    tag: 'JOURNAL',
    repoUrl: 'https://github.com/Maxi-flores/PowerStarter',
    purpose: ['Feed / growth journal and project development hub.'],
    direction: [
      'Portfolio relevance: showcases interface patterns and iteration workflow.',
      'Technical direction: web interfaces, feedback loops, and automation-friendly structure.',
    ],
  },
  {
    id: 'therockettree',
    name: 'TheRocketTree',
    tag: 'UNITY',
    repoUrl: 'https://github.com/Maxi-flores/TheRocketTree-App',
    purpose: ['Unity3D system direction with supporting web surfaces.'],
    direction: [
      'Portfolio relevance: represents 3D + web integration work.',
      'Technical direction: Unity engine repos with companion web engagement and system state tooling.',
    ],
  },
  {
    id: 'sapient-kb',
    name: 'Sapient KB',
    tag: 'KNOWLEDGEBASE',
    repoUrl: 'https://github.com/Maxi-flores/Sapient',
    purpose: ['KnowledgeBase direction: “4D logic brain/tree” for organizing concepts and systems.'],
    direction: [
      'Portfolio relevance: informs the knowledge tree and project mapping style used here.',
      'Technical direction: interactive knowledge tree model and visualization surface.',
    ],
  },
];

function tagStyles(tag) {
  switch ((tag ?? '').toUpperCase()) {
    case 'SYSTEM':
      return {
        ring: 'ring-1 ring-[#00ff41]/50',
        title: 'text-[#00ff41]',
        badge: 'bg-[#00ff41]/15 text-[#00ff41] border-[#00ff41]/40',
        glow: 'glow-green',
      };
    case 'JOURNAL':
      return {
        ring: 'ring-1 ring-cyan-400/40',
        title: 'text-cyan-200',
        badge: 'bg-cyan-400/10 text-cyan-200 border-cyan-300/30',
        glow: 'glow-blue',
      };
    case 'UNITY':
      return {
        ring: 'ring-1 ring-fuchsia-400/30',
        title: 'text-fuchsia-200',
        badge: 'bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-300/30',
        glow: 'glow-gray',
      };
    case 'KNOWLEDGEBASE':
    default:
      return {
        ring: 'ring-1 ring-gray-500/20',
        title: 'text-gray-100',
        badge: 'bg-gray-500/10 text-gray-300 border-gray-400/20',
        glow: 'glow-gray',
      };
  }
}

function TagBadge({ tag }) {
  const styles = tagStyles(tag);
  return (
    <span
      className={[
        'inline-flex items-center rounded px-2 py-0.5 text-[10px] tracking-widest uppercase border',
        styles.badge,
      ].join(' ')}
    >
      {tag}
    </span>
  );
}

function ModuleCard({ module }) {
  const styles = tagStyles(module.tag);

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
            <TagBadge tag={module.tag} />
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
            <p className="text-[11px] tracking-widest text-gray-600 select-none">repo: not linked</p>
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

      {module.direction?.length ? (
        <div className="mt-3">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Portfolio + Direction</p>
          <ul className="mt-1 space-y-1 text-sm text-gray-300">
            {module.direction.map((item) => (
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
  const modules = useMemo(() => KNOWLEDGEBASE_MODULES, []);

  return (
    <div>
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="text-right">
          <p className="text-[10px] tracking-widest text-gray-600 uppercase">Tags</p>
          <p className="mt-1 text-xs tracking-widest text-gray-400">
            <span className="text-[#00ff41]">SYSTEM</span> · <span className="text-cyan-200">JOURNAL</span> ·{' '}
            <span className="text-fuchsia-200">UNITY</span> · <span className="text-gray-300">KNOWLEDGEBASE</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
        <p className="text-[10px] tracking-widest text-gray-500 uppercase">Source of truth</p>
        <p className="mt-2 text-sm text-gray-300 leading-relaxed">
          Knowledgebase summaries are sourced from <span className="text-gray-200">PF_REPO_DETAILS.md</span>.
        </p>
      </div>
    </div>
  );
}
