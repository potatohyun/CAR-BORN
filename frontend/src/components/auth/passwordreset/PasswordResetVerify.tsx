import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SignUpUserPhoneNumberModal from "../signup/modal/SignUpUserPhoneNumberModal";
import { PasswordResetInputObj } from "../../../routes/auth/PasswordResetCheck";
import { StylePhoneNumberVerify, StylePhoneNumberVerifyInput, StylePhoneNumberVerifyLabel, StylePhoneNumberVerifyBox, StylePhoneNumberVerifyDiv } from './../searchID/SearchIDPhoneNumberVerify';

// input DIV
const StyleLoginInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

type PasswordResetVerifyProps = {
  setinputObj: React.Dispatch<React.SetStateAction<PasswordResetInputObj>>;
  inputObj: PasswordResetInputObj;
};

const StylePasswordResetVerify = styled.input`
  width: 60%;
  height: 100%;
  text-align: center;
  background-color: #d23131;
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  margin-left: 3%;
  margin-right: 1.2%;
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

const PasswordResetVerify = ({
  setinputObj,
  inputObj,
}: PasswordResetVerifyProps) => {
  const [isValid, setIsValid] = useState(false);

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (
      inputObj.phonenumber.length <= 10 &&
      inputObj.phonenumber.length <= 11
    ) {
      alert("휴대폰 번호는 10자리이상 11자리 이하 여야합니다.");
      setIsModalOpen(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isValid) {
      setinputObj({
        ...inputObj,
        isVerify: true,
      });
    }
  }, [isValid]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setinputObj({
      ...inputObj,
      phonenumber: value,
    });
  };

  return (
    <StyleLoginInputDiv>
      <StylePhoneNumberVerifyLabel htmlFor="passwordResetPhonenumber">전화번호</StylePhoneNumberVerifyLabel>
      <StylePhoneNumberVerifyDiv>
        <StylePhoneNumberVerifyBox>
          <StylePhoneNumberVerifyInput
            type="text"
            id="passwordResetPhonenumber"
            name="passwordResetPhonenumber"
            className="passwordResetPhonenumber"
            autoComplete="off"
            placeholder="phoneNumber"
            value={inputObj.phonenumber}
            onChange={handleChange}
          />
          <StylePasswordResetVerify type='button' onClick={openModal} value={`인증하기`}/>
        </StylePhoneNumberVerifyBox>
      </StylePhoneNumberVerifyDiv>

      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={inputObj.phonenumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </StyleLoginInputDiv>
  );
};

export default PasswordResetVerify;
