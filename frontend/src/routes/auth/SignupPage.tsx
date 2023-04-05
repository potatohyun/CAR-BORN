import styled from "@emotion/styled";
import { useState, useEffect, ButtonHTMLAttributes, useCallback } from "react";
import SignUpButton, {
  SignupFormData,
} from "../../components/auth/signup/SignUpButton";
import SignUpCompanyId from "../../components/auth/signup/SignUpCompanyId";
import SignUpCompanyName from "../../components/auth/signup/SignUpCompanyName";
import SignUpCompanyTypeButton from "../../components/auth/signup/SignUpCompanyTypeButton";
import SignUpUserId from "../../components/auth/signup/SignUpUserId";
import SignUpUserName from "../../components/auth/signup/SignUpUserName";
import SignUpUserPassword from "../../components/auth/signup/SignUpUserPassword";
import SignUpCompanyPassword from "../../components/auth/signup/SignUpCompanyPassword";
import SignUpUserPasswordCheck from "../../components/auth/signup/SignUpUserPasswordCheck";
import SignUpCompanyPasswordCheck from "../../components/auth/signup/SignUpCompanyPasswordCheck";
import SignUpUserBirth from "../../components/auth/signup/SignUpUserBirth";
import SignUpCompanyBusinessNumber from "../../components/auth/signup/SignUpCompanyBusinessNumber";
import SignUpCompanyAddress from "../../components/auth/signup/SignUpCompanyAddress";
import SignUpUserPhoneNumber from "../../components/auth/signup/SignUpUserPhoneNumber";
import SignUpCompanyPhoneNumber from "../../components/auth/signup/SignUpCompanyPhoneNumber";
import SignUpCompanyDocument from "../../components/auth/signup/SignUpCompanyDocument";
import { useDispatch, useSelector } from "react-redux";
import { SetIsSignupAction } from "../../modules/signUpModule";
import { CARBORN_SITE } from "./../../lib/api";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/auth/signup/modal/CustomAlert";
import ReCAPTCHA from "react-google-recaptcha";
import Nav2 from "../../components/Nav2";
import { StyleLoginBoxDiv } from "./LoginPage";

// CSS 타입
export interface StyleGoRegisterProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

export const StyleSignUpContainer = styled.div`
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
`;

export const StyleSignUpCenterDiv = styled.div`
  margin-top: 2.5rem;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const StyleSignUpInputDiv = styled.div`
  width: 90%;
`;

export const StyleSignUpInputBtnDiv = styled.div`
  width: 90%;
`;

export const StyleGoRegister = styled.button<StyleGoRegisterProps>`
  width: 100%;
  height: 3.5rem;
  text-align: center;
  font-weight: 900;
  font-size: 1.2rem;
  color: white;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const StyleSignUpBigContainer = styled.div`
  width: 35vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    width: 100%;
  }
`;

export const StyleSignUpBoxDiv = styled.div`
  padding-top: 2rem;
  width: 23vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupPages: React.FC = () => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  // 이동
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 아이디 중복체크 후, ALERT 안뜨게 하기 위한 로직
  const [iddupliCheck, setIddupliCheck] = useState<boolean | null | undefined>(
    undefined
  );
  // 비밀번호 재확인 입력창 먼저 기입했을때, 받는 데이터
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [secondPassword, setSecondPassword] = useState<string>("");
  // 유저인지 기업인지
  const [isUser, setIsUser] = useState<boolean>(true);
  // 상수화
  const USER: number = 0;
  // 회원구분 세팅 및 전송 데이터 형태 구축
  const [selectedButton, setSelectedButton] = useState(USER);

  // 회원가입 버튼 누를 수 있음
  const isSignUpBtn = useSelector(
    (state: any) => state.SignUpReducer.isSignPossible
  );

  // 리캡챠 해시 데이터 받아오기
  const [isRecaptcha, setIsRecaptcha] = useState(false);
  const handleCaptchaChange = (value: string | null) => {
    if (value) {
      setIsRecaptcha(true);
    } else {
      setIsRecaptcha(false);
    }
  };

  // 회원가입 초기값
  const initialSignupFormData = {
    accountType: USER,
    name: "",
    userid: "",
    idcheck: null,
    password: "",
    passwordcheck: false,
    phonenumber: "",
    identifynumber: "",
    address: "",
    isVarify: false,
  };
  const [signupUserFormData, setSignupUserFormData] = useState<SignupFormData>(
    initialSignupFormData
  );
  const [signupCompanyFormData, setSignupCompanyFormData] =
    useState<SignupFormData>(initialSignupFormData);

  // 파일 담기
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setSelectedFiles(fileList);
    }
  };

  // formData 만들어 놓기
  const formData: any = new FormData();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // 일반 정보들을 여기에 담는다 (일단 유저인 경우)
    if (isUser) {
      formData.append("id", signupUserFormData.userid);
      formData.append("pwd", signupUserFormData.password);
      formData.append("name", signupUserFormData.name);
      formData.append("phoneNo", signupUserFormData.phonenumber);
      formData.append("auth", signupUserFormData.accountType);
      formData.append("birth", signupUserFormData.identifynumber);
    } else {
      // 기업 정보들은 여기에 담는다.
      formData.append("id", signupCompanyFormData.userid);
      formData.append("pwd", signupCompanyFormData.password);
      formData.append("name", signupCompanyFormData.name);
      formData.append("phoneNo", signupCompanyFormData.phonenumber);
      formData.append("auth", signupCompanyFormData.accountType);
      formData.append("brn", signupCompanyFormData.identifynumber);
      formData.append("address", signupCompanyFormData.address);
      formData.append("cbr", selectedFiles[0]);
    }

    // formdata에 회원가입 정보를 넣어서 서버에 요청한다.
    if (isUser) {
      try {
        const response: any = await fetch(`${CARBORN_SITE}/api/join`, {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            console.log(res);
            if (!res.ok) {
              setIsAlert(true);
              setTimeout(() => {
                setIsAlert(false);
              }, 2000);
              setMessage(
                "알 수 없는 이유로 회원가입에 실패했습니다. 계정 정보를 다시 한 번 확인해주세요."
              );
              throw new Error(`${res.status} 오류가 발생했습니다`);
            }

            // 성공하면 여기서 navigate
            navigate("/login");
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`${CARBORN_SITE}/api/join`, {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            console.log(res);
            if (!res.ok) {
              setIsAlert(true);
              setTimeout(() => {
                setIsAlert(false);
              }, 2000);
              setMessage(
                "알 수 없는 이유로 회원가입에 실패했습니다. 계정 정보를 다시 한 번 확인해주세요."
              );
              throw new Error(`${res.status} 오류가 발생했습니다`);
            }

            // 성공하면 여기서 navigate
            navigate("/login");
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (error) {
        console.log(error);
      }
    }

    // formData 초기화
    for (const key of formData.keys()) {
      formData.delete(key);
    }
  };

  // 회원가입 버튼 색깔 바꾸기 기능
  const SignUpisValid = useSelector(
    (state: any) => state.SignUpReducer.success
  );
  const accountType = useSelector(
    (state: any) => state.setAccountTypeReducer.accountType
  );

  // isValid 값을 업데이트하는 함수
  const updateIsValid = useCallback(() => {
    let valid: boolean = false;
    if (accountType === USER) {
      valid = Boolean(
        signupUserFormData.name &&
          signupUserFormData.userid &&
          signupUserFormData.password &&
          signupUserFormData.passwordcheck &&
          signupUserFormData.phonenumber &&
          signupUserFormData.identifynumber &&
          signupUserFormData.idcheck
      );
    } else {
      valid = Boolean(
        signupCompanyFormData.name &&
          signupCompanyFormData.userid &&
          signupCompanyFormData.password &&
          signupCompanyFormData.passwordcheck &&
          signupCompanyFormData.phonenumber &&
          signupCompanyFormData.identifynumber &&
          signupCompanyFormData.address &&
          signupCompanyFormData.idcheck &&
          selectedFiles.length
      );
    }
    dispatch(SetIsSignupAction(valid));
  }, [dispatch, selectedFiles, signupUserFormData, signupCompanyFormData]);

  useEffect(() => {
    updateIsValid();
    // console.log("회원가입 조건 확인하기", SignUpisValid);
    // console.log(Boolean(signupUserFormData.name));
    // console.log(Boolean(signupUserFormData.userid));
    // console.log(Boolean(signupUserFormData.idcheck));
    // console.log(Boolean(signupUserFormData.password));
    // console.log(Boolean(signupUserFormData.passwordcheck));
    // console.log(Boolean(signupUserFormData.phonenumber));
    // console.log(Boolean(signupUserFormData.identifynumber));
    // console.log(selectedFiles.length);
  }, [updateIsValid, SignUpisValid, signupCompanyFormData]);

  // 휴대전화 인증번호
  const [isValid, setIsValid] = useState(true);

  return (
    <StyleSignUpContainer>
      <Nav2 />
      <SignUpButton
        setSelectedButton={setSelectedButton}
        selectedButton={selectedButton}
        setSignupUserFormData={setSignupUserFormData}
        signupUserFormData={signupUserFormData}
        setSignupCompanyFormData={setSignupCompanyFormData}
        signupCompanyFormData={signupCompanyFormData}
        isUser={isUser}
        setIsUser={setIsUser}
        setIddupliCheck={setIddupliCheck}
        iddupliCheck={iddupliCheck}
        setIsValid={setIsValid}
        isValid={isValid}
      />
      <StyleSignUpCenterDiv>
        <StyleLoginBoxDiv border={isRecaptcha ? "#d23131" : "grey"}>
          {selectedButton === USER ? (
            <StyleSignUpBoxDiv>
              <SignUpUserName
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
              />
              <SignUpUserId
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
              />
              <SignUpUserPassword
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
                secondPassword={secondPassword}
                setIsPasswordValid={setIsPasswordValid}
              />
              <SignUpUserPasswordCheck
                signupUserFormData={signupUserFormData}
                setSignupUserFormData={setSignupUserFormData}
                secondPassword={secondPassword}
                setSecondPassword={setSecondPassword}
                setIsPasswordValid={setIsPasswordValid}
                isPasswordValid={isPasswordValid}
              />
              <SignUpUserBirth
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
              />
              <SignUpUserPhoneNumber
                setSignupUserFormData={setSignupUserFormData}
                signupUserFormData={signupUserFormData}
                setIsValid={setIsValid}
                isValid={isValid}
              />
            </StyleSignUpBoxDiv>
          ) : (
            <StyleSignUpBoxDiv>
              <SignUpCompanyTypeButton
                setSignupCompanyFormData={setSignupCompanyFormData}
                signupCompanyFormData={signupCompanyFormData}
                setIsValid={setIsValid}
                isValid={isValid}
              />
              <SignUpCompanyName
                setSignupCompanyFormData={setSignupCompanyFormData}
                signupCompanyFormData={signupCompanyFormData}
              />
              <SignUpCompanyId
                signupCompanyFormData={signupCompanyFormData}
                setSignupCompanyFormData={setSignupCompanyFormData}
              />
              <SignUpCompanyPassword
                signupCompanyFormData={signupCompanyFormData}
                setSignupCompanyFormData={setSignupCompanyFormData}
                secondPassword={secondPassword}
                setIsPasswordValid={setIsPasswordValid}
              />
              <SignUpCompanyPasswordCheck
                signupCompanyFormData={signupCompanyFormData}
                setSignupCompanyFormData={setSignupCompanyFormData}
                secondPassword={secondPassword}
                setSecondPassword={setSecondPassword}
                isPasswordValid={isPasswordValid}
                setIsPasswordValid={setIsPasswordValid}
              />
              <SignUpCompanyBusinessNumber
                setSignupCompanyFormData={setSignupCompanyFormData}
                signupCompanyFormData={signupCompanyFormData}
              />
              <SignUpCompanyAddress
                setSignupCompanyFormData={setSignupCompanyFormData}
                signupCompanyFormData={signupCompanyFormData}
              />
              <SignUpCompanyPhoneNumber
                setSignupCompanyFormData={setSignupCompanyFormData}
                signupCompanyFormData={signupCompanyFormData}
                setIsValid={setIsValid}
                isValid={isValid}
              />
              <SignUpCompanyDocument
                handleFileChange={handleFileChange}
                isSelectedFiles={selectedFiles ? true : false} // IsSelectedFiles -> isSelectedFiles 로 수정
              />
            </StyleSignUpBoxDiv>
          )}
          {isSignUpBtn ? (
            <ReCAPTCHA
              sitekey="6LdijBMlAAAAACu0OtiHgCtKlGE58nkcRFXPxSLk"
              style={{ marginBottom: "1rem" }}
              size="normal"
              onChange={handleCaptchaChange}
            />
          ) : null}
          <StyleGoRegister
            type="button"
            tabIndex={13}
            disabled={!isRecaptcha}
            backgroundColor={isRecaptcha ? "#d23131" : "grey"}
            onClick={(e) => handleSubmit(e)}
          >
            회원가입 하기
          </StyleGoRegister>
        </StyleLoginBoxDiv>
      </StyleSignUpCenterDiv>
      {isAlert ? (
        <div>
          <CustomAlert message={message} />
        </div>
      ) : null}
    </StyleSignUpContainer>
  );
};

export default SignupPages;
