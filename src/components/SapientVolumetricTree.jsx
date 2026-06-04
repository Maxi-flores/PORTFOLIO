import { useMemo, useState } from 'react';

const TOPICS = [
  { key: 'MCP', label: 'AI + Python orchestration' },
  { key: 'OPS', label: 'tool interoperability' },
];

export default function SapientVolumetricTree() {
  const [axisIndex, setAxisIndex] = useState(0);
  const active = TOPICS[axisIndex];

  const caption = useMemo(() => `${active.key}: ${active.label}`, [active]);

  return (
    <div className="w-full rounded-lg bg-black/50 border border-gray-800 px-4 py-4">
      <p className="text-[10px] tracking-widest text-gray-500 uppercase">Automation Focus</p>
      <p className="mt-1 text-sm tracking-widest text-[#00ff41]">{caption}</p>
      <p className="mt-2 text-xs text-gray-400 leading-relaxed">
        Select a focus area. MCP-first bridging of AI workflows and Python automation scripts for repeatable, cross-platform
        project execution.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {TOPICS.map((topic, index) => {
          const isActive = index === axisIndex;
          return (
            <button
              key={topic.key}
              type="button"
              onClick={() => setAxisIndex(index)}
              className={[
                'rounded border px-2 py-2 text-[11px] tracking-widest text-left transition-colors',
                isActive
                  ? 'border-[#00ff41]/50 text-[#00ff41] bg-[#00ff41]/10'
                  : 'border-gray-800 text-gray-500 bg-black/40 hover:border-[#00ff41]/30 hover:text-gray-200',
              ].join(' ')}
            >
              {topic.key}:{topic.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
