import type { Game, LlmProvider } from "../interfaces";
import { buildGameRecommendationPrompt } from "../utils/promptBuilder";

const OLLAMA_HOST = process.env.OLLAMA_HOST || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1";

export class OllamaProvider implements LlmProvider {
  async getRecommendation(mood: string, games: Game[]): Promise<string> {
    const fullPrompt = buildGameRecommendationPrompt(mood, games);

    try {
      console.log("Sending prompt to Ollama at", OLLAMA_HOST);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120 * 1000); // 120 seconds timeout

      const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: OLLAMA_MODEL, // or any other model you have downloaded
          prompt: fullPrompt,
          stream: false,
        }),
        signal: controller.signal, // Attach the abort signal
      });

      clearTimeout(timeoutId); // Clear the timeout if the fetch completes

      if (!response.ok) {
        throw new Error(`Ollama responded with status ${response.status}`);
      }

      const data = (await response.json()) as { response: string };
      return data.response;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error("Error communicating with Ollama: Request timed out");
        return "I'm sorry, the request to Ollama timed out. Please try again or check your Ollama instance.";
      }
      console.error("Error communicating with Ollama:", error);
      return "I'm sorry, I couldn't get a recommendation for you.";
    }
  }
}
