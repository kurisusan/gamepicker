import { GameHelperApp } from "./app";

async function main() {
  const app = new GameHelperApp("./cache");

  // Read mood from command line arguments, or use a default
  const mood = process.argv[2] || "Happy";

  const recommendation = await app.getRecommendation(mood);

  console.log(`
User: "${mood}"`);
  console.log("Recommendation:");
  console.log(recommendation);
}

main();
