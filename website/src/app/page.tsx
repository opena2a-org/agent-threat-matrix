import Link from "next/link";
import { getMatrixData, getEvidenceStats, getTechniquesByTactic } from "@/lib/matrix-data";

const TACTIC_COLORS: Record<string, string> = {
  reconnaissance: "border-blue-500/30",
  "initial-access": "border-red-500/30",
  "credential-harvest": "border-amber-500/30",
  "privilege-escalation": "border-orange-500/30",
  "lateral-movement": "border-purple-500/30",
  persistence: "border-pink-500/30",
  collection: "border-cyan-500/30",
  exfiltration: "border-green-500/30",
  impact: "border-red-700/30",
};

const EVIDENCE_COLORS = {
  observed: "bg-green-500/20 text-green-400 border-green-500/30",
  validated: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  adapted: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export default async function Home() {
  const data = await getMatrixData();
  const stats = getEvidenceStats(data);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#1e3a5f] bg-[#0a1e3d]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-bold tracking-tight">AI Agent Threat Matrix</h1>
              <span className="text-xs px-2 py-0.5 rounded border border-[#1e3a5f] text-slate-400">v{data.version}</span>
            </div>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-[#06b6d4] font-medium">Matrix</Link>
              <Link href="/classes" className="text-slate-400 hover:text-white transition-colors">Attack Classes</Link>
              <Link href="/gaps" className="text-slate-400 hover:text-white transition-colors">Gap Analysis</Link>
              <Link href="/paths" className="text-slate-400 hover:text-white transition-colors">Attack Paths</Link>
              <a
                href="https://github.com/opena2a-org/agent-threat-matrix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-3 leading-tight">
            Classifying attacks against AI agent systems
          </h2>
          <p className="text-slate-400 text-sm max-w-3xl leading-relaxed mb-6">
            {data.tactics.length} tactics. {data.techniques.length} techniques. {data.attackClasses.length} attack classes.
            Every technique is grounded in observed adversary behavior or validated in a controlled lab environment.
            Designed to complement MITRE ATT&CK and OWASP, not replace them.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
            <StatCard label="Tactics" value={String(data.tactics.length)} />
            <StatCard label="Techniques" value={String(data.techniques.length)} />
            <StatCard label="Attack Classes" value={String(data.attackClasses.length)} />
            <StatCard label="Observed" value={String(stats.observed)} sub={`${Math.round((stats.observed / stats.total) * 100)}%`} />
            <StatCard label="Validated" value={String(stats.validated)} sub={`${Math.round((stats.validated / stats.total) * 100)}%`} />
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Threat Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {data.tactics.map((tactic) => {
              const techniques = getTechniquesByTactic(data, tactic.id);
              const borderColor = TACTIC_COLORS[tactic.id] || "border-[#1e3a5f]";
              return (
                <div
                  key={tactic.id}
                  className={`bg-[#0a1e3d] rounded-lg border ${borderColor} p-4`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-white">{tactic.name}</h4>
                    <span className="text-xs text-slate-500">Stage {tactic.stage}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{tactic.description}</p>
                  <div className="space-y-1.5">
                    {techniques.map((tech) => (
                      <Link
                        key={tech.id}
                        href={`/techniques/${tech.id}`}
                        className="flex items-center gap-2 group"
                      >
                        <span className="text-[10px] font-mono text-slate-500 w-12 shrink-0">{tech.id}</span>
                        <span className="text-xs text-slate-300 group-hover:text-[#06b6d4] transition-colors truncate flex-1">
                          {tech.name}
                        </span>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded border shrink-0 ${EVIDENCE_COLORS[tech.evidenceTier]}`}
                        >
                          {tech.evidenceTier}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evidence Tiers Legend */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Evidence Standard</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded border ${EVIDENCE_COLORS.observed}`}>observed</span>
                <span className="text-xs font-mono text-slate-400">{stats.observed} techniques</span>
              </div>
              <p className="text-xs text-slate-400">Confirmed in real-world production systems, security incidents, or internet-wide exposure assessments.</p>
            </div>
            <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded border ${EVIDENCE_COLORS.validated}`}>validated</span>
                <span className="text-xs font-mono text-slate-400">{stats.validated} techniques</span>
              </div>
              <p className="text-xs text-slate-400">Reproduced in controlled lab environment (DVAA) with documented steps and independent verification.</p>
            </div>
            <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded border ${EVIDENCE_COLORS.adapted}`}>adapted</span>
                <span className="text-xs font-mono text-slate-400">{stats.adapted} techniques</span>
              </div>
              <p className="text-xs text-slate-400">Well-understood traditional technique applied to the AI agent context. Not yet observed agent-specifically.</p>
            </div>
          </div>
        </div>

        {/* Cross-Framework Positioning */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wider">Where This Fits</h3>
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-white mb-2">MITRE ATT&CK</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Enterprise network and endpoint attacks. Covers the infrastructure layer below the agent.</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">MITRE ATLAS</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Adversarial ML and model-level attacks. Covers the model layer below the agent.</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#06b6d4] mb-2">Agent Threat Matrix</h4>
                <p className="text-slate-400 text-xs leading-relaxed">Agent infrastructure, governance, protocols, memory, and identity. Covers the agent layer between the model and the user.</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-[#1e3a5f]">
              <Link href="/gaps" className="text-xs text-[#06b6d4] hover:underline">
                View the full gap analysis showing which of our 57 techniques are not covered by OWASP or MITRE →
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-[#1e3a5f] pt-6 pb-8 text-xs text-slate-500">
          <div className="flex items-center justify-between">
            <div>
              AI Agent Threat Matrix v{data.version} — <a href="https://opena2a.org" className="text-[#06b6d4] hover:underline">OpenA2A</a> — Apache-2.0
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/opena2a-org/agent-threat-matrix" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://research.opena2a.org" className="hover:text-white transition-colors">Research</a>
              <a href="https://github.com/opena2a-org/hackmyagent" className="hover:text-white transition-colors">HackMyAgent</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-3 text-center">
      <div className="text-xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-[#06b6d4] font-mono">{sub}</div>}
      <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{label}</div>
    </div>
  );
}
