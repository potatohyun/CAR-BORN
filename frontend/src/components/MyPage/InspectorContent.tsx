import styled from '@emotion/styled';
import MyInspectorContentComponent from "./TableComponent/MyInspectorContentComponent";
import Nav2 from './../Nav2';

const StyleInspectorContent = styled.div`
  width: 100vw;
  background-color: white;
  /* background: linear-gradient(
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
  } */
`;

const StyleInspectorContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InspectorContent = () => {
  return (
    <StyleInspectorContent>
      <Nav2 />
      <StyleInspectorContentContainer>
        <MyInspectorContentComponent />
      </StyleInspectorContentContainer>
    </StyleInspectorContent>
  );
}

export default InspectorContent
