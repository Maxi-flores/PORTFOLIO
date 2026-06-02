import { Link } from 'react-router-dom';
import EcosystemWrapper from '../EcosystemWrapper.jsx';
import SapientVolumetricTree from '../components/SapientVolumetricTree.jsx';
import NeuralShell from '../layout/NeuralShell.jsx';

export default function Ecosystem() {
  return (
    <NeuralShell
      prompt="~/portfolio/knowledgebase $"
      title="Knowledgebase"
      subtitle="Concise project map of current portfolio systems and technical direction, sourced from PF_REPO_DETAILS.md."
      rightSlot={
        <Link
          to="/sync"
          className="glow-green px-3 py-1.5 rounded border border-[#00ff41]/60 text-[11px] tracking-widest uppercase text-[#00ff41] hover:text-white hover:bg-[#00ff41]/10 transition-colors"
        >
          Contact
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <EcosystemWrapper />
        <aside className="rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Sapient KB · 4D Volumetric Tree</p>
          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            X=concept · Y=vibe · Z=sophia · W=powerframe. A knowledgebase visualization surface inspired by the Sapient
            KB direction.
          </p>
          <div className="mt-4">
            <SapientVolumetricTree />
          </div>
        </aside>
      </div>
    </NeuralShell>
  );
}
