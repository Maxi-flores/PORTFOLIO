import NeuralShell from '../layout/NeuralShell.jsx';

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

export default function Sync() {
  return (
    <NeuralShell
      prompt="~/portfolio/contact $"
      title="Contact"
      subtitle="Links for collaboration, portfolio access, and direct email."
    >
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <section className="rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
          <h2 className="text-sm tracking-widest text-[#00ff41] uppercase">Contact Links</h2>

          <div className="mt-4 space-y-3">
            <ContactRow
              label="GitHub"
              href="https://github.com/Maxi-flores"
              display="github.com/Maxi-flores"
              newTab
            />
            <ContactRow
              label="LinkedIn"
              href="https://www.linkedin.com/in/maximiliano-flores-68b534134/"
              display="linkedin.com/in/maximiliano-flores-68b534134"
              newTab
            />
            <ContactRow label="Email" href="mailto:info@powerframe.online" display="info@powerframe.online" />
            <ContactRow
              label="WAI Portfolio"
              href="https://wai.powerframe.online"
              display="wai.powerframe.online"
              newTab
            />
          </div>
        </section>

        <section className="rounded-lg bg-black/40 ring-1 ring-cyan-400/20 px-5 py-4">
          <h2 className="text-sm tracking-widest text-cyan-200 uppercase">Availability</h2>
          <p className="mt-3 text-sm text-gray-300 leading-relaxed">
            Focus areas: website development, UI/UX implementation, cloud/data fundamentals, Power Platform automation,
            and AI-assisted development with BIM/Tekla/point cloud context.
          </p>
        </section>
      </div>
    </NeuralShell>
  );
}

