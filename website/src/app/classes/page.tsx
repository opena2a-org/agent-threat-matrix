import Link from "next/link";
import { getMatrixData, getTechniqueById } from "@/lib/matrix-data";

const CATEGORY_LABELS: Record<string, string> = {
  governance: "Governance",
  "supply-chain": "Supply Chain",
  infrastructure: "Infrastructure",
  nemoclaw: "NemoClaw-Specific",
  identity: "Identity",
  sandbox: "Sandbox",
};

const CATEGORY_COLORS: Record<string, string> = {
  governance: "border-purple-500/30",
  "supply-chain": "border-amber-500/30",
  infrastructure: "border-cyan-500/30",
  nemoclaw: "border-red-500/30",
  identity: "border-blue-500/30",
  sandbox: "border-orange-500/30",
};

export default async function ClassesPage() {
  const data = await getMatrixData();

  const categories = Object.keys(CATEGORY_LABELS);

  return (
    <div className="min-h-screen">
      <header className="border-b border-[#1e3a5f] bg-[#0a1e3d]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-bold tracking-tight hover:text-[#06b6d4] transition-colors">
              AI Agent Threat Matrix
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">Matrix</Link>
              <Link href="/classes" className="text-[#06b6d4] font-medium">Attack Classes</Link>
              <Link href="/gaps" className="text-slate-400 hover:text-white transition-colors">Gap Analysis</Link>
              <Link href="/paths" className="text-slate-400 hover:text-white transition-colors">Attack Paths</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-2">Attack Classes</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-3xl">
          {data.attackClasses.length} attack classes group related techniques by vulnerability pattern.
          Each class represents a distinct category of threat to AI agent systems.
        </p>

        {categories.map((category) => {
          const classes = data.attackClasses.filter((c) => c.category === category);
          if (classes.length === 0) return null;

          return (
            <div key={category} className="mb-8">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                {CATEGORY_LABELS[category]} ({classes.length} classes)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {classes.map((cls) => {
                  const techniques = (cls.techniques || []).map(id => getTechniqueById(data, id)).filter(Boolean);
                  const borderColor = CATEGORY_COLORS[category] || "border-[#1e3a5f]";
                  return (
                    <div
                      key={cls.id}
                      className={`bg-[#0a1e3d] border ${borderColor} rounded-lg p-4`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-bold font-mono text-white">{cls.id}</h4>
                        <span className="text-xs text-slate-500">{techniques.length} techniques</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">{cls.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {techniques.map((t: any) => (
                          <Link
                            key={t.id}
                            href={`/techniques/${t.id}`}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#1e3a5f] text-slate-400 hover:text-[#06b6d4] hover:border-[#06b6d4] transition-colors"
                          >
                            {t.id}
                          </Link>
                        ))}
                      </div>
                      {cls.hmaChecks.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-[#1e3a5f]">
                          <span className="text-[10px] text-slate-500">Detection: </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {cls.hmaChecks.slice(0, 5).join(", ")}
                            {cls.hmaChecks.length > 5 && ` +${cls.hmaChecks.length - 5} more`}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
