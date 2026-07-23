import { useState } from "react";

export default function Chat() {
  const [message, setMessage] = useState("");

  return (
    <section className="flex h-[70vh] flex-col rounded-xl border bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">AI Chat</h1>

        <p className="text-sm text-gray-500">
          Ask questions about your literature review.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="rounded-lg bg-gray-100 p-4">
          <p className="text-gray-500">Conversation will appear here...</p>
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />

          <button className="rounded-lg bg-blue-600 px-6 text-white transition hover:bg-blue-700">
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
