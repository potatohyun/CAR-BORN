import { useState, useEffect, ButtonHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NewPassword from "../../components/auth/newpassword/NewPassword";
import NewPasswordCheck from "../../components/auth/newpassword/NewPasswordCheck";
import Nav from "../../components/Nav";
import { StyleLoginSignUpBoxDiv } from "./LoginPage";
import { StyleLoginSignUpDiv } from "./PasswordResetCheck";
import { passwordResetCheckReset } from "../../modules/PasswordCheckModule";
import {
  newPasswordAction,
} from "../../modules/newPasswordModule";
import styled from "@emotion/styled";
import Nav2 from "../../components/Nav2";

// 타입 설정
export type SearchInputPasswordCheckObj = {
  userid:string,
  phonenumber:string,
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

const NewPasswordReset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  console.log(state.userid)
  console.log(state.phonenumber)

  const dispatch = useDispatch();

  const isNewPass = useSelector(
    (state: any) => state.newPasswordReducer.newpasswordcheck
  );
  const [inputObj, setInputObj] = useState<SearchInputPasswordCheckObj>({
    userid:"",
    phonenumber:"",
    newpassword: "",
    newpasswordcheck: false,
  });
  const [newSecondPassword, setNewSecondPassword] = useState<string>("");
  const [isNewPassword, setIsNewPassword] = useState<boolean>(false);
  const [newpassword, setNewpassword] = useState("");

  console.log(isNewPass);

  useEffect(() => {
    setInputObj({
      ...inputObj,
      userid: state.userid,
      phonenumber: state.phonenumber
    })
  }, [])

  const handlePasswordReset = () => {
    dispatch(newPasswordAction(inputObj));
  };

  useEffect(() => {
    if (isNewPass) {
      navigate("/passwordresetcheck/passwordreset/passwordcomplete");
    }
    dispatch(passwordResetCheckReset());
  }, [dispatch, isNewPass, navigate]);

  return (
    <div>
      <Nav2 />
      <StyleLoginSignUpDiv>
        <StyleLoginSignUpBoxDiv>
          <StylePasswordResetTitle>
            <h2>비밀번호 재설정</h2>
          </StylePasswordResetTitle>
          <NewPassword
            setInputObj={setInputObj}
            inputObj={inputObj}
            newSecondPassword={newSecondPassword}
            setIsNewPassword={setIsNewPassword}
            setNewpassword={setNewpassword}
            newpassword={newpassword}
          />
          <NewPasswordCheck
            setInputObj={setInputObj}
            inputObj={inputObj}
            setNewSecondPassword={setNewSecondPassword}
            newSecondPassword={newSecondPassword}
            setIsNewPassword={setIsNewPassword}
            isNewPassword={isNewPassword}
            newpassword={newpassword}
          />
          <StyleNewPasswordResetBtn
            backgroundColor={inputObj.newpasswordcheck ? "#d23131" : "grey"}
            disabled={!inputObj.newpasswordcheck}
            onClick={handlePasswordReset}
          >
            비밀번호 재설정
          </StyleNewPasswordResetBtn>
        </StyleLoginSignUpBoxDiv>
      </StyleLoginSignUpDiv>
    </div>
  );
};

export default NewPasswordReset;
