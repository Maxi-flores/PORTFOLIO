import { useState } from 'react';
import NeuralShell from '../layout/NeuralShell.jsx';
import Reveal from '../components/Reveal.jsx';
import Radar from '../../components/backgrounds/Radar.jsx';

const RADAR_PROJECTS = [
  {
    id: 'powerframe',
    name: 'Powerframe',
    status: 'Active build',
    description: 'Plugin-first web surface for manageable project modules and telemetry-aware workflows.',
    version: 'v1.x',
    progress: 0.72,
    position: { x: 22, y: 34 },
    category: 'platform',
  },
  {
    id: 'powerstarter',
    name: 'PowerStarter',
    status: 'Active iteration',
    description: 'Creative Startup Platform surface to document systems, patterns, and shipping loops.',
    version: 'v1.0.0',
    progress: 0.64,
    position: { x: 40, y: 58 },
    category: 'surface',
  },
  {
    id: 'therockettree',
    name: 'TheRocketTree',
    status: 'Prototype',
    description: 'Unity + web integration experiments with supporting surfaces and state tooling.',
    version: 'v0.x',
    progress: 0.38,
    position: { x: 60, y: 38 },
    category: '3d',
  },
  {
    id: 'mucho3d',
    name: 'Mucho3D',
    status: 'Showcase',
    description: '3D and digital studies integrated into web ecosystems and measurable presentation layers.',
    version: 'v0.9',
    progress: 0.55,
    position: { x: 74, y: 66 },
    category: '3d',
  },
  {
    id: 'mcp-umbrella',
    name: 'Manageable Projects Umbrella',
    status: 'R&D',
    description: 'MCP bridging AI and Python automation scripts for interoperability and cross-platform workflows.',
    version: 'v0.1',
    progress: 0.22,
    position: { x: 52, y: 20 },
    category: 'automation',
  },
  {
    id: 'azure-learning',
    name: 'Azure AZ-900 Fundamentals',
    status: 'Learning track',
    description: 'Cloud fundamentals: governance, security baseline, subscriptions, and resource management discipline.',
    version: '2026',
    progress: 0.48,
    position: { x: 32, y: 78 },
    category: 'cloud',
  },
];

function clamp01(value) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function ProgressBar({ value }) {
  const pct = Math.round(clamp01(value) * 100);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[10px] tracking-widest text-gray-500 uppercase">Progress</p>
        <p className="text-[10px] tracking-widest text-gray-400">{pct}%</p>
      </div>
      <div className="mt-2 h-2 rounded bg-black/60 ring-1 ring-white/10 overflow-hidden">
        <div className="h-full bg-[#29ff55]/60" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function OverlayCard({ project }) {
  if (!project) return null;
  return (
    <div className="absolute right-4 top-4 w-[min(320px,calc(100%-2rem))] rounded-lg bg-black/70 backdrop-blur ring-1 ring-[#29ff55]/20 px-4 py-4">
      <p className="text-[10px] tracking-widest text-gray-500 uppercase">Project</p>
      <h3 className="mt-1 text-sm tracking-wide text-white">{project.name}</h3>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Status</p>
          <p className="mt-1 text-sm text-gray-300">{project.status}</p>
        </div>
        <div>
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Version</p>
          <p className="mt-1 text-sm text-gray-300">{project.version}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-300 leading-relaxed">{project.description}</p>
      <ProgressBar value={project.progress} />
    </div>
  );
}

function ProjectDot({ project, active, onEnter, onLeave }) {
  const { x, y } = project.position;
  const isActive = active?.id === project.id;

  return (
    <button
      type="button"
      onMouseEnter={() => onEnter(project)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(project)}
      onBlur={onLeave}
      className={[
        'absolute -translate-x-1/2 -translate-y-1/2 rounded-full',
        'h-3 w-3 ring-1 ring-[#29ff55]/50 bg-[#29ff55]/60',
        'transition-transform duration-150 hover:scale-110 focus:scale-110 outline-none',
      ].join(' ')}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label={project.name}
    >
      <span
        className={[
          'absolute inset-0 rounded-full',
          isActive ? 'ring-2 ring-[#29ff55]/50' : 'ring-1 ring-white/10',
        ].join(' ')}
      />
      {isActive ? (
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-[#29ff55]/30 bg-black/70 px-2 py-1 text-[10px] tracking-widest text-[#29ff55]">
          {project.name}
        </span>
      ) : null}
    </button>
  );
}

function ContactRow({ label, href, display, newTab }) {
  const commonClass =
    'text-sm text-gray-300 hover:text-white transition-colors underline decoration-white/20 hover:decoration-white/60';

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <span className="text-[10px] tracking-widest text-gray-500 uppercase">{label}</span>
      {href ? (
        <a
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className={commonClass}
        >
          {display}
        </a>
      ) : (
        <span className="text-sm text-gray-300">{display}</span>
      )}
    </div>
  );
}

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

function SocialIconLink({ href, label, newTab, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={newTab ? '_blank' : undefined}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center justify-center rounded border border-gray-700 bg-black/40 p-2 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-colors"
    >
      {children}
    </a>
  );
}

export default function Sync() {
  const [activeProject, setActiveProject] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get('name') || '');
    const message = String(formData.get('message') || '');
    const email = String(formData.get('email') || '');

    const subject = `Inquiry from ${name || 'Anonymous'}`;
    const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\nMessage:\r\n${message}`;
    const mailtoHref = `mailto:studio@wommedia.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoHref;
  }

  return (
    <NeuralShell
      prompt="~/portfolio/contact $"
      title="Contact"
      subtitle="Location details and a direct message form (opens your email client)."
    >
      <div className="mt-6 flex flex-col lg:min-h-[calc(100vh-220px)] lg:justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:items-end">
          <Reveal>
            <section className="rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
              <h2 className="text-sm tracking-widest text-[#00ff41] uppercase">Location</h2>

              <div className="mt-4 space-y-3">
                <ContactRow label="Based In" display="Lisbon, Portugal" />
              </div>

              <h3 className="mt-8 text-sm tracking-widest text-[#00ff41] uppercase">Message</h3>
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] tracking-widest text-gray-500 uppercase">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="mt-2 w-full rounded-md bg-black/60 ring-1 ring-white/10 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00ff41]/40"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[10px] tracking-widest text-gray-500 uppercase">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-md bg-black/60 ring-1 ring-white/10 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00ff41]/40"
                  placeholder="studio@wommedia.nl"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[10px] tracking-widest text-gray-500 uppercase">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-md bg-black/60 ring-1 ring-white/10 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00ff41]/40"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                className="glow-green w-full px-5 py-2.5 border border-[#00ff41] text-[#00ff41] text-sm tracking-widest uppercase rounded transition-all duration-200 hover:bg-[#00ff41]/10 hover:text-white"
              >
                Send Message
              </button>
            </form>

              <h3 className="mt-8 text-sm tracking-widest text-[#00ff41] uppercase">Connect</h3>
              <div className="mt-4 flex items-center gap-3 flex-wrap">
                <SocialIconLink href="https://github.com/Maxi-flores" label="GitHub" newTab>
                  <GitHubIcon />
                </SocialIconLink>
                <SocialIconLink
                  href="https://www.linkedin.com/in/maximiliano-flores-68b534134/"
                  label="LinkedIn"
                  newTab
                >
                  <LinkedInIcon />
                </SocialIconLink>
                <SocialIconLink href="https://www.behance.net/gallery/212342817/Curriculum-Vitae" label="Behance" newTab>
                  <BehanceIcon />
                </SocialIconLink>
                <SocialIconLink href="mailto:studio@wommedia.nl" label="Email">
                  <EmailIcon />
                </SocialIconLink>
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="rounded-lg bg-black/40 ring-1 ring-cyan-400/20 px-5 py-4">
              <h2 className="text-sm tracking-widest text-cyan-200 uppercase">Final Version Updates</h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                Release-mode snapshot: deployment log, governance plan, and final metadata sync for the active portfolio
                surfaces. Focus is on stability, traceability, and a clean handoff from iteration to maintainable ops.
              </p>
              <ul className="mt-4 space-y-1 text-xs text-gray-400 leading-relaxed">
                <li>Deployment log: versions shipped, release notes, and rollback-ready checkpoints.</li>
                <li>Governance plan: access boundaries, change control, and long-term stewardship.</li>
                <li>Metadata sync: domains, repo references, and release identifiers kept consistent.</li>
              </ul>

              <div className="mt-6 rounded-lg bg-black/50 ring-1 ring-[#29ff55]/15 overflow-hidden">
                <div className="relative h-[420px]">
                  {/* TODO(theme): consider CSS variables to adapt global accent colors based on selected project category. */}
                  <div className="absolute inset-0 z-0">
                    <Radar color="#29ff55" backgroundColor="#020804" />
                  </div>

                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 z-10 h-full w-full pointer-events-none"
                  preserveAspectRatio="none"
                >
                  {activeProject ? (
                    <line
                      x1={activeProject.position.x}
                      y1={activeProject.position.y}
                      x2="92"
                      y2="14"
                      stroke="#29ff55"
                      strokeOpacity="0.55"
                      strokeWidth="0.8"
                    />
                  ) : null}
                </svg>

                <div className="absolute inset-0 z-20">
                  {RADAR_PROJECTS.map((project) => (
                    <ProjectDot
                      key={project.id}
                      project={project}
                      active={activeProject}
                      onEnter={setActiveProject}
                      onLeave={() => setActiveProject(null)}
                    />
                  ))}
                </div>

                <div className="absolute inset-0 z-30 pointer-events-none">
                  <OverlayCard project={activeProject} />
                </div>
                </div>
              </div>
            </section>
          </Reveal>
        </div>
      </div>
    </NeuralShell>
  );
}
