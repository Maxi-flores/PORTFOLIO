import EcosystemWrapper from '../EcosystemWrapper.jsx';
import SapientVolumetricTree from '../components/SapientVolumetricTree.jsx';
import NeuralShell from '../layout/NeuralShell.jsx';

export default function Ecosystem() {
  return (
    <NeuralShell
      prompt="~/portfolio/knowledgebase $"
      title="Knowledgebase"
      subtitle="Concise project map of current portfolio systems and technical direction."
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <EcosystemWrapper />
        <aside className="rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">System Automation Layer</p>
          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            System Automation Layer — Research and development on autonomous tools and custom cross-platform app integrations.
          </p>
          <div className="mt-4">
            <SapientVolumetricTree />
          </div>
        </aside>
      </div>
    </NeuralShell>
  );
}
