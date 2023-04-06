import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import PasswordResetVerify from "../../components/auth/passwordreset/PasswordResetVerify";
import PasswordResetID from "../../components/auth/passwordreset/PasswordResetID";
import { passwordResetCheck } from "../../modules/PasswordCheckModule";
import { StyleHeightDiv } from "./SearchID";
import Nav2 from "../../components/Nav2";

export const StylePasswordResetCheckContainer = styled.div`
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

export const StylePasswordResetCheckCenterDiv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`

export const StylePasswordResetCheckBoxDiv = styled.div`
  width: 30vw;
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  border: 2px solid #6e6e6e;
  border-radius: 5px;
`

export const StylePasswordResetCheckForm = styled.form`
  margin-top: 3rem;
  width: 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyleLoginSignUpDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyleLoginSignUpBoxDiv = styled.div`
  width: 25%;
  padding: 0rem, 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid transparent;
  background-color: #fdfdfde9;
`;

export const StylePasswordResetCheckTitle = styled.div`
  width: 150%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;
`;

export const StyleLoginSignUpBtn = styled.button`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: #d23131;
  border: none;
  margin: 0.5rem 0;
`;

export const StyleLoginAnotherLink = styled.div`
  font-size: 0.7rem;
  text-decoration: none;
`;

interface StylePasswordResetCheckBtnProps {
  backgroundColor: string
}

export const StylePasswordResetCheckBtn = styled.input<StylePasswordResetCheckBtnProps>`
  width: 16.8vw;
  height: 5.7vh;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  margin-left: 0.1rem;
  text-align: center;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;

  &:active {
    box-shadow: none;
  }

  &:hover {
    opacity: 0.8;
  }

  cursor: pointer;
`

// 타입 설정
export type PasswordResetInputObj = {
  userid: string;
  phonenumber: string;
  isVerify: boolean;
};

const PasswordResetCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isverify = useSelector((state: any) => state.passwordResetCheckReducer.isVerify);
  const [inputObj, setinputObj] = useState<PasswordResetInputObj>({
    userid: "",
    phonenumber: "",
    isVerify: false,
  });

  const handlePasswordReset = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(passwordResetCheck(inputObj));
  };

  useEffect(() => {
    if (isverify) {
      navigate("/passwordresetcheck/passwordreset", { state: {
        userid: inputObj.userid,
        phonenumber: inputObj.phonenumber
      }});
    }
  }, [navigate, isverify]);

  return (
    <StylePasswordResetCheckContainer>
      <Nav2 />
      <StylePasswordResetCheckCenterDiv>
        <StylePasswordResetCheckBoxDiv>
          <StylePasswordResetCheckForm onSubmit={(e) => handlePasswordReset(e)}>
            <PasswordResetID 
              setinputObj={setinputObj} 
              inputObj={inputObj} 
            />
            <PasswordResetVerify 
              setinputObj={setinputObj} 
              inputObj={inputObj} 
            />
            <StylePasswordResetCheckBtn
              backgroundColor={inputObj.isVerify? '#D23131' : '#6e6e6e'}
              type='submit'
              value={`비밀번호 재설정`}
            />
          </StylePasswordResetCheckForm>
        </StylePasswordResetCheckBoxDiv>
      </StylePasswordResetCheckCenterDiv>
    </StylePasswordResetCheckContainer>
  );
};

export default PasswordResetCheck;
