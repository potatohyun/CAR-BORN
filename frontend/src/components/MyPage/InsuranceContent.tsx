import styled from '@emotion/styled';
import Nav2 from '../Nav2';
import MyInsuranceContentComponent from './TableComponent/MyInsuranceContentComponent';

const StyleInsuranceContent = styled.div`
  width: 100vw;
  margin-bottom: 20vh;
`;

const StyleInsuranceContentContainer = styled.div`
  width: 100vw;
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleInsuranceContentTitleDiv = styled.div`
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

const InsuranceContent = () => {
  return (
    <StyleInsuranceContent>
      <Nav2 />
      <StyleInsuranceContentContainer>
        <StyleInsuranceContentTitleDiv>
          <p>손상 내역</p>
        </StyleInsuranceContentTitleDiv>
        <br/>
        <MyInsuranceContentComponent />
      </StyleInsuranceContentContainer>
    </StyleInsuranceContent>
  );
};

export default InsuranceContent;
