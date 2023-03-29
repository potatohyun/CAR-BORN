import styled from "@emotion/styled";
import { Dispatch, SetStateAction } from "react";
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
  margin-left: 2rem;
`;

const SignUpCompanyTypeButton = ({
  signupCompanyFormData,
  setSignupCompanyFormData,
  setIsValid,
  isValid,
}: SignUpProps) => {
  const dispatch = useDispatch();
  // 상수화
  const REPAIR = 1;
  const INSPECTOR = 2;
  const INSURANCE = 3;

  const handleRepairType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setUserAccountType(REPAIR));
    setIsValid(true)
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      accountType: REPAIR,
    });
  };
  const handleInspectorType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setUserAccountType(INSPECTOR));
    setIsValid(true)
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      accountType: INSPECTOR,
    });
  };
  const handleInsuranceType = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setUserAccountType(INSURANCE));
    setIsValid(true)
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      accountType: INSURANCE,
    });
  };

  return (
    <StyleSignUpCompanyTypeButtonTypeDiv>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleRepairType(e)
        }
      >
        정비소
      </button>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          handleInspectorType(e)
        }
      >
        검수원
      </button>
      <button
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
