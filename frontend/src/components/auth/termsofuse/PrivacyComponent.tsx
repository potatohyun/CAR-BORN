import styled from "@emotion/styled";
import {
  StyleTermsOfUseDiv,
  StyleTermsOfUseEleDiv,
} from "../../../routes/auth/GetAgreementPage";
import { css, keyframes } from "@emotion/react";
import { HTMLAttributes } from "react";
import { Theme } from "@emotion/react";

export interface WebsiteProps {
  setIsChecked2: React.Dispatch<React.SetStateAction<boolean>>;
  setPrivacyDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  privacyDropdown: boolean;
  isChecked2: boolean;
  privacyTerms: string;
}

const StylePrivacyDiv = styled.div`
  width: 20.7vw;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
    border-radius: 50%;
    cursor: pointer;
  }

  input:checked + label {
    background-color: #d23131;
    border-color: #d23131;
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
`;

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

const PrivacyComponent: React.FC<WebsiteProps> = ({
  setIsChecked2,
  setPrivacyDropdown,
  privacyDropdown,
  isChecked2,
  privacyTerms,
}) => {
  const handleCheck2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked2(e.target.checked);
  };

  const handlePrivacyDropdown = () => {
    setPrivacyDropdown(!privacyDropdown);
  };

  return (
    <StyleTermsOfUseDiv>
      <StylePrivacyDiv>
        <div>
          <input
            type="checkbox"
            id="privacycheck"
            name="checkbox"
            className="checkbox-input"
            checked={isChecked2}
            onChange={handleCheck2}
          />
          <label htmlFor="privacycheck" className="checkbox-label">
            &#10003;
          </label>
          <span>개인정보 이용내역</span>
        </div>
        <div>
          <button onClick={handlePrivacyDropdown}>▼</button>
        </div>
      </StylePrivacyDiv>
      <StyleTextarea
        isOpen={privacyDropdown}
        value={privacyTerms}
        rows={10}
        cols={85}
        readOnly
      />
    </StyleTermsOfUseDiv>
  );
};

export default PrivacyComponent;
