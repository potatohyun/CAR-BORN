import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIDName from "../../components/auth/searchID/SearchIDName";
import SearchIDPhoneNumberVerify from "../../components/auth/searchID/SearchIDPhoneNumberVerify";
import Nav from "./../../components/Nav";
import { useNavigate } from "react-router-dom";
import { SearchIDCheckAction } from "../../modules/searchidModule";
import CustomAlert from "../../components/auth/signup/modal/CustomAlert";
import Nav2 from "../../components/Nav2";

export const StyleHeightDiv = styled.div`
  height: 6rem;
`;

export const StyleHeight2Div = styled.div`
  height: 3rem;
`;

export const StyleSearchIdDiv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleLoginSignUpBoxDiv = styled.div`
  width: 35vw;
  padding: 0rem, 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: #fdfdfde9;
`;

export const StyleLoginSignUpTitle = styled.div`
  width: 115%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;
`;

export const StyleLoginSignUpBtn = styled.button`
  width: 60%;
  height: 75%;
  margin-left: 0.5%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  text-align: center;
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
`;

export const StyleLoginAnotherLink = styled.div`
  font-size: 0.7rem;
  text-decoration: none;
`;

// 타입 설정
export type SearchInputType = {
  name: string;
  phonenumber: string;
  isVerify: boolean;
};

const SearchID = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isSearchIdPass = useSelector(
  //   (state: any) => state.SignUpReducerisSignPossible
  // );
  const isComplete = useSelector(
    (state: any) => state.searchIDCheckReducer.verify
  );
  const searchid = useSelector((state: any) => state.searchIDCheckReducer);
  
  const [searchInput, setSearchInput] = useState<SearchInputType>({
    name: "",
    phonenumber: "",
    isVerify: false,
  });

  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const handleSearchID = () => {
    if (searchInput.isVerify === false) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage(
        "이름과 전화번호를 모두 입력해주시고, 인증을 완료하고 눌러주세요."
      );
    }
    dispatch(SearchIDCheckAction(searchInput));
  };

  useEffect(() => {
    if (isComplete) {
      navigate("/searchid/searchidcomplete", { state: {
        searchid,
        searchInput
      }});
    }
  }, [isComplete]);

  useEffect(() => {});

  return (
    <div>
      <Nav2 />
      <StyleHeightDiv></StyleHeightDiv>
      <StyleSearchIdDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <h2>아이디 찾기</h2>
          </StyleLoginSignUpTitle>
          <SearchIDName
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
          <SearchIDPhoneNumberVerify
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
          <StyleLoginSignUpBtn
            onClick={handleSearchID}
            disabled={!searchInput.isVerify}
          >
            아이디 찾기
          </StyleLoginSignUpBtn>
          <StyleHeightDiv></StyleHeightDiv>
          <StyleHeightDiv></StyleHeightDiv>
        </StyleLoginSignUpBoxDiv>
        {isAlert ? (
          <div>
            <CustomAlert message={message} />
          </div>
        ) : null}
      </StyleSearchIdDiv>
    </div>
  );
};

export default SearchID;
