import { atom } from "jotai";

export type Message = {
  text: string;
  sender: "user" | "llm";
};

export const messagesAtom = atom<Message[]>([]);

export const providerAtom = atom<"gemini" | "ollama">("gemini");
