import type { Game, LlmProvider } from "../interfaces";
import { buildGameRecommendationPrompt } from "../utils/promptBuilder";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_BASE_URL =
  process.env.GEMINI_API_BASE_URL ||
  "https://generativelanguage.googleapis.com/v1beta";
const GEMINI_API_MODEL = process.env.GEMINI_API_MODEL || "gemini-2.5-flash";

if (!GEMINI_API_KEY || !GEMINI_API_BASE_URL) {
  throw new Error(
    "Please provide your Gemini API key and base URL in a .env file (GEMINI_API_KEY, GEMINI_API_BASE_URL)",
  );
}

const GEMINI_API_URL = `${GEMINI_API_BASE_URL}/models/${GEMINI_API_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

export class GeminiProvider implements LlmProvider {
  async getRecommendation(mood: string, games: Game[]): Promise<string> {
    const fullPrompt = buildGameRecommendationPrompt(mood, games);

    try {
      console.log("Sending prompt to Gemini...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120 * 1000); // 120 seconds timeout

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Gemini API response error:", errorText);
        throw new Error(
          `Gemini API responded with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();
      console.log("Response from gemini:", data)
      if (
        data.candidates &&
        data.candidates.length > 0 &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts.length > 0
      ) {
        const recommendation = data.candidates[0].content.parts[0].text;
        return recommendation;
      } else {
        console.error("Invalid response structure from Gemini API:", data);
        throw new Error("Invalid response structure from Gemini API.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.error("Error communicating with Gemini: Request timed out");
        return "I'm sorry, the request to Gemini timed out.";
      }
      console.error("Error communicating with Gemini:", error);
      return "I'm sorry, I couldn't get a recommendation for you from Gemini.";
    }
  }
}
