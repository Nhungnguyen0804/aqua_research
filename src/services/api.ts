import type {
  Pico,
  EligibilityCriteria,
  SynthesisResult,
  PaperType,
} from "./type";

// export const API_BASE_URL = "http://localhost:8000";
// export const API_BASE_URL = "https://aqua-research.vercel.app";
export const API_BASE_URL =
  "https://aqua-research-api-b741ca04.fastapicloud.dev";

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
// gọi /api/run để lay jobid, ko doc stream
async function startPipeline(
  topic: string,
  signal: AbortSignal,
): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`Không tạo được job, server trả về lỗi ${response.status}`);
  }

  const result: { job_id: string } = await response.json();
  return result.job_id;
}

// đọc tiến độ từ /api/stream/{job_id}
// true neu done/ error = end that su $
// false neu bi ngat nhung pipeline chua xong $
async function readProgressStream(
  jobId: string,
  callbacks: RunPipelineCallbacks,
  signal: AbortSignal,
): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/api/stream/${jobId}`, {
    signal,
  });

  if (!response.body) return false;

  const streamReader = response.body.getReader();
  const textDecoder = new TextDecoder();

  let pendingText = "";
  let isFinished = false;

  while (true) {
    const { done, value } = await streamReader.read();
    if (done) break;

    pendingText += textDecoder.decode(value, { stream: true });

    const eventBlocks = pendingText.split("\n\n");
    pendingText = eventBlocks.pop() ?? "";

    for (const eventBlock of eventBlocks) {
      // bỏ qua dòng keep-alive (": keep-alive"), vi ko phai data that
      if (eventBlock.startsWith(":")) continue;

      const lines = eventBlock.split("\n");
      const eventLine = lines.find((line) => line.startsWith("event:"));
      const dataLine = lines.find((line) => line.startsWith("data:"));

      if (!dataLine) continue;

      const eventType = eventLine?.replace("event:", "").trim() ?? "message";
      const eventData = JSON.parse(dataLine.replace("data:", "").trim());

      if (eventType === "node_done") {
        callbacks.onNodeDone(eventData);
      }

      if (eventType === "done") {
        callbacks.onDone(eventData);
        isFinished = true;
      }

      if (eventType === "error") {
        callbacks.onError(eventData);
        isFinished = true;
      }
    }
  }

  return isFinished;
}
export function runPipeline(
  topic: string,
  callbacks: RunPipelineCallbacks,
): () => void {
  const abortController = new AbortController();

  (async () => {
    try {
      const jobId = await startPipeline(topic, abortController.signal);

      // nếu kết nối stream bị rớt giữa chừng (do proxy/mạng),
      // tự động mở lại stream cho tới khi pipeline thật sự xong.
      // server sẽ tự trả lại đúng những bước chưa gửi
      let pipelineFinished = false;
      while (!pipelineFinished && !abortController.signal.aborted) {
        try {
          pipelineFinished = await readProgressStream(
            jobId,
            callbacks,
            abortController.signal,
          );
        } catch (streamError) {
          if (abortController.signal.aborted) return;
          // chờ 1 giây rồi thử kết nối lại
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error) {
      if (abortController.signal.aborted) return;
      callbacks.onError({
        message: error instanceof Error ? error.message : "Lỗi không xác định",
      });
    }
  })();

  return () => abortController.abort();
}
