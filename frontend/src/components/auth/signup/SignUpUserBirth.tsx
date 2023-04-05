import { StyleSignUpInputDiv } from "../../../routes/auth/SignupPage";
import { SignupFormData } from "./SignUpButton";
import { useState } from "react";

import styled from "@emotion/styled";
import { StyleNameLabel } from "./SignUpUserName";

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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

`

const SignUpUserBirth = ({
  setSignupUserFormData,
  signupUserFormData,
}: SignUpUserBirthProps) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs("2023-04-07"));
  const [userBirth, setUserBirth] = useState<null | String>(null);

  const handleDateChange = (date: Dayjs | null) => {
    if (!date) return '';
    const formattedDate = date.format('YYYY-MM-DD');
    setSignupUserFormData({
      ...signupUserFormData,
      identifynumber: formattedDate,
    });
    setUserBirth(formattedDate);
  };

  return (
    <StyleSignUpInputDiv>
      <StyleNameLabel htmlFor="userbirth">생년월일</StyleNameLabel>
      <StyleDatePickerDiv style={{ width: '100%' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Controlled picker"
              value={value}
              onChange={(newValue:any) => {
                setValue(newValue);
                handleDateChange(newValue);
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </StyleDatePickerDiv>
    </StyleSignUpInputDiv>
  );
};

export default SignUpUserBirth;
