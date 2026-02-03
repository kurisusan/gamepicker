import type { Game } from "../interfaces";

export function buildGameRecommendationPrompt(
  mood: string,
  games: Game[],
): string {
  const gameList = games
    .map((game) => {
      let lastPlayedDate = new Date(game.lastPlayed * 1000);
      return `${game.name} (playtime: ${game.playtime} minutes, last played: ${lastPlayedDate.toDateString()})`;
    })
    .join("\n");

  return `Based on the following list of games and my current mood, what game do you recommend?

My mood: "${mood}"

My games:
${gameList}

Please provide a list of 3 games recommendation by priority (from most recommended to least) and a brief explanation of why you recommend it.`;
}
