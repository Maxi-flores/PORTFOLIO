import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import NeuralShell from './layout/NeuralShell.jsx';

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

// ── Helpers ────────────────────────────────────────────────────────────────

function useUtcOffset() {
  return useMemo(() => {
    const raw = -new Date().getTimezoneOffset(); // minutes
    const sign = raw >= 0 ? '+' : '-';
    const abs = Math.abs(raw);
    const h = String(Math.floor(abs / 60)).padStart(2, '0');
    const m = String(abs % 60).padStart(2, '0');
    return `UTC${sign}${h}:${m}`;
  }, []);
}

// ── Component ──────────────────────────────────────────────────────────────

export default function PortfolioHero() {
  const utcOffset = useUtcOffset();

  return (
    <NeuralShell
      prompt="~/portfolio $"
      title="Who Am I — Maximiliano Flores"
      subtitle={
        <>
          AI user and cloud data developer building portfolio systems, web interfaces and automation workflows with both
          traditional development skills and modern AI-assisted techniques.
        </>
      }
      rightSlot={
        <div className="text-right">
          <p className="text-[10px] tracking-widest text-gray-600 uppercase">Stationed At</p>
          <p className="mt-1 text-xs tracking-widest text-gray-400">
            Lisbon, Portugal · <span className="text-[#00ff41]/70">{utcOffset}</span>
          </p>
        </div>
      }
    >
      <div className="flex flex-col justify-center py-10 gap-6 max-w-3xl">

          {/* Prompt prefix */}
          <p className="text-[#00ff41]/60 text-sm tracking-widest">
            ~/portfolio <span className="text-[#00ff41]">$</span> ./whoami
          </p>

          {/* Job title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-wide text-[#00ff41] dotted-underline w-fit">
            AI user · Cloud Data · Web + Automation
          </h2>

          {/* Bio */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Building portfolio systems, UI/UX implementations, and business-oriented digital workflows with cloud/data
            fundamentals. Background includes BIM, Tekla, point clouds, technical project documentation, Microsoft Azure
            Fundamentals (AZ-900), and Power Platform Functional Consultant (PL-200).
          </p>

          {/* ── Buttons ──────────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/ecosystem"
              className="glow-green px-5 py-2.5 border border-[#00ff41] text-[#00ff41] text-sm tracking-widest uppercase rounded transition-all duration-200 hover:bg-[#00ff41]/10 hover:text-white"
            >
              Knowledgebase
            </Link>
            <Link
              to="/sync"
              className="glow-blue px-5 py-2.5 border border-cyan-300/40 text-cyan-200 text-sm tracking-widest uppercase rounded transition-all duration-200 hover:bg-cyan-300/10 hover:text-white"
            >
              Contact
            </Link>

            <a
              className="glow-gray flex items-center gap-2 px-5 py-2.5 border border-gray-600 text-gray-300 text-sm tracking-widest uppercase rounded transition-all duration-200 hover:border-gray-400 hover:text-white hover:bg-white/5"
              href="https://github.com/Maxi-flores"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TerminalIcon />
              <span>Open GitHub</span>
            </a>
          </div>
        <footer className="mt-10 flex items-center gap-6">
          <a
            href="https://github.com/Maxi-flores"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-500 hover:text-[#00ff41] transition-colors duration-200"
          >
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/maximiliano-flores-68b534134/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-500 hover:text-[#00ff41] transition-colors duration-200"
          >
            <LinkedInIcon />
          </a>
          <a
            href="mailto:info@powerframe.online"
            aria-label="Email"
            className="text-gray-500 hover:text-[#00ff41] transition-colors duration-200"
          >
            <EmailIcon />
          </a>

          <span className="ml-auto text-[10px] tracking-widest text-gray-700 select-none">v1.0.0 · 2026</span>
        </footer>
      </div>
    </NeuralShell>
  );
}
