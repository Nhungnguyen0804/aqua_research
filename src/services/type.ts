export interface Pico {
  population: string;
  intervention: string;
  comparison: string;
  outcome: string;
  research_question: string;
}

export interface StringList {
  string_list: string[];
}
export interface PaperRelevance {
  id: string;
  relevant: boolean;
  reason: string;
}

export interface FilterResult {
  results: Array<PaperRelevance>;
}

export interface EligibilityCriteria {
  inclusion_criteria: string[];
  exclusion_criteria: string[];
}

export interface PaperAnalysis {
  contribution: string;
  method: string;
  limitation: string;
  key_findings: string;
}

export interface ReviewResult {
  is_grounded: boolean;
  issues: string;
}

export interface ThemeGroup {
  theme_name: string;
  description: string;
  papers: string[];
}

export interface ResearchGap {
  gap_description: string;
  supporting_papers: string[];
}

export interface SynthesisResult {
  overall_summary: string;
  themes: ThemeGroup[];
  gaps: ResearchGap[];
  recommendations: string;
}

export interface PaperType {
  source?: string;
  paper_id?: string | null;
  title?: string | null;
  abstract?: string | null;
  authors?: (string | null)[];
  year?: number | null;
  publication_date?: string | null;
  doi?: string | null;
  url?: string | null;
  pdf_url?: string | null;
  venue?: string | null;
  journal?: string | null;
  citation_count?: number | null;
  reference_count?: number | null;
  categories?: string[];
  [key: string]: unknown;
}

export interface ColumnType {
  key: string;
  label: string;
}
