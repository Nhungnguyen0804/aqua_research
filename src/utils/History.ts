export interface HistoryItem {
  id: string;
  topic: string;
  createdAt: string; // ISO string
  report_content: string;
}

const KEY = "lit_review_history";

export function saveToHistory(topic: string, report_content: string) {
  const list: HistoryItem[] = JSON.parse(localStorage.getItem(KEY) || "[]");
  const item: HistoryItem = {
    id: crypto.randomUUID(),
    topic,
    createdAt: new Date().toISOString(),
    report_content,
  };
  list.unshift(item); // thêm vào đầu list
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getHistory(): HistoryItem[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function getHistoryItem(id: string): HistoryItem | undefined {
  return getHistory().find((h) => h.id === id);
}
