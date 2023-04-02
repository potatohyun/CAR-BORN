import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userModifyPasswordRequest } from "../../modules/modifyPasswordModule";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Nav2 from "../Nav2";

const StyleUserPasswordModifyForm = styled.form`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleUserPasswordModifyContainerDiv = styled.div`
  width: 80vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyleUserPasswordModifyTitleDiv = styled.div`
  width: 50%;
  height: 20%;

  span {
    font-size: 2rem;
    font-weight: 900;
  }

  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 3px solid red;
`;

const StyleUserPasswordModifyInputDiv = styled.div`
  width: 50%;
  height: 10%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 1.5rem;
    font-weight: 900;
  }

  input {
    height: 50%;
  }
`;

const StyleUserPasswordModifyButtonDiv = styled.div`
  width: 50%;
  height: 10%;

  display: flex;
`;

const StyleCancelBtn = styled.button`
  width: 30%;
  height: 75%;
  border: 3px solid red;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  font-weight: 900;
`;

const StylePasswordModifyBtn = styled.button`
  width: 70%;
  height: 75%;
  border: 3px solid red;
  background-color: red;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1rem;
  font-weight: 900;
`;

const UserPasswordModify = () => {
  const ObjString:any = localStorage.getItem("login-token");
  const Obj = JSON.parse(ObjString);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [isNewPassword, setIsNewPassword] = useState<boolean>(false);
  const isSuccess = useSelector(
    (state: any) => state.userModifyPasswordReducer.success
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setOldPassword(value);
  };

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
    dispatch(userModifyPasswordRequest({ oldPassword, newPassword }));
  };

  const handleMyPageMove = () => {
    navigate(`/${Obj.userId}/mypage`)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <div>
      <Nav2/>
      <StyleUserPasswordModifyForm onSubmit={(e) => handleSendNewPassword(e)}>
        <StyleUserPasswordModifyContainerDiv>
          {/* 타이틀 */}
          <StyleUserPasswordModifyTitleDiv>
            <span>비밀번호 재설정</span>
          </StyleUserPasswordModifyTitleDiv>
          {/* 기존 비밀번호 */}
          <StyleUserPasswordModifyInputDiv>
            <span>기존비밀번호</span>
            <input type="passwword" onChange={(e) => handleOldPassword(e)} />
          </StyleUserPasswordModifyInputDiv>
          {/* 새로운 비밀번호 */}
          <StyleUserPasswordModifyInputDiv>
            <span>새로운 비밀번호</span>
            <input type="password" onChange={(e) => handleNewPassword(e)} />
          </StyleUserPasswordModifyInputDiv>
          {/* 비밀번호 확인 */}
          <StyleUserPasswordModifyInputDiv>
            <span>비밀번호 확인</span>
            <input type="password" onChange={(e) => handleNewPasswordCheck(e)} />
          </StyleUserPasswordModifyInputDiv>
          {/* 버튼 나누기 */}
          <StyleUserPasswordModifyButtonDiv>
            <StyleCancelBtn onClick={handleMyPageMove}>취소</StyleCancelBtn>
            <StylePasswordModifyBtn type="submit" disabled={!isNewPassword}>
              비밀번호 변경
            </StylePasswordModifyBtn>
          </StyleUserPasswordModifyButtonDiv>
        </StyleUserPasswordModifyContainerDiv>
      </StyleUserPasswordModifyForm>
    </div>
  );
};

export default UserPasswordModify;
