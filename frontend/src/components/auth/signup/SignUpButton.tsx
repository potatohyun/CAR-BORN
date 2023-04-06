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
  setIsValid: any;
  isValid: any;
  setSelectedFiles:any;
};

const StyleUserCompanyBtn = styled.div`
  position: absolute;
  top: 54vh;
  left: 40vw;

  width: 20vw;
  display: flex;
  justify-content: space-between;

  button {
    width: 8vw;
    height: 3rem;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 5px;
    cursor: pointer;
    background-color: #702323;

    &:hover {
      opacity: 0.8;
    }

    &:active {
      box-shadow: none;
      border: none;
    }

    &.active {
      background-color: #d23131ea;
      box-shadow: none;
      border: none;
      font-weight: 900;
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
  isValid,
  setSelectedFiles
}: SignUpButtonProps) => {
  // 상수화
  const USER = 0;
  const REPAIR = 1;

  // 버튼 클릭 유지시키기
  const [isUserActive, setIsUserActive] = useState(true);

  // 액션
  const dispatch = useDispatch();
  const accountType = useSelector(
    (state: any) => state.setAccountTypeReducer.accountType
  );

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
    setIsValid(false);
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
    setIsValid(false);
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
        phonenumber: "",
        identifynumber: "",
        address: "",
        isVarify: false,
      });
      setSelectedFiles(null)
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
        phonenumber: "",
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
    setSelectedFiles
  ]);

  return (
    <StyleUserCompanyBtn>
      <button
        className={isUserActive ? "active" : ""}
        onClick={(e) => handleUserSignUp(e)}
      >
        일반회원
      </button>
      <button
        className={!isUserActive ? "active" : ""}
        onClick={(e) => handleCompanySignUp(e)}
      >
        기업회원
      </button>
    </StyleUserCompanyBtn>
  );
};

export default SignUpButton;
