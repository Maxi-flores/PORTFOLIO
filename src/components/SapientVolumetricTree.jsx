import { useMemo, useState } from 'react';

const AXES = [
  { key: 'X', label: 'concept' },
  { key: 'Y', label: 'vibe' },
  { key: 'Z', label: 'sophia' },
  { key: 'W', label: 'powerframe' },
];

export default function SapientVolumetricTree() {
  const [axisIndex, setAxisIndex] = useState(0);
  const active = AXES[axisIndex];

  const caption = useMemo(() => `${active.key} = ${active.label}`, [active]);

  return (
    <button
      type="button"
      onClick={() => setAxisIndex((i) => (i + 1) % AXES.length)}
      className="w-full text-left rounded-lg bg-black/50 border border-gray-800 px-4 py-4 hover:border-[#00ff41]/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Volumetric Node</p>
          <p className="mt-1 text-sm tracking-widest text-[#00ff41]">{caption}</p>
          <p className="mt-2 text-xs text-gray-400 leading-relaxed">
            Click to rotate axes. Represents Sapient as a 4D topology node inside the ecosystem nav.
          </p>
        </div>
        <div className="shrink-0">
          <div className="relative w-20 h-16">
            <div className="absolute inset-0 border border-[#00ff41]/35 rounded-sm" />
            <div className="absolute inset-0 translate-x-2 -translate-y-2 border border-cyan-300/25 rounded-sm" />
            <div className="absolute left-0 top-0 w-full h-full">
              <div className="absolute left-0 top-0 w-2 h-2 bg-[#00ff41]/70" />
              <div className="absolute right-0 bottom-0 w-2 h-2 bg-cyan-300/50" />
              <div className="absolute left-0 top-0 w-[calc(100%-8px)] h-px bg-[#00ff41]/25 translate-x-2 translate-y-2" />
              <div className="absolute left-0 top-0 h-[calc(100%-8px)] w-px bg-[#00ff41]/25 translate-x-2 translate-y-2" />
              <div className="absolute right-0 bottom-0 w-[calc(100%-8px)] h-px bg-cyan-300/20 -translate-x-2 -translate-y-2" />
              <div className="absolute right-0 bottom-0 h-[calc(100%-8px)] w-px bg-cyan-300/20 -translate-x-2 -translate-y-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {AXES.map((axis) => (
          <div
            key={axis.key}
            className={[
              'rounded border px-2 py-1 text-[11px] tracking-widest',
              axis.key === active.key
                ? 'border-[#00ff41]/50 text-[#00ff41] bg-[#00ff41]/10'
                : 'border-gray-800 text-gray-500 bg-black/40',
            ].join(' ')}
          >
            {axis.key}:{axis.label}
          </div>
        ))}
      </div>
    </button>
  );
}

