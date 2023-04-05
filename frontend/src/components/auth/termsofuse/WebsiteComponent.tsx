import styled from "@emotion/styled";
import {
  StyleTermsOfUseDiv,
} from "../../../routes/auth/GetAgreementPage";
import { css, keyframes } from "@emotion/react";
import { HTMLAttributes } from "react";
import { Theme } from "@emotion/react";

export interface WebsiteProps {
  setIsChecked1: React.Dispatch<React.SetStateAction<boolean>>;
  setWebsiteDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  websiteDropdown: boolean;
  isChecked1: boolean;
  websiteTerms: string;
}

const StyleWebSiteDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 20.7vw;

  input {
    appearance: none;
  }

  label {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    margin-right: 0.5rem;
    border: 1px solid black;
    box-shadow: 0 0 10px rgba(000, 000, 000, 1);
    border-radius: 50%;
    cursor: pointer;
  }

  input:checked + label {
    background-color: #D23131;
    border-color: #D23131;
    color: white;
  }

  button {
    padding-top: 0.2rem;
    border: none;
    background-color: #ffffff;
    font-size: 1.2rem;
  }

  span {
    font-size: 1.2rem;
    font-weight: 900;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: 10rem;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    height: 10rem;
  }
  to {
    opacity: 0;
    height: 0;
  }
`;

type PrivacyTextareaProps = HTMLAttributes<HTMLTextAreaElement> & {
  theme?: Theme;
  isOpen: boolean;
};

const StyleTextarea = styled.textarea<PrivacyTextareaProps>`
  width: 20vw;
  resize: none;
  display: none;
  margin: 2rem 0rem;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;

  ${({ isOpen }) =>
    isOpen
      ? css`
          display: block;
          animation-name: ${fadeIn};
        `
      : css`
          animation-name: ${fadeOut};
        `}
`;  

const WebsiteComponent: React.FC<WebsiteProps> = ({
  setIsChecked1,
  setWebsiteDropdown,
  websiteDropdown,
  isChecked1,
  websiteTerms,
}) => {
  const handleCheck1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked1(e.target.checked);
  };

  const handleWebsiteDropdown = () => {
    setWebsiteDropdown(!websiteDropdown);
  };

  return (
    <StyleTermsOfUseDiv>
        <StyleWebSiteDiv>
          <div>
            <input
              type="checkbox"
              id="websitecheck"
              name="checkbox"
              className="checkbox-input"
              checked={isChecked1}
              onChange={handleCheck1}
            />
            <label htmlFor="websitecheck" className="checkbox-label">
              &#10003;
            </label>
            <span>웹사이트 이용내역</span>
          </div>
          <div>
            <button onClick={handleWebsiteDropdown}>▼</button>
          </div>
        </StyleWebSiteDiv>
        <StyleTextarea
          isOpen={websiteDropdown}
          value={websiteTerms}
          rows={10}
          cols={85}
          readOnly
        />
    </StyleTermsOfUseDiv>
  );
};

export default WebsiteComponent;
