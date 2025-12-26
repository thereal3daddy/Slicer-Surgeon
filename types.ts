
export interface FixStep {
  title: string;
  summary: string;
  guide: string[];
  resourceLink?: string;
  detailedProcedure?: string[]; // Added for the new feature
}

export interface AnalysisResult {
  isPrintFailure: boolean;
  rejectionMessage?: string;
  diagnosis: string;
  shortDescription: string;
  confidenceScore: number;
  visualEvidence: string[];
  printerGuess: string;
  step1: FixStep;
  step2: FixStep;
  step3: FixStep;
  searchQueries: string[];
}

export interface AppState {
  image: string | null;
  analyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
}
