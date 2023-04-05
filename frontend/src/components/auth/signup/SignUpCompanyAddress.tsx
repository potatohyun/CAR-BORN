import { Dispatch, SetStateAction, useState } from "react";
import { SignupFormData } from "./SignUpButton";
import DaumPostcode, { Address } from "react-daum-postcode";
import { StyleSignUpInputBtnDiv, StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { StyleNameLabel } from "./SignUpUserName";
import {
  CloseButton,
  ModalBox,
  ModalContainer,
  ModalTitle,
} from "./SignUpUserAddress";
import { StyleCheckBtn, StyleIdCheckDiv, StyleIdCheckInput } from "./SignUpUserId";
import styled from "@emotion/styled";

export type SignUpCompanyAddressProps = {
  setSignupCompanyFormData: Dispatch<SetStateAction<SignupFormData>>;
  signupCompanyFormData: SignupFormData;
};

export const StyleAddressBtn = styled.input`
  width: 30%;
  height: 3.2rem;
  margin-top: 0.4rem;
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
`

export const StyleAddressInput = styled.input`
  margin-top: 0.5rem;
  height: 3rem;
  width: 65%;
  border: 1px solid #d23131;
  border-radius: 5px;
`

const SignUpCompanyAddress = ({
  setSignupCompanyFormData,
  signupCompanyFormData,
}: SignUpCompanyAddressProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addressData, setAddressData] = useState<string>("");
  const handleComplete = (data: Address) => {
    setSignupCompanyFormData({
      ...signupCompanyFormData,
      address: data.address,
    });
    setIsOpen(false);
    setAddressData(data.address);
  };

  return (
    <StyleSignUpInputBtnDiv>
      <StyleNameLabel>주소</StyleNameLabel>
      <StyleIdCheckDiv>
        <StyleIdCheckInput autoComplete="off" type="text" value={`  `+addressData} />
        <StyleCheckBtn type="button" className="addressCheckBtn" tabIndex={7} onClick={() => setIsOpen(true)} value={`검색하기`}/>
      </StyleIdCheckDiv>
      {isOpen && (
        <ModalContainer>
          <ModalBox>
            <ModalTitle>주소 검색</ModalTitle>
            <DaumPostcode onComplete={handleComplete} />
            <CloseButton onClick={() => setIsOpen(false)}>Close</CloseButton>
          </ModalBox>
        </ModalContainer>
      )}
    </StyleSignUpInputBtnDiv>
  );
};

export default SignUpCompanyAddress;
