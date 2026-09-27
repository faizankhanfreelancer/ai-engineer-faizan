import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Faizan Khan — AI Engineer & Generative AI Specialist" },
      {
        name: "description",
        content:
          "Faizan Khan is an AI Engineer specializing in Python, LLMs, RAG pipelines, AI agents and scalable machine learning systems. Available for freelance and full-time roles.",
      },
      { property: "og:title", content: "Faizan Khan — AI Engineer & Generative AI Specialist" },
      {
        property: "og:description",
        content:
          "Building intelligent AI systems, LLM apps, RAG pipelines, chatbots, and ML solutions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});
