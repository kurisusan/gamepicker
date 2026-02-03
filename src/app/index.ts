import { GameHelperApp } from "./app";

// TODO: Implement server to expose game recommendations via an API.
async function main() {
  const app = new GameHelperApp();
  console.log("Server starting... (not implemented yet)");
  // Example of how to use the app
  const recommendation = await app.getRecommendation("adventurous");
  console.log(recommendation);
}

main();