import Nav from "../Nav";
import styled from "@emotion/styled";
import MyCompanyInfoDeleteComponent from "./ModalComponent/MyCompanyInfoDeleteComponent";
import Nav2 from './../Nav2';

const StyleCompanyWithdrawal = styled.div`
  width: 100vw;
`;

const StyleCompanyWithdrawalContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleCompanyWithdrawalTitleDiv = styled.div`
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

const CompanyInfoDelete = () => {
  return (
    <StyleCompanyWithdrawal>
      <Nav2 />
      <StyleCompanyWithdrawalContainer>
        <StyleCompanyWithdrawalTitleDiv>
          <p>회원 탈퇴</p>
        </StyleCompanyWithdrawalTitleDiv>
        <MyCompanyInfoDeleteComponent />
      </StyleCompanyWithdrawalContainer>
    </StyleCompanyWithdrawal>
  );
};

export default CompanyInfoDelete;
