export default function RouteLoadingOverlay({ active }) {
  return (
    <div
      aria-hidden={!active}
      className={[
        'route-loader fixed inset-0 z-50 flex items-center justify-center px-6',
        active ? 'route-loader--active' : '',
      ].join(' ')}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
      <div className="absolute inset-0 scanlines opacity-60" />
      <div className="relative w-full max-w-md rounded-xl bg-black/60 ring-1 ring-[#00ff41]/20 px-5 py-5">
        <p className="text-[10px] tracking-widest text-gray-500 uppercase">route transition</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[#00ff41]">{'>'}</span>
          <span className="text-sm tracking-widest text-[#00ff41] uppercase cursor">Loading</span>
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="terminal-dot" style={{ animationDelay: '0ms' }} />
            <span className="terminal-dot" style={{ animationDelay: '180ms' }} />
            <span className="terminal-dot" style={{ animationDelay: '360ms' }} />
          </div>
        </div>

        <div className="mt-4 h-2 rounded bg-black/70 ring-1 ring-white/10 overflow-hidden">
          <div className="terminal-bar h-full w-[45%]" />
        </div>

        <p className="mt-3 text-xs tracking-widest text-gray-500">
          syncing layout · warming modules · refreshing signal grid
        </p>
      </div>
    </div>
  );
}

