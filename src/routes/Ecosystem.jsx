import EcosystemWrapper from '../EcosystemWrapper.jsx';
import SapientVolumetricTree from '../components/SapientVolumetricTree.jsx';
import NeuralShell from '../layout/NeuralShell.jsx';

export default function Ecosystem() {
  return (
    <NeuralShell
      prompt="~/portfolio/knowledgebase $"
      title="KnowledgeBase"
      subtitle="Concise project map of current portfolio systems and technical direction."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <EcosystemWrapper />
        <aside className="rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Manageable Projects Umbrella</p>
          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            MCP bridging AI & Python automation scripts to orchestrate tools, shape metrics, and connect workflows across
            platforms with repeatable, governance-friendly project structure.
          </p>
          <div className="mt-4">
            <SapientVolumetricTree />
          </div>
        </aside>
      </div>
    </NeuralShell>
  );
}
