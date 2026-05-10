import { projects } from './projects';

function statusStyles(status) {
  if (status === 'deployed') {
    return 'text-[#00ff41] border-[#00ff41]/50 bg-[#00ff41]/10';
  }
  if (status === 'unknown') {
    return 'text-gray-300 border-gray-600/60 bg-white/5';
  }
  return 'text-red-300 border-red-500/40 bg-red-500/10';
}

function statusLabel(status) {
  if (status === 'deployed') return 'DEPLOYED';
  if (status === 'unknown') return 'UNKNOWN';
  return String(status || 'UNKNOWN').toUpperCase();
}

export default function ProjectInventory() {
  return (
    <section className="relative bg-[#020804] text-white font-mono overflow-hidden">
      <div className="absolute inset-0 grid-bg scanlines pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-12 md:px-20 py-14 max-w-5xl mx-auto w-full">
        <p className="text-[#00ff41]/60 text-sm tracking-widest mb-6">
          ~/portfolio <span className="text-[#00ff41]">$</span> ls inventory
        </p>

        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Project Inventory
          </h3>
          <p className="text-xs tracking-widest text-gray-500">
            Source: <span className="text-gray-400">Discription.md</span> · Deploy status: <span className="text-gray-400">GitHub repo homepage</span>
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="border border-[#00ff41]/10 bg-white/5 rounded-lg px-4 sm:px-5 py-4 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-[240px]">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="text-lg font-bold text-white">{project.name}</h4>
                    <span className="text-[10px] tracking-widest uppercase text-gray-500 border border-gray-700/60 rounded px-2 py-0.5">
                      {project.family}
                    </span>
                    <span
                      className={`text-[10px] tracking-widest uppercase border rounded px-2 py-0.5 ${statusStyles(project.vercel?.status)}`}
                      title={project.vercel?.source ? `Source: ${project.vercel.source}` : undefined}
                    >
                      {statusLabel(project.vercel?.status)}
                    </span>
                  </div>

                  <div className="mt-2 text-xs tracking-widest text-gray-500">
                    SLUG <span className="text-gray-400">{project.slug}</span>
                    {project.customDomain ? (
                      <>
                        {'  '}·{'  '}
                        DOMAIN <span className="text-gray-400">{project.customDomain}</span>
                      </>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glow-gray px-4 py-2 border border-gray-700 text-gray-200 text-xs tracking-widest uppercase rounded hover:border-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    GitHub
                  </a>
                  {project.vercel?.url ? (
                    <a
                      href={project.vercel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glow-green px-4 py-2 border border-[#00ff41]/70 text-[#00ff41] text-xs tracking-widest uppercase rounded hover:bg-[#00ff41]/10 hover:text-white transition-all duration-200"
                    >
                      Vercel
                    </a>
                  ) : (
                    <span className="px-4 py-2 border border-gray-800 text-gray-600 text-xs tracking-widest uppercase rounded select-none">
                      Vercel N/A
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-xs tracking-widest text-gray-600">
          Next: generate separate project pages from the <span className="text-gray-400">SLUG</span> field.
        </p>
      </div>
    </section>
  );
}

