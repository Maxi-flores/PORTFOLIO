function getUtcOffset() {
  const raw = -new Date().getTimezoneOffset(); // minutes
  const sign = raw >= 0 ? '+' : '-';
  const abs = Math.abs(raw);
  const h = String(Math.floor(abs / 60)).padStart(2, '0');
  const m = String(abs % 60).padStart(2, '0');
  return `UTC${sign}${h}:${m}`;
}

// ── Icons ──────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="m6 9 4 3-4 3" />
      <path d="M12 15h6" />
    </svg>
  );
}

// ── Component ──────────────────────────────────────────────────────────────

export default function PortfolioHero() {
  const utcOffset = getUtcOffset();

  return (
    <div className="relative min-h-screen bg-[#020804] text-white font-mono overflow-hidden flex flex-col">

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg scanlines pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 sm:px-12 md:px-20 py-8 max-w-4xl mx-auto w-full">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="flex flex-col gap-1 mb-auto">
          {/* Status line */}
          <div className="flex items-center gap-2 text-xs tracking-widest text-[#00ff41]">
            <span className="blink inline-block w-2 h-2 rounded-full bg-[#00ff41]" />
            <span>ALL_SYSTEMS_OPERATIONAL</span>
          </div>

          {/* Location / UTC line */}
          <div className="text-xs tracking-widest text-gray-500 mt-0.5 ml-4">
            <span className="text-gray-600">STATIONED_AT</span>
            {'  '}
            <span className="text-gray-400">San Francisco, CA</span>
            {'  '}
            <span className="text-[#00ff41]/70">{utcOffset}</span>
          </div>
        </header>

        {/* ── Main ──────────────────────────────────────────────────────── */}
        <main className="flex-1 flex flex-col justify-center py-16 gap-6">

          {/* Prompt prefix */}
          <p className="text-[#00ff41]/60 text-sm tracking-widest">
            ~/portfolio <span className="text-[#00ff41]">$</span> ./whoami
          </p>

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none cursor">
            Maxi Flores
          </h1>

          {/* Job title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-[#00ff41] dotted-underline w-fit">
            Full-Stack Engineer @ Acme Corp
          </h2>

          {/* Bio */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
            I build fast, reliable, and beautiful software. Passionate about
            developer tooling, distributed systems, and crafting interfaces that
            feel like magic. Currently shipping{' '}
            <span className="text-[#00ff41]/80">open-source</span> tools for
            humans who love the terminal.
          </p>

          {/* ── Buttons ──────────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-4 mt-2">
            {/* Contact */}
            <button
              className="glow-green px-5 py-2.5 border border-[#00ff41] text-[#00ff41] text-sm tracking-widest uppercase rounded transition-all duration-200 hover:bg-[#00ff41]/10 hover:text-white"
              type="button"
            >
              Contact
            </button>

            {/* Resume */}
            <button
              className="glow-blue px-5 py-2.5 border border-blue-500 text-blue-400 text-sm tracking-widest uppercase rounded transition-all duration-200 hover:bg-blue-500/10 hover:text-white"
              type="button"
            >
              Resume
            </button>

            {/* Launch Terminal */}
            <button
              className="glow-gray flex items-center gap-2 px-5 py-2.5 border border-gray-600 text-gray-300 text-sm tracking-widest uppercase rounded transition-all duration-200 hover:border-gray-400 hover:text-white hover:bg-white/5"
              type="button"
            >
              <TerminalIcon />
              <span>&gt;_ Launch Terminal</span>
            </button>
          </div>
        </main>

        {/* ── Footer / Social icons ─────────────────────────────────────── */}
        <footer className="flex items-center gap-6 pb-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-500 hover:text-[#00ff41] transition-colors duration-200"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-500 hover:text-[#00ff41] transition-colors duration-200"
          >
            <LinkedInIcon />
          </a>
          <a
            href="mailto:hello@maxiflores.dev"
            aria-label="Email"
            className="text-gray-500 hover:text-[#00ff41] transition-colors duration-200"
          >
            <EmailIcon />
          </a>

          <span className="ml-auto text-[10px] tracking-widest text-gray-700 select-none">
            v1.0.0 · 2026
          </span>
        </footer>

      </div>
    </div>
  );
}
