import { useAtom } from "jotai";
import { providerAtom } from "../state/atoms";
import styled from "styled-components";
import { useState, useRef, useEffect } from "react";

const SelectWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 10;
`;

const SelectLabel = styled.label`
  font-size: 12px;
  color: #c0c0c0;
  margin-bottom: 5px;
`;

const CustomSelectContainer = styled.div`
  position: relative;
  width: 120px;
`;

const SelectedValue = styled.div`
  padding: 8px 30px 8px 12px;
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  cursor: pointer;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13%205.7L146.2%20202.7%2018.8%2075.1a17.6%2017.6%200%200%200-25.7%200%2017.6%2017.6%200%200%200%200%2025.7l130.5%20127.9a17.6%2017.6%200%200%200%2025.7%200l130.5-127.9a17.6%2017.6%200%200%200%200-25.7z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 10px auto;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 5px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Option = styled.div`
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  &:hover {
    background: rgba(0, 122, 255, 0.3);
  }
`;

export const LLMProviderSelect = () => {
  const [provider, setProvider] = useAtom(providerAtom);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: "gemini" | "ollama") => {
    setProvider(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <SelectWrapper>
      <CustomSelectContainer ref={selectRef}>
        <SelectedValue onClick={() => setIsOpen(!isOpen)}>
          {provider.charAt(0).toUpperCase() + provider.slice(1)}
        </SelectedValue>
        {isOpen && (
          <OptionsContainer>
            <Option onClick={() => handleOptionClick("gemini")}>Gemini</Option>
            <Option onClick={() => handleOptionClick("ollama")}>Ollama</Option>
          </OptionsContainer>
        )}
      </CustomSelectContainer>
    </SelectWrapper>
  );
};
