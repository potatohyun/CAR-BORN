import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SignUpUserPhoneNumberModal from "../signup/modal/SignUpUserPhoneNumberModal";
import { SearchInputType } from "../../../routes/auth/SearchID";
import { StyleNameLabel } from "../signup/SignUpUserName";
import { StyleCheckBtn, StyleIdCheckDiv, StyleIdCheckInput } from "../signup/SignUpUserId";
import { StyleSignUpInputBtnDiv } from "../../../routes/auth/SignupPage";
import swal from "sweetalert";

// input DIV
export const StylePhoneNumberVerifyContainer = styled.div`
  width: 100vw;
  background-color: white;
  /* background: linear-gradient(
    to bottom,
    #000000,
    #1e0000e8
  );
  background-size: 100% 200%;
  animation: gradient 10s ease infinite;
  
  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  } */
`;

// input DIV
const StyleSearchIDInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 16vw;
  margin-left: -0.2rem;
`;

export const StylePhoneNumberVerifyBox = styled.div`
  margin-left: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

type SearchIDVerifyProps = {
  setSearchInput: React.Dispatch<React.SetStateAction<SearchInputType>>;
  searchInput: SearchInputType;
};

export const StylePhoneNumberVerifyDiv = styled.div`
  width: 90%;
`;

export const StylePhoneNumberVerifyInput = styled.input`
  padding: 0.7rem;
  font-size: 1.2rem;
  border: 1px solid #d23131;
  border-radius: 5px;
  width: 22vw;
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

export const StylePhoneNumberVerifyLabel = styled.label`
  font-weight: 900;
  margin-left: 0.2rem;
`;

export const StylePhoneNumberVerify = styled.input`
  width: 32%;
  height: 75%;
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
`;

export const StyleIdCheckNumberDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15.8vw;
`;

const SearchIDPhoneNumberVerify = ({
  setSearchInput,
  searchInput,
}: SearchIDVerifyProps) => {
  const [isValid, setIsValid] = useState(false);

  // 모달 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (
      searchInput.phonenumber.length <= 10 &&
      searchInput.phonenumber.length <= 11
    ) {
      swal("입력 에러","휴대폰 번호는 10자리이상 11자리 이하 여야합니다.","error");
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
      setSearchInput({
        ...searchInput,
        isVerify: true,
      });
    }
  }, [isValid]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchInput({
      ...searchInput,
      phonenumber: value,
    });
  };

  return (
    <StyleSearchIDInputDiv>
      <StyleNameLabel htmlFor="searchIDPhoneNumber">전화번호</StyleNameLabel>
        <StyleIdCheckNumberDiv>
          <StyleIdCheckInput
            type="text"
            id="searchIDPhoneNumber"
            name="searchIDPhoneNumber"
            autoComplete="off"
            maxLength={11}
            placeholder="phoneNumber"
            value={searchInput.phonenumber}
            onChange={handleChange}
          />
          <StyleCheckBtn 
            type='button'
            onClick={openModal} 
            value={`인증하기`} 
          />
        </StyleIdCheckNumberDiv>
      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={searchInput.phonenumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </StyleSearchIDInputDiv>
  );
};

export default SearchIDPhoneNumberVerify;
