import styled from '@emotion/styled';
import Nav2 from '../Nav2';
import Nav from './../Nav';
import MyRepairContentComponent from './TableComponent/MyRepairContentComponent';

const StyleRepairContent = styled.div`
  width: 100vw;
  margin-bottom: 20vh;
`;

const StyleRepairContentContainer = styled.div`
  width: 100vw;
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleRepairContentTitleDiv = styled.div`
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

const RepairContent = () => {
  return (
    <StyleRepairContent>
      <Nav2 />
      <StyleRepairContentContainer>
        <StyleRepairContentTitleDiv>
          <p>정비 내역</p>
        </StyleRepairContentTitleDiv>
        <br/>
        <MyRepairContentComponent />
      </StyleRepairContentContainer>
    </StyleRepairContent>
  )
}

export default RepairContent;