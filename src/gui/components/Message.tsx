import styled, { css } from "styled-components";

const MessageBubble = styled.div<{ sender: "user" | "llm" }>`
  margin-bottom: 10px;
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);

  ${({ sender }) =>
    sender === "user"
      ? css`
          background: rgba(0, 122, 255, 0.3);
          align-self: flex-end;
        `
      : css`
          background: rgba(255, 255, 255, 0.2);
          align-self: flex-start;
        `}
`;

export const Message = ({
  text,
  sender,
}: {
  text: string;
  sender: "user" | "llm";
}) => {
  return <MessageBubble sender={sender}>{text}</MessageBubble>;
};
