import styled from "@emotion/styled";
import { Dispatch, SetStateAction, useState } from "react";
import { SignupFormData } from "./SignUpButton";
import { setUserAccountType } from "../../../modules/setAccountTypeModule";
import { useDispatch } from "react-redux";

//타입 지정
export type SignUpProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>;
  setIsValid: any;
  isValid: boolean;
};

const StyleSignUpCompanyTypeButtonTypeDiv = styled.div`
  margin-bottom: 2.5rem;
  width: 35vw;
  display: flex;
  justify-content: space-between;

  button {
    width: 60%;
    height: 3rem;
    text-align: center;
    font-size: 1.2rem;
    font-weight: 900;
    color: white;
    background-color: #d23131;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &.active {
      border: 3px solid #d23131;
      color: black;
      font-weight: 900;
      background-color: white;
    }
  }
`;

const SignUpCompanyTypeButton = ({
  signupCompanyFormData,
  setSignupCompanyFormData,
  setIsValid,
  isValid,
}: SignUpProps) => {
  // 버튼 클릭 유지시키기
  const [isUserActive, setIsUserActive] = useState<number>(1);

  const dispatch = useDispatch();
  // 상수화
  const REPAIR = 1;
  const INSPECTOR = 2;
  const INSURANCE = 3;

  const handleRepairType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setUserAccountType(REPAIR));
    setIsUserActive(REPAIR)
    setIsValid(true);
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      accountType: REPAIR,
    });
  };
  const handleInspectorType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setUserAccountType(INSPECTOR));
    setIsUserActive(INSPECTOR)
    setIsValid(true);
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      accountType: INSPECTOR,
    });
  };
  const handleInsuranceType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setUserAccountType(INSURANCE));
    setIsUserActive(INSURANCE)
    setIsValid(true);
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      accountType: INSURANCE,
    });
  };

  return (
    <StyleSignUpCompanyTypeButtonTypeDiv>
      <button
        className={isUserActive === REPAIR ? 'active' : ''} 
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleRepairType(e)
        }
      >
        정비소
      </button>
      <button
        className={isUserActive === INSPECTOR ? 'active' : ''} 
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleInspectorType(e)
        }
      >
        검수원
      </button>
      <button
        className={isUserActive === INSURANCE ? 'active' : ''} 
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleInsuranceType(e)
        }
      >
        보험사
      </button>
    </StyleSignUpCompanyTypeButtonTypeDiv>
  );
};

export default SignUpCompanyTypeButton;
