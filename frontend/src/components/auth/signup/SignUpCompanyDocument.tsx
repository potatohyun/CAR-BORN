 import styled from "@emotion/styled";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";
import IsValidComponent from './../../isValid/IsValidComponent';
import { useEffect, useState } from 'react';
import swal from "sweetalert";

export interface Props {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StyleDocumentSpan = styled.span`
  display: block;
  height: 1rem;
`

export const StyleDocumentInput = styled.input`
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  width: 98%;
  height: 2rem;
  background-color: #d23131;
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;

  &:active {
    background-color: white;
    color: black;
    border: 5px solid #d23131;
  }

  &:hover {
    opacity: 0.8;
  }
`;

type SignUpCompanyDocumentProps = {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFiles: boolean;
  setSelectedFiles:any
}

const SignUpCompanyDocument: React.FC<SignUpCompanyDocumentProps> = ({ handleFileChange, isFiles, setSelectedFiles}) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("첨부파일이 필요합니다");

  useEffect(() => {
    if(isFiles === true) {
      setIsAlert(true)
      setMessage(" ")
    }
    if (setSelectedFiles) {
      setIsAlert(false)
    }
  }, [isFiles, setSelectedFiles])

  return (
    <StyleSignUpInputDiv>
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="document">
          첨부서류
          <IsValidComponent isValid={setSelectedFiles ? true : false} />
        </StyleNameLabel>
        {isAlert ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      {/* 이전에 설명한 파일 input */}
      <StyleDocumentInput type="file" name="document" id="document" onChange={handleFileChange} />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyDocument;
