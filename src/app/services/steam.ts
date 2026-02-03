import type {
  Game,
  GamePlatform,
  SteamAPIResponse,
  SteamGame,
} from "../interfaces";
import { CacheManager } from "../cache";

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_USER_ID = process.env.STEAM_USER_ID;

if (!STEAM_API_KEY || !STEAM_USER_ID) {
  throw new Error(
    "Please provide your Steam API key and user ID in a .env file",
  );
}

const STEAM_BASE_URL =
  "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/";

export class SteamPlatform implements GamePlatform {
  private platformId = "steam";
  private steamApiUrl: string;

  constructor(private cacheManager: CacheManager) {
    const params = new URLSearchParams({
      key: STEAM_API_KEY as string,
      steamid: STEAM_USER_ID as string,
      format: "json",
      include_appinfo: "true",
      include_played_free_games: "true",
    });
    this.steamApiUrl = `${STEAM_BASE_URL}?${params.toString()}`;
  }

  async getGames(): Promise<Game[]> {
    const cachedGames = await this.cacheManager.readCache(this.platformId);
    if (cachedGames) {
      console.log("Serving from cache");
      return cachedGames;
    }

    console.log("Fetching from Steam API");
    try {
      const response = await fetch(this.steamApiUrl);
      const data = (await response.json()) as SteamAPIResponse;
      const games = data.response.games.map((game: SteamGame) => ({
        appId: game.appid,
        name: game.name,
        playtime: game.playtime_forever,
        lastPlayed: game.rtime_last_played,
      }));

      await this.cacheManager.writeCache(this.platformId, games);
      return games;
    } catch (error) {
      console.error("Error fetching Steam games:", error);
      return [];
    }
  }
}
