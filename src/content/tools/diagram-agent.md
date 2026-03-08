---
name: "Diagram Agent"
tagline: "Takes user input in natural language to create architecture diagrams"
author: "Rahul Jangda"
author_github: "outbackops"
github_url: "https://github.com/outbackops/DiagramAgent"
thumbnail: "/thumbnails/diagram-agent.svg"
tags: ["architecture", "diagrams", "llm", "agent"]
language: "TypeScript"
license: "MIT"
theme: "newspaper"
date_added: "2026-03-02"
featured: false
---

DiagramAgent is an open-source, AI-powered tool that generates professional cloud architecture diagrams from natural language prompts, complete with product and service icons (AWS, Azure, GCP, Kubernetes, and more).

This is very much a work in progress. I built it because there's currently no open-source or first-party Microsoft solution for generating technical architecture diagrams - the kind you'd typically create in Visio, draw.io, or Lucidchart, using AI with proper product and feature iconography. A few paid products from dedicated companies exist in this space, but nothing freely available.

Under the hood, it's built on D2, an open-source diagram-as-code framework, paired with a Next.js frontend, Monaco code editor, and a WASM-based render engine. The workflow is conversational: describe your architecture, answer a few AI-generated clarifying questions to refine scope and detail, and watch the diagram stream in live. It also includes an experimental vision-based diagram scorer GPT-4o that evaluates the rendered output and iteratively feeds corrections back to the LLM to improve layout, completeness, and visual quality.