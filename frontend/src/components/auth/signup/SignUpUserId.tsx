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
import { StyleSignUpInputBtnDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { useridCheckReset } from "../../../modules/UserIdCheckModule";
import { StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";
import styled from "@emotion/styled";
import swal from "sweetalert";
import IsValidComponent from "./../../isValid/IsValidComponent";

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
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const { useridcheck } = useSelector((state: any) => state.IdCheckReducer);
  const dispatch = useDispatch();

  // 입력되는거 formdata에 넘겨주기
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-z0-9_]+(\s*[a-z0-9_]+)*$/i;
    const { value } = e.target;
    if(e.target.value === '') {
      setMessage(" ")
      setIsAlert(false);
    }

    if (value === "" || regex.test(value)) {
      setSignupUserFormData({
        ...signupUserFormData,
        userid: value,
      });
    } else {
      setIsCheck(false);
      setMessage("영소문자, 숫자, '_'만 입력 가능합니다.")
      setSignupUserFormData({
        ...signupUserFormData,
        userid: e.target.value,
      });
    }
  };

  // 아이디 유효성 : 영문자 소문자랑 숫자랑 _ 만 가능가능
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if(e.currentTarget.value === '') {
        setMessage(" ")
        setIsAlert(false);
        setIsCheck(true)
      }

      const regex = /^[a-z0-9_]+$/;
      const isValidLength =
        e.currentTarget.value.length >= 8 && e.currentTarget.value.length <= 20;
      if (regex.test(e.currentTarget.value) && isValidLength) {
        setIsCheck(true);
      } else if (!regex.test(e.currentTarget.value)) {
        if(e.currentTarget.value === '') {
          setMessage(" ")
          setIsAlert(false);
          setIsCheck(true)
        } else {
          setIsCheck(false);
          setMessage("영소문자, 숫자, '_'만 입력 가능합니다.");
          setSignupUserFormData({
            ...signupUserFormData,
            userid: "",
          });
        }
      } else if (!isValidLength) {
        setIsCheck(false);
        setMessage("아이디 길이는 8글자에서 20글자입니다.");
        setSignupUserFormData({
          ...signupUserFormData,
          userid: "",
        });
      } 
    }
  };

  const handleBlur = (e: any) => {
    e.preventDefault()
    
    const regex = /^[a-z0-9_]+$/;
    const isValidLength =
      e.currentTarget.value.length >= 8 && e.currentTarget.value.length <= 20;
    if (regex.test(e.currentTarget.value) && isValidLength) {
      setIsCheck(true);
    } else if (!regex.test(e.currentTarget.value)) {
      if(e.currentTarget.value === '') {
        setMessage(" ")
        setIsAlert(false);
        setIsCheck(true)
      } else {
        setIsCheck(false);
        setMessage("영소문자, 숫자, '_'만 입력 가능합니다.");
        setSignupUserFormData({
          ...signupUserFormData,
          userid: "",
        });
      }
    } else if (!isValidLength) {
      setIsCheck(false);
      setMessage("아이디 길이는 8글자에서 20글자입니다.");
      setSignupUserFormData({
        ...signupUserFormData,
        userid: "",
      });
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
      setSignupUserFormData({
        ...signupUserFormData,
        idcheck: true,
      });
      swal("유효성 검사", "입력한 아이디가 유효합니다.", "success");
    } else if (useridcheck === false) {
      setIsAlert(false);
      swal("유효성 검사", "이미 가입한 아이디", "error");
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
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="userid">
          아이디
          <IsValidComponent isValid={isAlert} />
        </StyleNameLabel>
        {isCheck ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyleIdCheckDiv>
        <StyleIdCheckInput
          tabIndex={2}
          type="text"
          id="userid"
          name="userid"
          placeholder="UserID"
          autoComplete="off"
          required
          minLength={8}
          maxLength={20}
          value={signupUserFormData.userid}
          onChange={(e) => handleUserId(e)}
          onKeyDown={(e) => handleKeyPress(e)}
          onBlur={(e) => handleBlur(e)}
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
    </StyleSignUpInputBtnDiv>
  );
};

export default SignUpUserId;
