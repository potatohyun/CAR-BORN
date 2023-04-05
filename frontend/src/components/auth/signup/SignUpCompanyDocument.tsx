 import styled from "@emotion/styled";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { StyleNameLabel } from "./SignUpUserName";

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

const SignUpCompanyDocument: React.FC<Props> = ({ handleFileChange }) => {
  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="document">가입관련 첨부서류</StyleNameLabel>
      {/* 이전에 설명한 파일 input */}
      <StyleDocumentInput type="file" name="document" id="document" onChange={handleFileChange} />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyDocument;
