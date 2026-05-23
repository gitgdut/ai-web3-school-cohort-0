# Prompt Engineering Playground

A minimal interactive tool to learn prompt engineering by doing. Write a prompt, toggle techniques, and see how each one transforms both the prompt sent to the AI and the response you get back.

## Quick Start

```bash
npm install
cp .env.example .env        # Edit .env — set PROVIDER and API_KEY
npm start
```

Open http://localhost:3000. Without an API key, the playground runs in **demo mode** — it shows the transformed prompt but doesn't call the AI.

### Supported Providers

| Provider | `.env` config | Needs API key? |
| --- | --- | --- |
| **DeepSeek** | `PROVIDER=deepseek` + `API_KEY=sk-...` | Yes (cheap) |
| **Anthropic** | `PROVIDER=anthropic` + `API_KEY=sk-ant-...` | Yes |
| **Ollama** | `PROVIDER=ollama` (no key needed) | No (local) |

## What You Can Learn

| Technique | What it does | When to use it |
|-----------|-------------|----------------|
| **Role Setting** | Sets a system prompt that defines the AI's persona | When you need a specific tone, expertise, or perspective |
| **Chain of Thought** | Appends "think step by step" to your prompt | Math, logic, debugging — any reasoning-heavy task |
| **Few-shot Learning** | Prepends input/output examples before your prompt | When you need consistent formatting or specific response patterns |
| **Structured Output** | Requests JSON or formatted responses | When the output needs to be parsed by another program |

## AI vs Human Contribution

### AI-generated (Claude)
- Full code for `server.js` and `index.html`
- CSS styling and layout design
- Prompt transformation composition logic
- Color-coded prompt visualization (parsing transformed prompt back into parts)
- Demo mode fallback behavior

### Human-designed / verified
- **Tool concept**: the idea of toggling techniques on/off to see their impact
- **Architecture choices**: single HTML + Express backend, no framework overhead
- **Technique descriptions**: the educational copy that explains each technique's use case
- **Role presets**: Blockchain Engineer, Math Teacher, Code Reviewer — chosen for relevance to the cohort
- **Temperature slider**: added deliberately as a fundamental parameter to teach
- **Demo mode**: decision to make the tool work without an API key, so anyone can learn

### What a human should verify
- Review the prompt transformation logic in `server.js:applyTechniques()` — is the composition order correct?
- Test with a real API key to verify the AI responses match expectations
- Tune the few-shot examples in the UI to your own domain
- Check error handling for edge cases (empty prompts, network failures)
