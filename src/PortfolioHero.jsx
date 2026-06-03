import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PortfolioTimeline } from '../components/PortfolioTimeline';
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

function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
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
            I started out in architecture, designing with 2D and 3D building systems. To speed up my workflow, I picked
            up Python to automate generating sheets of sketches. That process naturally hooked me onto development. When
            I was living in Barcelona, alongside working in customer service, I spent my time diving deep into the basics
            of web technology. I moved past simple CMS platforms and taught myself the ins and outs of web tools, DNS,
            and domain mastering while bootstrapping webpages. As AI started dominating the visual coding space, I shifted
            my focus from standard frontend webpage development to systems development—scaling up my cloud knowledge to
            build and deploy complex infrastructure for all kinds of ideas.
          </p>

          {/* ── Buttons ──────────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Link
              to="/ecosystem"
              className="glow-green px-5 py-2.5 border border-[#00ff41] text-[#00ff41] text-sm tracking-widest uppercase rounded transition-all duration-200 hover:bg-[#00ff41]/10 hover:text-white"
            >
              Knowledgebase
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

        <PortfolioTimeline />

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
            href="mailto:m.flores@girasoul.nl"
            aria-label="Email"
            className="text-gray-500 hover:text-[#00ff41] transition-colors duration-200"
          >
            <EmailIcon />
          </a>
          <a
            href="https://www.behance.net/gallery/212342817/Curriculum-Vitae"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Behance"
            className="text-gray-500 hover:text-[#00ff41] transition-colors duration-200"
          >
            <BehanceIcon />
          </a>

          <span className="ml-auto text-[10px] tracking-widest text-gray-700 select-none">v1.0.0 · 2026</span>
        </footer>
      </div>
    </NeuralShell>
  );
}
