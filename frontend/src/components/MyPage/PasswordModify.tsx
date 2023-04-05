import { useState, useEffect, ButtonHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import Nav2 from "../../components/Nav2";
import { StyledInput, StyleNameLabel } from "../auth/signup/SignUpUserName";
import { companyModifyPasswordRequest, userModifyPasswordRequest } from './../../modules/modifyPasswordModule';
import CustomAlert from "../auth/signup/modal/CustomAlert";
import IsValidComponent from './../isValid/IsValidComponent';

export type SearchInputPasswordCheckObj = {
  userid:string,
  oldpassword:string,
  newpassword: string;
  newpasswordcheck: boolean | null;
};

// CSS 타입
export interface StyleNewPasswordResetBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

export const StylePasswordResetTitle = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid red;
  text-align: center;
`

export const StyleNewPasswordResetBtn = styled.button<StyleNewPasswordResetBtnProps>`
  color: white;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;

  width: 50%;
  height: 75%;
  margin-bottom: 2rem;
  margin-top: -0.2rem;
  margin-left: 0.5rem;
  text-align: center;
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

const StyleUserPasswordModifyForm = styled.form`
  width: 100vw;
  padding-top: 6rem;
  padding-bottom: 6rem;
  background: linear-gradient(
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
  }

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleUserPasswordModifyContainerDiv = styled.div`
  width: 25vw;
  height: 60vh;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleUserPasswordModifyInputDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleUserPasswordModifyButtonDiv = styled.div`
  width: 50%;
  height: 10%;
  display: flex;
`;

export const StylePasswordModifyBtn = styled.input<StyleNewPasswordResetBtnProps>`
  color: white;
  background-color: ${(props) => props.backgroundColor};
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;

  width: 50%;
  height: 75%;
  margin-bottom: 2rem;
  margin-top: -0.2rem;
  margin-left: 0.5rem;
  text-align: center;
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

export const StyleCancelBtn = styled.input`
  color: white;
  background-color: #d23131;
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;

  width: 50%;
  height: 75%;
  margin-bottom: 2rem;
  margin-top: -0.2rem;
  margin-left: 0.5rem;
  text-align: center;
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
`

const StyleNewPasswordBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60vw;
  margin-left: -1.7rem;

  input {
    margin: 0;
    width: 7.5vw;
    height: 6vh;
    border: none;
  }

  input:nth-of-type(1){
    margin-right: 1vw;
  }
`

const StyleXButton = styled.div`
  font-weight: 900;
  font-size: 1.2rem;
  position: absolute;
  right: 38vw;
  top: 64vh;
  color: black;
  cursor: pointer;
`;

const PasswordModify = () => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const ObjString:any = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const account = Obj ? Obj.accountType : null;
 
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isNewPassword, setIsNewPassword] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const success = useSelector(
    (state: any) => state.userModifyPasswordReducer.success
  );

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOldPassword(value);
  };

  // 비밀번호 유효성 : 영문자 소문자랑 숫자랑 특수문자(전부가능)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // 영어 소문자, 숫자, 특수문자 모두 조합해야함을 나타내는 정규표현식
      const regex =
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
      if (regex.test(e.currentTarget.value)) {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        setMessage("입력한 비밀번호가 유효합니다.");
      } else {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        setMessage(
          "입력한 비밀번호가 조합된 영소문자 및 숫자, 특수문자가 아닙니다."
        );
      }
    }
  };

  // 비밀번호 유효성 : 영문자 소문자랑 숫자랑 특수문자(전부가능)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // 영어 소문자, 숫자, 특수문자 모두 조합해야함을 나타내는 정규표현식
    const regex =
    /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    if (regex.test(e.currentTarget.value)) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage("입력한 비밀번호가 유효합니다.");
    } else {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage(
        "입력한 비밀번호가 조합된 영소문자 및 숫자, 특수문자가 아닙니다."
      );
    }
  }

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewPassword(value);
  };

  const handleNewPasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (newPassword === value) {
      setIsNewPassword(true);
    } else {
      setIsNewPassword(false);
    }
  };

  const handleSendNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (account === 0) {
      dispatch(userModifyPasswordRequest({ oldPassword, newPassword }));
    } else {
      dispatch(companyModifyPasswordRequest({ oldPassword, newPassword }));
    }
  };

  const handleMyPageMove = () => {
    navigate(`/user/mypage`)
  }

  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  // 뒤로가기
  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <Nav2/>
      <StyleXButton onClick={() => goBack()}>X</StyleXButton>
      <StyleUserPasswordModifyForm onSubmit={(e) => handleSendNewPassword(e)}>
        <StyleUserPasswordModifyContainerDiv>
          {/* 타이틀 */}
          {/* 기존 비밀번호 */}
          <StyleUserPasswordModifyInputDiv>
            <StyleNameLabel>기존비밀번호</StyleNameLabel>
            <StyledInput 
              type="password" 
              onChange={(e) => handleOldPassword(e)}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
          </StyleUserPasswordModifyInputDiv>
          {/* 새로운 비밀번호 */}
          <StyleUserPasswordModifyInputDiv>
            <StyleNameLabel>새로운 비밀번호</StyleNameLabel>
            <StyledInput 
              type="password" 
              onChange={(e) => handleNewPassword(e)} 
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
            />
          </StyleUserPasswordModifyInputDiv>
          {/* 비밀번호 확인 */}
          <StyleUserPasswordModifyInputDiv>
            <StyleNameLabel>비밀번호 확인<IsValidComponent isValid={isNewPassword}/></StyleNameLabel>
            <StyledInput 
              type="password" 
              onChange={(e) => handleNewPasswordCheck(e)} 
            />
          </StyleUserPasswordModifyInputDiv>
          {/* 버튼 나누기 */}
          <StyleUserPasswordModifyButtonDiv>
            <StyleNewPasswordBtnContainer>
              <StyleCancelBtn
                type='button'
                onClick={handleMyPageMove}
                value={`취소`}/>
              <StylePasswordModifyBtn
                backgroundColor={isNewPassword ? "#d23131" : "grey"}
                type="submit"
                disabled={!isNewPassword}
                value={`비밀번호 변경`}
              />
            </StyleNewPasswordBtnContainer>
          </StyleUserPasswordModifyButtonDiv>
        </StyleUserPasswordModifyContainerDiv>
        {isAlert ? (
          <div>
            <CustomAlert message={message} />
          </div>
        ) : null}
      </StyleUserPasswordModifyForm>
    </div>
  );
};

export default PasswordModify;
