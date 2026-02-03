export interface Game {
  appId: number;
  name: string;
  playtime: number;
  lastPlayed: number;
}

export interface SteamGame extends Game {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever?: number;
  playtime_mac_forever?: number;
  playtime_linux_forever?: number;
  playtime_deck_forever?: number;
  playtime_disconnected?: number;
  has_community_visible_stats?: boolean;
  rtime_last_played: number;
  content_descriptorids: number[];
  has_leaderboards?: boolean;
}

export interface SteamResponse {
  game_count: number;
  games: SteamGame[];
}

export interface SteamAPIResponse {
  response: SteamResponse;
}

export interface GamePlatform {
  getGames(): Promise<Game[]>;
}

export interface LlmProvider {
  getRecommendation(prompt: string, games: Game[]): Promise<string>;
}
