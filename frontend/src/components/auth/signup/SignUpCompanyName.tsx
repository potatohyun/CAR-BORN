import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { StyledInput, StyleNameLabel } from "./SignUpUserName";

//타입 지정
export type SignUpUserNameProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>;
};

const SignUpCompanyName = ({
  signupCompanyFormData,
  setSignupCompanyFormData,
}: SignUpUserNameProps) => {
  // 회원가입 이름 세팅(회사명은 정규표현식 제거)
  const handleUserName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      name: e.target.value,
    });
  };

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="companyname">회사명</StyleNameLabel>
      <StyledInput
        tabIndex={1}
        type="text"
        id="companyname"
        autoComplete="off"
        placeholder="CompanyName"
        value={signupCompanyFormData.name}
        onChange={(e) => handleUserName(e)}
      />
    </StyleSignUpInputDiv>
  );
};

export default SignUpCompanyName;
