import React, { ButtonHTMLAttributes, useState } from "react";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  StyleLoginSignUpBoxDiv,
  StyleLoginSignUpDiv,
  StyleLoginSignUpTitle,
} from "./LoginPage";
import WebsiteComponent from "../../components/auth/termsofuse/WebsiteComponent";
import PrivacyComponent from "../../components/auth/termsofuse/PrivacyComponent";
import Nav from "../../components/Nav";
import { GetAgreementAction } from "../../modules/getAgreementModule";
import axios from "axios";
import { CARBORN_SITE } from "../../lib/api";
import Nav2 from "../../components/Nav2";

export const StyleTermsOfUseDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  padding-top: 1rem;
  padding-left: 1rem;
`;
export const StyleTermsOfUseTitleDiv = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  div {
    padding-top: 0.8rem;
    padding-left: 1.5rem;

    input {
      appearance: none;
    }

    .checkbox-label {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      margin-right: 0.5rem;
      appearance: none;
      border: 1px solid black;
      border-radius: 50%;
      cursor: pointer;
    }

    .checkbox-input:checked + .checkbox-label {
      background-color: #D23131;
      border: 1px solid #D23131;
      color: white;
    }

    span {
      font-size: 1.2rem;
      font-weight: 700;
      color: #000000;
    }
  }
`;

export const StyleTermsOfUseEleDiv = styled.div`
  
  .checkbox-label {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    margin-right: 0.5rem;
    border: 1px solid black;
    border-radius: 50%;
    cursor: pointer;
  }

  .checkbox-label::before {
    content: "\2713";
    font-size: 1rem;
    color: white;
  }

  .checkbox-input:checked + .checkbox-label {
    background-color: #D23131;
    border-color: #D23131;
    color: white;
  }

  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const StyleGoSignUpBtn = styled.button<StyleGoSignUpBtnProps>`
  display: inline-block;
  margin-top: 3rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  border-radius: 0.3rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: darken(${(props) => props.backgroundColor}, 10%);
  }
`;

export const StyleTermExplainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 1%;

  span {
    font-weight: 900;
    color: #959595 !important;
  }import Nav2 from './../../components/Nav2';

`

// CSS 타입
export interface StyleGoSignUpBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

const GetAgreementPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 이용약관 받아오기
  const GetAgreement = useSelector((state: any) => state.GetAgreementReducer);
  const [websiteTerms, setWebsiteTerms] = useState("");
  const [privacyTerms, setPrivacyTerms] = useState("");
  // 전체 체크용
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  // 드롭 다운용
  const [websiteDropdown, setWebsiteDropdown] = useState(false);
  const [privacyDropdown, setPrivacyDropdown] = useState(false);

  // 체크 박스 이벤트용
  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckedAll(e.target.checked);
    setIsChecked1(e.target.checked);
    setIsChecked2(e.target.checked);
  };

  // 체크박스 2개 모두 true일때, 버튼 활성화
  const isButtonDisabled = (isChecked1: boolean, isChecked2: boolean) => {
    if (isChecked1 && isChecked2) {
      return false;
    } else {
      return true;
    }
  };

  // 회원가입 화면으로
  const handleSignUp = () => {
    navigate("/signup");
  };

  // 화면이 렌더링 될 때, 상황
  useEffect(() => {
    const getWebsiteData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/terms/1`,
        });
        setWebsiteTerms(response.data.message);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
    getWebsiteData();

    const getPrivacyData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${CARBORN_SITE}/api/terms/2`,
        });
        setPrivacyTerms(response.data.message);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
    getPrivacyData()

    const onCheckBox = () => {
      if (isChecked1 && isChecked2) {
        setIsCheckedAll(true);
      } else {
        setIsCheckedAll(false);
      }
    };
    onCheckBox();
  }, [
    dispatch,
    GetAgreement.website,
    GetAgreement.privacy,
    isChecked1,
    isChecked2,
  ]);

  return (
    <div>
      <Nav2 />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StyleLoginSignUpTitle>
            <p>이용약관</p>
          </StyleLoginSignUpTitle>
          <StyleLoginSignUpTitle>
            <StyleTermsOfUseTitleDiv>
              <StyleTermExplainDiv>
                <span>카본에 오신 것을 환영합니다.</span>
                <span>카본에서 거래 및 커뮤니티 사용을 위하여</span>
                <span>아래의 약관 동의 및 회원가입이 필요합니다.</span>
              </StyleTermExplainDiv>
              <div>
                <input
                  type="checkbox"
                  id="allcheckbox"
                  name="checkbox"
                  className="checkbox-input"
                  checked={isCheckedAll}
                  onChange={handleCheckAll}
                />
                <label htmlFor="allcheckbox" className="checkbox-label">&#10003;</label>
                <span>전체동의</span>
              </div>
            </StyleTermsOfUseTitleDiv>
          </StyleLoginSignUpTitle>
          <StyleTermsOfUseDiv>
            <WebsiteComponent
              setIsChecked1={setIsChecked1}
              setWebsiteDropdown={setWebsiteDropdown}
              websiteDropdown={websiteDropdown}
              isChecked1={isChecked1}
              websiteTerms={websiteTerms}
            />
            <PrivacyComponent
              setIsChecked2={setIsChecked2}
              setPrivacyDropdown={setPrivacyDropdown}
              privacyDropdown={privacyDropdown}
              isChecked2={isChecked2}
              privacyTerms={privacyTerms}
            />
          </StyleTermsOfUseDiv>
          <StyleGoSignUpBtn
            backgroundColor={
              isButtonDisabled(isChecked1, isChecked2) ? "grey" : "#d23131"
            }
            disabled={isButtonDisabled(isChecked1, isChecked2)}
            onClick={handleSignUp}
          >
            회원가입 하기
          </StyleGoSignUpBtn>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default GetAgreementPage;
