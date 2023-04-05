import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import carbornLogo from "../../assets/Logo.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SearchIDVerifyReset } from "../../modules/searchidModule";
import { StyleLoginSignUpBtn } from "./SearchID";
import Nav2 from "../../components/Nav2";

const StyleSearchidCompleteContainer = styled.div`
  width: 100vw;
  padding-top: 6rem;
  padding-bottom: 6rem;
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

  display: flex;
  justify-content: center;
  align-items: center;

  .SearchidCompleteTitle {
    margin-top: 2%;
    text-align: center;
    display: block;
    font-size: 2rem;
    font-weight: 900;
  }

  .SearchidCompleteGuide {
    text-align: center;
    display: block;
    font-size: 1rem;
    font-weight: 900;
    color: #3c3c3c;
  }
`;

export const StyleLoginSignUpBtnDiv = styled.div`
  width: 40vw;
  margin-top: 2%;
  align-items: center;

  a {
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyleSearchidCompleteCenterDiv = styled.div`
  width: 35vw;
  height: 70vh;
  padding-bottom: 4rem;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(000, 000, 000, 1);
  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SearchidComplete = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  // console.log(state.searchid.searchid);

  useEffect(() => {
    dispatch(SearchIDVerifyReset());
  }, []);

  return (
    <div>
      <Nav2 />
      <StyleSearchidCompleteContainer>
        <StyleSearchidCompleteCenterDiv>
          <div>
            <img src={carbornLogo} alt="asdfasdf" />
          </div>
          <div>
            <span className="SearchidCompleteTitle">
              귀하의 아이디는 {state.searchid.searchid} 입니다.
            </span>
            <span className="SearchidCompleteGuide">
              로그인하시면 더욱 다양한 서비스와 혜택을 제공받으실 수 있습니다.
            </span>
          </div>
          <StyleLoginSignUpBtnDiv>
            <Link to="/login">
              <StyleLoginSignUpBtn>로그인</StyleLoginSignUpBtn>
            </Link>
          </StyleLoginSignUpBtnDiv>
        </StyleSearchidCompleteCenterDiv>
      </StyleSearchidCompleteContainer>
    </div>
  );
};

export default SearchidComplete;
