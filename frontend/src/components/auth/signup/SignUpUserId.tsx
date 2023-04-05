import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  companyidCheckReset,
  useridCheck,
} from "../../../modules/UserIdCheckModule";
import { StyleSignUpInputBtnDiv, StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { useridCheckReset } from "../../../modules/UserIdCheckModule";
import { StyleNameLabel } from "./SignUpUserName";
import styled from "@emotion/styled";
import CustomAlert from "./modal/CustomAlert";

type SignUpUserIdProps = {
  setSignupUserFormData: Dispatch<SetStateAction<SignupFormData>>;
  signupUserFormData: SignupFormData;
};

export const StyleIdCheckInput = styled.input`
  padding: 0.7rem;
  font-size: 1.2rem;
  border: 1px solid #d23131;
  border-radius: 5px;
  width: 67%;
  margin-right: 3%;
  color: #333;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;

  &:focus {
    outline: none;
    border-color: #d23131;
    box-shadow: 0px 0px 5px 0px rgba(210, 49, 49, 0.75);
  }
`;

export const StyleCheckBtn = styled.input`
  width: 30%;
  height: 6vh;
  margin-bottom: 1rem;
  background-color: #d23131;
  color: white;
  border: 5px solid transparent;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;
  text-align: center;

  &:active {
    background-color: white;
    color: black;
    border: 5px solid #d23131;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const StyleIdCheckDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SignUpUserId = ({
  setSignupUserFormData,
  signupUserFormData,
}: SignUpUserIdProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  // const { useridcheck } = useSelector((state: any) => state.idcheck);
  const { useridcheck } = useSelector((state: any) => state.IdCheckReducer);

  const dispatch = useDispatch();

  // 입력되는거 formdata에 넘겨주기
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-z0-9_]+(\s*[a-z0-9_]+)*$/i;
    const { value } = e.target;
    if (value === "" || regex.test(value)) {
      setSignupUserFormData({
        ...signupUserFormData,
        userid: value,
      });
    } else {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage("아이디는 영소문자와 숫자만 입력 가능합니다.");
    }
  };

  // 아이디 유효성 : 영문자 소문자랑 숫자랑 _ 만 가능가능
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const regex = /^[a-z0-9_]+$/;
      const isValidLength =
        e.currentTarget.value.length >= 5 && e.currentTarget.value.length <= 20;
      if (regex.test(e.currentTarget.value) && isValidLength) {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        setMessage("입력한 아이디가 유효합니다.");
      } else if (!regex.test(e.currentTarget.value)) {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        setMessage("아이디는 영어 소문자와 숫자, _만 가능합니다.");
        setSignupUserFormData({
          ...signupUserFormData,
          userid: "",
        });
      } else if (!isValidLength) {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        setMessage("아이디 길이는 5글자에서 20글자입니다.");
        setSignupUserFormData({
          ...signupUserFormData,
          userid: "",
        });
      } else {
        setIsAlert(true);
        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
        alert(
          "입력하신 아이디가 영어 대소문자와 숫자가 아니거나, 길이가 5글자이하 또는 20글자 이상입니다."
        );
        setSignupUserFormData({
          ...signupUserFormData,
          userid: "",
        });
      }
    }
  };

  // 아이디 중복체크용
  const userIdDuplicateCheck = (e: any) => {
    e.preventDefault();
    dispatch(useridCheck(signupUserFormData.userid));
  };

  useEffect(() => {
    if (useridcheck === true) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage("사용가능한 아이디 입니다.");
      setSignupUserFormData({
        ...signupUserFormData,
        idcheck: true,
      });
    } else if (useridcheck === false) {
      setIsAlert(true);
      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
      setMessage("중복된 아이디가 있습니다. 다른 아이디로 회원가입 해주세요.");
      setSignupUserFormData({
        ...signupUserFormData,
        idcheck: false,
      });
    }
    dispatch(useridCheckReset());
    dispatch(companyidCheckReset());
  }, [useridcheck]);

  return (
    <StyleSignUpInputBtnDiv>
      <StyleNameLabel htmlFor="userid">아이디</StyleNameLabel>
      <StyleIdCheckDiv>
        <StyleIdCheckInput
          tabIndex={2}
          type="text"
          id="userid"
          name="userid"
          placeholder="아이디"
          autoComplete="off"
          required
          value={signupUserFormData.userid}
          onChange={(e) => handleUserId(e)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <StyleCheckBtn
          type="button"
          tabIndex={3}
          onClick={(e) => {
            userIdDuplicateCheck(e);
          }}
          value={`중복체크`}
        />
      </StyleIdCheckDiv>
      {isAlert ? (
        <div>
          <CustomAlert message={message} />
        </div>
      ) : null}
    </StyleSignUpInputBtnDiv>
  );
};

export default SignUpUserId;
