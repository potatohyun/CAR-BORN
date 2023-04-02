import Nav from "../Nav";
import styled from "@emotion/styled";
import MyUserInfoDeleteComponent from "./ModalComponent/MyUserInfoDeleteComponent";
import Nav2 from './../Nav2';

const StyleUserWithdrawal = styled.div`
  width: 100vw;
`;

const StyleUserWithdrawalContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleUserWithdrawalTitleDiv = styled.div`
  width: 70%;
  height: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2.5rem;
    font-weight: 900;
  }

  border-bottom: 2px solid red;
  margin-top: 3rem;
`;

const UserInfoDelete = () => {
  return (
    <StyleUserWithdrawal>
      <Nav2 />
      <StyleUserWithdrawalContainer>
        <StyleUserWithdrawalTitleDiv>
          <p>회원 탈퇴</p>
        </StyleUserWithdrawalTitleDiv>
        <MyUserInfoDeleteComponent />
      </StyleUserWithdrawalContainer>
    </StyleUserWithdrawal>
  );
};

export default UserInfoDelete;
