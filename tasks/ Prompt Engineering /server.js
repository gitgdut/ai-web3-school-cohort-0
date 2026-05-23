require("dotenv").config();
const express = require("express");
const Anthropic = require("@anthropic-ai/sdk").default;

const app = express();
app.use(express.json());
app.use(express.static("public"));

const PROVIDER = process.env.PROVIDER || "anthropic"; // "anthropic" | "deepseek" | "ollama"
const API_KEY = process.env.API_KEY || process.env.ANTHROPIC_API_KEY || "";
const DEEPSEEK_BASE = process.env.DEEPSEEK_BASE || "https://api.deepseek.com/v1";
const OLLAMA_BASE = process.env.OLLAMA_BASE || "http://localhost:11434/v1";

const MODEL_MAP = {
  anthropic: "claude-sonnet-4-6",
  deepseek: "deepseek-chat",
  ollama: "llama3.2",
};

const inDemoMode = !API_KEY || API_KEY === "demo-mode";

// Lazy Anthropic client
let anthropicClient = null;
function getAnthropic() {
  if (!anthropicClient && !inDemoMode && PROVIDER === "anthropic") {
    anthropicClient = new Anthropic({ apiKey: API_KEY });
  }
  return anthropicClient;
}

// ---- Prompt transformation (same across all providers) ----
function applyTechniques(basePrompt, techniques) {
  let systemPrompt = "";
  let userPrompt = basePrompt;
  const applied = [];

  if (techniques.roleSetting) {
    const role = techniques.roleSetting === "custom"
      ? (techniques.customRole || "You are a helpful assistant.")
      : techniques.roleSetting;
    systemPrompt = role;
    applied.push({ name: "Role Setting", effect: `System: "${role}"` });
  }

  if (techniques.chainOfThought) {
    userPrompt = `${userPrompt}\n\nThink through this step by step before giving your final answer.`;
    applied.push({ name: "Chain of Thought", effect: 'Appended: "Think through this step by step..."' });
  }

  if (techniques.fewShot) {
    const examples = techniques.customExamples || "Q: What is 2+2?\nA: 4\n\nQ: What is the capital of France?\nA: Paris";
    userPrompt = `Here are some examples of the format I want:\n\n${examples}\n\n---\nNow answer this:\n\n${userPrompt}`;
    applied.push({ name: "Few-shot Learning", effect: `Prepended ${examples.split("\n").filter(l => l.startsWith("Q:")).length} example(s)` });
  }

  if (techniques.structuredOutput) {
    const format = techniques.structuredOutput === "json"
      ? "Please respond in valid JSON format."
      : "Please format your response with clear headings and bullet points.";
    userPrompt = `${userPrompt}\n\n${format}`;
    applied.push({ name: "Structured Output", effect: `Appended: "${format}"` });
  }

  return { systemPrompt, userPrompt, applied };
}

// ---- Provider-specific API calls ----
async function callAnthropic(systemPrompt, userPrompt, temperature) {
  const client = getAnthropic();
  const response = await client.messages.create({
    model: MODEL_MAP.anthropic,
    max_tokens: 1024,
    temperature: temperature || 0.7,
    system: systemPrompt || undefined,
    messages: [{ role: "user", content: userPrompt }],
  });
  return response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("");
}

async function callOpenAICompat(baseUrl, model, systemPrompt, userPrompt, temperature) {
  const messages = [];
  if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
  messages.push({ role: "user", content: userPrompt });

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1024,
      temperature: temperature || 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${PROVIDER} API error (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "(empty response)";
}

// ---- Route ----
app.post("/api/generate", async (req, res) => {
  try {
    const { basePrompt, techniques, temperature } = req.body;
    const { systemPrompt, userPrompt, applied } = applyTechniques(basePrompt, techniques);

    if (inDemoMode) {
      return res.json({
        mode: "demo",
        transformed: { systemPrompt, userPrompt },
        applied,
        response: `This is demo mode. Set API_KEY (and optionally PROVIDER) in .env to get real AI responses.\n\nProviders: anthropic, deepseek, ollama\n\nYour transformed prompt (shown in the other tab) would be sent with temperature ${temperature || 0.7}.`,
      });
    }

    let text;
    switch (PROVIDER) {
      case "deepseek":
        text = await callOpenAICompat(DEEPSEEK_BASE, MODEL_MAP.deepseek, systemPrompt, userPrompt, temperature);
        break;
      case "ollama":
        text = await callOpenAICompat(OLLAMA_BASE, MODEL_MAP.ollama, systemPrompt, userPrompt, temperature);
        break;
      case "anthropic":
      default:
        text = await callAnthropic(systemPrompt, userPrompt, temperature);
    }

    res.json({
      mode: "live",
      provider: PROVIDER,
      model: MODEL_MAP[PROVIDER],
      transformed: { systemPrompt, userPrompt },
      applied,
      response: text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Prompt Engineering Playground at http://localhost:${PORT}`);
  if (inDemoMode) {
    console.log("⚠ DEMO MODE — set API_KEY in .env for live responses.");
  } else {
    console.log(`✓ Live mode — provider: ${PROVIDER}, model: ${MODEL_MAP[PROVIDER]}`);
  }
});
