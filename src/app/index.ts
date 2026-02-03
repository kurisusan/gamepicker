import { GameHelperApp } from "./app";

export function runServer(config: {
  port: number;
  idleTimeout: number;
  gameCache: string;
}) {
  const app = new GameHelperApp(config.gameCache);

  Bun.serve({
    port: config.port,
    idleTimeout: config.idleTimeout,
    async fetch(req) {
      const url = new URL(req.url);

      if (url.pathname === "/recommend") {
        const mood = url.searchParams.get("mood") || "Happy";
        const provider =
          (url.searchParams.get("provider") as "gemini" | "ollama") || "ollama";
        const recommendation = await app.getRecommendation(mood, provider);
        return new Response(recommendation);
      }

      return new Response("Not Found", { status: 404 });
    },
  });
}

