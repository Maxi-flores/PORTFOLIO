import { Link, useLocation } from 'react-router-dom';
import SyncStatus from '../components/SyncStatus.jsx';

function NavLink({ to, children }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link
      to={to}
      className={[
        'px-3 py-1.5 rounded border text-[11px] tracking-widest uppercase transition-colors',
        active
          ? 'border-[#00ff41]/60 text-[#00ff41] bg-[#00ff41]/10'
          : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 hover:bg-white/5',
      ].join(' ')}
    >
      {children}
    </Link>
  );
}

export default function NeuralShell({ prompt, title, subtitle, rightSlot, children }) {
  return (
    <div className="relative min-h-screen bg-[#020804] text-white font-mono overflow-hidden">
      <div className="absolute inset-0 grid-bg scanlines pointer-events-none z-0" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-10 py-8">
        <header className="flex items-start justify-between gap-6 flex-wrap">
          <div className="min-w-0">
            <SyncStatus />
            {prompt ? <p className="mt-2 text-[#00ff41]/60 text-xs tracking-widest">{prompt}</p> : null}
            {title ? (
              <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">{title}</h1>
            ) : null}
            {subtitle ? <p className="mt-2 text-sm text-gray-400 max-w-2xl leading-relaxed">{subtitle}</p> : null}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/ecosystem">Ecosystem</NavLink>
            <NavLink to="/sync">Cloud Sync</NavLink>
            {rightSlot}
          </div>
        </header>

        <main className="mt-8">{children}</main>
      </div>
    </div>
  );
}

