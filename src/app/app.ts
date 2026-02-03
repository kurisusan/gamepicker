import type { GamePlatform, LlmProvider } from "./interfaces";
import { SteamPlatform } from "./services/steam";
import { OllamaProvider } from "./llm/ollama";
import { GeminiProvider } from "./llm/gemini";
import { CacheManager } from "./cache";
import type { Game } from "./interfaces";

export class GameHelperApp {
  private steamPlatform: GamePlatform;
  private ollamaProvider: LlmProvider;
  private geminiProvider: LlmProvider;

  constructor(cacheDir: string) {
    const cacheManager = new CacheManager(cacheDir);
    this.steamPlatform = new SteamPlatform(cacheManager);

    this.ollamaProvider = new OllamaProvider();
    this.geminiProvider = new GeminiProvider();
  }

  public async getRecommendation(
    mood: string,
    provider: "gemini" | "ollama" = "ollama",
  ): Promise<string> {
    const games = await this.steamPlatform.getGames();

    if (games.length === 0) {
      console.log("No games found. Exiting.");
      return "No games found. Exiting.";
    }

    console.log(`Found ${games.length} games.`);

    let llmProvider: LlmProvider;
    if (provider === "gemini") {
      console.log("Using Gemini LLM provider");
      llmProvider = this.geminiProvider;
    } else {
      console.log("Using Ollama LLM provider");
      llmProvider = this.ollamaProvider;
    }

    const recommendation = await llmProvider.getRecommendation(mood, games);

    return recommendation;
  }
}

