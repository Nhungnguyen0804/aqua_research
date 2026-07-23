export default function Home() {
  return (
    <section className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">LitResearcher</h1>

        <p className="max-w-3xl text-gray-600">
          An AI-powered literature review assistant that helps researchers
          search, screen, extract, evaluate and summarize scientific papers
          efficiently.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">🔍 Search Papers</h2>

          <p className="text-gray-600">
            Search relevant academic papers from multiple scientific sources.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">🤖 AI Review</h2>

          <p className="text-gray-600">
            Automatically analyze, extract and evaluate research papers using AI
            agents.
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold">📄 Export Results</h2>

          <p className="text-gray-600">
            Export review results and generated reports for further research.
          </p>
        </div>
      </div>
    </section>
  );
}
