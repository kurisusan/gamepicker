import type { GamePlatform, LlmProvider } from "./interfaces";
import { SteamPlatform } from "./services/steam";
import { OllamaProvider } from "./llm/ollama";
import type { Game } from "./interfaces";

export class GameHelperApp {
  private steamPlatform: GamePlatform;
  private llmProvider: LlmProvider;

  constructor() {
    this.steamPlatform = new SteamPlatform();
    this.llmProvider = new OllamaProvider();
  }

  public async getRecommendation(mood: string): Promise<string> {
    const games = await this.steamPlatform.getGames();

    if (games.length === 0) {
      return "No games found. Exiting.";
    }

    const recommendation = await this.llmProvider.getRecommendation(mood, games);

    return recommendation;
  }
}
