import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import SignUpUserPhoneNumberModal from "../signup/modal/SignUpUserPhoneNumberModal";
import { SearchInputType } from "../../../routes/auth/SearchID";
import { StyleNameLabel } from "../signup/SignUpUserName";
import {
  StyleCheckBtn,
  StyleIdCheckDiv,
  StyleIdCheckInput,
} from "../signup/SignUpUserId";

// input DIV
export const StylePhoneNumberVerifyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 61%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  height: 3rem;
`;

export const StylePhoneNumberVerifyInput = styled.input`
  padding: 0.7rem;
  font-size: 1.2rem;
  border: 1px solid #d23131;
  border-radius: 5px;
  width: 100%;
  margin-right: 1%;
  color: #333;

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
    <StylePhoneNumberVerifyContainer>
      <StylePhoneNumberVerifyLabel htmlFor="searchIDPhoneNumber">
        전화번호
      </StylePhoneNumberVerifyLabel>
      <StylePhoneNumberVerifyDiv>
        <StylePhoneNumberVerifyBox>
          <StylePhoneNumberVerifyInput
            type="text"
            id="searchIDPhoneNumber"
            name="searchIDPhoneNumber"
            autoComplete="off"
            placeholder="phoneNumber"
            value={searchInput.phonenumber}
            onChange={handleChange}
          />
          <StylePhoneNumberVerify onClick={openModal} value={`인증하기`} />
        </StylePhoneNumberVerifyBox>
      </StylePhoneNumberVerifyDiv>

      {/* 모달 */}
      <SignUpUserPhoneNumberModal
        open={isModalOpen}
        onClose={closeModal}
        phoneNumber={searchInput.phonenumber}
        setIsValid={setIsValid}
        isValid={isValid}
      />
    </StylePhoneNumberVerifyContainer>
  );
};

export default SearchIDPhoneNumberVerify;
