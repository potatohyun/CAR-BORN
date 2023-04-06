import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchIDName from "../../components/auth/searchID/SearchIDName";
import SearchIDPhoneNumberVerify from "../../components/auth/searchID/SearchIDPhoneNumberVerify";
import { useNavigate } from "react-router-dom";
import { SearchIDCheckAction } from "../../modules/searchidModule";
import Nav2 from "../../components/Nav2";

// input DIV
export const StylePasswordInputBtnDiv = styled.div`
  width: 100%;
  margin-left: -0.8rem;
`;

export const StyleSearchIDContainer = styled.div`
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
`

export const StyleSearchIDForm = styled.form`
  margin-top: 3rem;
  width: 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

interface StyleSearchIDBtnProps {
  backgroundColor:string
}

export const StyleSearchIDBtn = styled.input<StyleSearchIDBtnProps>`
  width: 15.5vw;
  height: 2.5rem;
  margin-left: -0.4rem;
  margin-bottom: 5rem;
  color: white;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;
  box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.3);

  &:active {
    box-shadow: none;
  }

  &:hover {
    opacity: 0.8;
  }

  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
`

export const StyleHeightDiv = styled.div`
  height: 6rem;
`;

export const StyleHeight2Div = styled.div`
  height: 3rem;
`;

export const StyleSearchIDCenterDiv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const StyleSearchIDBoxDiv = styled.div`
  width: 30vw;
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  border: 2px solid black;
  border-radius: 5px;
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

  const handleSearchID = () => {
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

  return (
    <StyleSearchIDContainer>
      <Nav2 />
      <StyleSearchIDCenterDiv>
        <StyleSearchIDBoxDiv>
          <StyleSearchIDForm onSubmit={handleSearchID}>
            <SearchIDName
              setSearchInput={setSearchInput}
              searchInput={searchInput}
            />
            <SearchIDPhoneNumberVerify
              setSearchInput={setSearchInput}
              searchInput={searchInput}
            />
            <StyleSearchIDBtn
              type='submit'
              disabled={!searchInput.isVerify}
              backgroundColor={searchInput.isVerify ? "#d23131" : "grey"}
              value={`아이디 찾기`}
            />
          </StyleSearchIDForm>
        </StyleSearchIDBoxDiv>
      </StyleSearchIDCenterDiv>
    </StyleSearchIDContainer>
  );
};

export default SearchID;
