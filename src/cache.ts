
import { Game } from "./interfaces";
import { promises as fs } from "fs";
import path from "path";

const CACHE_DIR = "./cache";
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hours

export async function readCache(platform: string): Promise<Game[] | null> {
  const cachePath = path.join(CACHE_DIR, `${platform}-games.json`);
  try {
    const stats = await fs.stat(cachePath);
    if (Date.now() - stats.mtime.getTime() > CACHE_EXPIRATION) {
      return null; // Cache expired
    }
    const data = await fs.readFile(cachePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null; // Cache file does not exist
    }
    throw error;
  }
}

export async function writeCache(
  platform: string,
  games: Game[]
): Promise<void> {
  const cachePath = path.join(CACHE_DIR, `${platform}-games.json`);
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(cachePath, JSON.stringify(games, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
}
