import styled from '@emotion/styled';
import MyInspectorContentComponent from "./TableComponent/MyInspectorContentComponent";
import Nav2 from './../Nav2';

const StyleInspectorContent = styled.div`
  width: 100vw;
  margin-bottom: 20vh;
`;

const StyleInspectorContentContainer = styled.div`
  width: 100vw;
  height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyleInspectorContentTitleDiv = styled.div`
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


const InspectorContent = () => {
  return (
    <StyleInspectorContent>
      <Nav2 />
      <StyleInspectorContentContainer>
        <StyleInspectorContentTitleDiv>
          <p>검수 내역</p>
        </StyleInspectorContentTitleDiv>
        <br/>
        <MyInspectorContentComponent />
      </StyleInspectorContentContainer>
    </StyleInspectorContent>
  );
}

export default InspectorContent
