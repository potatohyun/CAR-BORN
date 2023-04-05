import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SignUpUserPhoneNumberModal from "../signup/modal/SignUpUserPhoneNumberModal";
import { PasswordResetInputObj } from "../../../routes/auth/PasswordResetCheck";
import { StyleNameLabel } from "../signup/SignUpUserName";
import { StyleCheckBtn, StyleIdCheckDiv } from "../signup/SignUpUserId";

export const StylePasswordResetBtnDiv = styled.div`
  width: 90%;
  margin-left: -3.3rem;
`;

type PasswordResetVerifyProps = {
  setinputObj: React.Dispatch<React.SetStateAction<PasswordResetInputObj>>;
  inputObj: PasswordResetInputObj;
};

export const StylePasswordResetInput = styled.input`
  padding: 0.7rem;
  font-size: 1.2rem;
  border: 1px solid #d23131;
  border-radius: 5px;
  width: 11vw;
  margin-right: 3%;
  color: #333;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  &:focus {
    outline: none;
    border-color: #d23131;
    box-shadow: 0px 0px 5px 0px rgba(210, 49, 49, 0.75);
  }
`;

export const StylePasswordResetDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StylePasswordResetBtn = styled.input`
  width: 30%;
  height: 6vh;
  margin-bottom: 1rem;
  background-color: #d23131;
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  font-weight: 900;
  font-size: 0.8rem;
  text-align: center;

  &:active {
    background-color: white;
    color: black;
    border: 5px solid #d23131;
  }

  &:hover {
    opacity: 0.8;
  }
`;

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
    <StylePasswordResetBtnDiv>
      <StyleNameLabel htmlFor="passwordResetPhonenumber">전화번호</StyleNameLabel>
      <StylePasswordResetDiv>
        <StylePasswordResetInput
          type="text"
          id="passwordResetPhonenumber"
          name="passwordResetPhonenumber"
          className="passwordResetPhonenumber"
          autoComplete="off"
          placeholder="phoneNumber"
          value={inputObj.phonenumber}
          onChange={handleChange}
        />
        <StylePasswordResetBtn type='button' onClick={openModal} value={`인증하기`}/>
      </StylePasswordResetDiv>
      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={inputObj.phonenumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </StylePasswordResetBtnDiv>
  );
};

export default PasswordResetVerify;
