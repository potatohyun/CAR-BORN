import styled from "@emotion/styled";
import { Link, useLocation } from "react-router-dom";
import carbornLogo from "../../assets/carbornLogo.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SearchIDVerifyReset } from "../../modules/searchidModule";
import { StyleLoginSignUpBtn } from "./SearchID";
import Nav2 from "../../components/Nav2";

const StyleSearchidCompleteContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
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
`

const SearchidComplete = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  console.log(state.searchid.searchid)

  useEffect(() => {
    dispatch(SearchIDVerifyReset());
  }, []);

  return (
    <div>
      <Nav2 />
      <StyleSearchidCompleteContainer>
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
      </StyleSearchidCompleteContainer>
    </div>
  );
};

export default SearchidComplete;
