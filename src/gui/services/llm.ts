export const sendMessageToLLM = async (
  message: string,
  provider: "gemini" | "ollama",
) => {
  const response = await fetch(
    `http://localhost:3000/recommend?mood=${encodeURIComponent(
      message,
    )}&provider=${provider}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const recommendation = await response.text();
  return { reply: recommendation };
};
