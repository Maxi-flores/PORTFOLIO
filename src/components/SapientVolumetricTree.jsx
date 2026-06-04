export default function SapientVolumetricTree() {
  return (
    <div className="w-full rounded-lg bg-black/50 border border-gray-800 px-4 py-4">
      <p className="text-[10px] tracking-widest text-gray-500 uppercase">WOMmedia</p>

      <div className="mt-3 flex items-start gap-3">
        <img
          src="/wommedia.svg"
          width={40}
          height={40}
          alt="WOMmedia logo"
          className="h-10 w-10 shrink-0 rounded-lg ring-1 ring-white/10 bg-black/30"
        />

        <div className="min-w-0">
          <p className="text-sm tracking-widest text-[#00ff41]">WOMmedia.nl</p>
          <a
            href="https://wommedia.nl"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex text-[10px] tracking-widest text-gray-500 underline decoration-white/10 hover:text-gray-200 hover:decoration-white/40 transition-colors"
          >
            wommedia.nl
          </a>
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-300 leading-relaxed">
        WOMmedia is the umbrella brand where product thinking meets execution: a hands-on delivery studio built around
        shipping web surfaces, automation layers, and measurable growth systems. The focus is simple—turn raw ideas into
        deployed interfaces, connect them to reliable operational tooling, and iterate with real signals instead of
        guesswork.
      </p>

      <p className="mt-3 text-xs text-gray-400 leading-relaxed">
        This portfolio reflects that loop: build fast, structure cleanly, document decisions, and keep every module ready
        for integration into larger ecosystems (routing, data, auth, CI, and deployment).
      </p>
    </div>
  );
}
