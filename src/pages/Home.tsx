import TopicCard from "../components/Card/TopicCard";
import PicoCard from "../components/Card/PicoCard";

import { useState } from "react";
import { fetchPico } from "../services/picoApi";
import type { Pico } from "../services/picoApi";

export default function Home() {
  const [pico, setPico] = useState<Pico | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearchTopic = async (topic: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPico(topic);
      setPico(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-10 ">
      <TopicCard onSearch={handleSearchTopic} loading={loading} error={error} />

      {pico && <PicoCard pico={pico} />}
    </section>
  );
}
