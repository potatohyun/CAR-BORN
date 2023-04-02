import { useDispatch, useSelector } from "react-redux";
import {
  companyidCheckReset,
  useridCheckReset,
} from "../../../modules/UserIdCheckModule";
import { SetIsSignupAction } from "../../../modules/signUpModule";
import { useEffect, useState } from "react";
import { setUserAccountType } from "../../../modules/setAccountTypeModule";
import styled from "@emotion/styled";

// 타입
export type SignupFormData = {
  accountType: number | string;
  name: string;
  userid: string;
  idcheck: boolean | null;
  password: string;
  phonenumber: string;
  passwordcheck: boolean;
  identifynumber: string;
  address: string;
  isVarify: boolean;
};

export type SignUpButtonProps = {
  setSelectedButton: React.Dispatch<React.SetStateAction<number>>;
  selectedButton: number;
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  signupUserFormData: SignupFormData;
  setSignupCompanyFormData: React.Dispatch<
    React.SetStateAction<SignupFormData>
  >;
  signupCompanyFormData: SignupFormData;
  isUser: boolean;
  setIsUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIddupliCheck: React.Dispatch<
    React.SetStateAction<null | boolean | undefined>
  >;
  iddupliCheck: boolean | null | undefined;
  setIsValid:any
  isValid:any
};

const StyleUserCompanyBtn = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    width: 60%;
    height: 3rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 900;
    color: white;
    background-color: #D23131;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &.active {
      border: 3px solid #D23131;
      color: black;
      font-weight: 900;
      background-color: white;
    }
  }
`;

const SignUpButton = ({
  setSelectedButton,
  selectedButton,
  setSignupUserFormData,
  signupUserFormData,
  setSignupCompanyFormData,
  signupCompanyFormData,
  isUser,
  setIsUser,
  setIddupliCheck,
  iddupliCheck,
  setIsValid,
  isValid
}: SignUpButtonProps) => {
  // 상수화
  const USER = 0;
  const REPAIR = 1;

  // 버튼 클릭 유지시키기
  const [isUserActive, setIsUserActive] = useState(true);

  // 액션
  const dispatch = useDispatch();
  const accountType = useSelector((state:any) => state.setAccountTypeReducer.accountType)

  const resetFormData = () => {
    dispatch(useridCheckReset());
    dispatch(companyidCheckReset());
  };

  const handleUserSignUp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsUserActive(true);
    resetFormData();
    dispatch(setUserAccountType(USER));
    setSelectedButton(USER);
    setIsUser(true);
    setIsValid(false)
  };

  const handleCompanySignUp = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsUserActive(false);
    resetFormData();
    dispatch(setUserAccountType(REPAIR));
    setSelectedButton(REPAIR);
    setIsUser(false);
    setIsValid(false)
  };

  useEffect(() => {
    if (selectedButton === USER) {
      setSignupCompanyFormData({
        accountType: REPAIR,
        name: "",
        userid: "",
        idcheck: null,
        password: "",
        passwordcheck: false,
        phonenumber:"",
        identifynumber: "",
        address: "",
        isVarify: false,
      });
      dispatch(SetIsSignupAction(true));
    } else {
      setSignupUserFormData({
        accountType: USER,
        name: "",
        userid: "",
        idcheck: null,
        password: "",
        passwordcheck: false,
        identifynumber: "",
        phonenumber:"",
        address: "",
        isVarify: false,
      });
      dispatch(SetIsSignupAction(true));
    }
  }, [
    selectedButton,
    dispatch,
    setSignupUserFormData,
    setSignupCompanyFormData,
  ]);

  return (
    <StyleUserCompanyBtn>
      <button className={isUserActive ? 'active' : ''} onClick={(e) => handleUserSignUp(e)}>일반회원</button>
      <button className={!isUserActive ? 'active' : ''} onClick={(e) => handleCompanySignUp(e)}>기업회원</button>
    </StyleUserCompanyBtn>
  );
};

export default SignUpButton;
