import { SetStateAction, Dispatch, useState } from "react";
import { SignupFormData } from "./SignUpButton";
import DaumPostcode, { Address } from "react-daum-postcode";
import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import styled from "@emotion/styled";

export type SignUpUserAddressProps = {
  setSignupUserFormData: Dispatch<SetStateAction<SignupFormData>>;
  signupUserFormData: SignupFormData;
};

// CSS
export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  position: relative;
  width: 50vw;
  height: 70vh;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
`;

const SignUpUserAddress = ({
  setSignupUserFormData,
  signupUserFormData,
}: SignUpUserAddressProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [addressData, setAddressData] = useState<string>("");
  const handleComplete = (data: Address) => {
    setSignupUserFormData({
      ...signupUserFormData,
      address: data.address,
    });
    setIsOpen(false);
    setAddressData(data.address);
  };

  return (
    <StyleSignUpInputDiv>
      <span>주소</span>
      <br />
      <input
        tabIndex={6}
        type="button"
        onClick={() => setIsOpen(true)}
        value="검색하기"
      />
      {addressData ? <span>{addressData}</span> : null}
      {isOpen && (
        <ModalContainer>
          <ModalBox>
            <ModalTitle>주소 검색</ModalTitle>
            <DaumPostcode onComplete={handleComplete} />
            <CloseButton onClick={() => setIsOpen(false)}>Close</CloseButton>
          </ModalBox>
        </ModalContainer>
      )}
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserAddress;
