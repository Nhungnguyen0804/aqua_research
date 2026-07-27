import TopicCard from "../components/Card/TopicCard";
import PicoCard from "../components/Card/PicoCard";
import SubCard from "../components/Card/SubCard";

import { usePipeline } from "../hooks/usePipeline";
import { Alert } from "@mui/material";
import Screen from "../components/Screen";
import Criteria from "../components/Criteria";
import DeepFilter from "../components/DeepFilter";
import Extract from "../components/Extract";
import Review from "../components/Review";
import Synthesis from "../components/Synthesis";
import Report from "../components/Report";

import { useEffect, useState } from "react";
import { saveToHistory } from "../utils/History";

export default function Home() {
  const { collected, percent, status, start } = usePipeline();
  const [currentTopic, setCurrentTopic] = useState("");

  const handleSearchTopic = (topic: string) => {
    setCurrentTopic(topic);
    start(topic); // chạy pipeline qua SSE, không cần await/try-catch ở đây nữa
  };

  const loading = status === "running";
  const error = status === "error" ? "Đã có lỗi xảy ra" : null;

  useEffect(() => {
    if (collected.report_content) {
      saveToHistory(currentTopic, collected.report_content);
    }
  }, [collected.report_content]);
  return (
    <section className="space-y-10">
      <TopicCard onSearch={handleSearchTopic} loading={loading} error={error} />

      {collected.pico && (
        <PicoCard title="Research Question" pico={collected.pico} />
      )}

      {collected.sub_queries && (
        <SubCard title="Sub Queries" sub_queries={collected.sub_queries} />
      )}

      {(collected.screened_papers?.length ?? 0) > 0 && (
        <Screen collected={collected} />
      )}

      {collected.eligibility_criteria && (
        <Criteria
          title={"Tiêu chí lọc sâu"}
          inclusion={collected.eligibility_criteria.inclusion_criteria}
          exclusion={collected.eligibility_criteria.exclusion_criteria}
        />
      )}

      {(collected.eligible_papers?.length ?? 0) > 0 && (
        <DeepFilter title="Step 2: Deep Filter" collected={collected} />
      )}

      {(collected.included_papers?.length ?? 0) > 0 && (
        <Extract title="Step 3: Extract" collected={collected} />
      )}

      {(collected.reviewed_papers?.length ?? 0) > 0 && (
        <Review title="Step 4: Review" collected={collected} />
      )}
      {/* tổng hợp  */}

      {collected.synthesis && (
        <Synthesis
          title="Step 5: Synthesis (Tổng hợp kết quả)"
          summary={collected.synthesis.overall_summary}
          themes={collected.synthesis.themes}
          gaps={collected.synthesis.gaps}
          recommendations={collected.synthesis.recommendations}
        />
      )}

      {collected.report_content && (
        <Report title="Step 6: REPORT" content={collected.report_content} />
      )}

      {loading && <Alert severity="info">Đang chạy... {percent}%</Alert>}
    </section>
  );
}
