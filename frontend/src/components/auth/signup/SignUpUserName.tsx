import styled from "@emotion/styled";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import swal from "sweetalert";
import IsValidComponent from './../../isValid/IsValidComponent';

//타입 지정
export type SignUpUserNameProps = {
  signupUserFormData: SignupFormData;
  setSignupUserFormData: Dispatch<SetStateAction<SignupFormData>>;
};

export const StyledInput = styled.input`
  padding: 0.7rem;
  font-size: 1.2rem;
  border: 1px solid #d23131;
  border-radius: 5px;
  width: 93%;
  color: #333;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  &:focus {
    outline: none;
    border-color: #d23131;
    box-shadow: 0px 0px 5px 0px rgba(210, 49, 49, 0.75);
  }
`;

export const StyleNameLabel = styled.label`
  font-weight: 900;
  display: flex;
  align-items: center;
`;

export const StyleIsValidSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  & > span {
    color: #d23131;
    font-size: 0.7rem;
  }
`

const SignUpUserName = ({
  setSignupUserFormData,
  signupUserFormData,
}: SignUpUserNameProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  // 회원가입 이름 세팅
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const regex = /^[가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/;
    if(e.target.value === '') {
      setMessage(" ")
    }

    if (regex.test(e.target.value)) {
      setSignupUserFormData({
        ...signupUserFormData,
        name: e.target.value,
      });
    } else {
      setIsAlert(false);
      setMessage("한글 이름만 가능합니다. 한영키를 눌러주세요");
      setSignupUserFormData({
        ...signupUserFormData,
        name: e.target.value,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " || (e.key >= "0" && e.key <= "9")) {
      e.preventDefault();
    }

    if (e.key === "Enter") {
      e.preventDefault();
      if (/^[가-힣]+$/.test(signupUserFormData.name)) {
        setIsAlert(true);
      } else {
        setIsAlert(false);
        setSignupUserFormData({
          ...signupUserFormData,
          name: "",
        });
      }
    }
  };

  const handleBlur = () => {
    if (/^[가-힣]+$/.test(signupUserFormData.name)) {
      setIsAlert(true);
    } else {
      setIsAlert(false);
      setSignupUserFormData({
        ...signupUserFormData,
        name: "",
      });
    }
  }

  return (
    <StyleSignUpInputDiv>
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="username">이름<IsValidComponent isValid={isAlert}/></StyleNameLabel>
        {isAlert ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyledInput
        tabIndex={1}
        type="text"
        id="username"
        placeholder="UserName"
        autoComplete="off"
        value={signupUserFormData.name}
        onKeyDown={(e) => handleKeyPress(e)}
        onBlur={handleBlur}
        onChange={(e) => handleUserName(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserName;
