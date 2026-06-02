import { useState } from 'react';
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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    const subject = trimmedName ? `Portfolio message from ${trimmedName}` : 'Portfolio message';
    const bodyLines = [
      `Name: ${trimmedName || '(not provided)'}`,
      `Email: ${trimmedEmail || '(not provided)'}`,
      '',
      trimmedMessage || '(no message)',
    ];

    const mailtoHref = `mailto:m.flores@girasoul.nl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join('\n'),
    )}`;

    window.location.href = mailtoHref;
  }

  return (
    <NeuralShell
      prompt="~/portfolio/contact $"
      title="Contact"
      subtitle="Location details and a direct message form (opens your email client)."
    >
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
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
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-md bg-black/60 ring-1 ring-white/10 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#00ff41]/40"
                placeholder="you@example.com"
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
                value={message}
                onChange={(event) => setMessage(event.target.value)}
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
          <p className="mt-3 text-xs text-gray-500">
            No backend configured yet — submitting opens a draft email to <span className="text-gray-300">m.flores@girasoul.nl</span>.
          </p>

          <h3 className="mt-8 text-sm tracking-widest text-[#00ff41] uppercase">Contact Links</h3>
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
            <ContactRow label="Email" href="mailto:m.flores@girasoul.nl" display="m.flores@girasoul.nl" />
            <ContactRow
              label="Behance"
              href="https://www.behance.net/gallery/212342817/Curriculum-Vitae"
              display="behance.net/gallery/212342817/Curriculum-Vitae"
              newTab
            />
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
