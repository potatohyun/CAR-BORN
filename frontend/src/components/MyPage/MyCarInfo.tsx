import styled from "@emotion/styled";
import MyCarDataComponent from "./TableComponent/MyCarDataComponent";
import Nav2 from "../Nav2";

// 배경색 바꾸기
const StyleMyCarInfoBody = styled.div`
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

const StyleMyCarInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const MyCarInfo = () => {
  return (
    <StyleMyCarInfoBody>
      <Nav2 />
      <StyleMyCarInfoContainer>
        <MyCarDataComponent />
      </StyleMyCarInfoContainer>
    </StyleMyCarInfoBody>
  );
};

export default MyCarInfo;
