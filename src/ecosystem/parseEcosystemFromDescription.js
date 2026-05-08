const PRIORITY_RANK = {
  CRITICAL: 0,
  MEDIUM: 1,
  LOW: 2,
  FUTURE: 3,
};

function toId(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractGithubUrls(text) {
  const matches = text.match(/https:\/\/github\.com\/[^\s)]+/g);
  return matches ? Array.from(new Set(matches)) : [];
}

function guessUrlForName(name, urls) {
  const needle = name
    .toLowerCase()
    .replace(/\b(dashboard|app|web|unity)\b/g, '')
    .replace(/[^a-z0-9]+/g, '');

  let best = null;
  let bestScore = 0;
  for (const url of urls) {
    const repo = url.split('/').pop() ?? '';
    const hay = repo.toLowerCase().replace(/[^a-z0-9]+/g, '');
    if (!hay) continue;

    let score = 0;
    if (hay === needle) score = 100;
    else if (hay.includes(needle) && needle.length >= 5) score = 60 + needle.length;
    else if (needle.includes(hay) && hay.length >= 5) score = 40 + hay.length;
    else {
      // Weak fuzzy: shared prefix length
      const max = Math.min(hay.length, needle.length);
      let prefix = 0;
      for (let i = 0; i < max; i++) {
        if (hay[i] !== needle[i]) break;
        prefix++;
      }
      score = prefix;
    }

    if (score > bestScore) {
      bestScore = score;
      best = url;
    }
  }
  return bestScore >= 6 ? best : null;
}

function parseGovernanceModules(text) {
  const lines = text.split(/\r?\n/);
  const startIndex = lines.findIndex((line) =>
    line.includes('=== Whole Application governance plan to perfection:'),
  );
  if (startIndex === -1) return [];

  const modules = [];
  let current = null;
  let section = null;

  const flush = () => {
    if (!current) return;
    const priorityToken = (current.priorityRaw ?? '').trim().toUpperCase();
    const priority = priorityToken in PRIORITY_RANK ? priorityToken : 'LOW';
    modules.push({
      id: toId(current.name),
      name: current.name,
      purpose: current.purpose,
      governance: current.governance,
      priority,
      priorityRank: PRIORITY_RANK[priority] ?? 99,
    });
    current = null;
    section = null;
  };

  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) continue;

    const isTopLevelStar = line.startsWith('* ');
    if (isTopLevelStar) {
      // New module header (top-level only)
      const name = trimmed.slice(2).trim();
      if (name) {
        flush();
        current = { name, purpose: [], governance: [], priorityRaw: '' };
      }
      continue;
    }

    if (!current) continue;

    if (trimmed === 'Purpose:') {
      section = 'purpose';
      continue;
    }
    if (trimmed === 'Governance:') {
      section = 'governance';
      continue;
    }
    if (trimmed === 'Priority:') {
      section = 'priority';
      continue;
    }

    if (trimmed.startsWith('* ')) {
      const bullet = trimmed.slice(2).trim();
      if (!bullet) continue;
      if (section === 'purpose') current.purpose.push(bullet);
      if (section === 'governance') current.governance.push(bullet);
      if (section === 'priority') current.priorityRaw = bullet.split(/\s+/)[0] ?? bullet;
    }
  }

  flush();
  return modules;
}

export function parseEcosystemFromDescription(descriptionText) {
  const urls = extractGithubUrls(descriptionText);
  const modules = parseGovernanceModules(descriptionText);
  return modules
    .map((module) => ({
      ...module,
      repoUrl: guessUrlForName(module.name, urls),
    }))
    .sort((a, b) => a.priorityRank - b.priorityRank || a.name.localeCompare(b.name));
}

export function priorityStyles(priority) {
  switch ((priority ?? '').toUpperCase()) {
    case 'CRITICAL':
      return {
        ring: 'ring-1 ring-[#00ff41]/50',
        title: 'text-[#00ff41]',
        badge: 'bg-[#00ff41]/15 text-[#00ff41] border-[#00ff41]/40',
        glow: 'glow-green',
      };
    case 'MEDIUM':
      return {
        ring: 'ring-1 ring-cyan-400/40',
        title: 'text-cyan-200',
        badge: 'bg-cyan-400/10 text-cyan-200 border-cyan-300/30',
        glow: 'glow-blue',
      };
    case 'FUTURE':
      return {
        ring: 'ring-1 ring-fuchsia-400/30',
        title: 'text-fuchsia-200',
        badge: 'bg-fuchsia-500/10 text-fuchsia-200 border-fuchsia-300/30',
        glow: 'glow-gray',
      };
    case 'LOW':
    default:
      return {
        ring: 'ring-1 ring-gray-500/20',
        title: 'text-gray-100',
        badge: 'bg-gray-500/10 text-gray-300 border-gray-400/20',
        glow: 'glow-gray',
      };
  }
}

