import styled from '@emotion/styled';
import Nav2 from '../Nav2';
import MyInsuranceContentComponent from './TableComponent/MyInsuranceContentComponent';

const StyleInsuranceContent = styled.div`
  width: 100vw;
  background: linear-gradient(
    to bottom,
    #000000,
    #1e0000e8
  );
  background-size: 100% 200%;
  animation: gradient 10s ease infinite;
  
  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

const StyleInsuranceContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InsuranceContent = () => {
  return (
    <StyleInsuranceContent>
      <Nav2 />
      <StyleInsuranceContentContainer>
        <MyInsuranceContentComponent />
      </StyleInsuranceContentContainer>
    </StyleInsuranceContent>
  );
};

export default InsuranceContent;
