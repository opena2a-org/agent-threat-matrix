import Link from "next/link";
import { getMatrixData } from "@/lib/matrix-data";

// Techniques partially covered by OWASP LLM Top 10
const OWASP_COVERED = new Set([
  "T-2001", "T-2002", "T-2003", "T-2004", "T-2005", "T-2006", "T-2007", "T-2008", // LLM01
  "T-7001", "T-8005", // LLM02
  "T-9006", "T-6004", "T-5003", // LLM05
  "T-3001", "T-3002", "T-3003", "T-3004", "T-3005", "T-3006", "T-7004", "T-7005", "T-7006", // LLM06
  "T-4003", // LLM07
  "T-4001", "T-4002", "T-4004", "T-9001", "T-9003", // LLM08
  "T-6001", "T-6002", // LLM09
]);

// Techniques partially covered by MITRE ATLAS
const ATLAS_COVERED = new Set([
  "T-1001", "T-1002", "T-1003", "T-1004", "T-1005", "T-1006", "T-1007", // Recon
  "T-2001", "T-2002", "T-2003", "T-2004", "T-2006", // Initial Access
  "T-3001", "T-3002", "T-3003", "T-3004", "T-3005", "T-3006", // Cred Harvest
  "T-4005", // Defense Evasion
]);

export default async function GapAnalysisPage() {
  const data = await getMatrixData();

  const notInOwasp = data.techniques.filter((t) => !OWASP_COVERED.has(t.id));
  const notInAtlas = data.techniques.filter((t) => !ATLAS_COVERED.has(t.id));
  const notInEither = data.techniques.filter((t) => !OWASP_COVERED.has(t.id) && !ATLAS_COVERED.has(t.id));

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
              <Link href="/gaps" className="text-[#06b6d4] font-medium">Gap Analysis</Link>
              <Link href="/paths" className="text-slate-400 hover:text-white transition-colors">Attack Paths</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-2">Gap Analysis</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-3xl">
          How the AI Agent Threat Matrix relates to existing frameworks.
          This analysis shows which techniques are covered, partially covered, or not addressed by OWASP Top 10 for LLM and MITRE ATLAS.
        </p>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-white">{data.techniques.length}</div>
            <div className="text-[10px] text-slate-500 uppercase">Total Techniques</div>
          </div>
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-white">{OWASP_COVERED.size}</div>
            <div className="text-[10px] text-slate-500 uppercase">In OWASP LLM</div>
          </div>
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-white">{ATLAS_COVERED.size}</div>
            <div className="text-[10px] text-slate-500 uppercase">In MITRE ATLAS</div>
          </div>
          <div className="bg-[#0a1e3d] border border-[#06b6d4]/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-[#06b6d4]">{notInEither.length}</div>
            <div className="text-[10px] text-slate-500 uppercase">Not in Either</div>
          </div>
        </div>

        {/* Key Insight */}
        <div className="bg-[#0a1e3d] border border-[#06b6d4]/30 rounded-lg p-4 mb-8">
          <p className="text-sm text-slate-300">
            <span className="text-[#06b6d4] font-bold">{notInEither.length} of {data.techniques.length} techniques</span> ({Math.round((notInEither.length / data.techniques.length) * 100)}%) in the AI Agent Threat Matrix are not covered by either OWASP Top 10 for LLM or MITRE ATLAS.
            These are agent-layer threats that existing frameworks were not designed to address.
          </p>
        </div>

        {/* Techniques Not in Either */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Techniques Not Covered by OWASP or ATLAS ({notInEither.length})
          </h3>
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e3a5f]">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium text-xs">ID</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium text-xs">Technique</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium text-xs">Tactic</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium text-xs">Class</th>
                </tr>
              </thead>
              <tbody>
                {notInEither.map((tech) => (
                  <tr key={tech.id} className="border-b border-[#1e3a5f]/50 hover:bg-[#051329] transition-colors">
                    <td className="py-2 px-3">
                      <Link href={`/techniques/${tech.id}`} className="text-xs font-mono text-[#06b6d4] hover:underline">
                        {tech.id}
                      </Link>
                    </td>
                    <td className="py-2 px-3 text-xs text-white">{tech.name}</td>
                    <td className="py-2 px-3 text-xs text-slate-400">{tech.tactic}</td>
                    <td className="py-2 px-3 text-xs font-mono text-slate-400">{tech.attackClass}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Framework Scope Comparison */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Framework Scope</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
              <h4 className="text-sm font-bold text-white mb-2">OWASP Top 10 for LLM</h4>
              <p className="text-xs text-slate-400 mb-2">Covers: prompt injection, output handling, supply chain, info disclosure, excessive agency, overreliance</p>
              <p className="text-xs text-slate-500">Does not cover: agent protocols (MCP, A2A), governance file manipulation, memory persistence, cross-agent lateral movement, sandbox escape, heartbeat attacks, identity attacks</p>
            </div>
            <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
              <h4 className="text-sm font-bold text-white mb-2">MITRE ATLAS</h4>
              <p className="text-xs text-slate-400 mb-2">Covers: reconnaissance, initial access (adversarial ML), credential access, model extraction, data poisoning</p>
              <p className="text-xs text-slate-500">Does not cover: agent infrastructure, skill supply chain, MCP/A2A exploitation, governance files, memory poisoning, heartbeat persistence, webhook exfiltration</p>
            </div>
            <div className="bg-[#0a1e3d] border border-[#06b6d4]/30 rounded-lg p-4">
              <h4 className="text-sm font-bold text-[#06b6d4] mb-2">Agent Threat Matrix</h4>
              <p className="text-xs text-slate-400 mb-2">Covers: the agent layer between the model and the user — governance, protocols, memory, identity, skills, and infrastructure</p>
              <p className="text-xs text-slate-500">Does not cover: model-level attacks (adversarial examples, training poisoning), enterprise network attacks</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#1e3a5f]">
          <Link href="/" className="text-xs text-[#06b6d4] hover:underline">
            ← Back to Matrix
          </Link>
        </div>
      </main>
    </div>
  );
}
