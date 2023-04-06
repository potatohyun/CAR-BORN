import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { StyleIsValidSpaceBetween, StyleNameLabel } from "./SignUpUserName";

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IsValidComponent from './../../isValid/IsValidComponent';
import 'dayjs/locale/zh-cn';

type SignUpUserBirthProps = {
  setSignupUserFormData: React.Dispatch<React.SetStateAction<SignupFormData>>;
  signupUserFormData: SignupFormData;
};

export const StyleDatePickerDiv = styled.div`
  width: 100%;

  & > div > div > div {
    border: 1px solid #d23131;
  }

  label {
    display: none;
  }

  label:hover {
    cursor: none;
  }

  div > div {
    width: 100%;
    position: relative;
  }

  div > div > div > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 10px;
  }

  .MuiInputBase-input {
    width: 30vw;
  }

  .MuiInputBase-formControl {
    border: 1px solid #d23131;
  }

  .MuiOutlinedInput-input {
    border-top:1px solid #d23131;
  }

`

dayjs.locale('zh-cn');

const SignUpUserBirth = ({
  setSignupUserFormData,
  signupUserFormData,
}: SignUpUserBirthProps) => {
  // 메세지
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [message, setMessage] = useState<String>("");

  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [userBirth, setUserBirth] = useState<null | String>(null);

  const handleDateChange = (date: Dayjs | null) => {
    if (!date) return '';
    const formattedDate = date.format('YYYY-MM-DD');
    setSignupUserFormData({
      ...signupUserFormData,
      identifynumber: formattedDate,
    });
    setUserBirth(formattedDate);
    if (signupUserFormData.identifynumber === ''){
      setIsAlert(false)
    } else {
      setIsAlert(true)
    }
  };

  useEffect(() => {
    if (signupUserFormData.identifynumber === ''){
      setIsAlert(false)
      setMessage("생년월일을 입력해주세요.")
    } else {
      setIsAlert(true)
    }
  }, [signupUserFormData.identifynumber, setIsAlert])

  return (
    <StyleSignUpInputDiv>
      <StyleIsValidSpaceBetween>
        <StyleNameLabel htmlFor="userbirth">
          생년월일
          <IsValidComponent isValid={isAlert} />
        </StyleNameLabel>
        {isAlert ? null : <span>{message}</span>}
      </StyleIsValidSpaceBetween>
      <StyleDatePickerDiv style={{ width: '100%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'zh-cn'}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue:any) => {
                setValue(newValue);
                handleDateChange(newValue);
              }}
              // renderInput={(params) => <TextField {...params} />}
            />
          </DemoContainer>
        </LocalizationProvider>
      </StyleDatePickerDiv>
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserBirth;
