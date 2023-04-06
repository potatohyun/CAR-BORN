import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  companyidCheck,
  companyidCheckReset,
} from "../../../modules/UserIdCheckModule";
import { StyleSignUpInputBtnDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { useridCheckReset } from "../../../modules/UserIdCheckModule";
import { StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";
import {
  StyleCheckBtn,
  StyleIdCheckDiv,
  StyleIdCheckInput,
} from "./SignUpUserId";
import swal from "sweetalert";
import IsValidComponent from "./../../isValid/IsValidComponent";

type SignUpCompanyIdProps = {
  signupCompanyFormData: SignupFormData;
  setSignupCompanyFormData: React.Dispatch<
    React.SetStateAction<SignupFormData>
  >;
};
const SignUpCompanyId = ({
  signupCompanyFormData,
  setSignupCompanyFormData,
}: SignUpCompanyIdProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const dispatch = useDispatch();
  const { companyidcheck } = useSelector((state: any) => state.IdCheckReducer);

  // 입력되는거 formdata에 넘겨주기
  const handleUserId = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-z0-9_]+(\s*[a-z0-9_]+)*$/i;
    const { value } = e.target;
    if (e.target.value === "") {
      setMessage(" ");
      setIsAlert(false);
    }
    if (value === "" || regex.test(value)) {
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        userid: value,
      });
    } else {
      setIsCheck(false);
      setMessage("영소문자, 숫자, '_'만 입력 가능합니다.");
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        userid: e.target.value,
      });
    }
  };

  // 아이디 유효성 : 영문자 소문자랑 숫자랑 _ 만 가능가능
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.currentTarget.value === "") {
        setMessage(" ");
        setIsAlert(false);
        setIsCheck(true);
      }
      const regex = /^[a-z0-9_]+$/;
      const isValidLength =
        e.currentTarget.value.length >= 8 && e.currentTarget.value.length <= 20;
      if (regex.test(e.currentTarget.value) && isValidLength) {
        setIsCheck(true);
      } else if (!regex.test(e.currentTarget.value)) {
        if (e.currentTarget.value === "") {
          setMessage(" ");
          setIsAlert(false);
          setIsCheck(true);
        } else {
          setIsCheck(false);
          setMessage("영소문자, 숫자, '_'만 입력 가능합니다.");
          setSignupCompanyFormData({
            ...signupCompanyFormData,
            userid: "",
          });
        }
      } else if (!isValidLength) {
        setIsCheck(false);
        setMessage("아이디 길이는 8글자에서 20글자입니다.");
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          userid: "",
        });
      }
    }
  };

  const handleBlur = (e: any) => {
    e.preventDefault();

    const regex = /^[a-z0-9_]+$/;
    const isValidLength =
      e.currentTarget.value.length >= 8 && e.currentTarget.value.length <= 20;
    if (regex.test(e.currentTarget.value) && isValidLength) {
      setIsCheck(true);
    } else if (!regex.test(e.currentTarget.value)) {
      if (e.currentTarget.value === "") {
        setMessage(" ");
        setIsAlert(false);
        setIsCheck(true);
      } else {
        setIsCheck(false);
        setMessage("영소문자, 숫자, '_'만 입력 가능합니다.");
        setSignupCompanyFormData({
          ...signupCompanyFormData,
          userid: "",
        });
      }
    } else if (!isValidLength) {
      setIsCheck(false);
      setMessage("아이디 길이는 8글자에서 20글자입니다.");
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        userid: "",
      });
    }
  };

  // 아이디 중복체크용
  const userIdDuplicateCheck = (e: any) => {
    e.preventDefault();
    dispatch(companyidCheck(signupCompanyFormData.userid));
  };

  useEffect(() => {
    if (companyidcheck === true) {
      setIsAlert(true);
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        idcheck: companyidcheck,
      });
      swal("유효성 검사", "사용가능한 아이디 입니다.", "success");
    } else if (companyidcheck === false) {
      setIsAlert(false);
      swal("유효성 검사", "이미 가입한 아이디", "error");
      setSignupCompanyFormData({
        ...signupCompanyFormData,
        idcheck: companyidcheck,
      });
    }
    dispatch(useridCheckReset());
    dispatch(companyidCheckReset());
  }, [companyidcheck]);

  return (
    <StyleSignUpInputBtnDiv>
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="companyid">
          아이디
          <IsValidComponent isValid={isAlert} />
        </StyleNameLabel>
        {isCheck ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyleIdCheckDiv>
        <StyleIdCheckInput
          tabIndex={2}
          type="text"
          id="companyid"
          name="companyid"
          placeholder="CompanyID"
          autoComplete="off"
          required
          minLength={8}
          maxLength={20}
          value={signupCompanyFormData.userid}
          onChange={(e) => handleUserId(e)}
          onKeyDown={(e) => handleKeyPress(e)}
          onBlur={(e) => handleBlur(e)}
        />
        <StyleCheckBtn
          tabIndex={3}
          type="button"
          onClick={(e) => {
            userIdDuplicateCheck(e);
          }}
          value={`중복체크`}
        />
      </StyleIdCheckDiv>
    </StyleSignUpInputBtnDiv>
  );
};

export default SignUpCompanyId;
