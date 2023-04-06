import { Link } from "react-router-dom";
import styled from "@emotion/styled";

// 이미지 가져오기
import Buy from "../assets/Buy.png";
import inspector from "../assets/inspect.png";
import Insurance from "../assets/Insurance.png";
import Community from "../assets/Gallery.png";
import MyCar from "../assets/MyCar.png";
import Repair from "../assets/repair.png";
import ChangeKey from "../assets/ChangeKey.png";
import Sell from "../assets/Sell.png";
import { useEffect } from "react";
import { useState } from "react";
import Nav2 from "../components/Nav2";

const StyleMyPageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
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

export const StyleMyPageDiv = styled.div`
  margin-top: 3rem;
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const StyleMypageCards = styled.div`
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s;
    background-color: #d23131b7;
    z-index: 2;
    p {
      color: white;
    }
  }

  &:not(:hover) {
    transform: scale(1);
    transition: all 0.2s;
    background-color: #f2f2f2;
    p {
      color: #000000c3;
    }
  }

  width: 15vw;
  height: 38vh;
  background-color: #f2f2f2;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:nth-of-type(4n) {
    margin-right: 0rem;
  }

  & > a {
    text-decoration: none;
    text-align: center;
    margin-top: 3rem;
  }

  & > a:nth-of-type(4n) {
    margin-right: 0rem;
  }

  & > a > p {
    color: #000000c3;
    font-size: 1.5rem;
    font-weight: 900;
  }
`;

const StyleMypageCardImg = styled.div`
  height: 40%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  img {
    width: 55%;
  }
`;

const MyPage = () => {
  const ObjString: any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const Token = Obj ? Obj?.value : null;

  const [userType, setUserType] = useState<string | number>("0");
  const [isUser, setIsUser] = useState<boolean>(true);

  useEffect(() => {
    setUserType(parseInt(Obj?.accountType));
    if (userType === 0) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [setIsUser, setUserType, userType, Obj?.accountType]);

  return (
    <div>
      <Nav2 />
      <StyleMyPageContainer>
        <StyleMyPageDiv>
          <StyleMypageCards>
            <Link to={`/user/mypage/mycarinfo`}>
              <StyleMypageCardImg>
                <img src={MyCar} alt="MyCarInfo" className="myCarInfo" />
              </StyleMypageCardImg>
              <p>내 차 정보</p>
            </Link>
          </StyleMypageCards>
          <StyleMypageCards>
            <Link to={`/user/mypage/repair`}>
              <StyleMypageCardImg>
                <img src={Repair} alt="RepairInspector" />
              </StyleMypageCardImg>
              <p>정비 내역</p>
            </Link>
          </StyleMypageCards>
          <StyleMypageCards>
            <Link to={`/user/mypage/inspector`}>
              <StyleMypageCardImg>
                <img src={inspector} alt="inspector" />
              </StyleMypageCardImg>
              <p>검수 내역</p>
            </Link>
          </StyleMypageCards>
          <StyleMypageCards>
            <Link to={`/user/mypage/community`}>
              <StyleMypageCardImg>
                <img src={Community} alt="Community" />
              </StyleMypageCardImg>
              <p>내가 쓴 글</p>
            </Link>
          </StyleMypageCards>
          <StyleMypageCards>
            <Link to={`/user/mypage/buycontent`}>
              <StyleMypageCardImg>
                <img src={Buy} alt="Buy" />
              </StyleMypageCardImg>
              <p>구매 목록</p>
            </Link>
          </StyleMypageCards>
          <StyleMypageCards>
            <Link to={`/user/mypage/sellcontent`}>
              <StyleMypageCardImg>
                <img src={Sell} alt="Sell" />
              </StyleMypageCardImg>
              <p>판매 목록</p>
            </Link>
          </StyleMypageCards>
          <StyleMypageCards>
            <Link to={`/user/mypage/insurance`}>
              <StyleMypageCardImg>
                <img src={Insurance} alt="Damage" />
              </StyleMypageCardImg>
              <p>손상 내역</p>
            </Link>
          </StyleMypageCards>
          {isUser ? (
            <StyleMypageCards>
              <Link to={`/user/mypage/userpasswordmodify`}>
                <StyleMypageCardImg>
                  <img src={ChangeKey} alt="Damage" />
                </StyleMypageCardImg>
                <p>{`비밀번호 변경(유저)`}</p>
              </Link>
            </StyleMypageCards>
          ) : (
            <StyleMypageCards>
              <Link to={`/user/mypage/companypasswordmodify`}>
                <StyleMypageCardImg>
                  <img src={ChangeKey} alt="Damage" />
                </StyleMypageCardImg>
                <p>{`비밀번호 변경(기업)`}</p>
              </Link>
            </StyleMypageCards>
          )}
        </StyleMyPageDiv>
      </StyleMyPageContainer>
    </div>
  );
};

export default MyPage;
