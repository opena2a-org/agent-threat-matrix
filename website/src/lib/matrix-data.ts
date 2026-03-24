// Matrix data types and loader
// In production, this reads from matrix.json. During development, serves embedded data.

export interface Tactic {
  id: string;
  name: string;
  stage: number;
  description: string;
  techniqueCount: number;
}

export interface Technique {
  id: string;
  name: string;
  tactic: string;
  description: string;
  evidenceTier: "observed" | "validated" | "adapted";
  attackClass: string;
  hmaChecks: string[];
  dvaaValidation: string | null;
  oasbControls: string[];
}

export interface AttackClass {
  id: string;
  name: string;
  category: "governance" | "supply-chain" | "infrastructure" | "nemoclaw" | "identity" | "sandbox";
  description: string;
  techniques: string[];
  hmaChecks: string[];
}

export interface AttackPath {
  id: string;
  name: string;
  description: string;
  techniques: string[];
}

export interface MatrixData {
  version: string;
  name: string;
  created: string;
  tactics: Tactic[];
  techniques: Technique[];
  attackClasses: AttackClass[];
  attackPaths: AttackPath[];
}

// This will be populated from matrix.json at build time
// For now, we import it directly
export async function getMatrixData(): Promise<MatrixData> {
  const data = await import("./matrix.json");
  return data.default as unknown as MatrixData;
}

// Helper functions
export function getTacticById(data: MatrixData, id: string): Tactic | undefined {
  return data.tactics.find((t) => t.id === id);
}

export function getTechniqueById(data: MatrixData, id: string): Technique | undefined {
  return data.techniques.find((t) => t.id === id);
}

export function getTechniquesByTactic(data: MatrixData, tacticId: string): Technique[] {
  return data.techniques.filter((t) => t.tactic === tacticId);
}

export function getTechniquesByClass(data: MatrixData, classId: string): Technique[] {
  return data.techniques.filter((t) => t.attackClass === classId);
}

export function getAttackClassById(data: MatrixData, id: string): AttackClass | undefined {
  return data.attackClasses.find((c) => c.id === id);
}

export function getEvidenceStats(data: MatrixData) {
  const observed = data.techniques.filter((t) => t.evidenceTier === "observed").length;
  const validated = data.techniques.filter((t) => t.evidenceTier === "validated").length;
  const adapted = data.techniques.filter((t) => t.evidenceTier === "adapted").length;
  return { observed, validated, adapted, total: data.techniques.length };
}
