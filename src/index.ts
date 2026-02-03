import type { GamePlatform, LlmProvider } from "./interfaces";
import { SteamPlatform } from "./services/steam";
import { OllamaProvider } from "./llm/ollama";

async function main() {
  const steamPlatform: GamePlatform = new SteamPlatform();
  const games = await steamPlatform.getGames();

  if (games.length === 0) {
    console.log("No games found. Exiting.");
    return;
  }

  // Read mood from command line arguments, or use a default
  const mood = process.argv[2] || "Happy";

  const llmProvider: LlmProvider = new OllamaProvider();
  const recommendation = await llmProvider.getRecommendation(mood, games);

  console.log(`\nUser: "${mood}"`);
  console.log("Recommendation:");
  console.log(recommendation);
}

main();
