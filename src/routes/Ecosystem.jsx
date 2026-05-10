import { Link } from 'react-router-dom';
import EcosystemWrapper from '../EcosystemWrapper.jsx';
import SapientVolumetricTree from '../components/SapientVolumetricTree.jsx';
import NeuralShell from '../layout/NeuralShell.jsx';

export default function Ecosystem() {
  return (
    <NeuralShell
      prompt="~/portfolio/ecosystem $"
      title="Core Ecosystem (Governance-Synced)"
      subtitle={
        <>
          Rendered directly from <span className="text-gray-200">description.md</span>. Critical nodes get maximum
          interactive fidelity and neon-green weight.
        </>
      }
      rightSlot={
        <Link
          to="/sync"
          className="glow-green px-3 py-1.5 rounded border border-[#00ff41]/60 text-[11px] tracking-widest uppercase text-[#00ff41] hover:text-white hover:bg-[#00ff41]/10 transition-colors"
        >
          Open Sync
        </Link>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
        <EcosystemWrapper />
        <aside className="rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-4">
          <p className="text-[10px] tracking-widest text-gray-500 uppercase">Sapient KB · 4D Volumetric Tree</p>
          <p className="mt-2 text-sm text-gray-300 leading-relaxed">
            X=concept · Y=vibe · Z=sophia · W=powerframe. This navigation node represents the “4D logic brain/tree”
            surface as a volumetric topology.
          </p>
          <div className="mt-4">
            <SapientVolumetricTree />
          </div>
        </aside>
      </div>
    </NeuralShell>
  );
}

