import { Electroview } from "electrobun/view";
import { createRoot } from "react-dom/client";
import { App } from "./App";

console.log("GUI process started");

// Instantiate the electrobun browser api
const electrobun = new Electroview({ rpc: null });

window.onload = () => {
  console.log("GUI window loaded");
  const app = document.getElementById("app");
  if (!app) {
    throw new Error("No app element found");
  }
  const root = createRoot(app);
  root.render(App());
};

// window.loadPage = () => {
//   const newUrl = document.querySelector("#urlInput").value;
//   const webview = document.querySelector(".webview");

//   webview.src = newUrl;
// };

// window.goBack = () => {
//   const webview = document.querySelector(".webview");
//   webview.goBack();
// };

// window.goForward = () => {
//   const webview = document.querySelector(".webview");
//   webview.goForward();
// };
