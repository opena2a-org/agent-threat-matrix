import Link from "next/link";
import { notFound } from "next/navigation";
import { getMatrixData, getTechniqueById, getTacticById, getAttackClassById } from "@/lib/matrix-data";

const EVIDENCE_COLORS = {
  observed: "bg-green-500/20 text-green-400 border-green-500/30",
  validated: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  adapted: "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

const EVIDENCE_DESCRIPTIONS = {
  observed: "Confirmed in real-world production systems or internet-wide exposure assessments.",
  validated: "Reproduced in controlled lab environment (DVAA) with documented steps.",
  adapted: "Well-understood traditional technique applied to the AI agent context.",
};

export async function generateStaticParams() {
  const data = await getMatrixData();
  return data.techniques.map((t) => ({ id: t.id }));
}

export default async function TechniquePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getMatrixData();
  const technique = getTechniqueById(data, id);

  if (!technique) {
    notFound();
  }

  const tactic = getTacticById(data, technique.tactic);
  const attackClass = getAttackClassById(data, technique.attackClass);

  return (
    <div className="min-h-screen">
      {/* Header */}
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
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#06b6d4]">Matrix</Link>
          <span>/</span>
          <span className="text-slate-400">{tactic?.name}</span>
          <span>/</span>
          <span className="text-white">{technique.id}</span>
        </div>

        {/* Technique Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-mono text-[#06b6d4]">{technique.id}</span>
            <span className={`text-xs px-2 py-0.5 rounded border ${EVIDENCE_COLORS[technique.evidenceTier]}`}>
              {technique.evidenceTier}
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-3">{technique.name}</h1>
          <p className="text-slate-400 text-sm leading-relaxed">{technique.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Tactic */}
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Tactic</h3>
            <p className="text-sm text-white">{tactic?.name} (Stage {tactic?.stage})</p>
            <p className="text-xs text-slate-400 mt-1">{tactic?.description}</p>
          </div>

          {/* Attack Class */}
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Attack Class</h3>
            <p className="text-sm text-white font-mono">{technique.attackClass}</p>
            {attackClass && <p className="text-xs text-slate-400 mt-1">{attackClass.description}</p>}
          </div>

          {/* Evidence */}
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Evidence</h3>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-0.5 rounded border ${EVIDENCE_COLORS[technique.evidenceTier]}`}>
                {technique.evidenceTier}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{EVIDENCE_DESCRIPTIONS[technique.evidenceTier]}</p>
          </div>

          {/* DVAA Validation */}
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">DVAA Validation</h3>
            {technique.dvaaValidation ? (
              <p className="text-sm text-white">{technique.dvaaValidation}</p>
            ) : (
              <p className="text-xs text-slate-500 italic">No DVAA validation available for this technique.</p>
            )}
          </div>
        </div>

        {/* Detection */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Detection (HackMyAgent)</h3>
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
            {technique.hmaChecks.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {technique.hmaChecks.map((check) => (
                  <span
                    key={check}
                    className="text-xs font-mono px-2 py-1 rounded border border-[#1e3a5f] text-slate-300 bg-[#051329]"
                  >
                    {check}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No automated detection available.</p>
            )}
            <div className="mt-3 pt-3 border-t border-[#1e3a5f]">
              <code className="text-xs text-slate-400">npx hackmyagent secure --ci</code>
            </div>
          </div>
        </div>

        {/* Defense */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Defense (OASB Controls)</h3>
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
            {technique.oasbControls.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {technique.oasbControls.map((control) => (
                  <span
                    key={control}
                    className="text-xs font-mono px-2 py-1 rounded border border-[#1e3a5f] text-slate-300 bg-[#051329]"
                  >
                    OASB {control}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No OASB controls mapped.</p>
            )}
          </div>
        </div>

        {/* Citation */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">How to Cite</h3>
          <div className="bg-[#0a1e3d] border border-[#1e3a5f] rounded-lg p-4">
            <code className="text-xs text-slate-300 block">
              AI Agent Threat Matrix {technique.id} ({technique.name}). OpenA2A, 2026. https://threats.opena2a.org/techniques/{technique.id}
            </code>
          </div>
        </div>

        {/* Back link */}
        <div className="pt-4 border-t border-[#1e3a5f]">
          <Link href="/" className="text-xs text-[#06b6d4] hover:underline">
            ← Back to Matrix
          </Link>
        </div>
      </main>
    </div>
  );
}
