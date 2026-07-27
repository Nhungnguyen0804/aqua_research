import { useState, useRef } from "react";
import type { NodeDoneEvent, PipelineState } from "../services/api";
import { runPipeline } from "../services/api";

// hook tự gộp dần event.data vào 1 object collected
/*
khi node research_question_node xong, collected.pico tự nhiên có giá trị
khi synthesize_node xong, collected.synthesis có giá trị... 
Component chỉ cần đọc collected.pico
*/
export function usePipeline() {
  const [percent, setPercent] = useState(0);
  const [collected, setCollected] = useState<PipelineState>({}); // gom dữ liệu tất cả node lại 1 chỗ
  const [status, setStatus] = useState<"idle" | "running" | "done" | "error">(
    "idle",
  );
  const stopRef = useRef<(() => void) | null>(null);

  function start(topic: string) {
    setStatus("running");
    setCollected({});
    setPercent(0);

    stopRef.current = runPipeline(topic, {
      onNodeDone: (event: NodeDoneEvent) => {
        setPercent(event.percent);
        // gộp data của node này vào state tổng, VD node pico xong thì collected.pico có giá trị
        setCollected((prev) => ({ ...prev, ...event.data }));
      },
      onDone: () => {
        setPercent(100);
        setStatus("done");
      },
      onError: () => {
        setStatus("error");
      },
    });
  }

  return { percent, collected, status, start, stop: () => stopRef.current?.() };
}
