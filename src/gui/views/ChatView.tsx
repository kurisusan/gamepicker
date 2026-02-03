import { useChat } from "../hooks/useChat";
import { Message } from "../components/Message";
import { LLMProviderSelect } from "../components/LLMProviderSelect";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  padding: 20px;
  box-sizing: border-box;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const InputArea = styled.form`
  display: flex;
  height: 60px;
`;

const Input = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: #fff;
  padding: 0 20px;
  font-size: 16px;
  outline: none;
`;

export const ChatView = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    handleSendMessage,
    isThinking,
  } = useChat();

  return (
    <Container>
      <LLMProviderSelect />
      <ChatArea>
        {messages.map((msg, index) => (
          <Message key={index} text={msg.text} sender={msg.sender} />
        ))}
        {isThinking && <Message text="Thinking..." sender="llm" />}
      </ChatArea>
      <InputArea onSubmit={handleSendMessage}>
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Describe your mood or what you're looking for..."
          disabled={isThinking}
        />
      </InputArea>
    </Container>
  );
};