export interface Pico {
  population: string;
  intervention: string;
  comparison: string;
  outcome: string;
  research_question: string;
}

const API_BASE_URL = "http://localhost:8000";

export async function fetchPico(topic: string): Promise<Pico> {
  const res = await fetch(`${API_BASE_URL}/api/pico`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => null);
    throw new Error(errData?.detail || "Request failed");
  }

  const data = await res.json();
  return data.pico;
}
