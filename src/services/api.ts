import type {
  Pico,
  EligibilityCriteria,
  SynthesisResult,
  PaperType,
} from "./type";

// export const API_BASE_URL = "http://localhost:8000";
export const API_BASE_URL = "https://aqua-research.vercel.app";

export type NodeName =
  | "research_question_node"
  | "query_expansion_node"
  | "search_node"
  | "dedup_node"
  | "screen_node"
  | "criteria_node"
  | "eligibility_node"
  | "extract_node"
  | "reviewer_node"
  | "synthesize_node"
  | "report_node";
// data ứng với từng node
// field mà node đó ghi vào LitState
export interface PipelineState {
  pico?: Pico;
  sub_queries?: string[];
  raw_papers?: PaperType[];
  deduped_papers?: PaperType[];
  screened_papers?: PaperType[];
  eligibility_criteria?: EligibilityCriteria;
  eligible_papers?: PaperType[];
  included_papers?: PaperType[];
  reviewed_papers?: PaperType[];
  synthesis?: SynthesisResult;
  report_content?: string;
}

export interface NodeDoneEvent {
  node: NodeName;
  step: number;
  total_steps: number;
  percent: number;
  elapsed_node_seconds: number;
  elapsed_total_seconds: number;
  data: Partial<PipelineState>;
}

export interface DoneEvent {
  elapsed_total_seconds: number;
}

export interface ErrorEvent {
  message: string;
}

export interface RunPipelineCallbacks {
  onNodeDone: (event: NodeDoneEvent) => void;
  onDone: (event: DoneEvent) => void;
  onError: (event: ErrorEvent) => void;
}

export function runPipeline(
  topic: string,
  callbacks: RunPipelineCallbacks,
): () => void {
  const abortController = new AbortController();

  (async () => {
    const response = await fetch(`${API_BASE_URL}/api/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
      signal: abortController.signal,
    });

    if (!response.body) return;

    const streamReader = response.body.getReader();
    const textDecoder = new TextDecoder();

    let pendingText = "";

    while (true) {
      const { done, value } = await streamReader.read();
      if (done) break;

      pendingText += textDecoder.decode(value, { stream: true });

      const eventBlocks = pendingText.split("\n\n");
      pendingText = eventBlocks.pop() ?? "";

      for (const eventBlock of eventBlocks) {
        const lines = eventBlock.split("\n");

        const eventLine = lines.find((line) => line.startsWith("event:"));
        const dataLine = lines.find((line) => line.startsWith("data:"));

        if (!dataLine) continue;

        const eventType = eventLine?.replace("event: ", "").trim() ?? "message";

        const eventData = JSON.parse(dataLine.replace("data: ", ""));

        if (eventType === "node_done") {
          callbacks.onNodeDone(eventData);
        }

        if (eventType === "done") {
          callbacks.onDone(eventData);
        }

        if (eventType === "error") {
          callbacks.onError(eventData);
        }
      }
    }
  })();

  return () => abortController.abort();
}
