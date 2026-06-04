import { useMemo } from 'react';

const knowledgeBaseModules = [
  {
    id: 'powerframe',
    name: 'Powerframe',
    tag: 'PLUGIN',
    siteUrl: 'https://powerframe.online',
    siteLabel: 'powerframe.online',
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
    siteUrl: 'https://powerstarter.online',
    siteLabel: 'powerstarter.online',
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
    siteUrl: 'https://therockettree.io',
    siteLabel: 'therockettree.io',
    repoUrl: 'https://github.com/Maxi-flores/TheRocketTree-App',
    purpose: ['Unity3D system direction with supporting web surfaces.'],
    direction: [
      'Portfolio relevance: represents 3D + web integration work.',
      'Technical direction: Unity engine repos with companion web engagement and system state tooling.',
    ],
  },
  {
    id: 'mucho3d',
    name: 'Mucho3D',
    tag: 'PLUGIN',
    siteUrl: 'https://mucho3d.dev',
    siteLabel: 'mucho3d.dev',
    repoUrl: null,
    purpose: ['3D and digital studies direction focused on web-integrated presentation systems.'],
    direction: [
      'Portfolio relevance: generic 3D and digital studies integrated into web ecosystems and metric-driven visualization systems.',
      'Technical direction: reusable web surfaces for showcasing 3D outputs alongside measurable UI presentation.',
    ],
  },
  {
    id: 'system-automation-layer',
    name: 'Manageable Projects Umbrella',
    tag: 'KnowledgeBase',
    repoUrl: null,
    purpose: [
      'MCP bridging AI & Python automation scripts for metric shaping, tool interoperability, and repeatable cross-platform workflows.',
    ],
    direction: [
      'Portfolio relevance: generic 3D and digital studies integrated into web ecosystems and metric-driven visualization systems.',
      'Technical direction: automation + AI integration, custom tools, pipeline architecture, governance, and multi-project ecosystem management.',
    ],
  },
];

function tagStyles(tag) {
  switch (tag) {
    case 'PLUGIN':
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
    case 'KnowledgeBase':
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

function BrandMark({ id }) {
  const palette =
    id === 'powerframe'
      ? { bg: '#00ff41', fg: '#020804', label: 'PF' }
      : id === 'powerstarter'
        ? { bg: '#22d3ee', fg: '#020804', label: 'PS' }
      : id === 'therockettree'
          ? { bg: '#e879f9', fg: '#020804', label: 'RT' }
          : id === 'mucho3d'
            ? { bg: '#f59e0b', fg: '#020804', label: 'M3' }
          : { bg: '#a1a1aa', fg: '#020804', label: 'KB' };

  return (
    <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
      <rect x="4" y="4" width="40" height="40" rx="10" fill={palette.bg} opacity="0.18" />
      <rect x="8" y="8" width="32" height="32" rx="9" fill={palette.bg} opacity="0.12" />
      <rect x="12" y="12" width="24" height="24" rx="8" fill={palette.bg} opacity="0.28" />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        fontSize="14"
        fontFamily={'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'}
        fontWeight="700"
        fill={palette.fg}
        opacity="0.9"
      >
        {palette.label}
      </text>
    </svg>
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
        {module.siteUrl ? (
          <a
            href={module.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${module.name} website`}
            className="rounded-lg ring-1 ring-white/10 bg-black/30 hover:bg-black/40 transition-colors"
          >
            <BrandMark id={module.id} />
          </a>
        ) : (
          <div className="rounded-lg ring-1 ring-white/10 bg-black/30">
            <BrandMark id={module.id} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={['text-sm sm:text-base font-semibold tracking-wide', styles.title].join(' ')}>
              {module.name}
            </h3>
            <TagBadge tag={module.tag} />
          </div>
          {module.siteUrl && module.siteLabel ? (
            <a
              href={module.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex text-[10px] tracking-widest text-gray-500 underline decoration-white/10 hover:text-gray-200 hover:decoration-white/40 transition-colors"
            >
              {module.siteLabel}
            </a>
          ) : null}
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
  const modules = useMemo(() => knowledgeBaseModules, []);

  return (
    <div>
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="text-right">
          <p className="text-[10px] tracking-widest text-gray-600 uppercase">Tags</p>
          <p className="mt-1 text-xs tracking-widest text-gray-400">
            <span className="text-[#00ff41]">PLUGIN</span> · <span className="text-cyan-200">JOURNAL</span> ·{' '}
            <span className="text-fuchsia-200">UNITY</span> · <span className="text-gray-300">KnowledgeBase</span>
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
        {modules.map((module) => (
          <ModuleCard key={module.id} module={module} />
        ))}
      </div>
    </div>
  );
}
