import Link from "next/link";
import { getMatrixData, getTechniqueById, getTacticById } from "@/lib/matrix-data";

export default async function AttackPathsPage() {
  const data = await getMatrixData();

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#1e3a5f] bg-[#0a1e3d]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight hover:text-[#06b6d4] transition-colors">
              AI Agent Threat Matrix
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">Matrix</Link>
              <Link href="/classes" className="text-slate-400 hover:text-white transition-colors">Attack Classes</Link>
              <Link href="/gaps" className="text-slate-400 hover:text-white transition-colors">Gap Analysis</Link>
              <Link href="/paths" className="text-[#06b6d4] font-medium">Attack Paths</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-2">Attack Paths</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-3xl">
          Complete kill chain traversals demonstrated in DVAA (Damn Vulnerable AI Agent).
          Each path shows how techniques chain together across multiple tactics to achieve a specific attacker objective.
        </p>

        <div className="space-y-6">
          {data.attackPaths.map((path) => (
            <div key={path.id} className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded border border-[#06b6d4]/30 text-[#06b6d4]">
                  Path {path.id}
                </span>
                <h3 className="text-base font-bold text-white">{path.name}</h3>
              </div>
              <p className="text-sm text-slate-400 mb-4">{path.description}</p>

              {/* Technique Chain */}
              <div className="flex flex-wrap items-center gap-2">
                {path.techniques.map((techId, i) => {
                  const tech = getTechniqueById(data, techId);
                  const tactic = tech ? getTacticById(data, tech.tactic) : null;
                  return (
                    <div key={techId} className="flex items-center gap-2">
                      <Link
                        href={`/techniques/${techId}`}
                        className="bg-[#051329] border border-[#1e3a5f] rounded px-3 py-2 hover:border-[#06b6d4] transition-colors group"
                      >
                        <div className="text-[10px] text-slate-500 mb-0.5">{tactic?.name}</div>
                        <div className="text-xs font-mono text-[#06b6d4] group-hover:underline">{techId}</div>
                        <div className="text-[10px] text-slate-300 mt-0.5 max-w-[120px] truncate">{tech?.name}</div>
                      </Link>
                      {i < path.techniques.length - 1 && (
                        <span className="text-slate-600 text-xs">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-4 border-t border-[#1e3a5f]">
          <Link href="/" className="text-xs text-[#06b6d4] hover:underline">
            ← Back to Matrix
          </Link>
        </div>
      </main>
    </div>
  );
}
