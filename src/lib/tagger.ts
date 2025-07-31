// src/lib/tagger.ts
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  vertexai: true,
  project:  process.env.GOOGLE_CLOUD_PROJECT!,
  location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
});

const TAG_MODEL = "gemini-2.5-pro";
const ALL_TAGS = [
  "การบริการ","ราคา","การเปรียบเทียบ","การจ่ายเงิน",
  "การเคลมประกัน","โปรโมชั่น","ตอบแชทไว",
  "ใช้ง่าย","คำแนะนำ","การผ่อนชำระ"
];

/**
 * Ask Gemini which tags apply, with a JSON‑array regex pull‑out
 * and fallback to keyword scanning.
 */
export async function extractTags(text: string): Promise<string[]> {
  const prompt = `
Here are the possible tags:
${ALL_TAGS.join(", ")}

Given the review below, reply with a JSON array (e.g. ["ราคา","โปรโมชั่น"]) 
containing only the tags that apply — and nothing else.

Review:
"""${text}"""
`;
  const res = await ai.models.generateContent({
    model:    TAG_MODEL,
    contents: prompt,
  });

  const raw = (res.text ?? "").trim();

  // 1) Try to pull out the first [...] block from the model's reply
  let arr: string[] = [];
  const match = raw.match(/\[.*?\]/s);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed) && parsed.every((t) => typeof t === "string")) {
        arr = parsed;
      }
    } catch {
      // continue to fallback
    }
  }

  // 2) Fallback: for any tag whose keyword appears in the text
  if (arr.length === 0) {
    arr = ALL_TAGS.filter((tag) => text.includes(tag));
  }

  // 3) Clamp to known tags & dedupe
  return Array.from(new Set(arr.filter((t) => ALL_TAGS.includes(t))));
}
