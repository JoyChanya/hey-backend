// src/lib/gemini.ts
import { GoogleGenAI } from "@google/genai";

// Initialize the client to talk to Vertex AI’s Generative models
const ai = new GoogleGenAI({
  vertexai: true,
  project:  process.env.GOOGLE_CLOUD_PROJECT!,
  location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
});

const MODEL = "gemini-2.5-pro";

/**
 * Classify `text` as either "POSITIVE" or "NEGATIVE".
 */
export async function classifySentiment(
  text: string
): Promise<"POSITIVE" | "NEGATIVE"> {
  // Prompt for a single‑word answer
  const prompt =
    `Classify the sentiment of this customer review as either POSITIVE or NEGATIVE. ` +
    `If there ia any impolite language, classify it as NEGATIVE. ` +
    `Respond with exactly one word.\n\n"""${text}"""`;

  const result = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  // Guard against undefined
  const rawText = result.text ?? "";
  const reply   = rawText.trim().toUpperCase();

  return reply.startsWith("POSITIVE") ? "POSITIVE" : "NEGATIVE";
}
