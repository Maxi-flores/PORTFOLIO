import NeuralShell from '../layout/NeuralShell.jsx';

export default function AI() {
  return (
    <NeuralShell
      prompt="~/portfolio/ai $"
      title="AI"
      subtitle="Chronological learning and engineering narrative."
    >
      <section className="rounded-lg bg-black/40 ring-1 ring-[#00ff41]/15 px-5 py-5">
        <p className="text-sm text-gray-300 leading-relaxed">
          My journey into Artificial Intelligence began locally, setting up Ollama on a Linux Mint environment to explore
          the engineering boundaries of open-source local LLMs versus proprietary cloud models. This hands-on research
          transitioned my technical focus from traditional manual programming in Python, CSS, JS, and HTML into automated
          scripting logic.
        </p>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          As I mastered prompting constraints, my workflow evolved from simple script execution to automated UX component
          generation, utilizing OpenAI’s early code generation tools. This layout quickly scaled into managing full
          project directories directly inside the chat interface, enabling the construction of complex, real-working
          software components mapped to strict system criteria.
        </p>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          The introduction of Claude and its CLI capabilities transformed my architectural approach. JSON strings became
          highly prominent as structured data payloads, allowing me to inject, configure, and install advanced design
          tools directly into active project environments. This shift replaced hand-written code logic with AI
          orchestration, reducing manual debugging to an absolute minimum and turning natural language text into
          production-ready code.
        </p>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Concurrently with adopting Claude’s multi-option frameworks, I expanded my enterprise enterprise cloud
          infrastructure knowledge, studying Microsoft Azure and completing data fundamental principles. Today, this
          entire pipeline is consolidated through Codex and GitHub Copilot, allowing me to engineer scalable systems with
          extreme efficiency. My advanced GitHub automation certifications (GH-100) are currently pending as the next
          active milestone in this autonomous orchestration workflow.
        </p>
      </section>
    </NeuralShell>
  );
}

