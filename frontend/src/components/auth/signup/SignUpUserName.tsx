import styled from "@emotion/styled";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import CustomAlert from "./modal/CustomAlert";
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
    if (regex.test(e.target.value)) {
      setSignupUserFormData({
        ...signupUserFormData,
        name: e.target.value,
      });
    } else {
      setIsAlert(false);
      swal("유효성 검사", "한글 이름만 가능합니다. 한영키를 눌러주세요.", "error");
      setSignupUserFormData({
        ...signupUserFormData,
        name: "",
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
        swal("유효성 검사", "입력한 이름이 유효합니다.", "success");
      } else {
        setIsAlert(false);
        swal("유효성 검사", "이름은 꼭 한글명입니다.", "error");
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
      swal("유효성 검사", "입력한 이름이 유효합니다.", "success");
    } else {
      setIsAlert(false);
      swal("유효성 검사", "이름은 꼭 한글명입니다.", "error");
      setSignupUserFormData({
        ...signupUserFormData,
        name: "",
      });
    }
  }

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="username">이름<IsValidComponent isValid={isAlert}/></StyleNameLabel>
      <StyledInput
        tabIndex={1}
        type="text"
        id="username"
        placeholder="UserName"
        maxLength={4}
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
