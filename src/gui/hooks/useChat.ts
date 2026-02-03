import { useState, FormEventHandler, SubmitEventHandler } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { messagesAtom, Message, providerAtom } from "../state/atoms";
import { sendMessageToLLM } from "../services/llm";

export const useChat = () => {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [provider] = useAtom(providerAtom);
  const [inputValue, setInputValue] = useState("");

  const mutation = useMutation<
    { reply: string },
    Error,
    { message: string; provider: "gemini" | "ollama" }
  >({
    mutationFn: (vars) => sendMessageToLLM(vars.message, vars.provider),
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { text: data.reply, sender: "llm" }]);
    },
  });

  const handleSendMessage: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages((prev) => [...prev, { text: inputValue, sender: "user" }]);
      mutation.mutate({ message: inputValue, provider });
      setInputValue("");
    }
  };

  return {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    isThinking: mutation.isPending,
  };
};

