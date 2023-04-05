import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import carbornLogo from "../../assets/Logo.png";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { newPasswordReset } from "../../modules/newPasswordModule";
import { StyleLoginSignUpBtnDiv } from "./SearchidComplete";
import { StyleLoginSignUpBtn } from "./SearchID";
import Nav2 from "../../components/Nav2";

const StylePasswordCompleteContainer = styled.div`
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

export const StyleBtn = styled.button`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: #d23131;
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;
`;

export const StylePasswordCompleteCenterDiv = styled.div`
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

const PasswordComplete = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newPasswordReset());
  }, []);

  return (
    <div>
      <Nav2 />
        <StylePasswordCompleteContainer>
          <StylePasswordCompleteCenterDiv>
            <div>
              <img src={carbornLogo} alt="asdfasdf" />
            </div>
            <div>
              <span className="SearchidCompleteTitle">
                비밀번호 재설정을 완료했습니다.
              </span>
              <span className="SearchidCompleteGuide">
                로그인을 하시려면 아래 버튼을 눌러주세요
              </span>
            </div>
            <StyleLoginSignUpBtnDiv>
              <Link to="/login">
                <StyleLoginSignUpBtn>로그인</StyleLoginSignUpBtn>
              </Link>
            </StyleLoginSignUpBtnDiv>
          </StylePasswordCompleteCenterDiv>
        </StylePasswordCompleteContainer>
    </div>
  );
};

export default PasswordComplete;
