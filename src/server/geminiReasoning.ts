import { GoogleGenAI, ThinkingLevel } from "@google/genai";

export async function runPortfolioReasoningQuery(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  const response = await ai.models.generateContent({
    model: "gemini-4-argon",
    contents: prompt,
    config: {
      systemInstruction:
        "You are an expert technical portfolio advisor for Karim Souissi, an AI Engineer specializing in multi-agent LLMs, RAG, NLP, and applied machine learning. Provide concise, rigorous architectural insights grounded in his documented projects and experience.",
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.HIGH,
      },
    },
  });

  return response.text ?? "";
}
